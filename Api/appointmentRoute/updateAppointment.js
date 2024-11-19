const db = require('../firebase');

async function updateAppointment(id, status) {
    if (!id) {
        throw new Error('Le paramêtre id est requis.');
    }
    
    const appointmentSnapshot = await db.ref(`Appointments/${id}`).once('value');
    const appointment = appointmentSnapshot.val();
    
    if (!appointment) {
        throw new Error('Rendez-vous non trouvé.');
    }

    if (status) appointment.status = status; 
    
    // Mettre à jour le rendez-vous dans la base de données
    await db.ref(`Appointments/${id}`).update(appointment);
    
    return { message: 'Rendez-vous mis à jour avec succès.' };
}

module.exports = { updateAppointment };