const db = require('../firebase');

async function registerUser(firstName, lastName, userType, email, password) {
  if (!firstName || !lastName || !userType || !email || !password) {
    throw new Error('Tous les champs sont requis : firstName, lastName, userType.');
  }

  // Récupérer tous les utilisateurs pour trouver le dernier ID
  const snapshot = await db.ref('Users').orderByKey().once('value');
  let lastIdNumber = 0;

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const id = childSnapshot.key;
      const match = id.match(/^user(\d+)$/);
      if (match) {
        lastIdNumber = Math.max(lastIdNumber, parseInt(match[1], 10));
      }
    });
  }

  const newIdNumber = lastIdNumber + 1;
  const newUserId = `user${newIdNumber}`;

  // Ajouter l'utilisateur dans Firebase
  await db.ref(`Users/${newUserId}`).set({
    firstName,
    lastName,
    userType,
    email,
    password
  });

  return { id: newUserId, message: 'Utilisateur ajouté avec succès' };
}

module.exports = { registerUser };