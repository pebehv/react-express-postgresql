const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
// Configura la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'real_estate_management',
    password: '123456',
    port: 5432,
});

// Ruta para leer datos
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "User"');
        res.json(result.rows); // Envía los datos como respuesta JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la consulta a la base de datos');
    }
});

app.put('/users/:id', async (req, res) => {
    console.log("App put User",req.body)
    const { id } = req.params;
    const { name, email, password, isactive } = req.body;
    try {
        const result = await pool.query(
            'UPDATE "User" SET name = $1, email = $2, password = $3, isactive = $4, updatedAt = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [name, email, password, isactive, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el usuario');
    }
});

app.post('/users', async (req, res) => {
    console.log("App post* User", req.body);
    const { name, email, password, isactive } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !password || isactive === undefined) {
        return res.status(400).send('Faltan datos en el cuerpo de la solicitud');
    }

    try {
        const result = await pool.query(
            'INSERT INTO "User" (name, email, password, isactive) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, password, isactive]
        );
        res.status(201).json(result.rows[0]); // Devuelve el usuario insertado
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al insertar el usuario');
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM "User" WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.json(result.rows[0]); // Devuelve el usuario eliminado
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el usuario');
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

