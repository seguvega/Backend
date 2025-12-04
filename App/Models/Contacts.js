const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactsSchema = new Schema(
    {
        firstname: {type: String},
        lastname: {type: String},
        email: {type: String},
        phoneNumber: {type: String},
        message: {type: String},
        owner: { type: String }

    },
    {
         Collections: 'Contacts'
    }
);

ContactsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
       // delete ret._id
    }
});

module.exports = mongoose.model('Contact', ContactsSchema);