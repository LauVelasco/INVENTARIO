// src/services/apiService.js

const BASE_URL = 'http://localhost:8000/api';

const apiService = {
  // Tipo de Empleado
  tipoEmpleado: {
    async getAll() {
      return fetch(`${BASE_URL}/tipo_empleado`)
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async create(data) {
      return fetch(`${BASE_URL}/tipo_empleado`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async update(id, data) {
      return fetch(`${BASE_URL}/tipo_empleado/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async delete(id) {
      return fetch(`${BASE_URL}/tipo_empleado/${id}`, { method: 'DELETE' })
        .then(res => res.ok)
        .catch(err => { throw new Error(err); });
    },
  },

  // Empleado
  empleado: {
    async getAll() {
      return fetch(`${BASE_URL}/empleado`)
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async create(data) {
      return fetch(`${BASE_URL}/empleado`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async update(id, data) {
      return fetch(`${BASE_URL}/empleado/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async delete(id) {
      return fetch(`${BASE_URL}/empleado/${id}`, { method: 'DELETE' })
        .then(res => res.ok)
        .catch(err => { throw new Error(err); });
    },
  },

  // Bodega
  bodega: {
    async getAll() {
      return fetch(`${BASE_URL}/bodega`)
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async create(data) {
      return fetch(`${BASE_URL}/bodega`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async update(id, data) {
      return fetch(`${BASE_URL}/bodega/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async delete(id) {
      return fetch(`${BASE_URL}/bodega/${id}`, { method: 'DELETE' })
        .then(res => res.ok)
        .catch(err => { throw new Error(err); });
    },
  },

  // Herramienta
  herramienta: {
    async getAll() {
      return fetch(`${BASE_URL}/herramienta`)
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async create(data) {
      return fetch(`${BASE_URL}/herramienta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async update(id, data) {
      return fetch(`${BASE_URL}/herramienta/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async delete(id) {
      return fetch(`${BASE_URL}/herramienta/${id}`, { method: 'DELETE' })
        .then(res => res.ok)
        .catch(err => { throw new Error(err); });
    },
  },

  // Préstamo
  prestamo: {
    async getAll() {
      return fetch(`${BASE_URL}/prestamo`)
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async create(data) {
      return fetch(`${BASE_URL}/prestamo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async delete(id) {
      return fetch(`${BASE_URL}/prestamo/${id}`, { method: 'DELETE' })
        .then(res => res.ok)
        .catch(err => { throw new Error(err); });
    },
  },

  // Devolución
  devolucion: {
    async getAll() {
      return fetch(`${BASE_URL}/devolucion`)
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async create(data) {
      return fetch(`${BASE_URL}/devolucion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err); });
    },
    async delete(id) {
      return fetch(`${BASE_URL}/devolucion/${id}`, { method: 'DELETE' })
        .then(res => res.ok)
        .catch(err => { throw new Error(err); });
    },
  },
};

export default apiService;