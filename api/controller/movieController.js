const Movie = require("../models/movie");


const postMovie = async (req, res) => {

    const movie = new Movie(req.body);
    console.log(req.user);
    if (req.user.isAdmin) {

        try {
            const savedMovie = await movie.save();
            res.send({
                message: "Movie saved successfully",
                status: 200,
                savedMovie,
            });
        }
        catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(401).send({
            message: "You are not authorized to add movie"
        });
    }


}

const updateMovie = async (req, res) => {

    if(req.user.isAdmin){
        const movieId = req.params.id;
        const movieDeatails = req.body;
        try {
            const movie = await Movie.findByIdAndUpdate(movieId, movieDeatails, {
                new: true,
            });

            res.send({
                message: "Movie updated successfully",
                status: 200,
                movie,
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    else{
        res.status(401).send({
            message: "You are not authorized to update movie"
        });
    }
}

const deleteMovie = async (req, res) => {

    if(req.user.isAdmin){
        const movieId = req.params.id;
        try {
            const movie = await Movie.findByIdAndDelete(movieId);

            res.send({
                message: "Movie deleted successfully",
                status: 200,
                movie,
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    else{
        res.status(401).send({
            message: "You are not authorized to delete movie"
        });
    }
}

const getById = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.send({
            message: "Movie found successfully",
            status: 200,
            movie,
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const getAll = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.send({
            message: "Movies found successfully",
            status: 200,
            movies,
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const getAllRandom = async (req, res) => {

    const type = req.query.type;
    let movie;

    try{

        if(type === "series"){
            movie = await Movie.aggregate([
                {$match: {isSeries: true}},
                {$sample: {size: 1}},
            ]);
        } else {
            movie = await Movie.aggregate([
                {$match: {isSeries: false}},
                {$sample: {size: 1}},
            ]);

        }
        res.send({
            message: "Movies found successfully",
            status: 200,
            movie,
        })
    } catch (err) {
        res.status(500).send(err);
    }
}



module.exports = {
    postMovie,
    updateMovie,
    deleteMovie,
    getById,
    getAll,
    getAllRandom

}