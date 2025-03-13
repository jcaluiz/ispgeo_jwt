
export default class Token {
  public createToken = (user: { userId: string }): string => {
    const secret = process.env.JWT_SECRET || "jwt_secret";
    const { userId } = user;

    const token = jwt.sign({ userId }, secret, {
      expiresIn: "6h",
      algorithm: "HS256",
    });
    return token;
  };

  public isTokenValid = (token: string) => {
    try {
      const secret = process.env.JWT_SECRET || "jwt_secret";
      const data = jwt.verify(token, secret);
      return { validated: true, message: data };
    } catch (error) {
      return { validated: false, message: "Invalid Token" };
    }
  };

  public decode = (auth: string) => {
    const secret = process.env.JWT_SECRET || "jwt_secret";
    const decoded = jwt.verify(auth, secret) as string;
    return decoded;
  };
}

