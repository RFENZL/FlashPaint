<template>
    <div class="register-form">
        <h2>Créer un compte</h2>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="firstName">Prénom</label>
                <input type="text" id="firstName" v-model="firstName" required />
            </div>
            <div class="form-group">
                <label for="lastName">Nom</label>
                <input type="text" id="lastName" v-model="lastName" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirmation de mot de passe</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </div>
            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    },
    methods: {
        register() {
            // Logic for registering a new user
            if (this.password !== this.confirmPassword) {
                alert("Les mots de passe ne correspondent pas");
                return;
            }
            // Further registration logic here
        }
    }
};
</script>

<style scoped>
.register-form {
    max-width: 50%;
    min-width: 15%;
    max-height: 75%;
    min-height: auto;
    margin: auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 1em;
}

label {
    display: block;
    margin-bottom: 0.5em;
}

input {
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
    border: 1px solid #575656;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 0.5em;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5%;
}

button:hover {
    background-color: #0056b3;
}
</style>