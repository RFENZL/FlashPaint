const db = require('../firebase');

async function createAppointment(userId, artistId, date) {
    if ( !userId || !artistId || !date) {
        throw new Error('Tous les champs sont requis : userId, artistId, date.');
    }

    const snapshot = await db.ref('Appointments').orderByKey().once('value');
    let lastIdNumber = 0;

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
        const id = childSnapshot.key;
        const match = id.match(/^appointment(\d+)$/);
        if (match) {
            lastIdNumber = Math.max(lastIdNumber, parseInt(match[1], 10));
        }
        });
    }

    const newIdNumber = lastIdNumber + 1;
    const appointmentId = `appointment${newIdNumber}`;
    const status = 'En attente';
    
    await db.ref(`Appointments/${appointmentId}`).set({
        userId,
        artistId,
        date,
        status
    });
    
    return { id: appointmentId, message: 'Rendez-vous créé avec succès' };
}

module.exports = { createAppointment };