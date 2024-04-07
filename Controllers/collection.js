const collections = require('../models/collections');

exports.addNewCollection = (req, res, next) => {
    const collection = new collections({
        category: req.body.category,
        type: req.body.type,
        title: req.body.title
    });
    collection.save().then(result => {
        res.status(200).json({
            message: "collection added succesfully"
        });
    });
}

exports.updateCollection = (req, res, next) => {
    const collection = new collections({
        type: req.body.type,
        title: req.body.title
    });
    collection.updateOne({ _id: req.params.id }, collection).then(result => {
        console.log(result);
        res.status(200).json({ message: "updated successful" });
    });
}

exports.getCollections = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const getDetailsQuery = collections.find();
    let fetchedDocuments;

    if (pageSize && currentPage) {
        getDetailsQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    getDetailsQuery
        .then(document => {
            fetchedDocuments = document;
            return collections.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: 'Data fetched successfully',
                data: fetchedDocuments,
                totalCount: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error.message
            });
        });
}

exports.deleteCollection = (req, res, next) => {
    collections.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({ message: "data deleted successfully" });
    });
}