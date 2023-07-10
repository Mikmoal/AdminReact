import * as React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../redux/actions";

export default function FormTask() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      fecha_entrega: "",
      status: "",
      id_junta: "",
      encargado: "",
      submit: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().max(255).required("Nombre es requerido"),
      descripcion: Yup.string().max(255).required(" es requerido"),
      fecha_entrega: Yup.date().required("La fecha es requerida"),
      status: Yup.string().max(255).required(" es requerido"),
      id_junta: Yup.string().max(255).required(" es requerido"),
      encargado: Yup.string().max(255).required(" es requerido"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        dispatch(createTask(values));
        alert("Tarea creada");
        //router.push(`/resumen/${values.id_junta}`); /// CERRAR MODAL
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
        <Typography variant="h6">Nueva Minuta</Typography>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            disabled
            fullWidth
            helperText={formik.touched.nombre && formik.errors.nombre}
            label="Nombre"
            name="nombre"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.nombre}
          />
          <TextField
            error={!!(formik.touched.descripcion && formik.errors.descripcion)}
            fullWidth
            helperText={formik.touched.descripcion && formik.errors.descripcion}
            label="Descripcion"
            name="descripcion"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.descripcion}
          />
          <TextField
            error={!!(formik.touched.fecha_entrega && formik.errors.fecha_entrega)}
            fullWidth
            helperText={formik.touched.fecha_entrega && formik.errors.fecha_entrega}
            label="Fecha de entrega"
            name="fecha_entrega"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.fecha_entrega}
          />
          <TextField
            error={!!(formik.touched.status && formik.errors.status)}
            fullWidth
            helperText={formik.touched.status && formik.errors.status}
            label="Status"
            name="status"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.status}
          />
          <TextField
            disabled
            fullWidth
            helperText={formik.touched.id_junta && formik.errors.id_junta}
            label="Id de junta"
            name="id_junta"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.id_junta}
          />
          <TextField
            error={!!(formik.touched.encargado && formik.errors.encargado)}
            fullWidth
            helperText={formik.touched.encargado && formik.errors.encargado}
            label="Encargado"
            name="encargado"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.encargado}
          />
          <TextField required id="outlined-required" label="Link de evidencia" />
          <TextField required id="outlined-required" label="Link de grabacion" />
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
