<template>
    <div class="login-form">
        <h2>Connexion</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Connexion</button>
        </form>
    </div>
</template>

<script>
import { validateLoginForm } from '@/utils/validations';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        handleSubmit() {
            const formData = {
                email: this.email,
                password: this.password
            };

            if (!validateLoginForm(formData)) {
                return;
            } else {
                fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', data.userId);
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Une erreur est survenue. Veuillez réessayer plus tard.');
                });
            }
        }
    }
};
</script>

<style scoped>
.login-form {
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
    padding: 0.7em;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>