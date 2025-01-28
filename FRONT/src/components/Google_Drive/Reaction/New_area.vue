<template>
    <div class="page-container">
        <header class="app-header">
            <h2>Mon Area</h2>

            <div class="Accueil-content">
                <h3>New connies u said ?</h3>
            </div>
        </header>

        <!-- Action principale -->
        <div class="rectangle">
            <span class="rectangle-text">{{ action.name || "If" }}</span>
            <div class="button-group">
                <button class="circle-button" @click="showModal = true; type = 'Action'">+</button>
                <button class="circle-button delete-button" @click="deleteAction">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>


        <!-- Réactions dynamiques -->
        <div class="dynamic-rectangles">
            <div class="rectangle" v-for="(reaction, index) in reactions" :key="index">
                <span class="rectangle-text">{{ reaction.name }}</span> <!-- Afficher le nom de la réaction -->
                <div class="button-group">
                    <button class="circle-button" @click="showModal = true; type = 'Reaction'">+</button>
                    <button class="circle-button delete-button" @click="deleteRectangle(index)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>


        <!-- Ajouter une réaction -->
        <div class="then-action">
            <button @click="addthen_function">Add Reaction</button>
        </div>

        <!-- Modal -->
        <Modal_square :visible="showModal" :which_type="type" @close="showModal = false" />

        <!-- Sauvegarde -->
        <button class="floating-button" @click="SaveArea">Save</button>
    </div>
</template>

<script>
import Modal_square from './Modal_square.vue';
import axios from "axios";

export default {
    name: "NewArea",
    components: {
        Modal_square,
    },
    data() {
        return {
            type: "",
            showModal: false,
            reactions: JSON.parse(JSON.stringify(localStorage.getItem("reactions"))) || [],
            reaction: this.$route.query.reaction || "", // Paramètre de requête pour le titre
            action: JSON.parse(localStorage.getItem("action")) || {
                service: "",
                name: "",
                data: {}
            }, // Action principale
        };
    },
    created() {
        console.log("Hook created exécuté !");

        // Vérifiez si l'action a été supprimée
        // const isDeleted = localStorage.getItem("action_deleted");

        // if (isDeleted) {
        //     console.log("Action supprimée précédemment. Rien à charger.");
        //     this.action = { service: "", name: "", data: {} };
        //     localStorage.removeItem("action_deleted");
        //     return;
        // }

        // Traiter le paramètre `action` pour l'action principale
        if (this.$route.query.action) {
            console.log("toto")
            try {
                this.action = JSON.parse(this.$route.query.action);
                this.saveAction();
                // console.log("Action ajoutée :", this.action);
            } catch (e) {
                console.error("Erreur de parsing de l'action :", e);
            }
        }
        //  else {
        //     console.log("Aucune action reçue.");
        // }
        // console.log(this.$route.query.action);
        // console.log(this.$route.query.reaction);
        // Traiter le paramètre `reaction` pour l'action principale
        if (this.$route.query.reaction) {
            console.log("trew");
            try {
                this.reaction = JSON.parse(this.$route.query.reaction);
                this.saveReaction();
                console.log("Reaction ajoutée :", this.reaction);
            } catch (e) {
                console.error("Erreur de parsing de l'reaction :", e);
            }
        } 
        // else {
        //     console.log("Aucune action reçue.");
        // }
    },

    methods: {
        addthen_function() {
            console.log(this.reactions.length);
            const newRectangleThen = {
                service: "",
                name: `Reaction ${this.reactions.length + 1}`,
                data: {
                    body: `Nouvelle réaction ajoutée #${this.reactions.length + 1}`
                }
            };
            this.reactions.push(newRectangleThen);
        },

        saveAction() {
            localStorage.setItem("action", JSON.stringify(this.action));
            // console.log("Action ajoutée :", JSON.stringify(this.action));
        },

        saveReaction() {
            this.reactions = JSON.parse(localStorage.getItem("reactions")) || [];
            this.reactions.push(this.reaction);
            localStorage.setItem("reactions", JSON.stringify(this.reactions));
            // console.log("Action ajoutée :", JSON.stringify(this.reaction));
        },

        deleteAction() {
            this.action = { service: "", name: "", data: {} };
            localStorage.removeItem("action");
            localStorage.setItem("action_deleted", "true");
            console.log("Action supprimée. Local Storage après suppression :", localStorage.getItem("action"));
        },

        deleteRectangle(index) {
            this.reactions.splice(index, 1); // Supprime l'élément à l'index donné
            localStorage.setItem("reactions", JSON.stringify(this.reactions)); // Met à jour le Local Storage
            console.log(`Rectangle à l'index ${index} supprimé.`);
        },
        SaveArea() {
            console.log("SaveArea clicked");
            const payload = {
                action: {
                    service: this.action.service,
                    name: this.action.name,
                    data: this.action.data,
                },
                reaction: {
                    service: this.reactions[0].service,
                    name: this.reactions[0].name,
                    data: this.reactions[0].data,
                },
            };
            console.log("Données à envoyer : ", payload);

            axios.post('http://localhost:8080/api/areas', payload)
                .then(response => {
                    console.log("Données envoyées avec succès :", response.data);
                    this.$router.push('/Main');
                })
                .catch(error => {
                    console.error("Erreur lors de l'envoi des données :", error);
                });
        },
    },

};

</script>


<style scoped>
.page-container {
    background-color: white;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: "Roboto", sans-serif;
}

.app-header {
    padding: 20px 30px;
    color: #e85916;
}

.app-header h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 30px;
    margin-left: 20px;
}

.Accueil-content {
    font-size: 1.2rem;
    line-height: 1.5;
    color: black;
}

.Accueil-content h3 {
    margin-left: 60px;
    margin-top: 50px;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
}

.rectangle {
    margin-left: auto; /* Centrer si nécessaire */
    margin-right: auto; /* Centrer si nécessaire */
    display: inline-block; /* Permet à la largeur de s'adapter au contenu */
    max-width: 90%; /* Limite la largeur pour éviter des rectangles trop larges */
    padding: 15px 20px;
    background-color: #a67865;
    border: 2px solid #6b4f3e;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    word-wrap: break-word; /* Gérer les mots trop longs */
    overflow-wrap: break-word; /* Alternative pour les longues chaînes */
    text-align: center; /* Centrer le texte à l'intérieur */
}


.rectangle-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
}

.dynamic-rectangles {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.button-group {
    display: flex;
    gap: 10px;
}

.circle-button {
    width: 30px;
    height: 30px;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6b4f3e;
    color: #ffffff;
    font-weight: bold;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.circle-button:hover {
    background-color: #4e3629;
    transform: scale(1.1);
}

.delete-button {
    width: 30px;
    height: 30px;
    font-size: 1rem;
    background-color: #e06055;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.delete-button:hover {
    background-color: #d04e3e;
    transform: scale(1.1);
}

.then-action {
    margin-left: 40%;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}

.then-action button {
    border-radius: 50px 20px 50px 20px;
    padding: 10px;
    background-color: #fff0d9;
    color: #6b4f3e;
    border: 2px solid #6b4f3e;
}

.then-action button:hover {
    background-color: #e5d4b3;
    transform: scale(1.1);
}

.floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 50px;
    background-color: #6b4f3e;
    color: white;
    font-size: 1.4rem;
    font-weight: bold;
    border: none;
    border-radius: 40%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s, transform 0.3s;
}

.floating-button:hover {
    background-color: #4e3629;
    transform: scale(1.1);
}
</style>
