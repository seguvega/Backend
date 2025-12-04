const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectsSchema = new Schema(
    {
        title: {type: String},
        img: {type: String},
        description: {type: String },
        owner: { type: String }
    },
    {
         Collections: 'Projects'
    }
);

ProjectsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id
    }
});

module.exports = mongoose.model('Project', ProjectsSchema);