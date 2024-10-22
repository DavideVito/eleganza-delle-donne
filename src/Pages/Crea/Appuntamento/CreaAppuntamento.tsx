import { SchedulerHelpers } from "@aldabil/react-scheduler/types";
import { TextField, Button, FormControl, Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ClienteContext } from "../../../Contexts/Cliente/ClienteContext";
import { DateTimePicker } from "@mui/x-date-pickers";
import { CreaAppuntamentoModel } from "../../../Models/Appuntamento/Appuntamento";
import AppuntamentiRepository from "../../../Repositories/Appuntamenti/AppuntamentiRepository";
import { AppuntamentiContext } from "../../../Contexts/Appuntamenti/AppuntamentiContext";
import dayjs from "dayjs";
import { Loading } from "../../../Components/Loading/Loading";

import "dayjs/locale/it"

interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

export const CreaAppuntamento = ({ scheduler }: CustomEditorProps) => {
    const clienti = useContext(ClienteContext)
    const [appuntamenti, aggiornaAppuntamenti] = useContext(AppuntamentiContext)

    const isEditing = !!scheduler.state.event_id.value

    // Initialize useFormik hook
    const formik = useFormik({
        initialValues: {
            nomeCliente: '',
            client: '',
            description: '',
            date: null,
        },
        onSubmit: (values) => {
            //@ts-ignore
            const inizio: Date = values.date.toDate()

            const fine = dayjs(inizio).add(30, "minute").toDate()

            handleSubmit({
                titolo: values.nomeCliente,
                cliente: clienti?.find(x => x.id === values.client)!,
                inizio: inizio,
                fine: fine,
                sottotitolo: values.description
            })

        }
    });

    const handleSubmit = async (valori: CreaAppuntamentoModel) => {
        if (isEditing) {
            const id = scheduler.state.event_id.value
            await AppuntamentiRepository.AggiornaAppuntamento(id!, valori)

        } else {
            await AppuntamentiRepository.CreaAppuntamento(valori)
        }

        aggiornaAppuntamenti()

        scheduler.close()
    }


    useEffect(() => {

        if (!isEditing) return

        const id = scheduler.state.event_id.value

        const appuntameto = appuntamenti?.find(x => x.id === id)!

        formik.setFieldValue("nomeCliente", appuntameto.titolo)
        formik.setFieldValue("client", appuntameto.cliente?.id ?? '')

        formik.setFieldValue("description", appuntameto.sottotitolo)


        formik.setFieldValue("date", dayjs(appuntameto.inizio))
    }, [])

    if (!clienti) return <Loading />

    return (
        <Box
            sx={{
                maxWidth: 700,
                margin: 'auto',
                p: 2,
                borderRadius: 4,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            }}
        >

            <form onSubmit={formik.handleSubmit}>

                <FormControl fullWidth margin="normal" error={formik.touched.client && Boolean(formik.errors.client)}>
                    <InputLabel id="client-select-label">Cliente</InputLabel>
                    <Select
                        labelId="client-select-label"
                        id="client"
                        name="client"
                        value={formik.values.client}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Select Client"
                    >
                        {clienti.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.nomePersona}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.client && formik.errors.client && (
                        <Typography variant="caption" color="error">
                            {formik.errors.client}
                        </Typography>
                    )}

                    <TextField
                        label="Nome cliente"
                        fullWidth
                        margin="normal"
                        id="nomeCliente"
                        name="nomeCliente"
                        value={formik.values.nomeCliente}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nomeCliente && Boolean(formik.errors.nomeCliente)}
                        helperText={formik.touched.nomeCliente && formik.errors.nomeCliente}
                    />
                </FormControl>



                <TextField
                    label="Descrizione"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                    <DateTimePicker

                        sx={{ width: "100%" }}
                        label="Data"
                        value={formik.values.date}
                        onChange={(date) => formik.setFieldValue('date', date)}
                    />

                </LocalizationProvider>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Salva appuntamento
                </Button>
            </form>
        </Box>
    );
};