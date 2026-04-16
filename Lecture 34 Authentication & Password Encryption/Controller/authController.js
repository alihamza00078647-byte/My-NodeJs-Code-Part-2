const { check, validationResult } = require("express-validator");
const User  = require('../model/user');
const bcrypt  = require("bcryptjs");



exports.getLoginPage = (req, res, next) => {
    res.render('auth/login', {pageTitle : 'login-page', 
        isLoggedIn : req.isLoggedIn,
        oldInput : { email : "" }
    });
}



exports.postLoginPage = async (req, res, next) => {
    const {email , password} = req.body;
    const user = await User.findOne({email : email});
    if (!user){
        return res.status(422).render('auth/login', {
            pageTitle : 'login page',
            isLoggedIn : false,
            errors : ['User does Not Exists'],
            oldInput : { email }
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return res.status(422).render('auth/login' , {
            pageTitle : 'login page',
            isLoggedIn : false,
            errors : ['Invalid Password'],
            oldInput : { email : "" }
        });
    }


    req.session.isLoggedIn = true;
    
    res.redirect('/');
    // res.cookie('isLoggedIn', true);
    // res.isLoggedIn = true;
}


exports.postLogoutPage = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

exports.getSignUpPage = (req, res, next) => {
    res.render('auth/signup', { pageTitle : 'Sign Up Page', isLoggedIn : req.isLoggedIn,
        oldInput : {firstName : "", lastName : "", email : "", password : "", userType : "" }
    });
}




exports.postSignUpPage = [
    check('firstName')
    .trim()
    .isLength({min : 2})
    .withMessage("Name Must Contain 2 Letters")
    .matches(/[a-zA-Z\s]+$/)
    .withMessage('First Name Only Contains Aplhabets'),
    
    check('lastName')
    .trim()
    .matches(/[a-zA-Z\s]*$/)
    .withMessage('Last Name Only Contains Aplhabets'),

    check('email')
    .trim()
    .isEmail()
    .withMessage('Enter valid Email'),
    

    check('password')
    .trim()
    .isLength({min : 6})
    .withMessage('Minimum Length Must be 6 letters')
    .matches(/[a-z]/)
    .withMessage('Password Must Contains one Lower case')
    .matches(/[A-Z]/)
    .withMessage('Password Must Contains one Upper case')
    .matches(/[@#]/)
    .withMessage('Password Must Contains one Special character'),
   
    check('confirmPassword')
    .trim()
    .custom((value, {req}) => {
        if (value !== req.body.password){
            throw new Error('Password Do Not Match');
        }
        return true;
    }),


    check('userType')
    .notEmpty()
    .withMessage('Please Select one Type')
    .isIn(['user', 'host'])
    .withMessage('Invalid User Type'),
    
    check('terms')
    .notEmpty()
    .withMessage('Please accept Terms & Conditions')
    
    .custom((value, {req}) => {
        if (value !== 'on'){
            throw new Error('Please accept Terms & Conditions');
        }
        return true;
    }),


    (req, res, next) => {
        const {firstName, lastName, email, password, userType} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).render('auth/signup',
                { pageTitle : 'Sign Up Page', 
                isLoggedIn : false,
                errors : errors.array().map(err => err.msg),
                oldInput : { firstName, lastName, email, password, userType }
            });
        }


        bcrypt.hash(password, 12)
        .then(hashedPassword => {       // Will return a Promise
            const user = new User({ firstName, lastName, email, password : hashedPassword, userType });
            return user.save();
        }).then(() => {
            return res.redirect('/login');
        }).catch((err) => {
            return res.status(422).render('auth/signup',
                { pageTitle : 'Sign Up Page', 
                isLoggedIn : false,
                errors : [err.message],
                oldInput : { firstName, lastName, email, password, userType }
            });
        });
    }
]




