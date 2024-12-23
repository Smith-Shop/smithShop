const historyModel = require('../models/order.model');

// Route getHistory
module.exports.getHistory = async (req, res) => {
  try {
    const { userId } = req.params; // Vérifiez que la route inclut :userId
    if (!userId) {
      return res.status(400).json({ message: 'userId est requis.' });
    }

    const userHistory = await historyModel.find({ userId }); // Utilisation de MongoDB pour filtrer
    return res.status(200).json(userHistory);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

//route delete

module.exports.deleteHistory = async (req, res) => {
    //const { orderId } = req.params.orderId;
    const { orderId } = req.params;

    try {
        // Vérifiez si la commande existe
        const order = await historyModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Commande introuvable." });
        }

        // Supprimez la commande
        await historyModel.findByIdAndDelete(orderId);

        res.status(200).json({ message: "Commande supprimée avec succès." + order });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la commande." });
    }
}