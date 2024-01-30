const Projet = require('../../../models/projet')

exports.getProjectAdmin = async (req, res, next)=>{
    const user = req.session.user
    const projets = await Projet.find()
    if(user && user.admin){
        res.render('admin/project/projectAdmin', { user, projets })
    }else{
        res.redirect('/')
    }
}

exports.postProjectAdmin = (req, res, next)=>{

}