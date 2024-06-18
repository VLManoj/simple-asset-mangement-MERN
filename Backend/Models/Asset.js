const mongoose = require('mongoose');
const AssetSchema = new mongoose.Schema(
    {
        AssetName: {
            type: String,
            required: true,
        },
        AssetPrice: {
            type: Number,
            required: true,
        },
        AssetCategory: {
            type: String,
            required: true,
        },
        AssetDepreciationPercent: {
            type: Number
        },
        AssetManufacturingDate: {
            type: Date,
            default: Date.now
        }

    });

const Asset = mongoose.model("Assets", AssetSchema)
module.exports = Asset;
