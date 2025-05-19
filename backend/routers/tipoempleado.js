const express = require('express');
const router = express.Router();
const pool = require('../db');

const tiposPredefinidos = ['líder-jefe', 'mantenimiento'];

/**
 * @swagger
 * tags:
 *   name: TipoEmpleado
 *   description: Operaciones relacionadas con los tipos de empleados
 */

/**
 * @swagger
 * /tipo_empleado:
 *   get:
 *     summary: Obtener todos los tipos de empleados
 *     tags: [TipoEmpleado]
 *     description: Devuelve una lista de todos los tipos de empleados, incluyendo los predefinidos y los que se agreguen dinámicamente.
 *     responses:
 *       200:
 *         description: Lista de tipos de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tipo_empleado:
 *                     type: integer
 *                   nombre_tipo:
 *                     type: string
 *                     example: "líder-jefe"
 */
router.get('/', (req, res) => {
    pool.query('SELECT * FROM tipo_empleado', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results.rows);
    });
});

/**
 * @swagger
 * /tipo_empleado:
 *   post:
 *     summary: Crear un nuevo tipo de empleado
 *     tags: [TipoEmpleado]
 *     description: Permite crear un nuevo tipo de empleado. Se pueden agregar tipos distintos a los predefinidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_tipo
 *             properties:
 *               nombre_tipo:
 *                 type: string
 *                 example: "supervisor"
 *     responses:
 *       201:
 *         description: Tipo de empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_tipo_empleado:
 *                   type: integer
 *                 nombre_tipo:
 *                   type: string
 */
router.post('/', (req, res) => {
    const { nombre_tipo } = req.body;
    console.log(req.body,"*****************")
    if (!nombre_tipo) {
        return res.status(400).json({ error: 'El tipo de empleado es requerido' });
    }
   
    // Verificación para evitar crear tipos predefinidos
    if (!tiposPredefinidos.includes(nombre_tipo.toLowerCase().trim())) {
        return res.status(400).json({ error: `El tipo de empleado "${nombre_tipo}" es predefinido y no puede ser creado` });
    }
    
    pool.query(
        'INSERT INTO tipo_empleado (nombre_tipo) VALUES ($1) RETURNING *',
        [nombre_tipo],
        (err, results) => {
            console.log(results, err)
            //if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /tipo_empleado/{id}:
 *   put:
 *     summary: Actualizar un tipo de empleado
 *     tags: [TipoEmpleado]
 *     description: Actualiza el nombre de un tipo de empleado por su ID. Se pueden usar tipos predefinidos o personalizados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de empleado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_tipo
 *             properties:
 *               nombre_tipo:
 *                 type: string
 *                 example: "analista"
 *     responses:
 *       200:
 *         description: Tipo de empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_tipo_empleado:
 *                   type: integer
 *                 nombre_tipo:
 *                   type: string
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_tipo } = req.body;

    if (!nombre_tipo) {
        return res.status(400).json({ error: 'El tipo de empleado es requerido' });
    }

    // Verificación para evitar actualizar a un tipo predefinido
    if (tiposPredefinidos.includes(nombre_tipo.toLowerCase())) {
        return res.status(400).json({ error: `El tipo de empleado "${nombre_tipo}" es predefinido y no puede ser actualizado` });
    }

    pool.query(
        'UPDATE tipo_empleado SET nombre_tipo=$1 WHERE id_tipo_empleado=$2 RETURNING *',
        [nombre_tipo, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results.rows[0]);
        }
    );
});

/**
 * @swagger
 * /tipo_empleado/{id}:
 *   delete:
 *     summary: Eliminar un tipo de empleado
 *     tags: [TipoEmpleado]
 *     description: Elimina un tipo de empleado por su ID, excepto si es un tipo predefinido como "líder-jefe" o "mantenimiento".
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de empleado a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tipo de empleado eliminado exitosamente
 *       400:
 *         description: No se puede eliminar un tipo de empleado predefinido
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    pool.query('SELECT nombre_tipo FROM tipo_empleado WHERE id_tipo_empleado=$1', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.rows.length === 0) return res.status(404).json({ error: 'Tipo de empleado no encontrado' });

        const tipoEmpleado = results.rows[0];

        if (tiposPredefinidos.includes(tipoEmpleado.nombre_tipo)) {
            return res.status(400).json({ error: `No se puede eliminar el tipo de empleado predefinido: ${tipoEmpleado.nombre_tipo}` });
        }

        pool.query('DELETE FROM tipo_empleado WHERE id_tipo_empleado=$1', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(204).send();
        });
    });
});

module.exports = router;
