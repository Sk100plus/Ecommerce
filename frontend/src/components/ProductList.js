import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    // Fetch products from server
    const getProducts = async () => {
        try {
            let result = await fetch(`${window.location.origin}/products`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    // Delete product and refresh the product list
    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                getProducts(); // Refresh the product list after deletion
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    // Handle product search
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key.length === 0) {
            getProducts(); // If search is cleared, fetch all products again
            return;
        }

        try {
            let result = await fetch(`${window.location.origin}/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h3 className='text-center my-4'>Product List</h3>
                    <div className='input-group mb-3'>
                        <input 
                            type="text"
                            placeholder='Search Product' 
                            className='form-control'
                            onChange={searchHandle} 
                        />
                    </div>
                    <div className='table-responsive'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>S. No</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Company</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>Rs {item.price}</td>
                                            <td>{item.category}</td>
                                            <td>{item.company}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-danger btn-sm me-2'
                                                    onClick={() => deleteProduct(item._id)}
                                                >
                                                    Delete
                                                </button>
                                                <Link 
                                                    to={`/update/${item._id}`}
                                                    className='btn btn-primary btn-sm'
                                                >
                                                    Update
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
