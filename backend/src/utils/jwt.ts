import jwt, { SignOptions } from "jsonwebtoken";

export const generateAccessToken=(payload: object)=>{
  const options: SignOptions = {
    expiresIn:(process.env.JWT_EXPIRES_IN || "15m") as SignOptions["expiresIn"]
  };
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    options
  );
};

export const generateRefreshToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn:(process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"]
  };
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    options
  );
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token,process.env.JWT_REFRESH_SECRET!);
};