const db = require('../firebase');

async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error('L\'email et le mot de passe sont requis.');
    }

    // Rechercher l'utilisateur avec l'email
    const usersSnapshot = await db.ref('Users').orderByChild('email').equalTo(email).once('value');
    const users = usersSnapshot.val();

    if (!users) {
        throw new Error('Utilisateur non trouvé.');
    }

    // Extraire l'utilisateur trouvé
    const userId = Object.keys(users)[0];
    const user = users[userId];

    // Vérifier si le mot de passe correspond
    if (user.password !== password) {
        throw new Error('Mot de passe incorrect.');
    }

    return { message: 'Connexion réussie.', user: { userId, ...user }, success: true };
}

// Exporter la fonction
module.exports = { loginUser };
  