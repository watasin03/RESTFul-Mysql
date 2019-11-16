const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const config = require('config');
const port = config.get('port');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({extended:false})
);

const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err,req, res, next) => {
    res.status(500);
    res.json({
        error:{
            message:err.message
        }
    });
});