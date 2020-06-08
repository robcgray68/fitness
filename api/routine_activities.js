const express = require('express');
const rout_actsRouter = express.Router();

rout_actsRouter.use((req, res, next) => {
  console.log("A request is being made to /routine_activities");

  next();
});

rout_actsRouter.get('/', async (req, res) => {

  const activities = await getAllRoutines();

  res.send({
    routines
  });
});

module.exports = routinesRouter;