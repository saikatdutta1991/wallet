module.exports = {
  apiAuthKey: process.env.API_AUTH_KEY,
  codes: {
    UNAUTHORIZED: 401,
    CREATED: 201,
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_ACCEPTABLE: 406,
    FORBIDDEN: 403
  },
  constants: {
    ON_HOLD: "on_hold",
    RELEASED: "released",
    COMPLETED: "completed"
  }
};
