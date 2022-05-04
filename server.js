const express = require('express');
const app = express();
const port = 3000;

// Set src folder as root
app.use(express.static('src'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});