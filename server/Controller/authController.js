const User = require('../Model/userModels')
const jwt = require('jsonwebtoken')
const promisify = require('util').promisify


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}
exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        const token = signToken(newUser._id)
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new AppError('Please provide an email and password'))
        }
        const user = await User.findOne({ email }).select('+password')
        const correct = await user.correctPassword(password, user.password)

        if (!user || !await user.correctPassword(password, user.password)) {
            // return next(new AppError('Incorrect email or password', 401))
            return res.json({status:"error",message:"Incorrect email or password"})
        }

        const token = signToken(user._id)
        res.status(200).json({
            role:user.role,
            status: 'success',
            token,
            message:"login Successfull"
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}




exports.protect = async(req,res,next)=>{
    try{
        const{loginjwt} = req.body
        const decoded = await promisify(jwt.verify)(loginjwt, process.env.JWT_SECRET)
        console.log(decoded)
        // 3) check if user still exits
        const freshUser = await User.findById(decoded.id)
        if(!freshUser){
            return res.json({message:"the user belonging to this token no longer exist",status:"error"})
        }
        console.log("freshUser",freshUser)
        //Grant access to protected route
        // req.user =freshUser
        return res.json({message:"valid token",user:freshUser,status:"success"})
        // next()


    }catch(err){
        res.status(500).json({error:err.message})
    }
}
