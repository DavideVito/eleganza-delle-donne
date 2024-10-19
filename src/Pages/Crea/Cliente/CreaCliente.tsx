import { Button, TextField } from "@mui/material"
import ClientiRepository from "../../../Repositories/Clienti/ClientiRepository"
import { useFormik } from 'formik';
import React, { useEffect } from "react";
import * as yup from 'yup';
import { useParams } from "react-router-dom";
import { CreaClienteModel } from "../../../Models/Cliente/Cliente";

const style: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
    flexDirection: "column"
}

const validationSchema = yup.object({
    nome: yup.string().required('Nome è richiesto'),
    numeroTelefono: yup.string(),
});

export const CreaCliente = () => {

    let { id } = useParams();

    useEffect(() => {

        if (!id) return

        ClientiRepository.GetCliente(id).then(x => {

            formik.setValues({
                nome: x!.nomePersona,
                numeroTelefono: x!.numeroTelefono
            })

        })


    }, [])


    const formik = useFormik({
        initialValues: {
            nome: '',
            numeroTelefono: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => salvaCliente(values.nome, values.numeroTelefono)
    });

    const salvaCliente = async (nome: string, telefono: string) => {
        const dto: CreaClienteModel = { nomePersona: nome, numeroTelefono: telefono }

        if (id) {
            await ClientiRepository.AggiornaCliente(id, dto)
        }
        else {
            id = await ClientiRepository.CreaCliente(dto)

        }


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