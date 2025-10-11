const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: {type: String},
        lastname: {type: String},
        email: {type: String, unique: true},
        password: {type: String},
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    },
    {
         Collections: 'Users'
    }
);

UserSchema.set('toJSON', {
    versionKey: false,
    /*transform:  function(doc, retu) {
        delete retu._id;
    }*/
});

module.exports = mongoose.model('User', UserSchema);