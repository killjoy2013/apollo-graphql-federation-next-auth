import jsonwebtoken from 'jsonwebtoken';

export function createTempToken(payload) {
  return jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: parseInt(process.env.TOKEN_REFRESH_PERIOD),
    algorithm: 'HS512',
  });
}
