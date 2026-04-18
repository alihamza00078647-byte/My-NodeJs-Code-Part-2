const User = require('../model/user');
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');




exports.getLoginPage = (req, res, next) => {
    res.render('auth/login', { pageTitle: 'Login Page', 
        isLoggedIn: req.isLoggedIn,
        user : {}
    });
}



exports.postLoginPage = async (req, res, next) => {
    const {email , password} = req.body;

    const user = await User.findOne({email : email});

    if (!user){
        return res.status(422).render('auth/login', {
            pageTitle : 'Log in',
            isLoggedIn : false,
            errors : ['User Does Not Exist'],
            oldInput : {email : email}
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

    
    req.session.myUser = {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
    };

    req.session.isLoggedIn = true;    
    res.redirect('/');
}



exports.postLogoutPage = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}


exports.getSignupPage = (req, res, next) => {
    res.render('auth/sign-up', { pageTitle: 'Signup Page', 
        isLoggedIn: req.isLoggedIn,
        oldInput : {firstName : "", lastName : "", email : "", password : "", userType : ""},
        user : {}
    });
}




exports.postSignupPage = [

    check('firstName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('First Name Must Contains 2 Aplhabets')
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
        .withMessage('password Must 6 letters')
        .matches(/[a-z]/)
        .withMessage('Password Must Contain One upper case letter')
        .matches(/[A-Z]/)
        .withMessage('Password Must Contain One upper case letter')
        .matches(/[@]/)
        .withMessage('Password Must Contain One Special Character'),


    check('ConfirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password Do Not Match')
            }
            return true;
        }),

    check('userType')
        .notEmpty()
        .withMessage('Please Select One Option')
        .isIn(['user', 'host'])
        .withMessage('Invalid User Type'),


    check('terms')
        .notEmpty()
        .withMessage('Agree Terms & Conditions')
        .custom((value, { req }) => {
            if (value !== 'on') {
                throw new Error('Please Agree Terms & Conditions')
            }
            return true;
        }),
        

        (req, res, next) => {
        const { firstName, lastName, email, password, userType } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).render('auth/sign-up',
                {
                    pageTitle: 'sign up',
                    isLoggedIn: false,
                    errors: errors.array().map(err => err.msg),
                    oldInput: { firstName, lastName, email, password, userType },
                    user : {}
                }
            );
        }



        bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({ firstName, lastName, email, password: hashedPassword, userType });
                return user.save();
            }).then(() => {
                return res.redirect('/login');
            }).catch((err) => {
                return res.status(422).render('auth/sign-up', {
                    pageTitle: 'Sign up',
                    isLoggedIn: false,
                    errors: [err.message],
                    oldInput: { firstName, lastName, email, password, userType },
                    user : {}
                });
            }
        );
    }
]

