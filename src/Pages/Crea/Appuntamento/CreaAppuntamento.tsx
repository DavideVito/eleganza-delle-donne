import { SchedulerHelpers } from "@aldabil/react-scheduler/types";
import { TextField, Button, FormControl, Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ClienteContext } from "../../../Contexts/Cliente/ClienteContext";
import { TimePicker } from "@mui/x-date-pickers";
import { CreaAppuntamentoModel } from "../../../Models/Appuntamento/Appuntamento";
import AppuntamentiRepository from "../../../Repositories/Appuntamenti/AppuntamentiRepository";
import { AppuntamentiContext } from "../../../Contexts/Appuntamenti/AppuntamentiContext";
import dayjs from "dayjs";


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
            client: '',
            description: '',
            date: null,
            startTime: null,
            endTime: null,
        },
        onSubmit: (values) => {

            //@ts-ignore
            const data: Date = values.date.toDate()

            //@ts-ignore
            const inizio = new Date(data.setHours(values.startTime.hour(), values.startTime.minute()))

            //@ts-ignore
            const fine = new Date(data.setHours(values.endTime.hour(), values.endTime.minute()))

            handleSubmit({
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

        formik.setFieldValue("client", appuntameto.cliente.id)

        formik.setFieldValue("description", appuntameto.sottotitolo)


        formik.setFieldValue("date", dayjs(appuntameto.inizio))

        formik.setFieldValue("startTime", dayjs(appuntameto.inizio))
        formik.setFieldValue("endTime", dayjs(appuntameto.fine))


        //   formik.setFieldValue("client", )



    }, [])

    if (!clienti) return "Carico..."

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
                {/* Client Selection Dropdown */}
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
                </FormControl>

                {/* Description Input */}
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: "100%" }}
                        label="Date"
                        value={formik.values.date}
                        onChange={(date) => formik.setFieldValue('date', date)}
                    />

                    <div style={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "space-between", marginTop: "0.5rem" }}>
                        <TimePicker
                            label="Start Time"
                            value={formik.values.startTime}
                            onChange={(time) => formik.setFieldValue('startTime', time)}
                        />

                        <TimePicker
                            label="End Time"
                            value={formik.values.endTime}
                            onChange={(time) => formik.setFieldValue('endTime', time)}
                        />
                    </div>
                </LocalizationProvider>

                {/* Submit Button */}
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