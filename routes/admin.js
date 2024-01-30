const express = require('express')
const router = express.Router()

const adminController = require('../controller/admin/admin')

const addProjectController = require('../controller/admin/project/addProject')
const deleteAdminController = require('../controller/admin/project/deleteProject')
const modifAdminController = require('../controller/admin/project/modifProject')
const projectAdminController = require('../controller/admin/project/adminProject')

const addBlogController = require('../controller/admin/blog/addBlog')
const blogAdminController = require('../controller/admin/blog/adminBlog')

router.get('/admin', adminController.getAdmin)
router.post('/admin', adminController.postAdmin)

router.get('/admin/portfolio', projectAdminController.getProjectAdmin)
router.post('/admin/portfolio', projectAdminController.postProjectAdmin)

router.get('/admin/portfolio/add', addProjectController.getAddProject)
router.post('/admin/portfolio/add', addProjectController.postAddProject)

router.get('/admin/portfolio/delete-projet/:id', deleteAdminController.getDeleteProject)
router.post('/admin/portfolio/delete-projet/:id', deleteAdminController.postDeleteProject)

router.get('/admin/portfolio/modif-projet/:id', modifAdminController.getModifProject)
router.post('/admin/portfolio/modif-projet/:id', modifAdminController.postModifProject)

router.get('/admin/blog', blogAdminController.getBlogAdmin)
router.post('/admin/blog', blogAdminController.postBlogAdmin)

router.get('/admin/blog/add', addBlogController.getAddBlog)
router.post('/admin/blog/add', addBlogController.postAddBlog)

module.exports = router