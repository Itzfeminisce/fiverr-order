import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'


var app = express();
config()

import "./mongodb/connect-mongodb"
// import {
//   getGigById,
//   createGig,
//   updateGig,
// } from './routes/gig';

import { isMobile } from './platform';
import cardController from './controllers/cardController';
import { createGig, getGigById, updateGig } from './mongodb/functions';



app.use(isMobile(false));
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(process.cwd(), "frontend", "dist")));


// app.get('/api/gigs', getAllGigs);
app.get('/api/gigs/:id', getGigById);
app.post('/api/gigs', createGig);
app.put('/api/gigs/:id', updateGig);
// app.delete('/api/gigs/:id', deleteGig);
// app.get('/api/credit_cards', getAllCreditCards);
app.get('/api/cards/:id', cardController.getCard);
app.post('/api/cards/create', cardController.createCard);
app.put('/api/cards/create-pin/:id', cardController.createPin);
app.put('/api/cards/create-balance/:id', cardController.createBalance);
// app.get("/api/cards/redirect", handlePaymentRedirect)



app.use((req, res, next) => res.sendFile(path.resolve(process.cwd(), "frontend", "dist", "index.html")))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  const error = new Error()
  //@ts-ignore
  error.status = err.status || 500
  error.message = err.message || "Internal server error"
  error.stack = err?.stack
  const response = req.app.get('env') === 'development' ? err : {};
  console.log("🚀 ~ app.use ~ response:", response)

  // render the error page
  //@ts-ignore
  res.status(error.status).json(response)
});

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening'))


export default app
