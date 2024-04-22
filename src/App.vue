<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <table>
          <thead>
            <tr>
              <th scope="col">Designação</th>
              <th scope="col">Funcionais</th>
              <th scope="col">Não Funcionais</th>
              <th scope="col">Número Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(school, index) in schoolInfrastructure" :key="index">
              <td>{{ school.designation }}</td>
              <td>
                <input type="number" v-model="school.functional" :disabled="index == 0" />
              </td>
              <td>
                <input type="number" v-model="school.notFunctional" :disabled="index == 0" />
              </td>
              <td>
                <input type="number" disabled v-model="school.total" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="button-area">
          <button class="button" @click="updated">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dados from "./dados.js"; // Importar os dados do arquivo 'dados.js'

export default {
  name: "App",
  data() {
    return {
      schoolInfrastructure: []
    };
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem("schoolInfrastructure"));
    this.schoolInfrastructure = data ?? dados;
  },
  methods: {
    updated() {
      localStorage.setItem(
        "schoolInfrastructure",
        JSON.stringify(this.schoolInfrastructure)
      );
      alert("Dados atualizado :)");
    }
  },
  watch: {
    schoolInfrastructure: {
      handler(newSchoolInfrastructure) {
        newSchoolInfrastructure.map(school => {
          if (school.functional < 0) {
            school.functional = 0;
          }
          if (school.notFunctional < 0) {
            school.notFunctional = 0;
          }
          school.total =
            Number(school.functional) + Number(school.notFunctional);
        });
        // localStorage.setItem(
        //   "schoolInfrastructure",
        //   JSON.stringify(this.schoolInfrastructure)
        // );
      },
      deep: true
    }
  }
};
</script>

<style>
button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #2b6ab5;
}
.button-area {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}
.container {
  width: 100%; /* Ocupa toda a largura disponível */
  height: 100vh; /* Ocupa toda a altura da janela de visualização */
  display: flex; /* Define o display como flexível */
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
}
table {
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

caption {
  caption-side: bottom;
  padding: 10px;
  font-weight: bold;
}

thead,
tfoot {
  background-color: #c4c4c4;
}

th,
td {
  border-bottom: 1px solid rgb(160 160 160);
  padding: 12px 20px;
}
tbody td {
  text-align: left;
}
tbody input {
  width: 60px;
  height: 20px;
  outline: none;
  border: 1px solid #ccc;
}
thead th {
  text-align: left;
}

td:last-of-type {
  text-align: center;
}

tbody {
  background-color: #f5f5f5;
}

tfoot th {
  text-align: right;
}

tfoot td {
  font-weight: bold;
}
</style>
