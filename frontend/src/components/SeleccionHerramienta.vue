<template>
  <div class="form-box">
    <h2>Selección Herramienta</h2>
    <form @submit.prevent="actualizar">
      <div class="input-box">
        <label>Herramienta</label>
        <select v-model="herramienta" required>
          <option disabled value="">Seleccione una herramienta</option>
          <option v-for="(item, idx) in herramientas" :key="idx" :value="item">
            {{ item.codigo_herramienta }} - {{ item.nombre_herramienta }}
          </option>
        </select>
      </div>

      <div class="input-box">
        <label>Estado de la herramienta</label>
        <div>
          <label>
            <input
              type="checkbox"
              :checked="disponible === true"
              @change="setDisponible(true)"
            />
            Disponible
          </label>
          <label style="margin-left:20px;">
            <input
              type="checkbox"
              :checked="disponible === false"
              @change="setDisponible(false)"
            />
            No disponible
          </label>
        </div>
      </div>

      <div class="botones">
        <button type="submit" class="btn">Actualizar</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiService from '../servicios/apiservices'
export default {
  name: "SeleccionHerramienta",
  data() {
    return {
      herramienta: "",
      disponible: null,
      herramientas: [], 
    };
  },
  created() {
    this.obtenerHerramientas();
  },
  methods: {
    async obtenerHerramientas() {
      try {
        const apiresult = await apiService.herramienta.getAll(); 
        if (apiresult.length === 0) {
          console.log("No hay herramientas disponibles.");
        } else {
          console.log(apiresult)
          this.herramientas = apiresult; 
        }
      } catch (error) {
        console.error("Error al obtener las herramientas:", error.message);
      }
    },
    setDisponible(valor) {
      this.disponible = valor;
    },
    actualizar() {
      if (!this.herramienta) {
        alert("Por favor seleccione una herramienta");
        return;
      }
      if (this.disponible === null) {
        alert("Por favor seleccione el estado de disponibilidad");
        return;
      }
      this.$emit("actualizar-datos", {
        tipo: "herramienta",
        datos: {
          herramienta: this.herramienta,
          disponible: this.disponible,
        },
      });
      
    },
  },
};
</script>

<style scoped>
/* Usa los estilos que ya tienes */
</style>
