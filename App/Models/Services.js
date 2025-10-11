const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServicesSchema = new Schema(
    {
        title: {type: String},
        description: {type: String }
    },
    {
         Collections: 'Services'
    }
);

ServicesSchema.set('toJSON', {
    versionKey: false,
    //transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Service', ServicesSchema);