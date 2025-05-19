const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @swagger
 * /empleado:
 *   get:
 *     summary: Obtener todos los empleados
 *     description: Devuelve una lista de todos los empleados registrados.
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_empleado:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 *                   cedula:
 *                     type: string
 *                   id_tipo_empleado:
 *                     type: integer
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM empleado', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

/**
 * @swagger
 * /empleado:
 *   post:
 *     summary: Crear un nuevo empleado
 *     description: Crea un nuevo empleado con nombre, apellido, cédula e ID de tipo de empleado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - cedula
 *               - id_tipo_empleado
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Carlos"
 *               apellido:
 *                 type: string
 *                 example: "García"
 *               cedula:
 *                 type: string
 *                 example: "123456789"
 *               id_tipo_empleado:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_empleado:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 cedula:
 *                   type: string
 *                 id_tipo_empleado:
 *                   type: integer
 */
router.post('/', (req, res) => {
    const { nombre, apellido, cedula, id_tipo_empleado } = req.body;

    // Validación básica
    if (!nombre || !apellido || !cedula || !id_tipo_empleado) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    pool.query(
        'INSERT INTO empleado (nombre, apellido, cedula, id_tipo_empleado) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, apellido, cedula, id_tipo_empleado],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /empleado/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     description: Actualiza los datos de un empleado existente usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - cedula
 *               - id_tipo_empleado
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Laura"
 *               apellido:
 *                 type: string
 *                 example: "Martínez"
 *               cedula:
 *                 type: string
 *                 example: "987654321"
 *               id_tipo_empleado:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, id_tipo_empleado } = req.body;

    if (!nombre || !apellido || !cedula || !id_tipo_empleado) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    pool.query(
        'UPDATE empleado SET nombre=$1, apellido=$2, cedula=$3, id_tipo_empleado=$4 WHERE id_empleado=$5 RETURNING *',
        [nombre, apellido, cedula, id_tipo_empleado, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.rows.length === 0) {
                return res.status(404).json({ error: "Empleado no encontrado" });
            }
            res.json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /empleado/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     description: Elimina un empleado de la base de datos por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM empleado WHERE id_empleado=$1', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.rowCount === 0) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }
        res.status(204).send();
    });
});

module.exports = router;
