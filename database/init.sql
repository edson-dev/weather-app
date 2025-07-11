CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (50) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);

--INSERT INTO users (id, username, password, email, created_at) values (0, 'test', MD5('test'), 'test@test.com', NOW());