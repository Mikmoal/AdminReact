import * as React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createJunta } from "../redux/actions";

export default function FormJuta() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      integrantes: "",
      fecha_ejecucion: "",
      hora_inicio: "",
      hora_fin: "",
      periodicidad: "",
      sala_juntas: "",
      submit: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().max(255).required("Nombre es requerido"),
      integrantes: Yup.string().max(255).required("Integrantes es requerido"),
      fecha_ejecucion: Yup.date().required("La fecha es requerida"),
      hora_inicio: Yup.string().max(255).required("La hora de inicio es requerido"),
      hora_fin: Yup.string().max(255).required("La hora final es requerido"),
      periodicidad: Yup.string().max(255).required("Periodicidad es requerido"),
      sala_juntas: Yup.string().max(255).required("Escoger una sala de juntas"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        dispatch(createJunta(values));
        alert("Junta created");
        router.push("/resumen"); /// CERRAR MODAL
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
        <Typography variant="h6">Nueva Junta</Typography>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={!!(formik.touched.nombre && formik.errors.nombre)}
            fullWidth
            helperText={formik.touched.nombre && formik.errors.nombre}
            label="Nombre"
            name="nombre"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.nombre}
          />
          <TextField
            error={!!(formik.touched.integrantes && formik.errors.integrantes)}
            fullWidth
            helperText={formik.touched.integrantes && formik.errors.integrantes}
            label="Integrantes"
            name="integrantes"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.integrantes}
          />
          <TextField
            error={!!(formik.touched.fecha_ejecucion && formik.errors.fecha_ejecucion)}
            fullWidth
            helperText={formik.touched.fecha_ejecucion && formik.errors.fecha_ejecucion}
            label="Cuando"
            name="fecha_ejecucion"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.fecha_ejecucion}
          />
          <TextField
            error={!!(formik.touched.hora_inicio && formik.errors.hora_inicio)}
            fullWidth
            helperText={formik.touched.hora_inicio && formik.errors.hora_inicio}
            label="Hora inicio"
            name="hora_inicio"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.hora_inicio}
          />
          <TextField
            error={!!(formik.touched.hora_fin && formik.errors.hora_fin)}
            fullWidth
            helperText={formik.touched.hora_fin && formik.errors.hora_fin}
            label="Hora fin"
            name="hora_fin"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.hora_fin}
          />
          <TextField
            error={!!(formik.touched.periodicidad && formik.errors.periodicidad)}
            fullWidth
            helperText={formik.touched.periodicidad && formik.errors.periodicidad}
            label="Periodicidad"
            name="periodicidad"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.periodicidad}
          />
          <TextField
            error={!!(formik.touched.sala_juntas && formik.errors.sala_juntas)}
            fullWidth
            helperText={formik.touched.sala_juntas && formik.errors.sala_juntas}
            label="Sala de juntas"
            name="sala_juntas"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.sala_juntas}
          />
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
