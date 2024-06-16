const express = require('express');
const setupProxy = require('./setupProxy');

const app = express();
const PORT = 8008;

// Apply the proxy middleware
setupProxy(app);

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
