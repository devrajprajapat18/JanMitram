import jwt from "jsonwebtoken";

export function signAuthToken(user, jwtSecret) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );
}
