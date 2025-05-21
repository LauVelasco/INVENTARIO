<template>
  <div class="herramientas-container">
    <h2>Lista de herramientas</h2>
    <table class="tabla-herramientas">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(herramientas, index) in herramientas" :key="index">
          <td>{{ herramientas.codigo_herramienta }}</td>
          <td>{{ herramientas.nombre_herramienta }}</td>
          <td>{{ herramientas.estado }}</td>
          <td>
            <button class="btn-h-update" @click="editarHerramienta(herramientas.id_herramienta, index)">Editar</button>
            <button
            class="btn-h-delete"
            @click ="eliminarHerramienta(herramientas.id_herramienta, index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn-agregar" @click="toggleFormulario()">
      {{ mostrarFormulario ? 'Cancelar' : 'Agregar' }}
    </button>

    <!-- Formulario -->
    <div v-if="mostrarFormulario" class="formulario">
      <input v-model="nuevaHerramienta.codigo_herramienta" placeholder="Codigo" />
      <input v-model="nuevaHerramienta.nombre_herramienta" placeholder="Nombre" />
      <input v-model="nuevaHerramienta.estado" placeholder="Estado" />

      <button @click="guardarHerramienta">
        {{ editando ? 'Actualizar' : 'Guardar' }}
      </button>
    </div>
  </div>
</template>

<script>
import apiService from '../servicios/apiservices'
export default {
  name: "SeleccionHerramienta",
  data() {
    return {
      mostrarFormulario: false,
      editando: false,
      herramienta: "",
      disponible: null,
      herramientas: [], 
      nuevaHerramienta:{
        id:'',
        nombre_herramienta: '',
        codigo_herramienta : '',
        estado : ''
      }
    };
  },
  created() {
    this.obtenerHerramientas();
  },
  methods: {

    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
      if (!this.mostrarFormulario) {
        this.resetFormulario();
      }
    },

    async guardarHerramienta() {
      if (
        this.nuevaHerramienta.codigo_herramienta &&
        this.nuevaHerramienta.nombre_herramienta &&
        this.nuevaHerramienta.estado 
      ) {
        if (this.editando) {
          try{

           await apiService.herramienta.update(this.nuevaHerramienta.id_herramienta, this.nuevaHerramienta)

           this.obtenerHerramientas()
 
          }catch (error) {
              alert(error.message)
              console.error('Error al editar empleados:', error.message);
            }
        } else {
          try {
              const apiresult = await apiService.herramienta.create(this.nuevaHerramienta);
             if(apiresult.codigo_herramienta = this.nuevaHerramienta.codigo_herramienta){
              this.herramientas.push(apiresult)
             }
            } 
          catch (error) {
              console.error('Error al obtener empleados:', error.message);
            }
        }

        this.resetFormulario();
        this.mostrarFormulario = false;
      } else {
        alert('Completa todos los campos.');
      }
    },

    async obtenerHerramientas() {
      try {
        const apiresult = await apiService.herramienta.getAll(); 
        if (apiresult.length === 0) {
          console.log("No hay herramientas disponibles.");
        } else {
          this.herramientas = apiresult; 
        }
      } catch (error) {
        console.error("Error al obtener las herramientas:", error.message);
      }
    },

     editarHerramienta(id, index) {
      this.nuevaHerramienta.id = id
      const herramienta = this.herramientas[index];
      this.nuevaHerramienta = { ...herramienta };
      console.log(this.nuevaHerramienta)
      this.indexEditando = index;
      this.editando = true;
      this.mostrarFormulario = true;
    },

    async eliminarHerramienta(id, index) {
      if (confirm('¿Estás seguro de eliminar esta herramienta?')) {
        try{
        const result =  await apiService.herramienta.delete(id)
        if(result){
          this.herramientas.splice(index, 1);
        }
        }catch (error) {
          alert(error.message)
          console.error('Error al eliminar herramientas, verifica que no este prestada');
        }
      }
    },
    setDisponible(valor) {
      this.disponible = valor;
    },

    resetFormulario() {
      this.nuevaHerramienta = {
        nombre_herramienta: '',
        codigo_herramienta : '',
        estado : ''
      };
      this.editando = false;
      this.indexEditando = null;
    }
  },
};
</script>

<style scoped>
.herramientas-container {
  text-align: center;
  padding: 20px;
}

.btn-agregar {
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-agregar:hover {
  background-color: #218838;
}

.formulario {
  margin-top: 20px;
}

.formulario input {
  margin: 5px;
  padding: 8px;
  width: 200px;
}

.formulario button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
}

.tabla-herramientas {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
}

.tabla-herramientas th,
.tabla-herramientas td {
  border: 1px solid #ccc;
  padding: 10px;
}

.tabla-herramientas th {
  background-color: #f5f5f5;
}

.btn-h-update{
  margin: 0 5px;
  padding: 6px 10px;
  background-color: #ffc107;
  border: none;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
}

.btn-h-delete{
  margin: 0 5px;
  padding: 6px 10px;
  background-color: #dc3545;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
