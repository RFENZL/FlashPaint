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
            <div class="form-group">
                <label for="role">Rôle</label>
                <select id="role" v-model="role" required>
                    <option value="client">Client</option>
                    <option value="artist">Artiste</option>
                </select>
            </div>
            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
import { validateRegisterForm } from '../utils/validations';

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: ''
        };
    },
    methods: {
        register() {
            const formData = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                userType: this.role
            };
            if (!validateRegisterForm(formData)) {
                return alert('Veuillez remplir correctement le formulaire');
            } else {
                delete formData.confirmPassword;
                fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Inscription réussie');
                    } else {
                        console.log('Erreur lors de l\'inscription: ' + data.message);
                    }
                    this.$router.push('/LoginRegister');
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

select {
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
}

button:hover {
    background-color: #0056b3;
}

</style>