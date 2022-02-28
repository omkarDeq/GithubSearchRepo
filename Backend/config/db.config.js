
const HOSTNAME = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME

module.exports = {
    DB_URL: `mongodb://${HOSTNAME}:${PORT}/${DB_NAME}`
}