// import jwt from "jsonwebtoken";

// const SECRET_KEY = "your_secret_key"; // Use a secure secret and store in environment variables

// export const generateToken = (payload: object): string => {
//   return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // Token valid for 1 hour
// };

// export const verifyToken = (token: string): object | null => {
//   try {
//     return jwt.verify(token, SECRET_KEY);
//   } catch (error) {
//     console.error("Invalid token", error);
//     return null;
//   }
// };

import { ca } from 'date-fns/locale';
import jwt, { JwtPayload } from 'jsonwebtoken';
const generateJwtToken = ({ email }: { email: string }): string => {
  const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'full_stack' }

  try {
    return jwt.sign({ email }, process.env.JWT_SECRET!, options);
  } catch (error) {
    console.log(error);
    throw new Error('Error generating token');
  }
}



export { generateJwtToken }