const query = {

  /* Users */
  findUser: (email) => ({
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  }),
  regUser: (firstName, lastName, email, password) => ({
    text: 'INSERT INTO users (firstName,lastName,email,password) VALUES ( $1, $2, $3, $4 ) RETURNING *',
    values: [firstName, lastName, email, password],
  }),

};

export default query;
