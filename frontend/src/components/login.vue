<template>
  <div class="container">
    <form @submit.prevent="enviarDatos" class="form-box">
      <h2>LOGIN</h2>

      <label>
        <span class="icon">⚙️</span> Tipo de empleado
        <select v-model="tipoEmpleado" required>
          <option disabled value="">Seleccione una opción</option>
          <option value="líder-jefe">Líder-Jefe</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </label>

      <label>
        <span class="icon">🆔</span> Cédula
        <input type="text" v-model="cedula" placeholder="Cédula" required />
      </label>

      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script>

import apiService from '../servicios/apiservices'
export default {
  name: 'TipoEmpleado',
  data() {
    return {
      tipoEmpleado: '',
      cedula: ''
    };
  },
  methods: {
   async enviarDatos() {
    const datosTecnico = {
        id_tipo_empleado: this.tipoEmpleado == 'líder-jefe' ? 5 : 6,
        cedula: this.cedula,
      };

      try {
        const apiresult = await apiService.login.valideUser(datosTecnico);
        if(apiresult.length === 0){
          console.log("F")
        }else{
          this.$router.push({ name: 'Menu' });
        }
        console.log("Resultado de la API:", apiresult);
      } catch (error) {
        console.error("Error al validar usuario:", error.message);
      }
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 20px;
}

.form-box {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 40px 50px;
  width: 400px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  color: #1b1b1b;
  font-weight: 700;
  text-align: center;
}

h2 {
  margin-bottom: 30px;
}

label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  font-size: 18px;
  position: relative;
  color: #222;
}

.icon {
  position: absolute;
  left: 10px;
  top: 30px;
  font-size: 18px;
  color: #444;
}

select,
input[type="text"] {
  width: 100%;
  padding: 10px 12px 10px 35px;
  border: none;
  border-bottom: 2px solid #3f51b5;
  background: transparent;
  font-size: 16px;
  outline: none;
  color: #222;
}

select option {
  color: #222;
}

select:invalid {
  color: #999;
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 15px;
  background-color: #3f51b5;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2c387e;
}
</style>
