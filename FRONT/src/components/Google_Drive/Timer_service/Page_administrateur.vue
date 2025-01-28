<template>
  <div class="admin-container">
    <div class="app-title">Gestion des Utilisateurs</div>
    <div class="admin-wrapper">
      <h2 class="admin-header">Liste des Utilisateurs</h2>

      <div class="filter-buttons">
        <button class="filter-button" @click="createNewUser">Créer un utilisateur</button>
        <button @click="fetchUsers('activeUsers')" class="filter-button">Utilisateurs Actifs</button>
        <button @click="fetchUsers('notactiveUsers')" class="filter-button">Utilisateurs Désactivés</button>
        <button @click="fetchUsers('all')" class="filter-button">Tous les Utilisateurs</button>
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(user)" class="action-button edit" v-if="!user.isAdmin">
                <i class="fas fa-edit"></i> <!-- Icône de modification -->
              </button>
              <button @click="deleteUser(user.id)" class="action-button delete" v-if="!user.isAdmin">
                <i class="fas fa-trash-alt"></i> <!-- Icône de suppression -->
              </button>
              <button @click="activateUser(user.id)" class="action-button activate" v-if="!user.isActive && !user.isAdmin">
                <i class="fas fa-check-circle"></i> <!-- Icône d'activation -->
              </button>
              <button @click="desactivateUser(user.id)" class="action-button deactivate" v-if="user.isActive && !user.isAdmin">
                <i class="fas fa-times-circle"></i> <!-- Icône de désactivation -->
              </button>
              <button @click="promoteUser(user.id)" class="action-button promote">
                <i class="fas fa-user-shield"></i> <!-- Icône de promotion -->
              </button>
            </td>

          </tr>
        </tbody>
      </table>

      <h2 class="admin-header">Ajouter / Modifier un Utilisateur</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-field">
          <label for="name">Nom :</label>
          <input type="text" id="name" v-model="name" placeholder="Nom de l'utilisateur" required />
        </div>
        <div class="form-field">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" placeholder="Email de l'utilisateur" required />
        </div>
        <div class="form-field">
          <label for="surname">surname :</label>
          <input type="surname" id="surname" v-model="surname" placeholder="surname de l'utilisateur" required />
        </div>
        <div class="form-field">
          <label for="password">password :</label>
          <input type="text" id="password" v-model="password" placeholder="password de l'utilisateur" required />
        </div>
        <button type="submit" class="submit-button">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      email: "",
      password: "",
      name: "",
      surname: "",
      editingUserId: null, // Identifier l'utilisateur en cours de modification
    };
  },
  methods: {
    async promoteUser(userId) {
  try {
    const token = localStorage.getItem("authToken");
    // Effectuer la requête pour promouvoir l'utilisateur
    await axios.post(
      `http://localhost:8080/api/admin/users/${userId}/promote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Utilisateur promu avec succès !");
    this.fetchUsers();
  } catch (error) {
    console.error("Erreur lors de la promotion :", error);
    alert("Impossible de promouvoir l'utilisateur.");
  }
},
    async activateUser(userId) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.post(
          `http://localhost:8080/api/admin/users/${userId}/activate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Utilisateur activé avec succès !");
        this.fetchUsers(); // Recharger la liste des utilisateurs
      } catch (error) {
        console.error("Erreur lors de l'activation :", error);
        alert("Impossible d'activer l'utilisateur.");
      }
    },
    async desactivateUser(userId) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.post(
          `http://localhost:8080/api/admin/users/${userId}/desactivate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Utilisateur désactivé avec succès !");
        this.fetchUsers(); // Recharger la liste des utilisateurs
      } catch (error) {
        console.error("Erreur lors de la désactivation :", error);
        alert("Impossible de désactiver l'utilisateur.");
      }
    },
    async fetchUsers(status = 'all') {
      try {
        const token = localStorage.getItem("authToken");
        let url = '';

        if (status === 'all') {
          url = "http://localhost:8080/api/admin/users/getUsers";
        } else if (status === 'activeUsers') {
          url = "http://localhost:8080/api/admin/activesUsers";
        } else if (status === 'notactiveUsers') {
          url = "http://localhost:8080/api/admin/notactiveUsers";
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
        alert("Impossible de charger les utilisateurs.");
      }
    },

    createNewUser() {
      this.resetForm(); // Réinitialiser le formulaire pour la création
      this.editingUserId = null; // Aucun utilisateur en cours d'édition
    },
    editUser(user) {
      this.editingUserId = user.id; // Identifier l'utilisateur en cours de modification
      this.name = user.name;
      this.email = user.email;
      this.surname = user.surname;
      this.password = ""; // Ne pas préremplir le mot de passe pour des raisons de sécurité
    },
    async deleteUser(id) {
      console.log("ID utilisateur à supprimer :", id);

      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`http://localhost:8080/api/admin/users/getUsers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = this.users.filter((user) => user.id !== id);
        alert("Utilisateur supprimé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Échec de la suppression.");
      }
    },
    async handleSubmit() {
      try {
        const token = localStorage.getItem("authToken");
        if (this.editingUserId) {
          // Modification
          await axios.put(
            `http://localhost:8080/api/admin/users/getUsers/${this.editingUserId}`,
            {
              name: this.name,
              email: this.email,
              surname: this.surname,
              password: this.password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Utilisateur modifié avec succès !");
        } else {
          // Création
          const response = await axios.post(
            "http://localhost:8080/api/users/register",
            {
              name: this.name,
              email: this.email,
              surname: this.surname,
              password: this.password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.users.push(response.data);
          alert("Utilisateur ajouté avec succès !");
        }
        this.resetForm();
        this.fetchUsers();
      } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
        alert("Échec de l'opération.");
      }
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.surname = "";
      this.password = "";
      this.editingUserId = null;
    },
  },
  mounted() {
    this.fetchUsers();
  },

};
</script>

<style scoped>
/* Ajout du style pour le bouton de création */
.create-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #45a049;
}


.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: #fffaf0;
  font-family: 'Arial', sans-serif;
}

.app-title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #6b4226;
}

.admin-wrapper {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 800px;
  margin: auto;
  transform: translateY(10%);
}

.admin-header {
  font-size: 20px;
  margin-bottom: 20px;
  color: #6b4226;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.user-table th,
.user-table td {
  border: 1px solid #d4a373;
  padding: 10px;
  text-align: left;
}

.user-table th {
  background-color: #d4a373;
  color: white;
}

.user-table td {
  background-color: #f9f4e7;
}

.action-button {
  padding: 5px 5px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.action-button.edit {
  background-color: #c19a6b;
  color: white;
}

.action-button.delete {
  background-color: #d9534f;
  color: white;
}

.action-button:hover {
  opacity: 0.8;
}

.form-field {
  margin-bottom: 20px;
  text-align: left;
}

.form-field label {
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
  color: #6b4226;
}

.filter-buttons {
  margin-bottom: 20px;
}

.filter-button {
  padding: 10px 10px;
  background-color: #bbd2ec;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

.filter-button:hover {
  background-color: #0056b3;
}

.form-field input {
  width: 100%;
  padding: 12px;
  border: 2px solid #d4a373;
  border-radius: 30px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.form-field input:focus {
  border-color: #c19a6b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.submit-button {
  padding: 10px 20px;
  background-color: #d4a373;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #c19a6b;
}
</style>