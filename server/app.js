import express from 'express';
import router from './routes/index';
import config from './config/configulation';

const app = express();

app.use(express.json());

app.use('/api/v1', router);

app.use('/', (req, res) => { res.status(400).send({ status: 400, error: 'Incorrect route! try again' }); });

const { port } = config;

const server = app.listen(port, () => console.log(`listening to port ${port}....`));

export default server;
