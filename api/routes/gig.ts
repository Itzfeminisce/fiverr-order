import { Request, Response } from 'express';
import { db } from '../database';

// Get all gigs
const getAllGigs = (req: Request, res: Response) => {
  db.prepare('SELECT * FROM gigs').all((err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: rows });
  });
};

// Get a gig by ID
const getGigById = (req: Request, res: Response) => {
  db.prepare('SELECT * FROM gigs WHERE gigId = ?').get(req.params.id, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    return res.status(200).json({ data: row })
  });
};

// Create a new gig
const createGig = (req: Request, res: Response) => {
  const { gigId, gigMessage, imageUrl, profileLink, username, gigLink, gigDescription, rating, numberOfReviews, price } = req.body;

  db.prepare('INSERT INTO gigs (gigId, imageUrl, profileLink, username, gigLink, gigDescription, gigMessage, rating, numberOfReviews, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run([gigId, imageUrl, profileLink, username, gigLink, gigDescription, gigMessage, rating, numberOfReviews, price], (info: any, err: any) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ data: info });
    })
};

// Update a gig
const updateGig = (req: Request, res: Response) => {
  let { amountToCharge } = req.body;
  amountToCharge = parseFloat(amountToCharge)
  const chargable = amountToCharge - ((20 / 100) * amountToCharge)
  db.prepare('UPDATE gigs SET amountToCharge = ? WHERE gigId = ?')
    .run(chargable, req.params.id, (err: any, info: any) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({info})
    });
};

// Delete a gig
const deleteGig = (req: Request, res: Response) => {
  db.prepare('DELETE FROM gigs WHERE gigId = ?').run(req.params.id, (err: any, info: any) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(204).json({info})
  });
};
export {
  getAllGigs,
  getGigById,
  createGig,
  updateGig,
  deleteGig
};
