module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.role === requiredRole) {
            return next()
        }
        else
        {
            res.status(403).send('Unauthorized')
        }
    }
}