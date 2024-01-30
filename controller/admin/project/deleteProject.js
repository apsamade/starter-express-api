const Project = require('../../../models/projet')

exports.getDeleteProject = async (req, res, next)=>{
    const user = req.session.user
    const projectId = req.params.id
    const project = await Project.findById(projectId)
    if(user && user.admin){
        res.render('admin/project/deleteProject', { user, project })
    }else{
        res.redirect('/')
    }
}

exports.postDeleteProject = async (req, res, next)=>{
    const user = req.session.user
    const projectId = req.params.id
    try {
        if(user && user.admin){
            await Project.findByIdAndDelete(projectId)
            console.log('Project détruit avec succès !')
            res.render('admin/project/deleteProject', { user, message: 'Projet supprimer avec succès !'})
        }else{
            res.redirect('/connexion')
        }        
    } catch (error) {
        console.log(error)
        const project = await Project.findById(projectId)
        res.render('admin/project/deleteProject', { user, project })
    }

}