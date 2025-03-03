import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



export default app;