const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @swagger
 * /herramientas:
 *   get:
 *     summary: Obtener todas las herramientas
 *     description: Devuelve una lista de todas las herramientas disponibles.
 *     responses:
 *       200:
 *         description: Lista de herramientas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_herramienta:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   estado:
 *                     type: string
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM herramienta', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

/**
 * @swagger
 * /herramientas:
 *   post:
 *     summary: Crear una nueva herramienta
 *     description: Crea una nueva herramienta proporcionando su nombre y estado (ocupada o desocupada).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - estado
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Taladro"
 *               estado:
 *                 type: string
 *                 enum: [ocupada, desocupada]
 *                 example: "desocupada"
 *     responses:
 *       201:
 *         description: Herramienta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_herramienta:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 estado:
 *                   type: string
 */
router.post('/', (req, res) => {
    const {codigo, nombre, estado } = req.body;
    pool.query(
        'INSERT INTO herramienta (codigo_herramienta, nombre_herramienta, estado) VALUES ($1, $2, $3) RETURNING *',
        [codigo, nombre, estado],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /herramientas/{id}:
 *   put:
 *     summary: Actualizar una herramienta
 *     description: Actualiza los datos de una herramienta existente usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la herramienta
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
 *               - estado
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Taladro Eléctrico"
 *               estado:
 *                 type: string
 *                 enum: [ocupada, desocupada]
 *                 example: "ocupada"
 *     responses:
 *       200:
 *         description: Herramienta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_herramienta:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 estado:
 *                   type: string
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    pool.query(
        'UPDATE herramienta SET nombre_herramienta=$1, estado_herramienta=$2 WHERE id_herramienta=$3 RETURNING *',
        [nombre, estado, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /herramientas/{id}:
 *   delete:
 *     summary: Eliminar una herramienta
 *     description: Elimina una herramienta de la base de datos por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la herramienta a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Herramienta eliminada exitosamente
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM herramienta WHERE id_herramienta=$1', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

module.exports = router;
