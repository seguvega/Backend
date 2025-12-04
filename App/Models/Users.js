const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        uid: { type: String, unique: true, required: "Uid is required",},
        displayName: {type: String },
        email: {type: String, unique: true,  match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]},
        password: {type: String},
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
        admin: {type: Boolean, default: false}
    },
    {
         Collections: 'Users'
    }
);

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model('User', UserSchema);