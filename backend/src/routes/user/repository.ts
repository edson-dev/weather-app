import { postgres } from '../../databases';

const getUser = async (user: string, password: string) => {
    try {
        const text = 'SELECT * FROM users WHERE username = $1 and password = MD5($2)';
        const values = [user, password];
        const result = await postgres.query(text, values);
        //console.log(result);
        return await result.rows;
    } catch (err) {
        console.error(err);
    }
};

const createUser = async (username: string, password: string, email: string) => {
    try {
        const text = "INSERT INTO users (username, password, email, created_at) values ($1, MD5($2), $3, NOW())";
        const values = [username, password, email];
        const result = await postgres.query(text, values);
        //console.log(result);
        return null;
    } catch (err) {
        console.error(err.message);
        return err.message
    }
};

const saveUserHistory = async (username: string, history: string) => {
    try {
        const text = "UPDATE users SET history = $2::jsonb WHERE username = $1";
        const values = [username, history];
        const result = await postgres.query(text, values);
        //console.log(result);
        return null;
    } catch (err) {
        console.error(err.message);
        return err.message
    }
};

const deleteUser = async (username: string) => {
    try {
        const text = "DELETE FROM users WHERE username = $1";
        const values = [username];
        const result = await postgres.query(text, values);
        //console.log(result);
        return null;
    } catch (err) {
        console.error(err.message);
        return err.message
    }
};
const service = { getUser, createUser, deleteUser, saveUserHistory }
export default service;