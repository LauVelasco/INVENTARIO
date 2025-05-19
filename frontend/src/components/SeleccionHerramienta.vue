<template>
  <div class="form-box">
    <h2>Selección Herramienta</h2>
    <form @submit.prevent="actualizar">
      <div class="input-box">
        <label>Herramienta</label>
        <select v-model="herramienta" required>
          <option disabled value="">Seleccione una herramienta</option>
          <option v-for="(item, idx) in herramientas" :key="idx" :value="item">
            {{ item.codigo }} - {{ item.nombre }}
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
        <button type="button" @click="$emit('registro-anterior')" class="btn-secundario">
          Anterior
        </button>
        <button type="submit" class="btn">Actualizar</button>
        <button type="button" @click="$emit('registro-completado')" class="btn">
          Siguiente
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SeleccionHerramienta",
  data() {
    return {
      herramienta: "",
      disponible: null,
      herramientas: [
        { codigo: "H122", nombre: "Taladro inalámbrico" },
        { codigo: "HG223", nombre: "Llave de tubo" },
        { codigo: "HE233", nombre: "Llave expansiva" },
        { codigo: "HS567", nombre: "Segueta" },
        { codigo: "HJ456", nombre: "Juego de machos y terrajas" },
        { codigo: "HL342", nombre: "Pulidora" },
        { codigo: "HR780", nombre: "Remachadora" },
        { codigo: "HS339", nombre: "Pinzas seeger" },
        { codigo: "HC678", nombre: "Calibrador" },
        { codigo: "HR443", nombre: "Juego de rachet y copas milimétrico" },
        { codigo: "HC987", nombre: "Juego de rachet y copas en pulgadas" },
        { codigo: "HM356", nombre: "Martillo de goma" },
        { codigo: "HB487", nombre: "Martillo de bronce" },
        { codigo: "HE683", nombre: "Prensa en C" },
        { codigo: "HT009", nombre: "Cámara termográfica" },
        { codigo: "HH235", nombre: "Ponchadora hidráulica" },
        { codigo: "HQ573", nombre: "Torquímetro" },
        { codigo: "HI990", nombre: "Juego de copas sierra" },
        { codigo: "HF002", nombre: "Juego de fresas rotativas en acero inoxidable" },
        { codigo: "HT008", nombre: "Mototool" },
      ],
    };
  },
  methods: {
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
      alert("Actualización exitosa");
    },
  },
};
</script>

<style scoped>
/* Usa los estilos que ya tienes */
</style>
