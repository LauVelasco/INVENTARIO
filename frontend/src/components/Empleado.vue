<template>
  <div class="empleados-container">
    <h2>Lista de Empleados</h2>

    <!-- Tabla de empleados -->
    <table class="tabla-empleados">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cédula</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empleado, index) in empleados" :key="index">
          <td>{{ empleado.id_empleado }}</td>
          <td>{{ empleado.nombre }}</td>
          <td>{{ empleado.apellido }}</td>
          <td>{{ empleado.cedula }}</td>
          <td>{{ empleado.id_tipo_empleado === 5 ? 'líder-jefe' : 'mantenimiento' }}</td>
          <td>
            <button @click="editarEmpleado(empleado.id_empleado, index)">Editar</button>
            <button @click="eliminarEmpleado(empleado.id_empleado, index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botón mostrar formulario -->
    <button class="btn-agregar" @click="toggleFormulario()">
      {{ mostrarFormulario ? 'Cancelar' : 'Agregar Empleado' }}
    </button>

    <!-- Formulario -->
    <div v-if="mostrarFormulario" class="formulario">
      <input v-model="nuevoEmpleado.nombre" placeholder="Nombre" />
      <input v-model="nuevoEmpleado.apellido" placeholder="Apellido" />
      <input v-model="nuevoEmpleado.cedula" placeholder="Cédula" />
      <input v-model="nuevoEmpleado.id_tipo_empleado" placeholder="ID Rol (5 = líder-jefe) (6 = mantenimiento)" />

      <button @click="guardarEmpleado">
        {{ editando ? 'Actualizar' : 'Guardar' }}
      </button>
    </div>
  </div>
</template>

<script>
import apiService from '../servicios/apiservices';

export default {
  name: 'Empleados',
  data() {
    return {
      mostrarFormulario: false,
      editando: false,
      indexEditando: null,
      nuevoEmpleado: {
        nombre: '',
        apellido: '',
        cedula: '',
        id_tipo_empleado: ''
      },
      empleados: []
    };
  },
  created() {
    this.getEmployes();
  },
  methods: {
    async getEmployes() {
      try {
        const apiresult = await apiService.empleado.getAll();
        if (apiresult.length === 0) {
          console.log('No hay empleados disponibles.');
        } else {
          this.empleados = apiresult;
        }
      } catch (error) {
        console.error('Error al obtener empleados:', error.message);
      }
    },

    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
      if (!this.mostrarFormulario) {
        this.resetFormulario();
      }
    },

    async guardarEmpleado() {
      if (
        this.nuevoEmpleado.nombre &&
        this.nuevoEmpleado.apellido &&
        this.nuevoEmpleado.cedula &&
        this.nuevoEmpleado.id_tipo_empleado
      ) {
        if (this.editando) {
          try{
      
          const result = await apiService.empleado.update(this.nuevoEmpleado.id_empleado, this.nuevoEmpleado)

          if(result.cedula === this.nuevoEmpleado.cedula){
           this.getEmployes()
          }

          }catch (error) {
              alert(error.message)
              console.error('Error al editar empleados:', error.message);
            }
        } else {
          try {
              const apiresult = await apiService.empleado.create(this.nuevoEmpleado);
             if(apiresult.cedula = this.nuevoEmpleado.cedula){
              this.empleados.push(apiresult)
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

    async editarEmpleado(id, index) {
      this.nuevoEmpleado.id_empleado = id
      const empleado = this.empleados[index];
      this.nuevoEmpleado = { ...empleado };
      this.indexEditando = index;
      this.editando = true;
      this.mostrarFormulario = true;
    },

    async eliminarEmpleado(id, index) {
      if (confirm('¿Estás seguro de eliminar este empleado?')) {
        try{
        const result =  await apiService.empleado.delete(id)
        if(result){
          this.empleados.splice(index, 1);
        }
        }catch (error) {
          alert(error.message)
          console.error('Error al obtener empleados:', error.message);
        }
      }
    },

    resetFormulario() {
      this.nuevoEmpleado = {
        nombre: '',
        apellido: '',
        cedula: '',
        id_tipo_empleado: ''
      };
      this.editando = false;
      this.indexEditando = null;
    }
  }
};
</script>

<style scoped>
.empleados-container {
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

.tabla-empleados {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
}

.tabla-empleados th,
.tabla-empleados td {
  border: 1px solid #ccc;
  padding: 10px;
}

.tabla-empleados th {
  background-color: #f5f5f5;
}

.tabla-empleados button {
  margin: 0 5px;
  padding: 6px 10px;
  background-color: #ffc107;
  border: none;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
}

.tabla-empleados button:last-child {
  background-color: #dc3545;
  color: white;
}
</style>
