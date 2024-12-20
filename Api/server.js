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
const { searchItems } = require('./searchRoute/searchItems.js');
const { createAppointment } = require('./appointmentRoute/newAppointment.js');
const { getAllAppointments } = require('./appointmentRoute/appointments.js');
const { updateAppointment } = require('./appointmentRoute/updateAppointment.js');
const path = require('path');
const fs = require('fs');
fastify.register(require('@fastify/multipart'));

fastify.register(require('@fastify/jwt'), { secret: 'aL3n$uQ%F7&vJd8$kjw!cVbLZ#2pTr1@9' });
fastify.register(require('@fastify/rate-limit'), {
  timeWindow: '1 hour',
});
fastify.register(require('@fastify/cors'), { 
  origin: ['http://localhost:3001'], 
});

fastify.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Non autorisé, jeton manquant ou invalide' });
  }
});

fastify.post('/login', async (request, reply) => {
  const { email, password } = request.body;

  try {
    const result = await loginUser(email, password);
    const token = fastify.jwt.sign({ email: result.email, password : result.password });
    const userId = result.user.userId;
    reply.send({ token, userId});
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    reply.status(404).send({ error: error.message });
  }
});

fastify.post('/register', async (request, reply) => {
    const { firstName, lastName, userType, email, password } = request.body;
  
    try {
      const result = await registerUser(firstName, lastName, userType, email, password);
      reply.send(result);
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  });

fastify.get('/users', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  try {
    const users = await getAllUsers();
    reply.send(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    reply.status(500).send({ error: error.message });
  }
});

fastify.get('/profil', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { id } = request.query;

  try {
    const user = await getUserProfile(id);
    reply.send({ user });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    reply.status(500).send({ error: 'Erreur lors de la récupération du profil utilisateur' });
  }
});

fastify.put('/updateUser', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { id } = request.query;
  const { firstName, lastName, userType,email,password, } = request.body;

  try {
    const updates = { firstName, lastName, userType,email,password };
    const result = await updateUserProfile(id,  updates);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil utilisateur :', error);
    reply.status(500).send({ error: 'Erreur lors de la mise à jour du profil utilisateur' });
  }
});

fastify.post('/deleteUser', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { id } = request.query;
  const { delete: deleteConfirmation } = request.body;

  try {
    const result = await deleteUser(id, deleteConfirmation);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    reply.status(500).send({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});



fastify.post('/newCanvas', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { canvasId, artistId, type, tags, status } = request.body;

  
  const data = await request.file();  
  if (!data) {
    return reply.status(400).send({ error: 'Aucune image téléchargée.' });
  }

  const filename = Date.now() + path.extname(data.filename); 
  const filePath = path.join(__dirname, '/assets/Tableau', filename); 

  try {

    const fileStream = fs.createWriteStream(filePath);
    data.file.pipe(fileStream);

    fileStream.on('finish', async () => {
      const url = `/assets/Tableau/${filename}`; 

      try {
        const result = await createCanvas(canvasId, artistId, type, tags, status, url);
        reply.send(result);
      } catch (error) {
        console.error('Erreur lors de la création du Canvas :', error);
        reply.status(500).send({ error: 'Erreur lors de la création du Canvas' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image :', error);
    reply.status(500).send({ error: 'Erreur lors de l\'upload de l\'image' });
  }
});


fastify.get('/canvas', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  try {
    const result = await getAllCanvas();
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la récupération des canvas :', error);
    reply.status(500).send({ error: 'Erreur lors de la récupération des canvas' });
  }
});

fastify.delete('/deleteCanvas', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { canvasId } = request.query;
  const { delete: deleteConfirmation } = request.body;

  try {
    const result = await deleteCanvas(canvasId, deleteConfirmation);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la suppression du Canvas :', error);
    reply.status(500).send({ error: 'Erreur lors de la suppression du Canvas' });
  }
});

fastify.get('/gallery', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { id } = request.query;
  try {
    const gallery = await getGallery(id);
    reply.send(gallery);
  } catch (error) {
    console.error('Erreur lors de la récupération de la gallerie :', error);
    reply.status(500).send({ error: error.message });
  }
});

fastify.put('/updateGallery', { preHandler: [fastify.authenticate] }, async (request, reply) => {
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

fastify.get('/search', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { type, tags, artist, status } = request.query;

  try {
    const filters = {
      type,
      artist,
      status,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : null 
    };

    console.log('Filtres reçus:', filters);

    const results = await searchItems(filters);

    reply.send(results);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    reply.status(500).send({ error: 'Erreur lors de la recherche' });
  }
});

fastify.get('/appointments', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  try {
    const appointments = await getAllAppointments();
    reply.send(appointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous :', error);
    reply.status(500).send({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
});

fastify.post('/newAppointment', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { userId, artistId, date } = request.body;

  try {
    const result = await createAppointment(userId, artistId, date);
    reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la création du rendez-vous :', error);
    reply.status(500).send({ error: error.message });
  }
});

fastify.put('/updateAppointment', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  const { id } = request.query;
  const { status } = request.body;

  try {
    console.log(id, status);
    const result = await updateAppointment(id, status);
    return reply.send(result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rendez-vous :', error);
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
};
start();
