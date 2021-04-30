const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const ProductRoutes = require('./api/routes/products');
const OrderRoutes = require('./api/routes/orders');


app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended : false }));

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

app.use('/products',cors(),ProductRoutes);
app.use('/orders',OrderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found'); 
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message:error.message
        }
    })
});

module.exports = app;