<template>
  <div class="form-box">
    <h2>Selección de Bodega</h2>
    <form @submit.prevent="avanzar">
      <div class="input-box">
        <label for="bodega">Seleccione la Bodega</label>
        <select v-model="bodega" id="bodega" required>
          <option disabled value="">Seleccione una bodega</option>
          <option value="35">Bodega 35 - Oeste</option>
          <option value="40">Bodega 40 - Sur</option>
          <option value="42">Bodega 42 - Norte</option>
          <option value="30">Bodega 30 - Este</option>
        </select>
      </div>

      <div class="botones">
        <button type="button" class="btn-secundario" @click="$emit('registro-anterior')">Anterior</button>
        <button type="button" class="btn" @click="actualizarBodega">Actualizar</button>
        <button type="submit" class="btn">Siguiente</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SeleccionBodega',
  data() {
    return {
      bodega: ''
    };
  },
  methods: {
    actualizarBodega() {
      if (!this.bodega) return;
      this.$emit('actualizar-datos', {
        tipo: 'bodega',
        datos: this.bodega
      });
    },
    avanzar() {
      this.actualizarBodega();
      this.$emit('registro-completado');
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

.input-box select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
  font-size: 16px;
}

.botones {
  display: flex;
  justify-content: space-between;
}

.btn,
.btn-secundario {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
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
</style>
