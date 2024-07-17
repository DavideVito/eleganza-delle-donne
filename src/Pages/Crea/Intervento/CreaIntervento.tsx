import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import InterventiRepository from '../../../Repositories/Interventi/InterventiRepository';
import { Cliente } from '../../../Models/Cliente/Cliente';
import { useRef } from 'react';


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

export const CreaIntervento = ({ cliente }: { cliente: Cliente }) => {


    const formik = useFormik<CreaIntervento>({
        initialValues: {
            data: new Date(),
            descrizione: "",
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            const idCreato = await

                InterventiRepository.CreaIntervento({
                    cliente: cliente,
                    data: values.data,
                    descrizione: values.descrizione
                })
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="data"
                    name="data"
                    label="Nome Cliente"
                    type='date'
                    value={formik.values.data}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.data && Boolean(formik.errors.data)}
                />

                <TextField
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
                    Submit
                </Button>
            </form>
        </div>
    );
};

