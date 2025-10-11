let ProjectModel = require('../Models/Projects');

module.exports.create = async (req, res, next)=>{

    try {
        let MongoProject = await ProjectModel.create(req.body);
        res.json(MongoProject);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async (req, res, next)=>{
    try {
        let Projects = await ProjectModel.find();
        res.json(Projects);
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