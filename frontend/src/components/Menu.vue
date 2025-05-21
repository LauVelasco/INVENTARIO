<template>
  <div class="manage-tools-container">
    <div class="header">
      <h1>Menu de gestion</h1>
      <p>Aquí puedes gestionar ....</p>

      <div class="button-group">
        <button @click="mostrarComponente('Herramientas')" class="btn">Gestión de Herramientas</button>
        <button @click="mostrarComponente('Prestamos')" class="btn">Gestión de Préstamos</button>
        <button @click="mostrarComponente('Devoluciones')" class="btn">Lista de Devoluciones</button>
        <button @click="mostrarComponente('Empleados')" class="btn">Gestión de Empleados</button>
      </div>
    </div>

    <div class="componente-activo">
      <component :is="componenteSeleccionado" />
    </div>
  </div>
</template>

<script>
import Herramientas from './SeleccionHerramienta.vue';
import Empleados from './Empleado.vue';
import Prestamos from './Infoprestamo.vue';
import Devoluciones from './DevolucionHerramienta.vue';


export default {
  name: 'ManageTools',
  components: {
    Herramientas,
    Empleados, 
    Prestamos,
    Devoluciones

  },
  data() {
    return {
      componenteSeleccionado: Herramientas,
    };
  },
  methods: {
    mostrarComponente(nombre) {
      this.componenteSeleccionado = nombre;
    },
  },
};
</script>

<style scoped>

.manage-tools-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

.header {
  margin-bottom: 30px;
  border-bottom: 2px solid #282525;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.header p {
  color: #555;
  font-size: 1.1rem;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.componente-activo {
  margin-top: 20px;
  width: 100%;
}
</style>
