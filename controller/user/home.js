const Projet = require('../../models/projet')

exports.getHome = async (req, res, next)=>{
    const user = req.session.user
    const projets = await Projet.find()
    res.render('home', { user, projets })
}

exports.postHome = (req, res, next)=>{
    
}