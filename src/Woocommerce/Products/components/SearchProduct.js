
import { api } from '../../../Config';
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchProduct = ({ onSearchResult }) => {

    const [results, setResults] = useState()

    const onSearch = (value) => {

        api.get("products", {
            sku: value
        })
            .then((response) => {
                let products = response.data;
                let productsData = [];

                products.forEach((product) => {
                    let product_categories = '';
                    if (product.categories && product.categories.length > 0) {
                        product.categories.forEach((category, index) => {
                            if (index < product.categories.length - 1) {
                                product_categories += category.name + ', ';
                            } else {
                                product_categories += category.name;
                            }
                        })
                    }

                    productsData.push({
                        key: product.id,
                        image: product.images && product.images.length > 0 ? product.images[0].src : undefined,
                        name: product.name,
                        sku: product.sku,
                        id: product.id,
                        price: product.price,
                        sale_price: product.sale_price,
                        stock_status: product.stock_status,
                        status: product.status,
                        categories: product_categories,
                        description: product.description,
                    })
                });
                setResults(productsData);
            })
           
            .catch((error) => {
            });


    }

    useEffect(() => {
        onSearchResult(results)
    }, [results]);

    return (
        <>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </>
    );
}

export default SearchProduct;
