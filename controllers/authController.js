const router = require('express').Router();
const authService = require('../services/authService');
const {getErrorMessage} = require("../utils/errorUtils");
const {isGuest} = require("../middlewares/authMiddleWare");

router.get('/register', isGuest,(req, res) => {
    res.render('auth/register');
});


 router.post('/register',isGuest, async (req, res) => {
     const userData = req.body;

     try {
         const token = await authService.register(userData);
         res.cookie('auth', token);

         //todo after successful reg -> go to ..... in this case home page

         res.redirect('/');
     }catch (err) {
         res.render('auth/register', {... userData, error:getErrorMessage(err)});
     }

     //todo
 })

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

 router.post('/login',isGuest,async (req, res) => {
     const loginData = req.body;

     try {
         const token = await authService.login(loginData);
         res.cookie('auth', token)

         //todo after successful login go where? In this case - go home
         res.redirect('/');
     } catch (err) {
         res.render('auth/login', {...loginData, error:getErrorMessage(err)})
     }


 })

//todo logout
router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})



module.exports  = router;