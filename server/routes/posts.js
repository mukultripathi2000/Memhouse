const express = require('express')
const auth =require('../middleware/auth.js') 
const router = express.Router()

const {getPosts,createPost,updatePost,deletePost,likePost} =require('../controllers/posts.js')

router.get('/', getPosts)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost',auth, likePost)






module.exports=router