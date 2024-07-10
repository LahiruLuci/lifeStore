import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { payload } = req.body;

    const secretKey = process.env.ACCESS_SECRET_CODE;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });

  } else {

    res.status(405).json({ message: 'Method not allowed' });
    
  }
}