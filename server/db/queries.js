const query = {


  findUser: (email) => ({
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  }),
  regUser: (firstName, lastName, email, password) => ({
    text: 'INSERT INTO users (firstName,lastName,email,password) VALUES ( $1, $2, $3, $4 ) RETURNING *',
    values: [firstName, lastName, email, password],
  }),
  saveDiary: (email, title, description, createdOn) => ({
    text: 'INSERT INTO entries (email,title,description,createdOn) VALUES ( $1, $2, $3, $4 ) RETURNING *',
    values: [email, title, description, createdOn],
  }),

};

export default query;
