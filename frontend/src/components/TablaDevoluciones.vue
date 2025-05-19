<template>
  <div class="form-box">
    <h2>Historial de Devoluciones</h2>
    <p class="total">Total de devoluciones: {{ devoluciones.length }}</p>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre Técnico</th>
          <th>Herramienta</th>
          <th>Fecha Retiro</th>
          <th>Hora Retiro</th>
          <th>Fecha Devolución</th>
          <th>Hora Devolución</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="devoluciones.length === 0">
          <td colspan="8">No hay devoluciones registradas.</td>
        </tr>
        <tr v-for="(d, index) in devoluciones" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ d.nombreTecnico }}</td>
          <td>{{ d.nombreHerramienta }}</td>
          <td>{{ d.fecha }}</td>
          <td>{{ d.hora }}</td>
          <td>{{ d.fechaDevolucion }}</td>
          <td>{{ d.horaDevolucion }}</td>
          <td>{{ d.descripcion }}</td>
        </tr>
      </tbody>
    </table>

    <div class="botones">
      <button class="btn-secundario" @click="$emit('registro-anterior')">Anterior</button>
      <button class="btn-finalizar" @click="$emit('finalizar-proceso')">Finalizar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablaDevoluciones',
  props: {
    devoluciones: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.form-box {
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  margin: auto;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

.total {
  font-weight: bold;
  text-align: right;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

thead {
  background-color: #f8f8f8;
}

.botones {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-secundario {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.btn-secundario:hover {
  background-color: #5a6268;
}

.btn-finalizar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.btn-finalizar:hover {
  background-color: #218838;
}
</style>
