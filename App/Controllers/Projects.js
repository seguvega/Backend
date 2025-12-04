let ProjectModel = require('../Models/Projects');
let UserModel = require('../Models/Users');

module.exports.create = async (req, res, next)=>{

    try {
        let newProject = req.body;
        newProject.owner = req.auth.uid;
        let MongoProject = await ProjectModel.create(newProject);
        res.json(MongoProject);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await ProjectModel.find().populate('owner');

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.GetOne = async (req, res, next)=>{
    try {
        let Project = await ProjectModel.findOne({_id: req.params.id });
        res.json(Project);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.Update = async (req, res, next)=>{

    try {
        let UpdateProject = ProjectModel(req.body);
        UpdateProject._id = req.params.id;
        let result = await ProjectModel.updateOne({_id: req.params.id}, UpdateProject);//Update   
        if(result.modifiedCount > 0)
        {
            res.json({message: 'Project updated successfully'});
        }
        else
        {
            throw new Error('Project not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.Delete = async (req, res, next)=>{

    console.log(req.params);
    try {
        let result = await ProjectModel.deleteOne({_id: req.params.id});//Delete

        if(result.deletedCount > 0)
        {
            res.json({message: 'Project Deleted successfully'});
        }
        else
        {
            throw new Error('Project not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.DeleteAll = async(req, res, next) => {
    try {
        let result = await ProjectModel.deleteMany({});
        if(result.deletedCount > 0)
        {
            res.json({message: 'All the Projects were Deleted'});
        }
        else
        {
            throw new Error('No Projects to delete');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.hasAuthorization = async function(req, res, next){

    try {
        let id = req.params.id
        let inventoryItem = await ProjectModel.findById(id).populate('owner');
        console.log(inventoryItem);

        // If there is no item found.
        if (inventoryItem == null) {
            throw new Error('Item not found.') 
        }
        else if (inventoryItem.owner != null) { 

            if (inventoryItem.owner.id != req.auth.id) { 

                let currentUser = await UserModel.findOne({_id: req.auth.id}, 'admin');
  
                if(currentUser.admin != true){

                    console.log('====> Not authorized');
                    return res.status(403).json(
                        {
                            success: false,
                            message: 'User is not authorized to modify this item.'
                        }
                    );
                }
            }
        }
        next();
    } catch (error) {
        console.log(error);   
        next(error);
    }
}