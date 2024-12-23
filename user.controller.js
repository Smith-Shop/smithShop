const userModel = require('../models/user.model');

//route get

module.exports.getUser = async (req, res) =>{
    const user = await userModel.find();
    res.status(200).json(user);
    //console.log('commande trouvée');
}


// Route post pour enregistrer les commandes dans MongoDB
module.exports.addUser = async (req, res) => {
    try {
        const { username, email, password, } = req.body;

        if (!username || username.length === 0) {
            return res.status(400).json({ message: "Aucun utilisateur enregistré !" });
        }

        const user = await userModel.create({
            username: username, // Identifiant de l'utilisateur
            email: email, // Liste des produits
            password: password, //quantité du produit
            
        });

        res.status(201).json({ message: "Utilisateur enregistrée avec succès", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur !", error });
    }
};

//partie pour modifier PUT un order

module.exports.editUser = async (req, res) =>{

    const user = await userModel.findById(req.params.id);
    
    if(!user){
        res.status(404).json({message: "Cet utilisateur n'existe pas!! "});
    }
    
    const updateUser = await userModel.findByIdAndUpdate( 
        user,
        req.body,
        {new: true}
    )
    
    res.status(200).json(updateUser);
    
};

//partie pour DELETE un post

module.exports.deleteUser = async (req, res) => {
  try {
    // Récupérer le post par son ID
    const user = await userModel.findById(req.params.id);

    // Vérifier si le post existe
    if (!user) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas !" });
    }

    // Supprimer le post
    await userModel.findByIdAndDelete(req.params.id);

    // Répondre avec un message de succès
    res.status(200).json({ message: "Utilisateur supprimé avec succès", user });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: "Erreur serveur", error });
  }
  
};
