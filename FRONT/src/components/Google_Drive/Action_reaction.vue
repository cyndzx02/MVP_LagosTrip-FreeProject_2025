<template>
    <div class="page-container">
        <header class="app-header">
            <h2>Mon Application</h2>

            <div class="Accueil-content">
                <h3>{{ name_service }}</h3>
                <p>Choisissez une action ou une réaction...</p>
                <div class="card-container">
                    <div class="card" v-for="(action, index) in actionsAndReactions" :key="index"
                        @click="handleCardClick(action)">
                        <p>{{ action.name }}</p>
                        <h6>{{ action.description }}</h6>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ActionReaction',
    data() {
        return {
            type_service: '',
            name_service: '',
            actionsAndReactions: []
        };
    },
    mounted() {
        this.type_service = this.$route.params.type_service;
        this.name_service = this.$route.params.name_service;

        this.fetchActionsAndReactions();
    },
    methods: {
        async fetchActionsAndReactions() {
            console.log(this.name_service, this.type_service)
            try {
                // Envoi de la requête POST vers l'API pour récupérer les actions et réactions
                const response = await axios.post('http://localhost:8080/api/services/details', {
                    serviceName: this.name_service,
                    type: this.type_service
                });

                this.actionsAndReactions = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        },
        handleCardClick(action) {
            console.log("Carte cliquée : ", this.type_service, this.name_service);  // Ajout du log pour vérifier

            // Gestion des clics sur les cartes d'action/réaction
            if (this.type_service === "Action") {
                switch (this.name_service) {
                    case "Email":
                        if (action.name === "Réception d'un email avec un sujet spécifique") {
                            this.$router.push('/FormForAction2Email');
                        } else if (action.name === "Réception d'un email contenant une pièce jointe") {
                            this.$router.push('/FormForAction1Email');
                        }
                        break;

                        case "Gestionnaire de Tâches":
                        if (action.name === "Une nouvelle tâche est créée dans une liste spécifique") {
                            this.$router.push('/FormforAction1gestionnaire');
                        } else if (action.name === "Une tâche existante est marquée comme terminée") {
                            this.$router.push('/FormforAction2gestionnaire');
                        }
                        break;
                    // case "Google Sheets":
                    //     if (action.name === "Une nouvelle ligne est ajoutée à un tableur") {
                    //         this.$router.push('/FormForAction1Gs');
                    //     } else if (action.name === "Une cellule spécifique est modifiée") {
                    //         this.$router.push('/FormForAction2Gs');
                    //     }
                    // break;

                    // jordy
                    case "Timer":
                        if (action.name === "creer_rappel") {
                            this.$router.push('/FormForAction1Timer');
                        } else if (action.name === "declencher_script") {
                            this.$router.push('/FormForAction2Timer');
                        }
                        break;

                    case "Youtube":
                        if (action.name === "user_subscribed_to_channel") {
                            this.$router.push('/FormForAction1Youtube');
                        }
                        break;
                    // fin jordy


                    // OWENS
                    case "Twitter":
                        if (action.name === "detect_hashtag") {
                            this.$router.push('/FormForAction1Twitter');
                        } else if (action.name === "detect_identication") {
                            this.$router.push('/FormForAction2Twitter');
                        }
                        break;

                    case "Spotify":
                        if (action.name === "track_added_to_favorites") {
                            this.$router.push('/FormForAction1Spotify');
                        }
                        break;

                    case "Dropbox":
                        if (action.name === "empty_directory") {
                            this.$router.push('/FormForAction1GoogleD');
                        } else if (action.name === "new_file_uploaded") {
                            this.$router.push('/FormForAction2GoogleD');
                        }
                        break;
                    // Fin owens

                    default:
                        console.error("Service inconnu ou non pris en charge pour les actions.");
                }
            }

            if (this.type_service === "Reaction") {
                switch (this.name_service) {
                    case "Email":
                        if (action.name === "Envoi automatique d'une réponse") {
                            this.$router.push('/FormForReaction1Email');
                        } else if (action.name === "Sauvegarde de la pièce jointe dans un gestionnaire de fichiers cloud") {
                            this.$router.push('/FormForReaction2Email');
                        }
                        break;

                        case "Gestionnaire de Tâches":
                        if (action.name === "Ajout d'un rappel pour la tâche") {
                            this.$router.push('/FormForReaction1Gestionnaire');
                        } else if (action.name === "Mise à jour automatique d'une feuille Google Sheets avec les détails des tâches terminées") {
                            this.$router.push('/FormForReaction2Gestionnaire');
                        }
                        break;

                    // case "Google Sheets":
                    //     if (action.name === "Envoi d'un email avec les détails de la ligne ajoutée") {
                    //         this.$router.push('/FormForReaction1Gs');
                    //     } else if (action.name === "Notification dans un autre service") {
                    //         this.$router.push('/FormForReaction2Gs');
                    //     }
                    //     break;

                    case "Timer":
                        if (action.name === "mail_rappel") {
                            this.$router.push('/FormForReaction1Timer');
                        } else if (action.name === "executer_script") {
                            this.$router.push('/FormForReaction2Timer');
                        }
                        break;

                    case "Youtube":
                        if (action.name === "send_welcome_message") {
                            this.$router.push('/FormForReaction1Youtube');
                        } 
                        break;

                    case "Twitter":
                        if (action.name === "post_tweet") {
                            this.$router.push('/FormForReaction2Twitter');
                        } else if (action.name === "update_bio") {
                            this.$router.push('/FormForReaction1Twitter');
                        }
                        break;

                    case "Spotify":
                        if (action.name === "create_playlist_and_add_track") {
                            this.$router.push('/FormForReaction1Spotify');
                        } else if (action.name === "add_to_library") {
                            this.$router.push('/FormForReaction2Spotify');
                        }
                        break;

                    case "Dropbox":
                        if (action.name === "create_log_file") {
                            this.$router.push('/FormForReaction1GoogleD');
                        } else if (action.name === "Move_to_archives") {
                            this.$router.push('/FormForReaction2GoogleD');
                        } else if (action.name === "Move_file") {
                            this.$router.push('/FormForReaction3GoogleD');
                        }
                        break;

                    default:
                        console.error("Service inconnu ou non pris en charge pour les réactions.");
                }
            }
        }

    }
};
</script>


<style scoped>
.page-container {
    background-color: #ffffff;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Roboto', sans-serif;
}

.app-header {
    padding: 20px 30px;
    color: #8B5E3C;
}

.app-header h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 30px;
    margin-left: 20px;
    color: #985f40;
}

.Accueil-content {
    font-size: 1.2rem;
    line-height: 1.5;
    color: #5F3F2E;
}

.Accueil-content h3 {
    text-align: center;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    color: #f06b05;
}

.Accueil-content p {
    margin-left: 60px;
    margin-top: 20px;
    font-weight: bold;
    font-size: larger;
    font-family: 'Roboto', sans-serif;
    color: #6E4B3A;
    /* Marron doux */
}


.card p {
    margin: 0;
    font-weight: bold;
    color: #000000;
    /* Marron foncé */
}

.card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 200px;
    margin: 20px 0;
    margin-top: 5%;
}

.card {
    background-color: #ffffff;
    /* Marron clair */
    border-radius: 10px;
    /* padding: 25%; */
    /* padding-left: 10%;
    padding-right: 10%;  */
    padding-top: 10%;
    padding-bottom: 10%;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: background-color 0.3s, transform 0.3s;
}

.card:hover {
    background-color: #D0B79E;
    /* Ton plus foncé au survol */
    transform: scale(1.1);
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
}

@media (max-width: 768px) {
    .card-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .card-container {
        grid-template-columns: 1fr;
    }
}
</style>