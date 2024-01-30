const Project = require('../../../models/projet')
const imgbbUploader = require('imgbb-uploader')
const fs = require('fs')
const path = require('path')

exports.getModifProject = async (req, res, next) => {
    const user = req.session.user
    const projectId = req.params.id
    const project = await Project.findById(projectId)
    if (user && user.admin) {
        res.render('admin/project/modifProject', { user, project})
    } else {
        res.redirect('/')
    }
}

exports.postModifProject = async (req, res, next) => {
    const user = req.session.user
    const projectId = req.params.id
    const { name, link } = req.body
    try {
        if (name && user.admin) {
            await Project.findByIdAndUpdate(projectId, {
                $set: {
                    name: name
                }
            })
            console.log('marque mis a jour : ', name)
        }
        if (link && user.admin) {
            await Project.findByIdAndUpdate(projectId, {
                $set: {
                    link: link
                }
            })
            console.log('marque mis a jour : ', link)
        }

        if (req.files && req.files.image && user.admin) {
            const  image  = req.files.image
            let endPathFile = ('/public/img/' + image.name)
            let uploadPath = (path.join(__dirname + '../../../../' + endPathFile))
            console.log(uploadPath)

            image.mv(uploadPath, async function (err) {
                if (err) {
                    return res.status(500).send(err)
                } else {
                    try {
                        const imgbbResponse = await imgbbUploader(process.env.IMGBB_API_KEY, uploadPath);
                        console.log('ImgBB response:', imgbbResponse);
                        await Project.findByIdAndUpdate(projectId, {
                            $set: {
                                image: imgbbResponse.url
                            }
                        })
                        fs.unlinkSync(uploadPath)
                        console.log('image modifier avec succes : ', imgbbResponse.url)
                    } catch (error) {
                        console.error('Error uploading to ImgBB:', error.message);
                        return res.redirect('/admin/portfolio');
                    }
                }
            })
        }
        if (user && user.admin && (req.files || name || link)) {
            const project = await Project.findById(projectId)
            return res.render('admin/project/modifProject', { user, project, message: 'Produit modifié avec succès !'})
        } else {
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/portfolio');
    }
}