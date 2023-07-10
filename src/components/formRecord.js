import * as React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createRecord } from "../redux/actions";

export default function FormRecord(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      link: "",
      id_junta: props.id_junta,
      submit: "",
    },
    validationSchema: Yup.object({
      link: Yup.string().max(255).required("El link es requerido"),
      // id_junta: Yup.string().max(255).required("Id es requerido"),
      
    }),
    onSubmit: async (values, helpers) => {
      try {
        dispatch(createRecord(values));
        alert("Link de grabacion guardada");
        window.location.reload() /// CERRAR MODAL
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style} noValidate autoComplete="off">
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h6">Nueva grabacion</Typography>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
        <TextField
            required
            error={!!(formik.touched.link && formik.errors.link)}
            fullWidth
            helperText={formik.touched.link && formik.errors.link}
            label="Link de grabacion"
            name="link"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.link}
          />
          
          
          
          {/* <TextField
            error={!!(formik.touched.id_junta && formik.errors.id_junta)}
            fullWidth
            helperText={formik.touched.id_junta && formik.errors.id_junta}
            label="Id de junta"
            name="id_junta"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.id_junta}
          /> */}
        </Stack>
        {formik.errors.submit && (
          <Typography color="error" sx={{ mt: 3 }} variant="body2">
            {formik.errors.submit}
          </Typography>
        )}
        <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
          Guardar
        </Button>
      </form>
    </Box>
  );
}
