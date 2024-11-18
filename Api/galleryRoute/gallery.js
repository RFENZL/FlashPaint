
const db = require('../firebase');

async function getGallery(id) {
    if (!id) {
      throw new Error('Le paramètre id est requis.');
    }
  
    const userSnapshot = await db.ref(`Users/${id}`).once('value');
    const user = userSnapshot.val();
  
    if (!user) {
      throw new Error('Gallerie non trouvé.');
    }
  
    return user.gallery;
  }
  
  module.exports = { getGallery };
  