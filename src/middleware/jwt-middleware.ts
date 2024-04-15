import express, { Express, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const jwtSecret = 'your_very_secret_key';

export const verifyJWT = (req : Request, res : Response, next : NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded) // Attach decoded user data to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

