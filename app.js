import db from './db/db';
import bodyParser from 'body-parser';

var express = require('express');
var cors = require('cors');

// Set up the express app
const app = express();
app.use(cors());



//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// get all masterProductList
app.get('/api/v1/masterProductList', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'masterProductList retrieved successfully',
    masterProductList: db
  })
});

app.post('/api/v1/masterProductList', (req,res) => {
    if(!req.body.image){
        return res.status(400).send({
            success: 'false',
            message: 'imageurl is required'
        });
    }
        else if(!req.body.brand){
            return res.status(400).send({
                success: 'false',
                message: 'brand is required'
            });
    } 
    else if(!req.body.price){
        return res.status(400).send({
            success: 'false',
            message: 'price is required'
        });
    }
    else if(!req.body.size){
        return res.status(400).send({
            success: 'false',
            message: 'size is required'
        });
    }

    const masterProduct = {
        id: db.length + 1,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        size: req.body.size.split(' ')
    }

    db.push(masterProduct);
    return res.status(201).send({
        success: 'true',
        message: 'masterProduct added successfully',
        masterProduct
    })
});

app.delete('/api/v1/masterProductList/:id', (req,res) => {
    const id = parseInt(req.params.id, 10);

    db.map((masterProduct, index) => {
        if(masterProduct.id === id) {
            db.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'masterProduct deleted successfully',

            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'masterProduct not found',
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

    // let getDataPromise = new Promise((resolve, reject) => {
    //   let httpRequest = new XMLHttpRequest();
    //   httpRequest.open("GET", "http://localhost:5000/api/v1/masterProductList", true);
    //   httpRequest.onload = () => {
    //     let master_data = JSON.parse(httpRequest.responseText);
    //     resolve(master_data.masterProductList);
    //   };
    //   httpRequest.onerror = () => {
    //     reject(httpRequest.statusText);
    //   }
    //   httpRequest.send();
    // });
    // getDataPromise.then(data => {
    //   this.setState({products: data});
    // });