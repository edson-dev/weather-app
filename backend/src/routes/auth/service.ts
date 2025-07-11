import env  from '../../config';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: env.POSTGRES_URL,
});

//module.exports = {
 // query: (text, params) => pool.query(text, params)
//};

const getUser = async (user, password)=>{
  try {
    const text = 'SELECT * FROM users WHERE username = $1 and password = MD5($2)';
    const values = [user, password];
    const result = await pool.query(text, values);
    //console.log(result);
    return await result.rows;
  } catch (err) {
    console.error(err);
  }
};

const createUser = async(username, password, email) => {
  try {
    const text = "INSERT INTO users (username, password, email, created_at) values ($1, MD5($2), $3, NOW())";
    const values = [username, password, email];
    const result = await pool.query(text, values);
    //console.log(result);
    return null;
  } catch (err) {
    console.error(err.message);
    return err.message
  }
};

const saveUserHistory = async(username, history) => {
  try {
    const text = "UPDATE users SET history = $2::jsonb WHERE username = $1";
    const values = [username, history];
    const result = await pool.query(text, values);
    //console.log(result);
    return null;
  } catch (err) {
    console.error(err.message);
    return err.message
  }
};

const deleteUser = async(username) => {
  try {
    const text = "DELETE FROM users WHERE username = $1";
    const values = [username];
    const result = await pool.query(text, values);
    //console.log(result);
    return null;
  } catch (err) {
    console.error(err.message);
    return err.message
  }
};
const service = {getUser, createUser, deleteUser, saveUserHistory}
export default service;