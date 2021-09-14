
import { api } from '../../../Config';
import React, { useState, useEffect } from 'react';
import { Input, Row, Col, } from 'antd';
import styled from 'styled-components';

const { Search } = Input;
const _ = require('lodash');

const Label = styled.div`
    text-align: left;
    font-size: 16px;
    letter-spacing: 0.4px;
    color: #484848;
`;

const SearchProduct = ({ onSearchResult, setSpinEnabled }) => {

    const [results, setResults] = useState()


    const onSearch = (type, value) => {

        const data = {}
        let endopoint = "products";
        if (type !== "id") {
            data[type] = value;
        } else {
            endopoint = "products/" + value;
        }

        const typeValue = type;

        setSpinEnabled(true);

        api.get(endopoint, _.isEmpty(data) ? null : data)
            .then((response) => {

                let products = []

                if (typeValue === 'id') {
                    products.push(response.data);
                } else {
                    products = response.data;
                }

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

        <Row>
            <Col span={6} style={{ margin: '0 50px 20px 0' }}>
                <Label>Search SKU</Label>
                <Search id="sku" placeholder="Search By SKU" onSearch={onSearch.bind(this, 'sku')} enterButton allowClear={true} />
            </Col>
            <Col span={6}>
                <Label>Search ID</Label>
                <Search id="id" placeholder="Search By ID" onSearch={onSearch.bind(this, 'id')} enterButton allowClear={true} />
            </Col>
            {/* <Search  placeholder="Search By MPN" onSearch={onSearch.bind(this, 'mpn')} enterButton allowClear={true}/> */}
        </Row>

    );
}

export default SearchProduct;
