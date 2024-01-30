const express = require('express')
const router = express.Router()

const homeController = require('../controller/user/home')

const connexionController = require('../controller/user/connexion')
const inscriptionController = require('../controller/user/inscription')

const contactController = require('../controller/user/contact')

const blogController = require('../controller/user/blog')

const compteController = require('../controller/user/compte')

router.get('/', homeController.getHome)
router.post('/', homeController.postHome)

router.get('/connexion', connexionController.getConnexion)
router.post('/connexion', connexionController.postConnexion)

router.get('/inscription', inscriptionController.getInscription)
router.post('/inscription', inscriptionController.postInscription)

router.get('/blog', blogController.getBlog)
router.post('/blog', blogController.postBlog)

router.get('/account', compteController.getCompte)
router.post('/account', compteController.postCompte)

router.get('/contact', contactController.getContact)
router.post('/contact', contactController.postContact)


module.exports = router