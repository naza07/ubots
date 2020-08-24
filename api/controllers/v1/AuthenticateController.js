const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const DB = 
    {
        users : [
            {
                id: 1,
                name: "Alessandro Nazário",
                email: "alessandro.nazario@gmail.com",
                password: "nazario@12345"
            },
            {
                id: 2,
                name: "Ubots",
                email: "ubots@ubots.com",
                password: "ubots@12345"
            }
        ]
    }


const login = async (req, res, next) => {
    try {
        
        var {email, password} = req.body;

        if(email != undefined){

            var user = DB.users.find(u => u.email == email);

            if(user != undefined){

                if(user.password == password){

                    var payload = {id: user.id, email: user.email};

                    jwt.sign(
                        payload,
                        fs.readFileSync(path.resolve(__dirname, "../../certs/private.pem")),
                        {
                          expiresIn: '8h',
                          algorithm: 'RS256',
                        },
                        (err, token) => {
                            if(err){
                                return res.status(500).json({
                                    message: `Try again tomorrow`,
                                    code: 'INTERNAL_SERVER_ERROR',
                                  });
                            }else{
                                return res.status(200).json({ token_type: 'Bearer', access_token: `${token}`});
                            }
                        }

                      );

                }else{
                    return res.status(401).json({
                        message: `Invalid credentials`,
                        code: 'UNAUTHORIZED',
                      });
                }

            }else{
                return res.status(404).json({
                    message: `Not found`,
                    code: 'NOT_FOUND',
                  });
            }
           
        }else{
            return res.status(400).json({
                message: `Invalid email: ${email}`,
                code: 'INVALID_EMAIL',
              });
        }
        
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
};