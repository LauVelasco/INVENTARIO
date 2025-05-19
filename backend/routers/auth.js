const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ruta de login
router.post('/login', async (req, res) => {
    console.log("Llega la solicitud de login", req.body);
    
    const { cedula, id_tipo_empleado } = req.body;

    if (!cedula || !id_tipo_empleado) {
        return res.status(400).json({ error: 'Faltan parámetros: cedula o id_tipo_empleado' });
    }

    try {

        const result = await pool.query(
            'SELECT * FROM empleado WHERE id_tipo_empleado = $1 AND cedula = $2',
            [id_tipo_empleado, cedula]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log("Resultados de la consulta:", result.rows);
        

        res.json(result.rows[0]);  

    } catch (err) {

        console.log("Error en la consulta:", err);
        res.status(500).json({ error: 'Error al consultar la base de datos', details: err.message });
    }
});

module.exports = router;
