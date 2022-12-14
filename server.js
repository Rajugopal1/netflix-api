const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors')



/**
 * ! Routes of the application
 */
const authRoute = require("./api/routes/auth");
const userRoute = require("./api/routes/user");
const movieRoute = require("./api/routes/movie");
const listRoute = require("./api/routes/list");


app.use(bodyParser.json());
app.use(cors())

dotenv.config();

const DATABASE = process.env.DATABASE 
// || "mongodb://localhost:27017/Netflix"

const PORT = process.env.PORT || 3000
/**
 * * Connect to the database
 */
mongoose.connect(
    DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(err));


/**
 * * Configure the routes of the application
 */
app.use('/api/auth', authRoute);

app.use('/api/user', userRoute);

app.use('/api', movieRoute);

app.use('/api', listRoute);

/**
 * ! test route
 */
app.use('/', (req, res) => {
    res.send('Hello World!');
}
);

/**
 * * connect to the server
 */

app.listen(PORT, () => {
    console.log('Server started on port 3000');
});

module.exports = app;