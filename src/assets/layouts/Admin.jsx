import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, MenuItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Sectionmain = styled.header`
  background: rgb(255, 255, 255);
  min-height: 100vh;
  padding: 2rem;
  overflow-x: hidden;
  div {
    backdrop-filter: blur(3px);
    width: 99%;
    color: #000000;
  }
`;

const Volver = styled.span`
  background: rgb(253, 94, 94);
  height: 30px !important;
  width: 100px !important;
  display: flex;
  margin: 20px 0;
  border-radius: 15px;
  align-items: center;
  transition: all 0.5m;
  a {
    color: #ffffff;
    cursor: pointer;
    padding: 10px;
    text-decoration: none;
  }
  &:hover{
      scale: 1.2;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 4rem;
  margin-bottom: 2rem;
`;

export function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ email: '', password: '', rol: '' });
  const [editingId, setEditingId] = useState(null);
  const [pescados, setPescados] = useState([]);
  const [ventas, setVentas] = useState([]); // Simulación de ventas
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPescadoForm, setShowPescadoForm] = useState(false);
  const [pescadoForm, setPescadoForm] = useState({
    nombre: '',
    tipo: '',
    descripcion_larga: '',
    precio: '',
    imagen: ''
  });
  const [editingPescadoId, setEditingPescadoId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
    fetchPescados();
    fetchVentas();
  }, []);

  // Obtener todos los usuarios
  const fetchUsuarios = async () => {
    const response = await fetch('http://localhost:3000/api/usuarios');
    const data = await response.json();
    setUsuarios(data);
  };

  // Obtener todos los pescados
  const fetchPescados = async () => {
    const response = await fetch('http://localhost:3000/api/pescados');
    const data = await response.json();
    setPescados(data);
  };

  // Simulación de ventas (puedes reemplazar por tu endpoint real)
  const fetchVentas = async () => {
    // Simulación: cada venta tiene usuarioId, pescadoId, cantidad, total
    setVentas([
      { usuarioId: 1, pescadoId: 1, cantidad: 2, total: 200 },
      { usuarioId: 2, pescadoId: 2, cantidad: 1, total: 120 },
      { usuarioId: 1, pescadoId: 3, cantidad: 3, total: 300 },
      { usuarioId: 3, pescadoId: 1, cantidad: 1, total: 100 },
      // ...agrega más si quieres
    ]);
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
      window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Manejar la edición de un pescado
  const handleEditPescado = (pescado) => {
    setPescadoForm({
      nombre: pescado.nombre,
      tipo: pescado.tipo,
      descripcion: pescado.descripcion_larga_larga,
      precio: pescado.precio,
      imagen: pescado.imagen
      
    });
    setEditingPescadoId(pescado.id);
    setShowPescadoForm(true);
    setShowUserForm(false);

      window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --- Estadísticas y datos para gráficas ---
  const totalUsuarios = usuarios.length;
  const totalPescados = pescados.length;
  const totalVentas = ventas.reduce((acc, v) => acc + v.total, 0);

  // Gráfica: Pescados por tipo
  const pescadosPorTipo = pescados.reduce((acc, p) => {
    acc[p.tipo] = (acc[p.tipo] || 0) + 1;
    return acc;
  }, {});
  const tiposPescado = Object.keys(pescadosPorTipo);
  const cantidadPorTipo = Object.values(pescadosPorTipo);

  // Gráfica: Usuarios por rol
  const usuariosPorRol = usuarios.reduce((acc, u) => {
    acc[u.rol] = (acc[u.rol] || 0) + 1;
    return acc;
  }, {});
  const roles = Object.keys(usuariosPorRol);
  const cantidadPorRol = Object.values(usuariosPorRol);

  // Gráfica: Ventas por pescado
  const ventasPorPescado = pescados.map(p => {
    const ventasDeEste = ventas.filter(v => v.pescadoId === p.id).reduce((acc, v) => acc + v.cantidad, 0);
    return ventasDeEste;
  });

  return (
    <Sectionmain>
      <div>
        <Typography variant="h3" gutterBottom>
          Dashboard Administrativo
        </Typography>
        <Volver> <Link to="/">Ir a tienda</Link></Volver>


        {/* Botones para mostrar formularios */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem 0"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowUserForm((v) => !v);
              setShowPescadoForm(false);
            }}
          >
            {showUserForm ? "Cerrar formulario usuario" : "Agregar usuario"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setShowPescadoForm((v) => !v);
              setShowUserForm(false);
            }}
          >
            {showPescadoForm ? "Cerrar formulario pescado" : "Agregar pescado"}
          </Button>
        </Box>

        {/* Formulario de usuario */}
        {showUserForm && (
          <Paper elevation={4} sx={{ p: 3, mb: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h5" gutterBottom>Agregar/Editar Usuario</Typography>
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
                    select
                    label="Rol"
                    variant="outlined"
                    fullWidth
                    name="rol"
                    value={formData.rol}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">Selecciona un rol</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="usuario">Usuario</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {editingId ? 'Actualizar Usuario' : 'Crear Usuario'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}

        {/* Formulario de pescado */}
        {showPescadoForm && (
          <Paper elevation={4} sx={{ p: 3, mb: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h5" gutterBottom>Agregar Pescado</Typography>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (editingPescadoId) {
                  // Editar pescado
                  const response = await fetch(`http://localhost:3000/api/pescados/${editingPescadoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pescadoForm),
                  });
                  if (response.ok) {
                    setShowPescadoForm(false);
                    setPescadoForm({ nombre: '', tipo: '', descripcion_larga: '', precio: '', imagen: '' });
                    setEditingPescadoId(null);
                    fetchPescados();
                  }
                } else {
                  // Crear pescado
                  const response = await fetch('http://localhost:3000/api/pescados', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pescadoForm),
                  });
                  if (response.ok) {
                    setShowPescadoForm(false);
                    setPescadoForm({ nombre: '', tipo: '', descripcion_larga: '', precio: '', imagen: '' });
                    fetchPescados();
                  }
                }
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    name="nombre"
                    value={pescadoForm.nombre}
                    onChange={e => setPescadoForm(f => ({ ...f, nombre: e.target.value }))}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Tipo"
                    variant="outlined"
                    fullWidth
                    name="tipo"
                    value={pescadoForm.tipo}
                    onChange={e => setPescadoForm(f => ({ ...f, tipo: e.target.value }))}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    name="descripcion_larga"
                    value={pescadoForm.descripcion_larga}
                    onChange={e => setPescadoForm(f => ({ ...f, descripcion_larga: e.target.value }))}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Precio"
                    variant="outlined"
                    fullWidth
                    name="precio"
                    type="number"
                    value={pescadoForm.precio}
                    onChange={e => setPescadoForm(f => ({ ...f, precio: e.target.value }))}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="URL Imagen"
                    variant="outlined"
                    fullWidth
                    name="imagen"
                    value={pescadoForm.imagen}
                    onChange={e => setPescadoForm(f => ({ ...f, imagen: e.target.value }))}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Agregar Pescado
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}





        {/* Estadísticas rápidas */}
        <DashboardGrid>
          <Paper elevation={3} style={{ padding: 24 }}>
            <Typography variant="h5">Usuarios registrados</Typography>
            <Typography variant="h2" color="primary">{totalUsuarios}</Typography>
          </Paper>
          <Paper elevation={3} style={{ padding: 24 }}>
            <Typography variant="h5">Productos de pescado</Typography>
            <Typography variant="h2" color="primary">{totalPescados}</Typography>
          </Paper>
          <Paper elevation={3} style={{ padding: 24 }}>
            <Typography variant="h5">Total ventas (simulado)</Typography>
            <Typography variant="h2" color="primary">${totalVentas}</Typography>
          </Paper>
        </DashboardGrid>

        {/* Gráficas */}
        <DashboardGrid>
          <Paper elevation={3} style={{ padding: 24 }}>
            <Typography variant="h6">Pescados por tipo</Typography>
            <Bar
              data={{
                labels: tiposPescado,
                datasets: [{
                  label: 'Cantidad',
                  data: cantidadPorTipo,
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                }]
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </Paper>
          <Paper elevation={3} style={{ padding: 24 }}>
            <Typography variant="h6">Usuarios por rol</Typography>
            <Pie
              data={{
                labels: roles,
                datasets: [{
                  data: cantidadPorRol,
                  backgroundColor: ['#1976d2', '#ff9800', '#4caf50', '#e91e63'],
                }]
              }}
              options={{ responsive: true }}
            />
          </Paper>
          <Paper elevation={3} style={{ padding: 24 }}>
            <Typography variant="h6">Ventas por pescado</Typography>
            <Doughnut
              data={{
                labels: pescados.map(p => p.nombre),
                datasets: [{
                  data: ventasPorPescado,
                  backgroundColor: [
                    '#1976d2', '#ff9800', '#4caf50', '#e91e63', '#00bcd4', '#ffeb3b', '#9c27b0'
                  ],
                }]
              }}
              options={{ responsive: true }}
            />
          </Paper>
        </DashboardGrid>


        {/* Gestión de usuarios */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Gestión de Usuarios
        </Typography>
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

        {/* Gestión de pescados */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Gestión de Pescados
        </Typography>
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pescados.map((pescado) => (
                <TableRow key={pescado.id}>
                  <TableCell>{pescado.nombre}</TableCell>
                  <TableCell>{pescado.tipo}</TableCell>
                  <TableCell>{pescado.descripcion_larga}</TableCell>
                  <TableCell>${pescado.precio}</TableCell>
                  <TableCell>
                    <img src={pescado.imagen} alt={pescado.nombre} style={{ width: 60, borderRadius: 8 }} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditPescado(pescado)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={async () => {
                        if (window.confirm("¿Eliminar este pescado?")) {
                          await fetch(`http://localhost:3000/api/pescados/${pescado.id}`, { method: "DELETE" });
                          fetchPescados();
                        }
                      }}
                    >
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
