const express = require('express');
const router = express.Router();
const assets = require('../Models/Asset');

//Inserting(Creating) Data:
router.post("/insertasset", async (req, res) => {
    const { AssetName, AssetPrice, AssetCategory,AssetDepreciationPercent,AssetManufacturingDate } = req.body;

    try {
        const pre = await assets.findOne({ AssetName: AssetName })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new assets({ AssetName, AssetPrice, AssetCategory,AssetDepreciationPercent,AssetManufacturingDate })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/assets', async (req, res) => {

    try {
        const getProducts = await assets.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/asset/:id', async (req, res) => {

    try {
        const getProduct = await assets.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateasset/:id', async (req, res) => {
    const { AssetName, AssetPrice, AssetCategory,AssetDepreciationPercent,AssetManufacturingDate } = req.body;

    try {
        const updateProducts = await assets.findByIdAndUpdate(req.params.id, { AssetName, AssetPrice, AssetCategory,AssetDepreciationPercent,AssetManufacturingDate }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteasset/:id', async (req, res) => {

    try {
        const deleteProduct = await assets.findByIdAndDelete(req.params.id);
        console.log("Asset Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;