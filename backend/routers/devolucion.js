const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @swagger
 * /devolucion:
 *   get:
 *     summary: Obtener todas las devoluciones
 *     description: Devuelve una lista de todas las devoluciones almacenadas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de devoluciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Devolucion'
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM devolucion', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

/**
 * @swagger
 * /devolucion:
 *   post:
 *     summary: Crear una nueva devolución
 *     description: Registra una nueva devolución vinculada a un préstamo existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DevolucionInput'
 *     responses:
 *       201:
 *         description: Devolución creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Devolucion'
 *       404:
 *         description: Préstamo no encontrado
 */
router.post('/', (req, res) => {
    const { id_prestamo, fecha_devolucion, hora_devolucion, descripcion } = req.body;

    pool.query('SELECT * FROM prestamo WHERE id_prestamo = $1', [id_prestamo], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Préstamo no encontrado' });
        }

        pool.query(
            'INSERT INTO devolucion (id_prestamo, fecha_devolucion, hora_devolucion, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_prestamo, fecha_devolucion, hora_devolucion, descripcion],
            (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(results.rows[0]);
            }
        );
    });
});

/**
 * @swagger
 * /devolucion/{id}:
 *   put:
 *     summary: Actualizar una devolución
 *     description: Actualiza los datos de una devolución existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la devolución a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DevolucionInput'
 *     responses:
 *       200:
 *         description: Devolución actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Devolucion'
 *       404:
 *         description: Devolución no encontrada
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { fecha_devolucion, hora_devolucion, descripcion } = req.body;

    pool.query('SELECT * FROM devolucion WHERE id_devolucion = $1', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Devolución no encontrada' });
        }

        pool.query(
            'UPDATE devolucion SET fecha_devolucion=$1, hora_devolucion=$2, descripcion=$3 WHERE id_devolucion=$4 RETURNING *',
            [fecha_devolucion, hora_devolucion, descripcion, id],
            (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(results.rows[0]);
            }
        );
    });
});

/**
 * @swagger
 * /devolucion/{id}:
 *   delete:
 *     summary: Eliminar una devolución
 *     description: Elimina una devolución por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la devolución a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Devolución eliminada exitosamente
 *       404:
 *         description: Devolución no encontrada
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM devolucion WHERE id_devolucion=$1', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Devolución no encontrada' });
        }

        pool.query('DELETE FROM devolucion WHERE id_devolucion=$1', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(204).send();
        });
    });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Devolucion:
 *       type: object
 *       properties:
 *         id_devolucion:
 *           type: integer
 *         id_prestamo:
 *           type: integer
 *         fecha_devolucion:
 *           type: string
 *           format: date
 *         hora_devolucion:
 *           type: string
 *           format: time
 *         descripcion:
 *           type: string
 *     DevolucionInput:
 *       type: object
 *       required:
 *         - id_prestamo
 *         - fecha_devolucion
 *         - hora_devolucion
 *         - descripcion
 *       properties:
 *         id_prestamo:
 *           type: integer
 *         fecha_devolucion:
 *           type: string
 *           format: date
 *         hora_devolucion:
 *           type: string
 *           format: time
 *         descripcion:
 *           type: string
 *           example: "La herramienta fue devuelta con rayones menores"
 */

module.exports = router;
