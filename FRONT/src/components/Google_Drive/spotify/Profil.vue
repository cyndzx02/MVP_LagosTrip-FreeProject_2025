<template>
    <div class="profile-container">
        <!-- Header avec titre et bouton logout -->
        <div class="page-header">
            <h2 class="current-page">Profil de l'utilisateur</h2>
            <button class="logout-button" @click="handleLogout">Logout</button>
        </div>

        <!-- Profil de l'utilisateur -->
        <div class="profile-header">
            <div class="avatar-container">
                <img src="/src/assets/avatar.png" alt="User Avatar" class="profile-avatar" />
            </div>
            <h1 class="user-name">{{ userName }}</h1>
        </div>

        <div class="profile-content">
            <div class="personal-info">
                <h2 class="section-title">Informations personnelles</h2>
                <ul class="info-list">
                    <li><strong>Email :</strong> {{ userEmail }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            userName: "Utilisateur", 
            userEmail: "", 
        };
    },
    methods: {
        fetchUserProfile() {
            const emaill = localStorage.getItem('email');
            this.emaill = emaill;
        },
        handleLogout() {
            localStorage.removeItem("authToken"); 
            window.location.href = "/Signin";
            alert("Vous êtes déconnecté !");
        },
    },
    mounted() {
        this.fetchUserProfile(); 
    },
};
</script>


<style scoped>
/* Main Container */
.profile-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    margin-top: 150px;
    background: linear-gradient(to bottom right, #ebe8e5, #e1b48f);
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-family: "Roboto", sans-serif;
}

/* Header avec le titre et le bouton logout */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f4ebe0;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.current-page {
    font-size: 1.2rem;
    color: #5a3d2b;
    font-weight: bold;
}

.logout-button {
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #c9302c;
}

/* Profil Header */
.profile-header {
    text-align: center;
    padding: 20px 0;
    border-bottom: 2px solid #a67c52;
}

/* Reste du style (inchangé) */
.avatar-container {
    display: inline-block;
    background-color: #ffffff;
    border-radius: 50%;
    padding: 8px;
}

.profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid #f8f1e7;
}

.user-name {
    font-size: 1.8rem;
    font-weight: bold;
    color: #5a3d2b;
    margin: 15px 0 5px;
}

.profile-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
}

.section-title {
    font-size: 1.4rem;
    color: #5a3d2b;
    margin-bottom: 10px;
    border-left: 5px solid #a67c52;
    padding-left: 10px;
}

.personal-info {
    background-color: #f4ebe0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.info-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.info-list li {
    margin-bottom: 10px;
    color: #7d5a42;
    font-size: 1rem;
}
</style>
