const express = require('express');
const routinesRouter = express.Router();

const { requireUser } = require('./utils');

postsRouter.post('/', requireUser, async (req, res, next) => {
  res.send({ message: 'under construction' });
});

routinesRouter.use((req, res, next) => {
  console.log("A request is being made to /routines");

  next();
});

routinesRouter.get('/', async (req, res) => {

  const activities = await getAllRoutines();

  res.send({
    routines
  });
});

module.exports = routinesRouter;