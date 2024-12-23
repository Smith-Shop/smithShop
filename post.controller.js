const postModel = require('../models/post.model');

//partie GET pour récupérer

module.exports.getPosts = async (req, res) =>{
    const post = await postModel.find();
    res.status(200).json(post);
}

//partie POST pour envoyer

module.exports.setPosts = async (req, res) => {
    if(!req.body.message){
        res.status(404).json({message: "Veillez entrer un message !"});
    }
    
    const post = await postModel.create({
        message: req.body.message,
        author: req.body.author,
        email: req.body.email,
    });
    res.status(200).json(post);
};

//partie PUT pour modifier

module.exports.editPost = async (req, res) =>{

    const post = await postModel.findById(req.params.id);
    
    if(!post){
        res.status(404).json({message: "Ce post n'existe pas!! "});
    }
    
    const updatePost = await postModel.findByIdAndUpdate( 
        post,
        req.body,
        {new: true}
    )
    
    res.status(200).json(updatePost);
    
};



//partie DELETE pour supprimer 


module.exports.deletePost = async (req, res) => {
  try {
    // Récupérer le post par son ID
    const post = await postModel.findById(req.params.id);

    // Vérifier si le post existe
    if (!post) {
      return res.status(404).json({ message: "Ce post n'existe pas !" });
    }

    // Supprimer le post
    await postModel.findByIdAndDelete(req.params.id);

    // Répondre avec un message de succès
    res.status(200).json({ message: "Post supprimé avec succès", post });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: "Erreur serveur", error });
  }
  
};

//partie PATCH pour ajouter les likers avec ($addToSet)...

module.exports.likePost = async (req, res) =>{

    try{
    
        await postModel.findByIdAndUpdate(
        
            req.params.id,
            {$addToSet: {likers: req.body.userId} },
            {new: true}     
        ).then((data) => res.status(200).send(data));
           
    }catch (err) {
        res.status(404).json(err)
    }
    
};

//partie PATCH pour retirer les likers avec($pull)...
module.exports.dislikePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.likers.includes(req.body.userId)) {
            // L'utilisateur a déjà liké : enlever son like (dislike)
            await postModel.findByIdAndUpdate(
                req.params.id,
                { $pull: { likers: req.body.userId } },
                { new: true }
            ).then((data) => res.status(200).send(data));
        } else {
            // L'utilisateur n'a pas liké : ajouter son like
            await postModel.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { likers: req.body.userId } },
                { new: true }
            ).then((data) => res.status(200).send(data));
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
