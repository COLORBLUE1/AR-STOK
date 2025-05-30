import express from 'express';
import cors from 'cors';
import fs from 'fs';
import mysql from 'mysql2';

const app = express();
const port = 3000;

// Leer archivo JSON con pescados
const rawData = fs.readFileSync('./pescados.json');
const pescadosData = JSON.parse(rawData);

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'GranjaBD',
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
  res.send('Bienvenido a la API de pescados');
});

// Obtener todos los pescados
app.get('/api/pescados', (req, res) => {
  res.json(pescadosData.productos_pescado);
});

// Obtener un pescados por ID
app.get('/api/pescados/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pescados = pescadosData.productos_pescado.find(l => l.id === id);
  if (pescados) {
    res.json(pescados);
  } else {
    res.status(404).json({ error: 'pescados no encontrado' });
  }
});

// Crear un nuevo 
app.post('/api/pescados', (req, res) => {
  const { nombre, descripcion, imagen, descripcionlarga } = req.body;
  const nuevoId = pescadosData.productos_pescado.length + 1;
  const nuevoLugar = {
    id: nuevoId,
    nombre,
    descripcion,
    imagen,
    descripcionlarga
  };
  pescadosData.productos_pescado.push(nuevoLugar);
  res.status(201).json(nuevoLugar);
});

// Actualizar un pescados
app.put('/api/pescados/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen, descripcionlarga } = req.body;
  let lugar = pescadosData.productos_pescado.find(l => l.id === parseInt(id));

  if (!lugar) {
    return res.status(404).json({ message: 'pescados no encontrado' });
  }

  lugar = { ...lugar, nombre, descripcion, imagen, descripcionlarga };
  res.status(200).json(lugar);
});

// Eliminar un pescados
app.delete('/api/pescados/:id', (req, res) => {
  const { id } = req.params;
  const index = pescadosData.productos_pescado.findIndex(l => l.id === parseInt(id));

  if (index !== -1) {
    pescadosData.productos_pescado.splice(index, 1);
    return res.status(200).json({ message: 'pescados eliminado con éxito' });
  }

  return res.status(404).json({ message: 'pescados no encontrado' });
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

// Endpoint para registro de usuario
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const rol = 'usuario'; 
  if (!email || !password || !rol) {
    return res.status(400).json({ message: 'Faltan datos para el registro' });
  }
  // Verifica si el usuario ya existe
  db.query('SELECT * FROM credenciales WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    if (result.length > 0) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }
    // Inserta el nuevo usuario
    db.query(
      'INSERT INTO credenciales (email, password, rol) VALUES (?, ?, ?)',
      [email, password, rol],
      (err) => {
        if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      }
    );
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
