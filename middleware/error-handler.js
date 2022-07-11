const errorHandler = async (err, req, res, nest) => {
    console.log(err)
    return res.status(500).json({msg:"Something went wrong. Try again later aligator"})
}

module.exports = errorHandler