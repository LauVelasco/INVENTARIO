<template>
  <div id="app">
    <header>
      <h2 class="logo">Calipso</h2>
      <nav class="navigation">
        <a href="#">Contáctenos</a>
      </nav>
    </header>

    <div class="wrapper">
      <div class="form-box login">
        <h2>Datos del Técnico para Préstamo de Herramientas</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-box">
            <label class="campo-etiqueta">
              <span class="icon"><ion-icon name="construct"></ion-icon></span>
              <span class="campo-nombre">Tipo de empleado</span>
            </label>
            <select v-model="form.tipo_empleado" required>
              <option value="" disabled selected>Seleccione una opción</option>
              <option value="1">1. líder-jefe</option>
              <option value="2">2. mantenimiento</option>
            </select>
          </div>

          <div class="input-box">
            <label class="campo-etiqueta">
              <span class="icon"><ion-icon name="person"></ion-icon></span>
              <span class="campo-nombre">Nombre</span>
            </label>
            <input type="text" v-model="form.nombre" required placeholder="Nombre" />
          </div>

          <div class="input-box">
            <label class="campo-etiqueta">
              <span class="icon"><ion-icon name="person"></ion-icon></span>
              <span class="campo-nombre">Apellido</span>
            </label>
            <input type="text" v-model="form.apellido" required placeholder="Apellido" />
          </div>

          <div class="input-box">
            <label class="campo-etiqueta">
              <span class="icon"><ion-icon name="finger-print"></ion-icon></span>
              <span class="campo-nombre">Cédula</span>
            </label>
            <input type="text" v-model="form.cedula" required placeholder="Cédula" />
          </div>

          <button type="submit" class="btn">Ingresar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  tipo_empleado: '',
  nombre: '',
  apellido: '',
  cedula: ''
});

function handleSubmit() {
  console.log('Formulario enviado:', form);
  alert('Préstamo exitoso');
  // Aquí podrías emitir un evento o llamar a una API
}
</script>

<style scoped>
@import './style.css';
</style>

<!-- Ionicons scripts deben ir en el index.html principal del proyecto -->
