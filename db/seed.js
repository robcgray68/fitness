const { 
  client,
  getAllUsers,
  createUser,
  createActivity,
  getAllActivities
} = require('./index');

async function dropTables() {
  try {
    console.log("Starting drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS routineActivities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS activities;
    `);

    console.log("Finished dropping tables...");

  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT true
      );
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id) NOT NULL,
        public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
      );
      CREATE TABLE routineActivities (
        id SERIAL PRIMARY KEY,
        "routineId" INTEGER REFERENCES routines(id) NOT NULL,
        "activityId" INTEGER REFERENCES activities(id) NOT NULL,
        duration INTEGER,
        count INTEGER,
        UNIQUE ("routineId", "activityId")
      )
    `);
    
    console.log("Finsished building tables...");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({ username: 'robert1', password: '12345678', name: 'Bob Gray' });
    await createUser({ username: 'susieg', password: 'qwerty123', name: 'Susie Cruise' });
    await createUser({ username: 'sam999', password: 'asdf1234', name: 'Sam Slammer'});
    await createUser({ username: 'jordan88', password: 'lkjh0987', name: 'Jordan King' });
    await createUser({ username: 'jack_z99', password: 'zxcv4567', name: 'Jack Hammer' });


    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialActivities() {
  try {
    console.log("Starting to create activities...");

    await createActivity({ name: 'cycling', description: 'riding a bicycle' });
    await createActivity({ name: 'push up', description: 'lay prone and push up with knees straight'});
    await createActivity({ name: 'sit up', description: 'laying on back, knees bent, sit forward and touch head to knees'});
    await createActivity({ name: 'squat (no weight)', description: 'with feet at shoulder width, bend knees until thighs horizontal, return to standing'});
    await createActivity({ name: 'dip', description: 'suspending self over parallel bars with straight arms, bend elbows to 90 degrees and return to straight arms'});
    await createActivity({ name: 'pull-up', description: 'grip pull-up bar overhead, pull up to put chin over bar'});

    console.log("Finished creating activities!");
  } catch(error) {
    console.error("Error creating activities!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialActivities();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    const activities = await getAllActivities();
    console.log("getAllActivities:", activities);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());