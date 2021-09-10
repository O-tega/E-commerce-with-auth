// creating our product schema
// import miongoose
const mongoose = require('mongoose');


const productSchema =
    new mongoose.Schema(
        {
            title: String,
            serial: String,
            category: String,
            qty: Number,
            amt: Number,
            description: String,
            product_img: {
                type: String,
                default: "/uploads/product_img/dummy-image-testimonial-300x298-1.jpg",
            },
        },
        {
            timestamps: true,
        },
    );

const Product = mongoose.model('Product', productSchema);



module.exports = Product;