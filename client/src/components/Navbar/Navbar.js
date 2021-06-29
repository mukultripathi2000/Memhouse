import React,{useState,useEffect} from 'react'
import {Link,useHistory,useLocation} from 'react-router-dom'
import { Typography, AppBar,Toolbar,Avatar,Button } from '@material-ui/core'
import logo from '../../images/logo.png'
import useStyles from './styles'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'


const Navbar = (props) => {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    //console.log(user)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location=useLocation()
    

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        if (token)
        {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime())
                logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
        
        //json webtoken
    },[location])

    return (
        <AppBar className={classes.appBar}  color="inherit" >
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">MemHouse</Typography>
                <img className={classes.image} src={logo} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="body1">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
        
        </AppBar>
        
    )
}

export default Navbar