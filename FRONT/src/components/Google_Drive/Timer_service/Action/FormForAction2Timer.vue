<template>
    <div class="form-container">
        <header>
            <h1 class="app-title">Nom de l'application</h1>
        </header>
        <div class="form-wrapper">
            <h2 class="form-header">Select Fréquence</h2>
            <form @submit.prevent="submitForm">
                <div class="form-field">
                    <label for="date">Choose a Date</label>
                    <input type="text" id="date" placeholder="YYYY-MM-DD" v-model="date" required />
                </div>
                <div class="form-field">
                    <label for="frequency">Enter Frequency (e.g., 'lundi à 10h')</label>
                    <input type="text" id="frequency" v-model="frequency" placeholder="Enter frequency" required />
                </div>
                <button type="submit" class="submit-button">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            frequency: "",
            date: "",
        };
    },
    methods: {
        isValidDate(date) {
            // const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            // if (!dateRegex.test(date)) return false;

            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        },

        isValidFrequency(frequency) {
            const frequencyRegex = /^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\sà\s\d{1,2}h$/i;
            return frequencyRegex.test(frequency);
        },

        submitForm() {
            // Validation de la date
            // if (!this.isValidDate(this.date)) {
            //     alert("La date sélectionnée n'est pas valide !");
            //     return;
            // }

            // Validation de la fréquence
            if (!this.isValidFrequency(this.frequency)) {
                alert("Veuillez entrer la fréquence sous le format 'jour à heure' (par exemple, 'lundi à 10h').");
                return;
            }
            const action = {
                service: "Timer",
                name: "declencher_script",
                data: {
                    frequency: this.frequency,
                    date: this.date,
                },
            };



            // Redirection en cas de succès
            this.$router.push({
                path: "/Newarea",
                query: { action: JSON.stringify(action) },
            });

            // Réinitialisation des champs
            this.date = "";
            this.frequency = "";

        },
    },
};
</script>


<style scoped>
/* Conteneur principal */
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    background: #fffaf0;
    font-family: 'Arial', sans-serif;
}

/* Titre de l'application */
.app-title {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #6b4226;
}

/* Conteneur du formulaire */
.form-wrapper {
    background-color: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    text-align: center;
    width: 400px;
    margin: auto;
    transform: translateY(20%);
}

/* Titre au-dessus du formulaire */
.form-header {
    font-size: 20px;
    margin-bottom: 20px;
    color: #6b4226;
}

/* Champs du formulaire */
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

.form-field input {
    width: 100%;
    padding: 12px;
    border: 2px solid #d4a373;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s;
    font-family: 'Arial', sans-serif;
}

/* Effet focus pour le champ input */
.form-field input:focus {
    border-color: #c19a6b;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Bouton de soumission */
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
