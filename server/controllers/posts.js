const mongoose = require('mongoose')
const PostMessage=require('../models/postMessage.js')


const getPosts = async (req, res) => {
    try
    {
        const PostMessages = await PostMessage.find()
        //console.log(PostMessages)

        return res.status(200).json(PostMessages)
        
    }
    catch (error)
    {
        return res.status(400).json({message:error.message})
    }
    
}

const createPost = async (req, res) => {
    const post = req.body
    const newPost=new PostMessage({...post, creator:req.userId,createdAt:new Date().toISOString()})

    try
    {
        await newPost.save()

        return res.status(201).json(newPost)
    }
    catch (error)
    {
        return res.status(409).json({message:error.message})
    }
}


const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post=req.body
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id')
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true })
    
    return res.json(updatedPost)

   
}
const deletePost = async (req, res) => {
    const { id: _id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id')
    
    await PostMessage.findByIdAndDelete(_id)
    
    return res.json({message:'Post Deleted Successfully'})

   
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    return res.status(200).json(updatedPost);
}





module.exports={getPosts,createPost,updatePost,deletePost,likePost}