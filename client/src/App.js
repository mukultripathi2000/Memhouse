import React from 'react'
import { Container } from '@material-ui/core'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'

 
const App = () => {
    
    return (
        <BrowserRouter>
            <Container maxWidth="false">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth}/>
                </Switch>
       </Container>
        </BrowserRouter>
    )
}

export default App