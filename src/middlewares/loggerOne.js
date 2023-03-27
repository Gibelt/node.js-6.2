const loggerOne = (req, res, next) => {
    console.log(req.get('host'));
    next();
};

module.exports = loggerOne;