const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(new ErrorHandler("Please Login for access this resource", 401));
    }

    const decodedData = jwt.verify(authorization, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);
    console.log(req.user);
    next();
});

// Admin Roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`${req.user.role} can not access this resources`)
            );
        }
        next();
    };
};