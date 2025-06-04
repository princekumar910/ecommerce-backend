const jwt = require('jsonwebtoken')
async function verifyToken(verifyToken) {
    // console.log("verifyToken called with token:", token);
    
    if(!verifyToken) {
        return {
            status:false,
            statusCode: 401,
            body: JSON.stringify({ message: "missing authentication token" })
        }
    }
    try {
        const token  = verifyToken.split(" ")[1];
        const decoded = await jwt.verify(token , process.env.JWT_SECRET_KEY)
        return {
            status:true,
            statusCode:200,
            body: JSON.stringify({ message: "Token verified successfully" , decoded })
        } ;
    }catch(error){
        return {
            status:false,
            statusCode: 401,
            body: JSON.stringify({ message: "Unauthorized" })
        }
    }

}
module.exports = verifyToken ;