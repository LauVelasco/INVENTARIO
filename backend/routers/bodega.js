const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @swagger
 * /bodegas:
 *   get:
 *     summary: Obtener todas las bodegas
 *     description: Devuelve una lista de las bodegas disponibles (predefinidas).
 *     responses:
 *       200:
 *         description: Lista de bodegas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_bodega:
 *                     type: integer
 *                   ubicacion:
 *                     type: string
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM bodega ORDER BY id_bodega', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

/**
 * @swagger
 * /bodegas:
 *   post:
 *     summary: Crear una nueva bodega
 *     description: Esta ruta permite crear una nueva bodega proporcionando el nombre de la ubicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ubicacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bodega creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_bodega:
 *                   type: integer
 *                 ubicacion:
 *                   type: string
 */
router.post('/', (req, res) => {
    const {id_bodega, ubicacion } = req.body;
    pool.query(
        'INSERT INTO bodega (id_bodega, ubicacion) VALUES ($1, $2) RETURNING *',
        [id_bodega, ubicacion],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /bodegas/{id}:
 *   put:
 *     summary: Actualizar una bodega existente
 *     description: Permite actualizar la ubicación de una bodega por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la bodega a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ubicacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bodega actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_bodega:
 *                   type: integer
 *                 ubicacion:
 *                   type: string
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { ubicacion } = req.body;
    pool.query(
        'UPDATE bodega SET ubicacion=$1 WHERE id_bodega=$2 RETURNING *',
        [ubicacion, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.rows.length === 0) {
                return res.status(404).json({ error: 'Bodega no encontrada' });
            }
            res.json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /bodegas/{id}:
 *   delete:
 *     summary: Eliminar una bodega existente
 *     description: Esta ruta elimina una bodega por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la bodega a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Bodega eliminada exitosamente
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM bodega WHERE id_bodega=$1', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Bodega no encontrada' });
        }
        res.status(204).send();
    });
});

module.exports = router;
