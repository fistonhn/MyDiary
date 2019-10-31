import dotenv from 'dotenv';

dotenv.config();


const config = {
  port: process.env.PORT || 6000,
};


export default config;
