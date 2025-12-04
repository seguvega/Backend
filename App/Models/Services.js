const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServicesSchema = new Schema(
    {
        title: {type: String},
        img: {type: String},
        description: {type: String },
        owner: { type: String }
    },
    {
         Collections: 'Services'
    }
);

ServicesSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
       // delete ret._id
    }
});

module.exports = mongoose.model('Service', ServicesSchema);