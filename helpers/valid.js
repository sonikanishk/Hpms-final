const {
    check
} = require('express-validator');
exports.validSign = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('Name must be between 4 to 32 characters'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
]

exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'Password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
]


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long')
];

exports.queryValidator = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('Name must be between 4 to 32 characters'),

    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid Email address'),
    
    check('number')
        .not()
        .isEmpty()
        .isMobilePhone()
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage('Must be a valid Phone Number'),
        
    
];

exports.donorValidator = [
    check('first_name', 'Name is required').notEmpty()
    .isLength({
        min: 2,
        max: 32
    }).withMessage('First Name must be between 2 to 32 characters'),
    
    check('last_name', 'Last Name is required').notEmpty()
    .isLength({
        min: 2,
        max: 32
    }).withMessage('Last Name must be between 2 to 32 characters'),

    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid Email address'),
    
    check('number')
        .not()
        .isEmpty()
        .isMobilePhone()
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage('Must be a valid Phone Number'),
        
    
];

exports.doctorValidator = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 3,
        max: 32
    }).withMessage('Name must be between 4 to 32 characters'),
    
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid Email address'),
    
    check('phone')
        .not()
        .isEmpty()
        .isMobilePhone()
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage('Must be a valid Phone Number'),
        
    
];

exports.staffValidator = [
    check('first_name', 'Name is required').notEmpty()
    .isLength({
        min: 2,
        max: 32
    }).withMessage('First Name must be between 3 to 32 characters'),
    
    check('last_name', 'Name is required').notEmpty()
    .isLength({
        min: 2,
        max: 32
    }).withMessage('Last Name must be between 3 to 32 characters'),
    
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid Email address'),
    
    check('phone')
        .not()
        .isEmpty()
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage('Must be a valid Phone Number'),
        
    
];