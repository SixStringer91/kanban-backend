const config = require('./common/config');
const app = require('./app');

const { PORT } = config;

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
