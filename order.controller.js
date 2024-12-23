const orderModel = require('../models/order.model');

//route post

module.exports.addOrder = async (req, res) => {
    const { userId, username, email, products, totalPrice } = req.body;

    if (!userId || !products || !totalPrice || !email) {
        return res.status(400).json({ success: false, message: 'Données manquantes' });
    }

    try {
        const newOrder = new orderModel({
            
            userId: userId,
            username: username,
            email: email,
            products: products,
            totalPrice: totalPrice
        });

        await newOrder.save();
        res.json({ success: true, message: 'Commande enregistrée' + newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement de la commande' });
    }
    
  };



//route get

module.exports.getOrder =  async (req, res) => {
     const newOrder = await orderModel.find();
    res.status(200).json(newOrder);
  };
  
  
  
