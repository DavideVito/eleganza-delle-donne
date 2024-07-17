import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import CreaClienteRepository from "../../../Repositories/Clienti/ClientiRepository"
import "yup-phone"

interface CreaClienteSchema {
    nomePersona: string,
    numeroTelefono: string
}

const validationSchema = yup.object<CreaClienteSchema>({
    nomePersona: yup
        .string()
        .required(),

    numeroTelefono: yup
        .string()
        .min(8, 'numeroTelefono should be of minimum 8 characters length')
        .required('numeroTelefono is required'),
});

export const CreaCliente = () => {

    const formik = useFormik<CreaClienteSchema>({
        initialValues: {
            nomePersona: '',
            numeroTelefono: '',
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            debugger
            const idCreato = await CreaClienteRepository.CreaCliente({
                nomePersona: values.nomePersona,
                numeroTelefono: values.numeroTelefono
            })

            window.location.href = `/info-cliente/${idCreato}`


        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="nomePersona"
                    name="nomePersona"
                    label="Nome Cliente"
                    value={formik.values.nomePersona}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nomePersona && Boolean(formik.errors.nomePersona)}
                    helperText={formik.touched.nomePersona && formik.errors.nomePersona}
                />

                <TextField
                    fullWidth
                    id="numeroTelefono"
                    name="numeroTelefono"
                    label="numeroTelefono"
                    type="numeroTelefono"
                    value={formik.values.numeroTelefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.numeroTelefono && Boolean(formik.errors.numeroTelefono)}
                    helperText={formik.touched.numeroTelefono && formik.errors.numeroTelefono}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

