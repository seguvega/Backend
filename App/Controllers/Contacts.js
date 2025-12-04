let ContactModel = require('../Models/Contacts');
let UserModel = require('../Models/Users');

module.exports.create = async (req, res, next)=>{

    try {
        let newContact = req.body;
        newContact.owner = req.auth.uid;
        let MongoContact = await ContactModel.create(newContact);
        res.json(MongoContact);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await ContactModel.find().populate('owner');

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.GetOne = async (req, res, next)=>{
    try {
        let Contact = await ContactModel.findOne({_id: req.params.id });
        res.json(Contact);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.Update = async (req, res, next)=>{
  try {
    //safe way to update usinf $set operator
    const result = await ContactModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (result.modifiedCount > 0)
         {
      res.json({ message: 'Contact updated successfully' });
    } 
    else if (result.matchedCount === 0) 
    {
      throw new Error('Contact not found');
    } 
    else 
    {
      res.json({ message: 'No changes were made' });
    }
    } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports.Delete = async (req, res, next)=>{

    try {
        let result = await ContactModel.deleteOne({_id: req.params.id});//Delete

        if(result.deletedCount > 0)
        {
            res.json({message: 'Contact Deleted successfully'});
        }
        else
        {
            throw new Error('Contact not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.DeleteAll = async(req, res, next) => {
    try {
        let result = await ContactModel.deleteMany({});///I can send an array of ids
        if(result.deletedCount > 0)
        {
            res.json({message: 'All the Contacts were Deleted'});
        }
        else
        {
            throw new Error('No Contacts to delete');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.hasAuthorization = async function(req, res, next){

    try {
        let id = req.params.id
        let inventoryItem = await ContactModel.findById(id).populate('owner');
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