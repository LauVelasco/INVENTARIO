const express = require('express');
const cors = require('cors'); // Importar CORS
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');  // Importación de YAML

// Cargar archivo swagger.yaml usando la ruta relativa o variable de entorno
const swaggerDocument = YAML.load(process.env.SWAGGER_PATH ||  `${__dirname}/swagger.yaml`);
// Inicializar Express
const app = express();

// Middlewares
app.use(cors());              // Habilitar CORS globalmente
app.use(bodyParser.json());   // Parsear JSON

// Ruta para la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la API
app.use('/api/auth', require('./routers/auth'));
app.use('/api/bodega', require('./routers/bodega'));  // Asegúrate de que este archivo exista
app.use('/api/devolucion', require('./routers/devolucion'));
app.use('/api/empleado', require('./routers/empleado'));
app.use('/api/herramienta', require('./routers/herramienta'));
app.use('/api/prestamo', require('./routers/prestamo'));
app.use('/api/tipo_empleado', require('./routers/tipoempleado'));  // Asegúrate de que este archivo se llame tipoempleado.js

// Puerto del servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});

// Exportar la app para pruebas u otros usos
module.exports = app;