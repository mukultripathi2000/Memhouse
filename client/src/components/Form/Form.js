import React,{useState,useEffect} from 'react'
import {TextField,Button,Typography,Paper} from '@material-ui/core';
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch,useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({currentId,setCurrentId}) => {
    const post = useSelector((state) => (currentId) ? state.posts.find((p) => p._id === currentId) : null)
    const user=JSON.parse(localStorage.getItem('profile'))
    const [postData, setPostData] = useState({
    
        title: '',
        message: '',
        tags: '',
        selectedFile:''
    })
    const classes = useStyles()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (post)
        {
            setPostData(post)
            }
    },[post])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (currentId)
        {
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
             
        }
        else
        {
            dispatch(createPost({...postData,name:user?.result?.name}))
            
        }
        clear()
        
        
    }
    const clear = () => {
        setCurrentId(null)
        setPostData({
            
            title: '',
            message: '',
            tags: '',
            selectedFile:''
        })
        
    }

    if (!user?.result?.name)
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create post and like other's post!!

                </Typography>

            </Paper>
        )
 
    return (

        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6" >{currentId?'Edit':'Create'} a post</Typography>
                
                <TextField color="primary" name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event) => { setPostData({ ...postData, title: event.target.value }) }} />
                <TextField color="primary" multiline rows={3} name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event) => { setPostData({ ...postData, message: event.target.value }) }} />
                <TextField color="primary" name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event) => { setPostData({ ...postData, tags: event.target.value.split(',') }) }} />
                <div className={classes.fileInput} > <FileBase type="file" multiple={false} onDone={({ base64 }) => { setPostData({ ...postData, selectedFile: base64 }) }} /> </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>

        </Paper>
    )
}

export default Form

