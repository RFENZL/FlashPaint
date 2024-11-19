const db = require('../firebase');

async function getAllAppointments() {
    const appointmentsSnapshot = await db.ref('Appointments').once('value');
    const appointments = appointmentsSnapshot.val();

    if (!appointments || Object.keys(appointments).length === 0) {
        return { message: 'Aucun rendez-vous trouvé dans la collection.' };
    }

    return appointments;
}

module.exports = { getAllAppointments };