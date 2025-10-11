const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactsSchema = new Schema(
    {
        firstname: {type: String},
        lastname: {type: String},
        email: {type: String, unique: true}
    },
    {
         Collections: 'Contacts'
    }
);

ContactsSchema.set('toJSON', {
    versionKey: false,
    //transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Contact', ContactsSchema);