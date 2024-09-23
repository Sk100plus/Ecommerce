import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch(`${window.location.origin}/products`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`${window.location.origin}/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();

        if (result) {
            getProducts();
        }
    };
    
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (!key) {
            getProducts();
        } else {
            let result = await fetch(`${window.location.origin}/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
    };

    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input 
                type="text" 
                placeholder='Search Product' 
                className='search-product-box'
                onChange={searchHandle} 
            />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
                <li>Company</li>
            </ul>

            {
                products.length > 0 ? (
                    products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>Rs {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id}>Update</Link>
                            </li>
                        </ul>
                    )
                ) : (
                    <h4>No Products Found</h4>
                )
            }
        </div>
    );
};

export default ProductList;

