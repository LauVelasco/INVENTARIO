<template>
  <div class="form-box">
    <h2>Listado de Préstamos</h2>

    <p class="total">Total registrados: {{ prestamos.length }}</p>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Herramienta</th>
          <th>Bodega</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Tiempo</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="prestamos.length === 0">
          <td colspan="9">No hay préstamos registrados.</td>
        </tr>
        <tr v-for="(p, index) in prestamos" :key="index">
          <td>{{ p.nombre }}</td>
          <td>{{ p.cedula }}</td>
          <td>{{ p.nombre_herramienta }}</td>
          <td>{{ p.id_bodega }}</td>
          <td>{{ p.fecha_prestamo }}</td>
          <td>{{ p.hora_prestamo }}</td>
          <td>{{ p.tiempo_estimado }}</td>
          <td>{{ p.estado }}</td>
          <td>
            <button class="btn-small" @click="registrarDevolucion(p.id_prestamo)" :disabled="p.estado !== 'Prestado'">
              Registrar Devolución
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <button class="btn-agregar" @click="toggleFormulario()">
      {{ mostrarFormulario ? 'Cancelar' : 'Agregar' }}
    </button>

  <!-- Formulario -->
  <div v-if="mostrarFormulario" class="formulario">

    <span class="icon">⚙️</span><label for="herramienta">Herramienta</label>
    <select v-model="nuevoPrestamo.id_herramienta" required>
      <option disabled value="">Seleccione una opción</option>
      <option v-for="herramienta in herramientas" :key="herramienta.id_herramienta" :value="herramienta.id_herramienta">
        {{ herramienta.nombre_herramienta }}
      </option>
    </select>

    <span class="icon">⚙️</span> <label for="Bodega">Bodega</label>
    <select v-model="nuevoPrestamo.id_bodega" required>
      <option disabled value="">Seleccione una opción</option>
      <option v-for="bodega in bodegas" :key="bodega.id_bodega" :value="bodega.id_bodega">
        {{ bodega.id_bodega }}
      </option>
    </select>

    <div class="input-box">
        <label for="fecha">Fecha de Prestamo</label>
        <input type="date" v-model="nuevoPrestamo.fecha" required />
      </div>

      <div class="input-box">
        <label for="hora">Hora de Prestamo</label>
        <input type="time" v-model="nuevoPrestamo.hora" required />
      </div>

      <div class="input-box">
        <label for="descripcion">Tiempo estimado</label>
        <input type="text" v-model="nuevoPrestamo.tiempo" placeholder="Describe tiempo estimado" required />
      </div>

    <button @click="guardarPrestamo">
      {{ editando ? 'Actualizar' : 'Guardar' }}
    </button>
  </div>

  <div v-if="showDevolucion" class="form-box-devolucion">
    <h2>Devolución de Herramienta</h2>
    <form @submit.prevent="guardarDevolucion">
      <div class="input-box">
        <label for="fecha">Fecha de Devolución</label>
        <input type="date" v-model="fecha" required />
      </div>

      <div class="input-box">
        <label for="hora">Hora de Devolución</label>
        <input type="time" v-model="hora" required />
      </div>

      <div class="input-box">
        <label for="descripcion">Descripción de la entrega</label>
        <textarea v-model="descripcion" placeholder="Describe cómo se entrega la herramienta" required ></textarea>
      </div>

      <div class="botones">
        <button @click="devolver()" class="btn">Actualizar</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiService from '../servicios/apiservices';
import localStorage from '../servicios/localstorage'
export default {
  name: 'Infoprestamo',
  data() {
    return {
      fecha : '',
      hora: '',
      descripcion: '',
      prestamos: [],
      currentIdPrestamo : -1,
      showDevolucion : false,
      mostrarFormulario : false,
      nuevoPrestamo: {
        id_herramienta: '',
        id_bodega: '',
        fecha : '',
        hora: '',
        tiempo: ''
      },
      herramientas: [],
      bodegas: [],
      editando: false,
      indexEditando: -1
    };
  },
  created() {
    this.getPrestamos();
    this.obtenerHerramientas(); 
    this.obtenerBodegas();
  },
  methods: {
    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
      if (!this.mostrarFormulario) {
        this.resetFormulario();
      }
    },

    async obtenerHerramientas() {
      try {
        const apiresult = await apiService.herramienta.getAll(); 
        if (apiresult.length === 0) {
          console.log("No hay herramientas disponibles.");
        } else {
          this.herramientas = apiresult.filter(item => item.estado === 'disponible'); 
        }
      } catch (error) {
        console.error("Error al obtener las herramientas:", error.message);
      }
    },

    async obtenerBodegas() {
      try {
        const apiresult = await apiService.bodega.getAll(); 
        if (apiresult.length === 0) {
          console.log("No hay bodegas disponibles.");
        } else {
          this.bodegas = apiresult; // Aquí se asigna a bodegas, no a herramientas
        }
      } catch (error) {
        console.error("Error al obtener las bodegas:", error.message);
      }
    },
    
    async getPrestamos() {
      try {
        const result = await apiService.prestamo.getAll();
        this.prestamos = result;
      } catch (error) {
        alert(error.message);
        console.error('Error al consultar préstamos:', error.message);
      }
    },


    registrarDevolucion(id) {
      this.currentIdPrestamo = id;
      this.showDevolucion = true;
    },

    devolver() {
      const data = {
        id_prestamo: this.currentIdPrestamo,
        fecha_devolucion: this.fecha,
        hora_devolucion: this.hora,
        descripcion: this.descripcion,
      };

      if (this.descripcion === "") {
        alert("Falta el campo descripcion");
      } else {
        console.log(data);
        this.showDevolucion = false;
      }
    },

    async guardarPrestamo() {
 
  if (
    this.nuevoPrestamo.id_herramienta &&
    this.nuevoPrestamo.id_bodega &&
    this.nuevoPrestamo.fecha &&
    this.nuevoPrestamo.hora &&
    this.nuevoPrestamo.tiempo
  ) {
    if (this.editando) {
     
      try {
        let data = this.nuevoPrestamo;
        data.id_prestamo = this.prestamos[this.indexEditando].id_prestamo; 
        await apiService.prestamo.update(data.id_prestamo, data); 
        await this.getPrestamos(); 
        this.resetFormulario(); 
      } catch (error) {
        alert(error.message);
        console.error('Error al actualizar el préstamo:', error.message);
      }
    } else {
    
      try {
        let data = this.nuevoPrestamo;
        let user = localStorage.getItem('user');
        data.id_empleado = user.id_empleado;
        data.estado = "Prestado"; 
        await apiService.prestamo.create(data); +
        await this.getPrestamos(); 
        this.resetFormulario(); 
      } catch (error) {
        alert(error.message);
        console.error('Error al crear el préstamo:', error.message);
      }
    }
  } else {
    alert('Completa todos los campos.');
  }
},


resetFormulario() {
  this.mostrarFormulario = false; 
  this.nuevoPrestamo = { 
    id_herramienta: '',
    id_bodega: '',
    fecha: '',
    hora: '',
    tiempo: ''
  };
  this.editando = false; 
  this.indexEditando = -1; 
}

  }
};
</script>

<style scoped>
.form-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 15px;
  width: 100%;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
}

.total {
  text-align: right;
  font-weight: bold;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  background-color: #f4f4f4;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.estado-disponible {
  color: green;
  font-weight: bold;
}

.estado-ocupada {
  color: red;
  font-weight: bold;
}

.btn-small {
  padding: 6px 12px;
  background-color: #1e88e5;
  border: none;
  color: white;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-small:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-box-devolucion {
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

.input-box input,
.input-box textarea {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
  font-size: 16px;
  resize: none;
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

.btn-agregar {
  margin-top: 20px;
  margin-bottom: 20px;
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
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 400px;
  margin: auto;
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

select{
  margin-bottom: 20px;
  height: 40px;
}
</style>
