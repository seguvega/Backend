let ServiceModel = require('../Models/Services');
let UserModel = require('../Models/Users');

module.exports.create = async (req, res, next)=>{

    try {
        let newService = req.body;
        newService.owner = req.auth.uid;
        let MongoService = await ServiceModel.create(newService);
        res.json(MongoService);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async (req, res, next)=>{
    try {
        let Services = await ServiceModel.find();
        res.json(Services);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.GetOne = async (req, res, next)=>{
    try {
        let Service = await ServiceModel.findOne({_id: req.params.id });
        res.json(Service);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.Update = async (req, res, next)=>{

    try {
        let UpdateService = ServiceModel(req.body);
        UpdateService._id = req.params.id;
        let result = await ServiceModel.updateOne({_id: req.params.id}, UpdateService);//Update   
        if(result.modifiedCount > 0)
        {
            res.json({message: 'Service updated successfully'});
        }
        else
        {
            throw new Error('Service not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.Delete = async (req, res, next)=>{

    try {
        let result = await ServiceModel.deleteOne({_id: req.params.id});//Delete

        if(result.deletedCount > 0)
        {
            res.json({message: 'Service Deleted successfully'});
        }
        else
        {
            throw new Error('Service not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.DeleteAll = async(req, res, next) => {
    try {
        let result = await ServiceModel.deleteMany({});
        if(result.deletedCount > 0)
        {
            res.json({message: 'All the Services were Deleted'});
        }
        else
        {
            throw new Error('No Services to delete');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.hasAuthorization = async function(req, res, next){

    try {
        let id = req.params.id
        let inventoryItem = await ServiceModel.findById(id).populate('owner');
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