<!-- src/components/ManageTools.vue -->
<template>
    <div class="manage-tools">
      <h1>Gestionar Herramientas</h1>
      <p>Aquí puedes gestionar tus herramientas.</p>
  
      <div class="button-group">
        <button @click="agregarHerramienta" class="btn">Herramienta</button>
        <!-- Puedes agregar más botones aquí en el futuro -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ManageTools',
    methods: {
      agregarHerramienta() {
        this.$router.push({ name: 'Herramientas' });
        console.log("Agregar Herramienta clickeado");
      },
    },
  };
  </script>
  
  <style scoped>
  .manage-tools {
    padding: 20px;
  }
  
  h1 {
    color: #333;
  }
  
  .button-group {
    margin-top: 20px;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 16px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  