// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // Options for cookies
    const options = {
        expires: process.env.JWT_EXPIRE,
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;