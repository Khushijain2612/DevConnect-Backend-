const User = require("../models/User");

exports.getMyProfile = async (req, res)=>{
    try{
        const user = await User.findById(req.user.id)
            .select("-password");

        res.json(user);
    } catch (error) {
        res.status(500).json({ messgae: error.message });
    }
};