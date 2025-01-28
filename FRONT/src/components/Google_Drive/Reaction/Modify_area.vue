<template>
    <div class="page-container">
        <header class="app-header">
            <h2>Mon Application</h2>
        </header>

        <div class="content-container">
            <h3 class="content-title">Votre contenu ici</h3>

            <div class="action-section">
                <h4>Action</h4>
                <ul>
                    <li>
                       aller à l'école demain
                    </li>
                </ul>
            </div>

            <div class="reactions-list">
                <h4>Réactions</h4>
                <ul>
                    <li v-for="(reaction, index) in reactions" :key="'reaction-' + index">
                        {{ reaction }}
                    </li>
                </ul>
            </div>

            <div class="icon-container">
                <button class="icon-button-update" @click="updateItem">
                    Modifier
                </button>
                <button class="icon-button-delete" @click="deleteItem">
                    Supprimer
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data() {
        return {
            action: 'Action principale',
            reactions: ['Réaction 1', 'Réaction 2'],
        };
    },
    methods: {
        updateItem() {
          
        },
        deleteItem() {
            
        },
    },
};
</script>

<style scoped>
.page-container {
    background-color: rgba(255, 255, 255, 0.9); /* Fond beige clair */
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
}

.app-header {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 2.5rem;
    font-weight: bold;
    color: #f04f1e; /* Marron foncé */
}

.content-container {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 600px;
    color: #5D4037; /* Marron foncé */
}

.content-title {
    font-size: 2rem;
    color: #000000; /* Marron profond */
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
}

.action-section h4 {
    font-size: 1.5rem;
    color: #000000; /* Marron clair */
    margin-bottom: 15px;
    font-weight: bold;
}

.action-section li {
    background-color: #ffffff; /* Marron clair */
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Section Réactions */
.reactions-list h4 {
    color: #000000; /* Marron clair */
    margin-bottom: 15px;
    font-weight: bold;
}

.reactions-list li {
    background-color: #f9eaea; /* Marron plus foncé */
    padding: 15px;
    margin: 10px 0;
    border-radius: 10px;
    font-size: 1rem;
}

.icon-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    width: 100%;
}

.icon-button-update,
.icon-button-delete {
    width: 140px;
    height: 50px;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 25px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-button-update {
    background-color: #4A90E2; /* Bleu pour modifier */
}

.icon-button-delete {
    background-color: #E74C3C; /* Rouge pour supprimer */
}

.icon-button-update:hover {
    background-color: #357ABD; /* Bleu foncé au survol */
    transform: scale(1.05);
}

.icon-button-delete:hover {
    background-color: #C0392B; /* Rouge foncé au survol */
    transform: scale(1.05);
}
</style>
