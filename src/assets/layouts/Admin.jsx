import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Sectionmain = styled.header`
  background: rgb(255, 146, 146);
  background: radial-gradient(
    circle,
    rgba(255, 146, 146, 1) 0%,
    rgba(101, 136, 247, 1) 100%
  );
  height: 100vh;
  padding: 2rem;

  div {
    backdrop-filter: blur(3px);
    height: 70%;
    width: 100%;
    color: #000000;
  }
`;

export function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ email: '', password: '', rol: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Obtener todos los usuarios
  const fetchUsuarios = async () => {
    const response = await fetch('http://localhost:3000/api/usuarios');
    const data = await response.json();
    setUsuarios(data);
  };

  // Manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Crear o actualizar un usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Actualizar usuario
      const response = await fetch(`http://localhost:3000/api/usuarios/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setEditingId(null);
        fetchUsuarios();
        setFormData({ email: '', password: '', rol: '' });
      }
    } else {
      // Crear usuario
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchUsuarios();
        setFormData({ email: '', password: '', rol: '' });
      }
    }
  };

  // Eliminar un usuario
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchUsuarios();
    }
  };

  // Manejar la edición de un usuario
  const handleEdit = (usuario) => {
    setFormData({ email: usuario.email, password: usuario.password, rol: usuario.rol });
    setEditingId(usuario.id);
  };

  return (
    <Sectionmain>
      <div>
        <Typography variant="h3" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                type="password"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Rol"
                variant="outlined"
                fullWidth
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editingId ? 'Actualizar Usuario' : 'Crear Usuario'}
              </Button>
            </Grid>
          </Grid>
        </form>

        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Correo</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(usuario)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(usuario.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Sectionmain>
  );
}
