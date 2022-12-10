const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please your Name"],
        minlength: [3, "Please enter a name at least 3 characters"],
        maxlength: [15, "Name can not big than 15 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        minlength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

// Hash password
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Forgot password
userSchema.methods.getResetToken = function() {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //    hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);

// Reset Password
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {
    // Create Token hash

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTime: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler("Reset password url is invalid or has been expired", 400)
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(
            new ErrorHandler("Password is not matched with the new password", 400)
        );
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save();

    sendToken(user, 200, res);
});