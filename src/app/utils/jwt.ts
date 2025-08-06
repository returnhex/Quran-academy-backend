// import jwt from "jsonwebtoken";
// export const generateToken = (payload: object) => {
//   return jwt.sign(payload, process.env.JWT_SECRET as string, {
//     expiresIn: "7d",
//   });
// };

// export const verifyToken = (token: string, secret: string) => {
//   return jwt.verify(token, secret);
// };

// export const createToken = (
//     jwtPayload: { userId: string; role: string },
//     secret: string,
//     expiresIn: string
//   ) => {
//     return jwt.sign(jwtPayload, secret, { expiresIn });
//   };
