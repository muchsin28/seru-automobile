const authorized = async (req, res, next) => {
  try {
    const { is_admin } = req.user

    if (!is_admin) {
      return res.status(403).json({ message: 'Unautorized !' })
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authorized
