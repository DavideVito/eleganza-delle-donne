import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import InterventiRepository from '../../../Repositories/Interventi/InterventiRepository';
import { Cliente } from '../../../Models/Cliente/Cliente';
import { useEffect, useState } from 'react';
import { useParams, redirect } from 'react-router-dom';
import ClientiRepository from '../../../Repositories/Clienti/ClientiRepository';


interface CreaIntervento {
    data: Date,
    descrizione: string
}

const validationSchema = yup.object<CreaIntervento>({
    data: yup
        .date()
        .required(),

    descrizione: yup
        .string()
        .required('descrizione is required'),
});

export const CreaIntervento = () => {

    const { id } = useParams();
    const [cliente, setCliente] = useState<Cliente | null | undefined>(undefined)

    useEffect(() => {

        if (!id) redirect("/");

        ClientiRepository.GetCliente(id!).then(setCliente)
    }, [])


    const formik = useFormik<CreaIntervento>({
        initialValues: {
            data: new Date(),
            descrizione: "",
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            await InterventiRepository.CreaIntervento({
                cliente: cliente,
                data: new Date(values.data),
                descrizione: values.descrizione
            })
        },
    });

    if (!cliente) return <p>Cliente non trovato</p>;


    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
                fullWidth
                id="data"
                name="data"
                label="Data intervento"
                type='date'
                value={formik.values.data}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.data && Boolean(formik.errors.data)}
            />

            <TextField
                multiline
                fullWidth
                id="descrizione"
                name="descrizione"
                label="descrizione"
                type="descrizione"
                value={formik.values.descrizione}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.descrizione && Boolean(formik.errors.descrizione)}
                helperText={formik.touched.descrizione && formik.errors.descrizione}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
                Salva
            </Button>
        </form>
    );
};

