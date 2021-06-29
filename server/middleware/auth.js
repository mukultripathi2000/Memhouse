const jwt = require('jsonwebtoken')

const auth = async (req, res ,next) => {

    try
    {
        //console.log(req.headers)
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500//our own token otherwise google auth token
        
        let decodedData

        if (token && isCustomAuth)
        {
            decodedData = jwt.verify(token, 'test')
            req.userId=decodedData?.id                  //for our own token
        }
        else
        {
            decodedData = jwt.decode(token)             // for google auth token
            req.userId=decodedData?.sub                 // sub is google's name for every single user for differentiation
        }
        next()
        
    }
    catch (error)
    {
        console.log(error)
        
    }
    
}

module.exports=auth