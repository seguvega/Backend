const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectsSchema = new Schema(
    {
        title: {type: String},
        completion: {type: Date},
        description: {type: String }
    },
    {
         Collections: 'Projects'
    }
);

ProjectsSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Project', ProjectsSchema);