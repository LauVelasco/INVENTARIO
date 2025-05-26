const BASE_URL = 'http://127.0.0.1:8000/api';

const apiService = {
  // Tipo de Empleado
  login: {
    async valideUser(data) {
      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        console.log("************")
        console.log(res)
        if (!res.ok) throw new Error('Error al validar usuario');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },
  },

  // Tipo de Empleado
  tipoEmpleado: {
    async getAll() {
      try {
        const res = await fetch(`${BASE_URL}/tipo_empleado`);
        if (!res.ok) throw new Error('Error al obtener tipos de empleado');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async create(data) {
      try {
        const res = await fetch(`${BASE_URL}/tipo_empleado`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al crear tipo de empleado');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async update(id, data) {
      try {
        const res = await fetch(`${BASE_URL}/tipo_empleado/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al actualizar tipo de empleado');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async delete(id) {
      try {
        const res = await fetch(`${BASE_URL}/tipo_empleado/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar tipo de empleado');
        return res.ok;
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },
  },

  // Empleado
  empleado: {
    async getAll() {
      try {
        const res = await fetch(`${BASE_URL}/empleado`);
        if (!res.ok) throw new Error('Error al obtener empleados');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async create(data) {
      try {
        const res = await fetch(`${BASE_URL}/empleado`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al crear empleado');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async update(id, data) {
      try {
        const res = await fetch(`${BASE_URL}/empleado/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al actualizar empleado');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async delete(id) {
      try {
        const res = await fetch(`${BASE_URL}/empleado/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          if(res.status === 405){
            throw new Error('No puedes eliminar al empleado porque esta asociado a un prestamo');
          }
          throw new Error('Error al eliminar empleado');
        }
        return res.ok;
      } catch (err) {
        throw new Error(`${err.message}`);
      }
    },
  },

  // Bodega
  bodega: {
    async getAll() {
      try {
        const res = await fetch(`${BASE_URL}/bodega`);
        if (!res.ok) throw new Error('Error al obtener bodegas');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async create(data) {
      try {
        const res = await fetch(`${BASE_URL}/bodega`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al crear bodega');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async update(id, data) {
      try {
        const res = await fetch(`${BASE_URL}/bodega/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al actualizar bodega');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async delete(id) {
      try {
        const res = await fetch(`${BASE_URL}/bodega/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          console.log("****aqui***"+res)
          throw new Error('Error al eliminar bodega');
        }
        return res.ok;
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },
  },

  // Herramienta
  herramienta: {
    async getAll() {
      try {
        const res = await fetch(`${BASE_URL}/herramienta`);
        if (!res.ok) throw new Error('Error al obtener herramientas');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async create(data) {
      try {
        const res = await fetch(`${BASE_URL}/herramienta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al crear herramienta');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async update(id, data) {
      try {
        const res = await fetch(`${BASE_URL}/herramienta/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al actualizar herramienta');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async delete(id) {
      try {
        const res = await fetch(`${BASE_URL}/herramienta/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          throw new Error('Error al eliminar herramienta, verifica que no este en prestamo');
        }
        return res.ok;
      } catch (err) {
        console.log("*****",err)
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },
  },

  // Préstamo
  prestamo: {
    async getAll() {
      try {
        const res = await fetch(`${BASE_URL}/prestamo`);
        if (!res.ok) throw new Error('Error al obtener préstamos');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async create(data) {
      try {
        const res = await fetch(`${BASE_URL}/prestamo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al crear préstamo');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async delete(id) {
      try {
        const res = await fetch(`${BASE_URL}/prestamo/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar préstamo');
        return res.ok;
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },
  },

  // Devolución
  devolucion: {
    async getAll() {
      try {
        const res = await fetch(`${BASE_URL}/devolucion`);
        if (!res.ok) throw new Error('Error al obtener devoluciones');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async create(data) {
      try {
        const res = await fetch(`${BASE_URL}/devolucion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Error al crear devolución');
        return await res.json();
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },

    async delete(id) {
      try {
        const res = await fetch(`${BASE_URL}/devolucion/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar devolución');
        return res.ok;
      } catch (err) {
        throw new Error(`Error de red o de servidor: ${err.message}`);
      }
    },
  },
};

export default apiService;
