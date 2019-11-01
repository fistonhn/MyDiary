import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './server/routes/index';
import config from './server/config/configulation';
import swaggerDocument from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api/v1', router);
app.use('/api/swaggerDocument', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res) => { res.status(400).send({ status: 400, error: 'Incorrect route! try again' }); });

const { port } = config;

const server = app.listen(port, () => console.log(`listening to port ${port}....`));

export default server;
