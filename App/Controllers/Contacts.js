let ContactModel = require('../Models/Contacts');

module.exports.create = async (req, res, next)=>{

    try {
        let MongoContact = await ContactModel.create(req.body);
        res.json(MongoContact);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.list = async (req, res, next)=>{
    try {
        let contact = await ContactModel.find();
        res.json(contact);
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
        let result = await ContactModel.deleteMany({});
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