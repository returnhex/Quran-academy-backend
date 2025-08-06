import dotenv from "dotenv";
dotenv.config();

const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  saltRound: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  smtp_auth_user: process.env.SMTP_AUTH_USER,
  smtp_auth_pass: process.env.SMTP_AUTH_PASS,
};

export { config };
