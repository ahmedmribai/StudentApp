const express    = require('express');
const bodyParser = require('body-parser');

const app        = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log("server is listening on port 3000");
});