

var databaseName = process.env.NODE_ENV === 'test' ? 'hauldb-test' : 'haul';

module.exports = {
  db: process.env.MONGODB_URL || 'mongodb://localhost:27017/' + databaseName,
  session: process.env.SESSION
}
