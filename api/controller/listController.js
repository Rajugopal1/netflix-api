const List = require('../models/list');

const postList = async (req, res) => {

    const list = new List(req.body);
    if (req.user.isAdmin) {

        try {
            const savedList = await list.save();
            res.send({
                message: "List saved successfully",
                status: 200,
                savedList,
            });
        }
        catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(401).send({
            message: "You are not authorized to add list"
        });
    }

}

const deleteList = async (req, res) => {

    if (req.user.isAdmin) {
        const listId = req.params.id;
        try {
            const list = await List.findByIdAndDelete(listId);

            res.send({
                message: "List deleted successfully",
                status: 200,
                list,
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.status(401).send({
            message: "You are not authorized to delete list"
        });
    }

}

const getAllLists = async (req, res) => {
    const type = req.query.type;
    const gener = req.query.gener;
    let lists = [];

    try {
        if (type && gener) {
            lists = await List.find({ type: type, gener: gener });
        }
        else if (type) {
            lists = await List.find({ type: type });
        }
        else if (gener) {
            lists = await List.find({ gener: gener });
        }
        else {
            lists = await List.find();
        }
        res.send({
            message: "Lists found successfully",
            status: 200,
            lists,
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    postList,
    deleteList,
    getAllLists,
}