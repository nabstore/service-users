import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import router from './routes';
import swaggerFile from '../swagger_output.json';
import session from 'express-session'
import cors from "cors"
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(session({
    genid: (req) => uuidv4(),
    secret: "HDFS#@F231",
    resave: false,
    saveUninitialized: true,
}))
app.use(morgan('tiny'));
app.use(cors({
    origin: 'http://localhost:3021',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
  }));
app.use(express.json());
app.use(router)
app.use('/', swaggerUi.serve)
app.get('/', swaggerUi.setup(swaggerFile))

export default app;