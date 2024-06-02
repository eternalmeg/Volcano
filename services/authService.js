const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt')
const SECRET = 'hklhkjhjhjhhkh445hhhkhj';

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Password not match')
    }



    const user = await User.findOne({email: userData.email});
    if (user) {
        throw new Error('User already exist');
    }

    //return User.create(userData);
    //todo login directly after register
    const createdUser = await User.create(userData);
    const token =await generateToken(createdUser);
    return token;
}

exports.login = async ({email, password}) => {
    //get user frm db
    const user = await User.findOne({email})

    //check password
    if (!user) {
        throw new Error('Username or pass not valid!')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Username or pass not valid!')
    }

    //generate token


    const token = await generateToken(user)

    return token;
}

function generateToken(user) {

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }
    return jwt.sign(payload, SECRET, {expiresIn: '2h'});

}