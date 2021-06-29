import React, {useState,useEffect} from 'react'
import { Avatar, Button, Grid, Paper, Typography, Container } from '@material-ui/core'
import useStyles from './styles'
import { GoogleLogin } from 'react-google-login'
import { useDispatch,useStore } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import Icon from './icon';
import { signin, signup ,handleError} from '../../actions/auth'


const Auth = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        confirmPassword:''
    }
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData,setformData]=useState(initialState)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const store=useStore()
    const [error, setError] = useState(store.getState()?.authReducers?.errorMessage)
    const [messageToDisplay,setMessageToDisplay] =useState('')
  
    useEffect(() => {
        setMessageToDisplay(error)
        dispatch(handleError)
    }, [error])
   

    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSignUp)
        {
            await dispatch(signup(formData, history))
            setError(store.getState()?.authReducers?.errorMessage)
            
        }
        else
        {
            await dispatch(signin(formData, history))
            setError(store.getState()?.authReducers?.errorMessage)
        }
   
        
    }
    const handleChange = (e) => {
        setformData({...formData,[e.target.name]:e.target.value})

        
    }
    const handleShowPassword = () => {
        setShowPassword((prev)=>(!prev))
        
    }
    const switchMode = () => {
        setIsSignUp(prev => (!prev))
        setShowPassword(false)
        
        
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        
        try
        {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        }
        catch (error)
        {
            console.log(error)
        }

    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google sign in was unsuccessful. Please try again later")
    }

    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    
                                    <Input name="firstName" label="First Name"  handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name"  handleChange={handleChange}  half />
                                    
                                   
                                    </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
                        {isSignUp &&
                                   <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                        
                    </Grid>
                    <Button type="submit" variant="contained" fullWidth color="primary" className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}

                    </Button>
                    <Typography align='center' variant="body1">Or</Typography>
                    <GoogleLogin
                        clientId="84404238420-ilsv9tugkoboosqpjd3m64t00cc9ks9t.apps.googleusercontent.com"
                        render={
                            (renderProps) => (<Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                
                                Sign in with Google
                                </Button>)
                        }
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                        
                    />
                    {messageToDisplay!==''&&
                        <Typography align='center' variant="body2" style={{color:"red"}}>{messageToDisplay}</Typography>}
                  
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button color="primary" style={{textTransform: 'none'}}onClick={switchMode}>
                            {isSignUp?'Already have an account? Sign In':"Don't have an account? Sign up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
