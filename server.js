const fs = require('fs')
const mongoose = require('mongoose');

const express = require("express");
//const res = require('express/lib/response');


const app = express();

require("dotenv").config();

// body as json- middleware
app.use(express.json());

app.use(express.static('client/build'));

// app.use(function(req, res, next){
//     console.log("Time:", Date.now());
//     next();
// })

// database
const productSchema = new mongoose.Schema({
   id: Number,
   title: String,
   price: Number,
   description: String,
   category: String,
   image: String,
   rating: {
     rate: Number,
     count: Number
   }
})

const Product = mongoose.model("Product", productSchema);

app.get("/api/", (req, res) => {
   res.send("hello")
})

// Get products
app.get("/api/products", (req, res) => {
   const {price} = req.query;
   Product.find((err, products)=>{
       if (price) {
           res.send(products.filter(item => item.price === +price))
       }
       res.send(products)
   })
})

// Get product by id
app.get("/api/product/:id", (req, res) => {
    const {id} = req.params
    console.log(11111, id)
    Product.findById(id, (err, product) =>{
        res.send(product)
    })
})

// add product
app.post("/api/products", (req, res) => {

   const product = new Product(req.body)
   Product.save((err, product) => {
       res.send(product)
   })

})

// Update product
app.put("/api/product/:id", (req, res) => {
   const { id } = req.params;
   const product = req.body;
   Product.findByIdAndUpdate(id, product, {new: true}, (err, product) => {
       if(err){
           console.log("err: ", err)
       }
       res.send(product)
   })

})

// Delete product
app.delete("/api/product/:id", (req, res) => {
   const { id } = req.params;

   Product.findByIdAndDelete(id, (err, product)=>{
       res.send(product)
   })
})

// Filter products according category
app.get("/api/products/category", (req, res) => {
   const { category } = req.query;

   Product.find((err, products)=>{
        res.send(products.filter(product => product.category === category))
    })

})

// Filter products according price range
app.get("/api/products/price", (req, res) => {
   const { price1, price2 } = req.query;

   Product.find((err, products)=>{
    res.send(products.filter(product => product.price>=price1 && product.price<=price2))
    })
   
})

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });

// Init database
const initTodos = () => {
    Product.findOne((err, product) => {
        if(!product) {
            fs.readFile("products.json", "utf8", (err, data) => {
                const products = JSON.parse(data)
                Product.insertMany(products, (err, productsRes) => {
                });
            });
        }
    })
}

// npm run dev

const {DB_USER, DB_PASS, DB_HOST, DB_NAME} = process.env;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    //'mongodb://localhost:27017/gocode_shop',
   {
       useNewUrlParser: true,
       //useCreateIndex: true, not in use
       useUnifiedTopology: true
   }, (err) => {

       app.listen(process.env.PORT || 8000, () => {
           console.log('Server running at http://127.0.0.1:8000/');
           initTodos();
       })
   }
)

//console.log("process.env ", process.env.PORT)

  // when change client- need to run heroku-postbuild, for using 8000 port
