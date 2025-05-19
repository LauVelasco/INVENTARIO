<template>
  <div class="form-box">
    <h2>Préstamo de Herramienta</h2>
    <form @submit.prevent="guardarPrestamo">
      <div class="input-box">
        <label for="fecha">Fecha de Préstamo</label>
        <input type="date" id="fecha" v-model="fecha" required />
      </div>

      <div class="input-box">
        <label for="hora">Hora de Retiro</label>
        <input type="time" id="hora" v-model="hora" required />
      </div>

      <div class="input-box">
        <label for="tiempo">Tiempo Estimado</label>
        <input type="text" id="tiempo" v-model="tiempo" placeholder="Ej: 2 horas" required />
      </div>

      <div class="botones">
        <button type="button" class="btn-secundario" @click="$emit('registro-anterior')">Anterior</button>
        <button type="submit" class="btn">Actualizar</button>
        <button type="button" class="btn-eliminar" @click="eliminar">Eliminar</button>
        <button type="button" class="btn" @click="$emit('registro-completado')">Siguiente</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PrestamoHerramienta',
  props: {
    datosTecnico: Object,
    herramienta: Object,
    bodega: String
  },
  data() {
    return {
      fecha: '',
      hora: '',
      tiempo: ''
    };
  },
  methods: {
    guardarPrestamo() {
      if (!this.fecha || !this.hora || !this.tiempo) return;
      this.$emit('actualizar-datos', {
        tipo: 'registro-prestamo',
        datos: {
          nombreTecnico: this.datosTecnico.nombre + ' ' + this.datosTecnico.apellido,
          cedulaTecnico: this.datosTecnico.cedula,
          nombreHerramienta: this.herramienta?.nombre || '',
          codigoHerramienta: this.herramienta?.codigo || '',
          bodega: this.bodega,
          fecha: this.fecha,
          hora: this.hora,
          tiempo: this.tiempo,
          estado: 'ocupada'
        }
      });
    },
    eliminar() {
      this.fecha = '';
      this.hora = '';
      this.tiempo = '';
    }
  }
};
</script>

<style scoped>
.form-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 400px;
  margin: auto;
}

.input-box {
  margin-bottom: 20px;
}

.input-box label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

.input-box input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
  font-size: 16px;
}

.botones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-top: 15px;
}

.btn,
.btn-secundario,
.btn-eliminar {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  flex: 1;
  text-align: center;
}

.btn {
  background-color: #1e88e5;
  color: white;
}

.btn:hover {
  background-color: #1565c0;
}

.btn-secundario {
  background-color: #6c757d;
  color: white;
}

.btn-secundario:hover {
  background-color: #5a6268;
}

.btn-eliminar {
  background-color: #e53935;
  color: white;
}

.btn-eliminar:hover {
  background-color: #b71c1c;
}
</style>
