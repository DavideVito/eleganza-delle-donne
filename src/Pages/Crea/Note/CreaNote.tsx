// CreatePostForm.js
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, AlertTitle, Alert, Snackbar } from '@mui/material';
import { Cliente } from '../../../Models/Cliente/Cliente';
import InterventiRepository from '../../../Repositories/Note/NoteRepository';
import { useState } from 'react';

interface CreaNoteProps {
    cliente: Cliente,
    onAfterSubmit: () => void
}

export const CreaNote = (props: CreaNoteProps) => {
    const formik = useFormik({
        initialValues: {
            note: ''
        },
        validationSchema: Yup.object({
            note: Yup.string()
                .required('Il campo nota è richiesto'),
        }),
        onSubmit: async (values, { resetForm }) => {
            await creaNota(values.note)
            setSnackOpen(true)
            resetForm();
            props.onAfterSubmit()
        },
    });

    const creaNota = async (nota: string) => {
        await InterventiRepository.CreaNota({
            cliente: props.cliente,
            data: new Date(),
            descrizione: nota
        })
    }

    const [snackOpen, setSnackOpen] = useState(false)

    return <>
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    id="note"
                    name="note"
                    label="Nota"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.note && Boolean(formik.errors.note)}
                    helperText={formik.touched.note && formik.errors.note}

                    multiline
                    rows={3}
                />
            </Box>

            <Button color="primary" variant="contained" fullWidth type="submit">
                Salva
            </Button>
        </form>

        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)} >
            <Alert severity="success">
                <AlertTitle>OK</AlertTitle>
                Nota creata con successo
            </Alert>
        </Snackbar>
    </>
};

