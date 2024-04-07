const express = require("express");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const collectionController = require('../Controllers/collection')

router.post("/indian/addNew", checkAuth, collectionController.addNewCollection);

router.put("/updateCollection/:id", checkAuth, collectionController.updateCollection);

router.get("/getDressDetails", collectionController.getCollections);

router.delete("/deleteDressDetailsByID/:id", checkAuth, collectionController.deleteCollection);

module.exports = router;
