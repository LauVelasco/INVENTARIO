<template>
  <div id="app">
    <header class="header">
      <h2 class="logo">Logo</h2>
      <nav class="navigation">
        <a href="#">Contáctenos</a>
      </nav>
    </header>

    <main class="wrapper">
      <component
        :is="componentes[paginaActual - 1]"
        v-bind="propsComponente"
        @registro-completado="paginaSiguiente"
        @registro-anterior="paginaAnterior"
        @actualizar-datos="actualizarDatos"
        @mostrar-prestamos="mostrarListadoPrestamos"
        @finalizar-proceso="finalizarProceso"
      />
    </main>

    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>

    <div class="paginacion">
      <button @click="paginaAnterior" :disabled="paginaActual === 1" class="btn-nav">
        Anterior
      </button>
      <button @click="paginaSiguiente" :disabled="paginaActual === componentes.length" class="btn-nav">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import TipoEmpleado from './components/TipoEmpleado.vue';
import SeleccionHerramienta from './components/SeleccionHerramienta.vue';
import SeleccionBodega from './components/SeleccionBodega.vue';
import PrestamoHerramienta from './components/PrestamoHerramienta.vue';
import DevolucionHerramienta from './components/DevolucionHerramienta.vue';
import Infoprestamo from './components/Infoprestamo.vue';
import TablaDevoluciones from './components/TablaDevoluciones.vue';

export default {
  name: 'App',
  components: {
    TipoEmpleado,
    SeleccionHerramienta,
    SeleccionBodega,
    PrestamoHerramienta,
    DevolucionHerramienta,
    Infoprestamo,
    TablaDevoluciones,
  },
  data() {
    return {
      paginaActual: 1,
      componentes: [
        TipoEmpleado,
        SeleccionHerramienta,
        SeleccionBodega,
        PrestamoHerramienta,
        DevolucionHerramienta,
        Infoprestamo,
        TablaDevoluciones
      ],
      datosTecnico: {},
      herramienta: {},
      disponible: null,
      bodega: '',
      prestamos: [],
      devoluciones: [],
      mensaje: '',
    };
  },
  computed: {
    propsComponente() {
      return {
        datosTecnico: this.datosTecnico,
        herramienta: this.herramienta,
        disponible: this.disponible,
        bodega: this.bodega,
        prestamos: this.prestamos,
        devoluciones: this.devoluciones,
      };
    },
  },
  methods: {
    paginaSiguiente() {
      if (this.paginaActual < this.componentes.length) this.paginaActual++;
    },
    paginaAnterior() {
      if (this.paginaActual > 1) this.paginaActual--;
    },
    actualizarDatos(payload) {
      switch (payload.tipo) {
        case 'tecnico':
          this.datosTecnico = payload.datos;
          this.mostrarMensaje('Datos del técnico guardados');
          break;
        case 'herramienta':
          this.herramienta = payload.datos.herramienta;
          this.disponible = payload.datos.disponible;
          this.mostrarMensaje('Herramienta seleccionada');
          break;
        case 'bodega':
          this.bodega = payload.datos;
          this.mostrarMensaje('Bodega seleccionada');
          break;
        case 'registro-prestamo':
          this.prestamos.push(payload.datos);
          this.mostrarMensaje('Préstamo registrado');
          break;
        case 'devolucion':
          this.devoluciones.push(payload.datos);
          this.mostrarMensaje('Devolución registrada');
          break;
        case 'reset':
          if (confirm('¿Eliminar todos los registros?')) {
            this.resetDatos();
            this.mostrarMensaje('Registros eliminados');
          }
          break;
      }
    },
    mostrarListadoPrestamos() {
      const index = this.componentes.findIndex(c => c.name === 'Infoprestamo');
      if (index !== -1) this.paginaActual = index + 1;
    },
    finalizarProceso() {
      this.resetDatos();
      this.paginaActual = 1;
      this.mostrarMensaje('Proceso finalizado');
    },
    resetDatos() {
      this.datosTecnico = {};
      this.herramienta = {};
      this.disponible = null;
      this.bodega = '';
      this.prestamos = [];
      this.devoluciones = [];
    },
    mostrarMensaje(texto) {
      this.mensaje = texto;
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fgpautomocion.com%2Foptimiza-tu-taller-mecanico-10-claves-para-una-organizacion-eficiente%2F&psig=AOvVaw1SE3ughDouI4rp1IPlkktv&ust=1747503996842000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCNuenFqI0DFQAAAAAdAAAAABAE') no-repeat center center fixed;
  background-size: cover;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  max-width: 100%;
  padding: 20px 40px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: space-between;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: orange;
}

.navigation a {
  color: red;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
}

.wrapper {
  width: 100%;
  max-width: 900px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.mensaje {
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px 25px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}

.paginacion {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.btn-nav {
  background-color: #007bff;
  border: none;
  padding: 10px 18px;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.btn-nav:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
