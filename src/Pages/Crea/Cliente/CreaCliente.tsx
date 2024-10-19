import { Button, TextField } from "@mui/material"
import ClientiRepository from "../../../Repositories/Clienti/ClientiRepository"
import { useFormik } from 'formik';
import React from "react";
import * as yup from 'yup';

const style: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
    flexDirection: "column"
}

const validationSchema = yup.object({
    nome: yup
        .string()
        .required('Nome è richiesto'),
    numeroTelefono: yup
        .string()
        .required('Numero telefono è richiesto'),
});

export const CreaCliente = () => {


    const formik = useFormik({
        initialValues: {
            nome: '',
            numeroTelefono: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => creaCliente(values.nome, values.numeroTelefono)
    });

    const creaCliente = async (nome: string, telefono: string) => {
        const id = await ClientiRepository.CreaCliente({ nomePersona: nome, numeroTelefono: telefono })

        window.location.href = `/cliente/${id}`
    }


    return <form onSubmit={formik.handleSubmit} style={style}>

        <TextField
            fullWidth
            id="nome"
            name="nome"
            label="Nome Cliente"
            value={formik.values.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
        />

        <TextField
            fullWidth
            id="numeroTelefono"
            name="numeroTelefono"
            label="Numero di telefono"
            type="tel"
            value={formik.values.numeroTelefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.numeroTelefono && Boolean(formik.errors.numeroTelefono)}
            helperText={formik.touched.numeroTelefono && formik.errors.numeroTelefono}
        />


        <Button type="submit">Salva</Button>


    </form>
}