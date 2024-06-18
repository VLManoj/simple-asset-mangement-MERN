import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function InsertAsset() {
    const [assetName, setAssetName] = useState("");
    const [assetPrice, setAssetPrice] = useState();
    const [assetCategory, setAssetCategory] = useState("");
    const [assetDepreciationPercent, setAssetDepreciationPercent] = useState();
    const [assetManufacturingDate, setAssetManufacturingDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setAssetName(e.target.value);
    }

    const setPrice = (e) => {
        setAssetPrice(e.target.value);
    }

    const setCategory = (e) => {
        setAssetCategory(e.target.value);
    };

    const setDepreciationPercent = (e) => {
        setAssetDepreciationPercent(e.target.value);
    };

    const setManufacturingDate = (e) => {
        setAssetManufacturingDate(e.target.value);
    };

    const addAsset = async (e) => {
        e.preventDefault();

        if (!assetName || !assetPrice || !assetCategory || !assetDepreciationPercent || !assetManufacturingDate) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/insertasset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "AssetName": assetName,
                    "AssetPrice": assetPrice,
                    "AssetCategory": assetCategory,
                    "AssetDepreciationPercent": assetDepreciationPercent,
                    "AssetManufacturingDate": assetManufacturingDate
                })
            });

            await res.json();

            if (res.status === 201) {
                alert("Data Inserted");
                setAssetName("");
                setAssetPrice(0);
                setAssetCategory("");
                setAssetDepreciationPercent(0);
                setAssetManufacturingDate("");
                navigate('/assets');
            } else if (res.status === 422) {
                alert("Asset is already added with that category.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
             <h1 className=''>Enter Asset Information</h1>
             
            <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="asset_name" className="form-label fw-bold">Asset Name</label>
                <input type="text" onChange={setName} value={assetName} className="form-control fs-5" id="asset_name" placeholder="Enter Asset Name" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="asset_price" className="form-label fw-bold">Asset Price</label>
                <input type="number" onChange={setPrice} value={assetPrice} className="form-control fs-5" id="asset_price" placeholder="Enter Asset Price" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="asset_category" className="form-label fw-bold">Asset Category</label>
                <input type="text" onChange={setCategory} value={assetCategory} className="form-control fs-5" id="asset_category" placeholder="Enter Asset Category" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="asset_depreciation_percent" className="form-label fw-bold">Asset Depreciation Percent</label>
                <input type="number" onChange={setDepreciationPercent} value={assetDepreciationPercent} className="form-control fs-5" id="asset_depreciation_percent" placeholder="Enter Asset Depreciation Percent" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="asset_manufacturing_date" className="form-label fw-bold">Asset Manufacturing Date</label>
                <input type="date" onChange={setManufacturingDate} value={assetManufacturingDate} className="form-control fs-5" id="asset_manufacturing_date" placeholder="Enter Asset Manufacturing Date" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/assets" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={addAsset} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Inserting...' : 'Insert'}</button>
            </div>
            <div className="col text-center col-lg-6">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
