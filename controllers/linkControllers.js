const links = require('../models/link')

exports.getAll = async (req, res, next) => {
    res.send("get all post route")
    try{
        const link = await links.findAll();
        res.status(200).json({link});
    }
    catch(err){
        console.log(err);
        next(err);
    }
};

exports.putPost = async (req, res, next) => {
    let link = new links("one","two");
    link.save();
    res.status(201).json({link})
};

exports.getPostById = async (req, res, next) => {
    res.send("by id route")
};
