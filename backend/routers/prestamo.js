const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * @swagger
 * /api/prestamo:
 *   get:
 *     summary: Obtener todos los préstamos
 *     description: Devuelve una lista de todos los préstamos registrados.
 *     responses:
 *       200:
 *         description: Lista de préstamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prestamo'
 */
router.get('/', (req, res) => {
    let devoluciones = []
    pool.query(
        'SELECT p.id_prestamo, e.nombre, e.cedula, h.nombre_herramienta, p.id_bodega, p.fecha_prestamo, p.hora_prestamo, p.tiempo_estimado ' +
        'FROM prestamo p JOIN empleado e ON e.id_empleado = p.id_empleado ' +
        'JOIN herramienta h ON p.id_herramienta = h.id_herramienta',
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            }
        pool.query('SELECT id_prestamo from devolucion',
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: err.message });
                }
            devoluciones = results.rows
        }
        )
        results.rows.forEach( (element ) => {
            devoluciones.includes(element.id_prestamo)?element.estado = 'Devuelto': element.estado = 'Prestado'
        }) 
        res.json(results.rows);
        }
        
    );
});


/**
 * @swagger
 * /api/prestamo:
 *   post:
 *     summary: Crear un nuevo préstamo
 *     description: Registra un nuevo préstamo en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prestamo'
 *     responses:
 *       201:
 *         description: Préstamo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestamo'
 */
router.post('/', (req, res) => {
    console.log(req.body)
    const {
        id_empleado, id_herramienta, id_bodega, fecha, hora,
        tiempo, 
    } = req.body;

    if (!id_empleado || !id_herramienta || !id_bodega || !fecha || !hora ||!tiempo) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
    let uptadteH = []
    const query = `
        INSERT INTO prestamo (
            id_empleado , id_herramienta, id_bodega, fecha_prestamo, hora_prestamo, tiempo_estimado
        ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

    pool.query(query, [
        id_empleado , id_herramienta, id_bodega, 
        fecha, hora, tiempo], 
        (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        pool.query("UPDATE herramienta SET estado=$1 WHERE id_herramienta=$2 RETURNING * ",['no_disponible',id_herramienta]
            ,(err, resultsUpdate) => {
                if (err) return res.status(500).json({ error: err.message });
                console.log(resultsUpdate)
                uptadteH = resultsUpdate.rows
                if(uptadteH.length>0){
                    console.log("siiii")
                    return res.status(201).json(results.rows[0]);
                }
            }
        )
        
    });
});

/**
 * @swagger
 * /api/prestamo/{id}:
 *   put:
 *     summary: Actualizar un préstamo
 *     description: Actualiza los datos de un préstamo por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prestamo'
 *     responses:
 *       200:
 *         description: Préstamo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestamo'
 *       404:
 *         description: Préstamo no encontrado
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        id_herramienta, id_bodega, fecha_prestamo, hora_prestamo,
        tiempo_estimado_devolucion, nombre_empleado, tipo_empleado,
        herramienta_estado, nombre_herramienta, bodega_ubicacion, descripcion_estado
    } = req.body;

    const query = `
        UPDATE prestamo SET
        id_herramienta=$1, id_bodega=$2, fecha_prestamo=$3, hora_prestamo=$4,
        tiempo_estimado_devolucion=$5, nombre_empleado=$6, tipo_empleado=$7,
        herramienta_estado=$8, nombre_herramienta=$9, bodega_ubicacion=$10,
        descripcion_estado=$11
        WHERE id_prestamo=$12 RETURNING *`;

    pool.query(query, [
        id_herramienta, id_bodega, fecha_prestamo, hora_prestamo,
        tiempo_estimado_devolucion, nombre_empleado, tipo_empleado,
        herramienta_estado, nombre_herramienta, bodega_ubicacion, descripcion_estado, id
    ], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Préstamo no encontrado.' });
        }
        res.json(results.rows[0]);
    });
});

/**
 * @swagger
 * /api/prestamo/{id}:
 *   delete:
 *     summary: Eliminar un préstamo
 *     description: Elimina un préstamo del sistema por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Préstamo eliminado exitosamente
 *       404:
 *         description: Préstamo no encontrado
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM prestamo WHERE id_prestamo=$1', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Préstamo no encontrado.' });
        }
        res.status(204).send();
    });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Prestamo:
 *       type: object
 *       properties:
 *         id_prestamo:
 *           type: integer
 *         id_herramienta:
 *           type: integer
 *         id_bodega:
 *           type: integer
 *         fecha_prestamo:
 *           type: string
 *           format: date
 *         hora_prestamo:
 *           type: string
 *         tiempo_estimado_devolucion:
 *           type: string
 *         nombre_empleado:
 *           type: string
 *         tipo_empleado:
 *           type: string
 *           enum: [líder-jefe, mantenimiento]
 *         herramienta_estado:
 *           type: string
 *           enum: [ocupada, desocupada]
 *         nombre_herramienta:
 *           type: string
 *         bodega_ubicacion:
 *           type: string
 *           enum: [Este, Oeste, Sur, Norte]
 *         descripcion_estado:
 *           type: string
 */

module.exports = router;
