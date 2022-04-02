const express = require('express');
const app = express();
app.use(express.json());

const container = require('./containerConfig');
const config = container.resolve('config');
const port = config.get("server.port");


app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`)
})