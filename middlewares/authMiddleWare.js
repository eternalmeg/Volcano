const jwt = require('../lib/jwt');
const SECRET = 'hklhkjhjhjhhkh445hhhkhj';


exports.authMiddleWare = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }
//todo verify token
    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticatad = true;
        //if we have profile etc
        res.locals.user = decodedToken;

        next();

    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }
    next();
}
exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}

