const express = require('express')
const linkControllers = require('../controllers/linkControllers')
const router = express.Router()

// @route GET && POST - /posts/
router
    .route("/")
    .get(linkControllers.getAll)
    .post(linkControllers.putPost)

router.route("/:id").get(linkControllers.getPostById)

module.exports = router
