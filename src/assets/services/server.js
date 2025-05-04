import express from 'express';
import cors from 'cors';
import fs from 'fs';
import mysql from 'mysql2';

const app = express();
const port = 3000;

// Leer archivo JSON con lugares turísticos
const rawData = fs.readFileSync('./cali.json');
const caliData = JSON.parse(rawData);

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cali',
  password: '',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Lugares Turísticos de Cali');
});

// Obtener todos los lugares turísticos
app.get('/api/lugares-turisticos', (req, res) => {
  res.json(caliData.lugares_turisticos);
});

// Obtener un lugar turístico por ID
app.get('/api/lugares-turisticos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const lugar = caliData.lugares_turisticos.find(l => l.id === id);
  if (lugar) {
    res.json(lugar);
  } else {
    res.status(404).json({ error: 'Lugar turístico no encontrado' });
  }
});

// Crear un nuevo lugar turístico
app.post('/api/lugares-turisticos', (req, res) => {
  const { nombre, descripcion, imagen, descripcionlarga } = req.body;
  const nuevoId = caliData.lugares_turisticos.length + 1;
  const nuevoLugar = {
    id: nuevoId,
    nombre,
    descripcion,
    imagen,
    descripcionlarga
  };
  caliData.lugares_turisticos.push(nuevoLugar);
  res.status(201).json(nuevoLugar);
});

// Actualizar un lugar turístico
app.put('/api/lugares-turisticos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen, descripcionlarga } = req.body;
  let lugar = caliData.lugares_turisticos.find(l => l.id === parseInt(id));

  if (!lugar) {
    return res.status(404).json({ message: 'Lugar turístico no encontrado' });
  }

  lugar = { ...lugar, nombre, descripcion, imagen, descripcionlarga };
  res.status(200).json(lugar);
});

// Eliminar un lugar turístico
app.delete('/api/lugares-turisticos/:id', (req, res) => {
  const { id } = req.params;
  const index = caliData.lugares_turisticos.findIndex(l => l.id === parseInt(id));

  if (index !== -1) {
    caliData.lugares_turisticos.splice(index, 1);
    return res.status(200).json({ message: 'Lugar turístico eliminado con éxito' });
  }

  return res.status(404).json({ message: 'Lugar turístico no encontrado' });
});

// --- Usuarios y Login (sin cambios importantes) ---

// Login de usuarios
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM credenciales WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
    if (result.length > 0) {
      const user = result[0];
      return res.status(200).json({
        id: user.id,
        email: user.email,
        rol: user.rol,
      });
    } else {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  });
});

// CRUD usuarios
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM credenciales', (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al obtener usuarios' });
    res.status(200).json(result);
  });
});

app.post('/api/usuarios', (req, res) => {
  const { email, password, rol } = req.body;
  db.query('INSERT INTO credenciales (email, password, rol) VALUES (?, ?, ?)',
    [email, password, rol],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error al crear usuario' });
      res.status(201).json({ message: 'Usuario creado con éxito' });
    }
  );
});

app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { email, password, rol } = req.body;
  db.query('UPDATE credenciales SET email = ?, password = ?, rol = ? WHERE id = ?',
    [email, password, rol, id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar usuario' });
      res.status(200).json({ message: 'Usuario actualizado con éxito' });
    }
  );
});

app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM credenciales WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar usuario' });
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  });
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
