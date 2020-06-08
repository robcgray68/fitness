const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/fitness-dev');

async function createUser({ 
  username, 
  password,
  name 
}) {
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password, name)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [username, password, name]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username, name, active 
    FROM users;
  `);

  return rows;
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1
    `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function createActivity({
  name,
  description
}) {
  try {
    const { rows: [ activity ] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES ($1, $2);
    `, [name, description]);
    return activity;
  } catch (error) {
    console.error("Error right here")
    throw error;
  }
}

async function getAllActivities() {
  const { rows } = await client.query(
    `SELECT id, name, description 
    FROM activities;
  `);

  return rows;
}

module.exports = {
  client,
  getAllUsers,
  createUser,
  createActivity,
  getAllActivities,
  getUserByUsername
}