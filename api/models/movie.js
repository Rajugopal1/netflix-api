const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: { type: String, required: true },
    image: { type: String},
    imageTitle: { type: String},
    imageSmall: { type: String},
    trailer: { type: String},
    video: { type: String},
    year: { type: String},
    limit: { type: Number},
    gener: { type: String},
    isSeries: { type: Boolean, default: false},
     
    
},
{
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;