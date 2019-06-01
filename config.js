module.exports = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost:8080',
  jwt: {
    secret: process.env.JWT_SECRET || 'randomstring',
    initTokenLifetime: process.env.JWT_INIT_TOKEN_LIFETIME || 60 * 5,
    primaryTokenLifetime: process.env.JWT_PRIMARY_TOKEN_LIFETIME || 60 * 60 * 24,
  },
  mail: {
    sender: process.env.MAIL_SENDER || '',
    url: process.env.MAIL_URL || '',
    port: process.env.MAIL_PORT || 465,
    user: process.env.MAIL_USER || '',
    password: process.env.MAIL_PASSWORD || ''
  },
};