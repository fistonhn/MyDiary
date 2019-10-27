import bcrypt from 'bcryptjs';

const encryptPassword = (password) => bcrypt.hashSync(password, 10);
const decryptPassword = (userPswd, hashedPswd) => bcrypt.compareSync(userPswd, hashedPswd);

export { encryptPassword, decryptPassword };
