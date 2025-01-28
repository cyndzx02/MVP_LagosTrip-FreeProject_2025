<template>
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <h3>SERVICES</h3>

            <div class="card-container">
                <div v-for="(card, index) in cards" :key="card.title" class="card" @click="choose_service(card.title)">
                    <img :src="card.image" alt="Couverture de la carte" class="card-image" />
                    <p class="card-title">{{ card.title }}</p>
                </div>
            </div>

            <button class="close-button" @click="closeModal">Fermer</button>
        </div>
    </div>
</template>

<script>
import dropbox from "@/assets/dropbox.png";
import spotify from "@/assets/spotify.png";
import twitterImage from "@/assets/twitter.png";
// import rssImage from "@/assets/rss.png";
// import notificationsImage from "@/assets/notification.png";

import timerImage from "@/assets/chronometer.png";
import youtube from "@/assets/youtube.png"
import emailImage from "@/assets/gmail.png";

import tasksImage from "@/assets/board.png";
import sheetsImage from "@/assets/sheets.png";
import axios from "axios";
// import { k } from "vite/dist/node/types.d-aGj9QkWt";

export default {
    name: "ModalSquare",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        which_type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            cards: [
                { title: "Twitter", image: twitterImage },
                { title: "Spotify", image: spotify },
                { title: "Dropbox", image: dropbox },
                { title: "youtube", image: youtube },
                { title: "Timer", image: timerImage },
                { title: "Google Sheets", image: sheetsImage },
                { title: "Email", image: emailImage },
                { title: "Gestionnaire de Tâches", image: tasksImage },
            ],
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        async choose_service(title) {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('authToken');

            console.log(title);
            console.log(this.which_type);
            try {
                if (title != "Timer") {
                const response = await axios.get(`http://localhost:8080/api/connect/services/status/${title}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                const result = response.data;


                if (result.isConnect) {
                    console.log("Le service est déjà connecté.");
                    this.$router.push({
                        name: "ActionReaction",
                        params: {
                            name_service: title,
                            type_service: this.which_type,
                        },
                    });
                } else {
                    const redirectResponse = await axios.get(`http://localhost:8080/api/connect/${title}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    const redirectResult = redirectResponse.data;
                    console.log(redirectResult);

                    if (redirectResult && redirectResult.url) {
                        window.location.href = redirectResult.url;
                    } else {
                        alert("Le service choisi n'est pas valide et aucune redirection n'est disponible.");
                    }
                }} else { 
                    console.log("Le service choisi est le Timer.");
                this.$router.push({
                        name: "ActionReaction",
                        params: {
                            name_service: title,
                            type_service: this.which_type,
                        },
                    });
                };
            } catch (error) {
                // Gérer les erreurs de requête
                console.error("Erreur lors de la requête :", error);
                alert("Une erreur s'est produite. Veuillez réessayer.");
            }
        }


    },
};

</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(203, 191, 191, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 80%;
    max-width: 800px;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 20px 0;
}

.card {
    background-color: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: background-color 0.3s, transform 0.3s;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.card-image {
    width: 80%;
    max-height: 100px;
    object-fit: contain;
}

.card-title {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
    text-align: center;
}

.card:hover {
    background-color: #adc4dc;
    transform: scale(1.1);
}

.close-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.close-button:hover {
    background-color: #0056b3;
}
</style>