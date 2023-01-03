// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;