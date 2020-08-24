const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


const authenticate = async (req, res, next) => {

    const authToken = req.headers['authorization'];
    

    if(authToken != undefined){

        const bearer = authToken.split(' ');
       
        var token = bearer[1];

        jwt.verify(token, fs.readFileSync(path.resolve(__dirname, "../../api/certs/private.pem")), {algorithms: ['RS256']}, (err, data) => {
            if(err){
                res.status(401).json({
                    message: `Invalid token`,
                    code: '',
                  });
            }else{

                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });

    }else{

        res.status(401).json({
            message: `Invalid token`,
            code: '',
          });
    }
    
}

module.exports = authenticate;