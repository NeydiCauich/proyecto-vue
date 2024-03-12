const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configura la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'neydi0982',
  database: 'employee',
});
// Conéctate a la base de datos
connection.connect(err => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos exitosa');
    }
  })


// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para agregar un nuevo empleado
app.post('/agregar-empleado', (req, res) => {
  const { nombre, correo } = req.body;

  const query = 'INSERT INTO empleados (nombre, correo) VALUES (?, ?)';
  connection.query(query, [nombre, correo], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al agregar el empleado');
    } else {
      res.status(200).send('Empleado agregado correctamente');
    }
  });
});



app.get('/datos', (req, res) => {
    // Lógica para obtener datos desde la base de datos o cualquier otra fuente
    const datos = { mensaje: 'Estos son los datos desde el servidor' };
    res.json(datos);
  });
  
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
