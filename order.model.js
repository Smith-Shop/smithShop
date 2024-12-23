const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, default: null },
    username: { type: String, required: true },
    /*products: [{
        name: String,
        quantity: Number,
        price: Number,
    }],*/
    products: [],
    email: { type: String, required: true, default: 'guest@example.com' },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'En attente' }, // En attente, En cours, Livrée
}, { timestamps: true });



module.exports = mongoose.model('Order', orderSchema);
