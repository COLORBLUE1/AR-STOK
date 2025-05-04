import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const SectionMain = styled.section`
  background: radial-gradient(circle, rgba(255,146,146,1) 0%, rgba(101,136,247,1) 100%);
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  div {
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    padding: 2rem;
    max-width: 1200px;
    color: #fff;
  }

  h3 {
    font-weight: bold;
    color: white;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export function LugaresTuristicosAdmin() {
  const [lugares, setLugares] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLugares();
  }, []);

  const fetchLugares = async () => {
    const response = await fetch("http://localhost:3000/api/lugares-turisticos");
    const data = await response.json();
    setLugares(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:3000/api/lugares-turisticos/${editingId}`
      : "http://localhost:3000/api/lugares-turisticos";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchLugares();
      setFormData({ nombre: "", descripcion: "", imagen: "" });
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/lugares-turisticos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchLugares();
    }
  };

  const handleEdit = (lugar) => {
    setFormData({
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      imagen: lugar.imagen,
    });
    setEditingId(lugar.id);
  };

  return (
    <SectionMain>
      <div>
        <Typography variant="h3">Gestión de Lugares Turísticos</Typography>

        <form onSubmit={handleSubmit}>
          <Paper elevation={3} style={{ padding: "2rem", marginBottom: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Nombre del lugar"
                  variant="outlined"
                  fullWidth
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Imagen (URL)"
                  variant="outlined"
                  fullWidth
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {editingId ? "Actualizar Lugar" : "Crear Lugar Turístico"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>

        <TableContainer style={{ width: "auto" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lugares.map((lugar) => (
                <TableRow key={lugar.id}>
                  <TableCell>{lugar.nombre}</TableCell>
                  <TableCell>{lugar.descripcion}</TableCell>
                  <TableCell>
                    <img src={lugar.imagen} alt={lugar.nombre} width="100" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(lugar)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(lugar.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </SectionMain>
  );
}
