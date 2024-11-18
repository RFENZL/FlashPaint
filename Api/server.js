const fastify = require('fastify')({ logger: true });
const { registerUser } = require('./userRoute/register.js');
const { getAllUsers } = require('./userRoute/users.js');
const { loginUser } = require('./userRoute/login.js');
const { getUserProfile } = require('./userRoute/profil.js');
const { updateUserProfile } = require('./userRoute/updateUser.js');
const { deleteUser } = require('./userRoute/deleteUser.js');
const { createCanvas } = require('./canvasRoute/newCanvas.js');
const { getAllCanvas } = require('./canvasRoute/canvas.js');
const { deleteCanvas } = require('./canvasRoute/deleteCanvas.js');
const { getGallery } = require('./galleryRoute/gallery.js');
const { updateGallery } = require('./galleryRoute/updateGallery.js');


fastify.post('/register', async (request, reply) => {
    const { firstName, lastName, userType, email, password } = request.body;
  
    try {
      const result = await registerUser(firstName, lastName, userType, email, password);
      reply.send(result);
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  });

fastify.get('/users', async (request, reply) => {
  try {
    const users = await getAllUsers();
    reply.send(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    reply.status(500).send({ error: error.message });
  }
});

fastify.post('/login', async (request, reply) => {
  const { userId } = request.body;

  try {
    const result = await loginUser(userId);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    if (error.message === 'Le champ userId est requis.') {
      reply.status(400).send({ error: error.message });
    } else {
      reply.status(404).send({ error: error.message });
    }
  }
});

fastify.get('/profil', async (request, reply) => {
  const { id } = request.query;

  try {
    const user = await getUserProfile(id);
    reply.send({ user });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    if (error.message === 'Le paramètre id est requis.') {
      reply.status(400).send({ error: error.message });
    } else if (error.message === 'Utilisateur non trouvé.') {
      reply.status(404).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'Erreur lors de la récupération du profil utilisateur' });
    }
  }
});


fastify.put('/updateUser', async (request, reply) => {
  const { id } = request.query;
  const { firstName, lastName, userType, requesterId } = request.body;

  try {
    const updates = { firstName, lastName, userType };
    const result = await updateUserProfile(id, requesterId, updates);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil utilisateur :', error);

    if (error.message.includes('requis')) {
      reply.status(400).send({ error: error.message });
    } else if (error.message.includes('Accès interdit')) {
      reply.status(403).send({ error: error.message });
    } else if (error.message.includes('Utilisateur non trouvé')) {
      reply.status(404).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'Erreur lors de la mise à jour du profil utilisateur' });
    }
  }
});

fastify.post('/deleteUser', async (request, reply) => {
  const { id } = request.query;
  const { delete: deleteConfirmation } = request.body;

  try {
    const result = await deleteUser(id, deleteConfirmation);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'attribut delete à l\'utilisateur :', error);

    if (error.message.includes('requis')) {
      reply.status(400).send({ error: error.message });
    } else if (error.message.includes('Utilisateur non trouvé')) {
      reply.status(404).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'Erreur lors de l\'ajout de l\'attribut delete à l\'utilisateur' });
    }
  }
});

fastify.post('/newCanvas', async (request, reply) => {
  const { canvasId, artistId, type, tags, status } = request.body;

  try {
    const result = await createCanvas(canvasId, artistId, type, tags, status);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la création du Canvas :', error);

    if (error.message.includes('Tous les champs sont requis')) {
      reply.status(400).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'Erreur lors de la création du Canvas' });
    }
  }
});

fastify.get('/canvas', async (request, reply) => {
  try {
    const result = await getAllCanvas();
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la récupération des canvas :', error);
    reply.status(500).send({ error: 'Erreur lors de la récupération des canvas' });
  }
});


fastify.delete('/deleteCanvas', async (request, reply) => {
  const { canvasId } = request.query;
  const { delete: deleteConfirmation } = request.body;

  try {
    const result = await deleteCanvas(canvasId, deleteConfirmation);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'attribut delete au canvas :', error);

    if (error.message.includes('non trouvé')) {
      reply.status(404).send({ error: error.message });
    } else if (error.message.includes('requis')) {
      reply.status(400).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'Erreur lors de l\'ajout de l\'attribut delete au canvas' });
    }
  }
});
fastify.get('/gallery', async (request, reply) => {
  const { id } = request.query;
  try {
    const gallery = await getGallery(id);
    reply.send(gallery);
  } catch (error) {
    console.error('Erreur lors de la récupération de la gallerie :', error);
    reply.status(500).send({ error: error.message });
  }
});


fastify.put('/updateGallery', async (request, reply) => {
  const { userId } = request.query;
  const { requesterId, newGallery } = request.body;

  try {
    const result = await updateGallery(userId, requesterId, newGallery);
    return reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la galerie :', error);
    return reply.status(500).send({ error: error.message });
  }
});


const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Serveur démarré sur http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
