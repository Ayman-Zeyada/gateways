const app = require('./src/app');

const logger = require('./src/lib/logger');
const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`app is running on port ${port}`)
});
