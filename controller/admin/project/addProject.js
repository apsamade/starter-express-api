const Projet = require('../../../models/projet')
const fs = require('fs')
const imgbbUploader = require('imgbb-uploader');
const path = require('path')

exports.getAddProject = async (req, res, next) => {
    const user = req.session.user
    if (user && user.admin) {
        res.render('admin/project/addProject', { user })
    } else {
        res.redirect('/')
    }
}

exports.postAddProject = async (req, res, next) => {
    const user = req.session.user
    const { name, link } = req.body
    const { image } = req.files
    let endPathFile = ('/public/img/' + image.name)
    let uploadPath = (path.join(__dirname + '../../../../' + endPathFile))
    if (user && user.admin) {
        if (name && link && image) {
            image.mv(uploadPath, async function (err) {
                if (err) {
                    return res.status(500).send(err)
                } else {
                    try {
                        const imgbbResponse = await imgbbUploader(process.env.IMGBB_API_KEY, uploadPath);
                        console.log('ImgBB response:', imgbbResponse);
                        const projet = new Projet({
                            name: name,
                            link: link,
                            image: imgbbResponse.url
                        });
                        await projet.save();
                        fs.unlinkSync(uploadPath)
                        res.render('admin/project/addProject', {user, message: 'Projet ajouté avec succès !', projet})
                    } catch (error) {
                        console.error('Error uploading to ImgBB:', error.message);
                        res.redirect('/admin');
                    }
                }
            })
        } else {

        }
    } else {
        res.redirect('/')
    }

}