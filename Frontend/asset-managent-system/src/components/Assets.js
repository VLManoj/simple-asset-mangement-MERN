import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './assets.css'; // Import the CSS file

export default function Assets() {
    const [assetData, setAssetData] = useState([]);
    const [totalAssetValue, setTotalAssetValue] = useState(0);
    const [totalDepreciatedValue, setTotalDepreciatedValue] = useState(0);

    useEffect(() => {
        getAssets();
    }, []);

    useEffect(() => {
        calculateTotalAssetValue();
    }, [assetData]);

    const getAssets = async () => {
        try {
            const res = await fetch("http://localhost:3001/assets", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setAssetData(data);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteAsset = async (id) => {
        const response = await fetch(`http://localhost:3001/deleteasset/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedData = await response.json();
        console.log(deletedData);

        if (response.status === 422 || !deletedData) {
            console.log("Error");
        } else {
            console.log("Asset deleted");
            getAssets();
        }
    };

    const calculateTotalAssetValue = () => {
        let totalValue = 0;
        assetData.forEach(asset => {
            totalValue += parseFloat(asset.AssetPrice);
        });
        setTotalAssetValue(totalValue);
    };

    const calculateDepreciatedValue = (asset) => {
        const originalValue = parseFloat(asset.AssetPrice);
        const depreciationPercent = parseFloat(asset.AssetDepreciationPercent);
        const manufacturingDate = new Date(asset.AssetManufacturingDate);
        const currentDate = new Date();

        const yearsDifference = currentDate.getFullYear() - manufacturingDate.getFullYear();

        // Calculate depreciated value
        const depreciatedValue = originalValue - (originalValue * (depreciationPercent / 100) * yearsDifference);

        return depreciatedValue.toFixed(2);
    };

    useEffect(() => {
        calculateTotalDepreciatedValue();
    }, [assetData]);

    const calculateTotalDepreciatedValue = () => {
        let totalDepreciated = 0;
        assetData.forEach(asset => {
            totalDepreciated += parseFloat(calculateDepreciatedValue(asset));
        });
        setTotalDepreciatedValue(totalDepreciated.toFixed(2));
    };

    return (
        <div className='container-fluid p-5'>
            <h1>Assets Inventory</h1>
            <div className='add_button'>
                <NavLink to="/insertasset" className='btn btn-primary fs-5'> + Add New Asset</NavLink>
            </div>
            <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                <table className="table table-striped table-hover mt-3 fs-5">
                    <thead>
                        <tr className="tr_color">
                            <th scope="col">#</th>
                            <th scope="col">Asset Name</th>
                            <th scope="col">Asset Price</th>
                            <th scope="col">Asset Category</th>
                            <th scope="col">Asset Depreciation Percent</th>
                            <th scope="col">Asset Manufacturing Date</th>
                            <th scope="col">Depreciated Value</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assetData.map((element, id) => {
                                return (
                                    <tr key={element._id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{element.AssetName}</td>
                                        <td>₹{element.AssetPrice}</td>
                                        <td>{element.AssetCategory}</td>
                                        <td>{element.AssetDepreciationPercent}</td>
                                        <td>{element.AssetManufacturingDate}</td>
                                        <td>₹{calculateDepreciatedValue(element)}</td>
                                        <td>
                                            <NavLink to={`/updateasset/${element._id}`} className="btn btn-primary">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </NavLink>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteAsset(element._id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5"></td>
                            <td>Total Asset Value:</td>
                            <td>₹{totalAssetValue.toFixed(2)}</td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td>Total Asset Value after Depreciation:</td>
                            <td>₹{totalDepreciatedValue}</td>
                            <td colSpan="2"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
