<template>
  <div class="form-box">
    <h2>Listado de Préstamos</h2>

    <p class="total">Total registrados: {{ prestamos.length }}</p>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Herramienta</th>
          <th>Bodega</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Tiempo</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="prestamos.length === 0">
          <td colspan="9">No hay préstamos registrados.</td>
        </tr>
        <tr v-for="(p, i) in prestamos" :key="i">
          <td>{{ p.nombreTecnico }}</td>
          <td>{{ p.cedulaTecnico }}</td>
          <td>{{ p.nombreHerramienta }}</td>
          <td>{{ p.bodega }}</td>
          <td>{{ p.fecha }}</td>
          <td>{{ p.hora }}</td>
          <td>{{ p.tiempo }}</td>
          <td>
            <span :class="{'estado-disponible': p.estado === 'disponible', 'estado-ocupada': p.estado === 'ocupada'}">
              {{ p.estado }}
            </span>
          </td>
          <td>
            <button class="btn-small" @click="registrarDevolucion(i)" :disabled="p.estado === 'disponible'">
              Registrar Devolución
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Infoprestamo',
  props: {
    prestamos: Array,
    devoluciones: Array
  },
  methods: {
    registrarDevolucion(index) {
      const prestamo = this.prestamos[index];
      const devolucion = {
        ...prestamo,
        fechaDevolucion: new Date().toISOString().slice(0, 10),
        horaDevolucion: new Date().toLocaleTimeString(),
        descripcion: 'Entregado correctamente'
      };

      this.prestamos[index].estado = 'disponible';
      this.$emit('actualizar-datos', { tipo: 'devolucion', datos: devolucion });
    }
  }
};
</script>

<style scoped>
.form-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  overflow-x: auto;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
}

.total {
  text-align: right;
  font-weight: bold;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  background-color: #f4f4f4;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.estado-disponible {
  color: green;
  font-weight: bold;
}

.estado-ocupada {
  color: red;
  font-weight: bold;
}

.btn-small {
  padding: 6px 12px;
  background-color: #1e88e5;
  border: none;
  color: white;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-small:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
