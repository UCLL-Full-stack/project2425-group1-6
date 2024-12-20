import * as dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import vehicleRourer from './controller/vehicle.routes';
import userRouter from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import express, { Request, Response, NextFunction } from 'express';
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// app.use(
//     expressjwt({
//         secret: process.env.JWT_SECRET || 'default_secret',
//         algorithms: ['HS256'],
//     }).unless({
//         path: ['/api-docs', /^\/api-docs\/.*/, '/users/signup', '/users/login', '/vehicles', '/users'],
//     })
// )

app.use('/vehicles', vehicleRourer)
app.use('/users', userRouter)
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(400).json({ status: 'application error', message: err.message})
})

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
 

