import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function InsertAsset() {
    const [assetName, setAssetName] = useState("");
    const [assetPrice, setAssetPrice] = useState();
    const [assetCategory, setAssetCategory] = useState("");
    const [assetDepreciationPercent, setAssetDepreciationPercent] = useState();
    const [assetManufacturingDate, setAssetManufacturingDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const getAsset = async () => {
            try {
                const res = await fetch(`http://localhost:3001/assets/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();

                if (res.status === 201) {
                    console.log("Data Retrieved.");
                    setAssetName(data.AssetName);
                    setAssetPrice(data.AssetPrice);
                    setAssetCategory(data.AssetCategory);
                    setAssetDepreciationPercent(data.AssetDepreciationPercent);
                    setAssetManufacturingDate(data.AssetManufacturingDate);
                } else {
                    console.log("Something went wrong. Please try again.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getAsset();
    }, [id]);

    const setName = (e) => {
        setAssetName(e.target.value);
    };

    const setPrice = (e) => {
        setAssetPrice(e.target.value);
    };

    const setCategory = (e) => {
        setAssetCategory(e.target.value);
    };

    const setDepreciationPercent = (e) => {
        setAssetDepreciationPercent(e.target.value);
    };

    const setManufacturingDate = (e) => {
        setAssetManufacturingDate(e.target.value);
    };

    const updateAsset = async (e) => {
        e.preventDefault();

        if (!assetName || !assetPrice || !assetCategory || !assetDepreciationPercent || !assetManufacturingDate) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/updateasset/${id}`, {
                method: "PUT",
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

            await response.json();

            if (response.status === 201) {
                alert("Data Updated");
                navigate('/assets');
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid p-5'>
            <h1 className=''>Enter Asset Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="asset_name" className="form-label fs-4 fw-bold">Asset Name</label>
                <input type="text" onChange={setName} value={assetName} className="form-control fs-5" id="asset_name" placeholder="Enter Asset Name" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="asset_price" className="form-label fs-4 fw-bold">Asset Price</label>
                <input type="number" onChange={setPrice} value={assetPrice} className="form-control fs-5" id="asset_price" placeholder="Enter Asset Price" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="asset_category" className="form-label fs-4 fw-bold">Asset Category</label>
                <input type="text" onChange={setCategory} value={assetCategory} className="form-control fs-5" id="asset_category" placeholder="Enter Asset Category" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="asset_depreciation" className="form-label fs-4 fw-bold">Asset Depreciation Percent</label>
                <input type="number" onChange={setDepreciationPercent} value={assetDepreciationPercent} className="form-control fs-5" id="asset_depreciation" placeholder="Enter Asset Depreciation Percent" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="asset_manufacturing_date" className="form-label fs-4 fw-bold">Asset Manufacturing Date</label>
                <input type="date" onChange={setManufacturingDate} value={assetManufacturingDate} className="form-control fs-5" id="asset_manufacturing_date" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/assets" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={updateAsset} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
            </div>
            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    );
}
