const checkAuthentication = (req, res, next) => {
    const { user } = req;

    if (!user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
};

module.exports = checkAuthentication;
