let UserModel = require('../Models/Users');

module.exports.Create = async (req, res, next)=>{
    try {
        let newUser = req.body;
        let MongoUser = await UserModel.create(newUser);
        res.json(MongoUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports.List = async (req, res, next)=>{
    try {
        let users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.GetOne = async (req, res, next)=>{
    try {
        let user = await UserModel.findOne({_id: req.params.id });
        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.Update = async (req, res, next)=>{
    try {
        let UpdateUser = UserModel(req.body);
        UpdateUser._id = req.params.id;
        UpdateUser.CreatedAt = Date.now();
        let result = await UserModel.updateOne({_id: req.params.id}, UpdateUser);//Update   
        if(result.modifiedCount > 0)
        {
            res.json({message: 'User updated successfully'});
        }
        else
        {
            throw new Error('User not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.Delete = async (req, res, next)=>{
    try {
        let result = await UserModel.deleteOne({_id: req.params.id});//Delete

        if(result.deletedCount > 0)
        {
            res.json({message: 'User Deleted successfully'});
        }
        else
        {
            throw new Error('User not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.DeleteAll = async(req, res, next) => {
    try {
        let result = await UserModel.deleteMany({});
        if(result.deletedCount > 0)
        {
            res.json({message: 'All the Users were Deleted'});
        }
        else
        {
            throw new Error('No Users to delete');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}