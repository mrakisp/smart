
import { api,currencySymbol } from '../../../Config';
import React, { useState, useEffect } from 'react';
import { InputNumber, Col, Button, Spin } from 'antd';
import styled from 'styled-components';

const Label = styled.div`
    text-align: left;
    font-size: 16px;
    letter-spacing: 0.4px;
    color: #484848;
`;

const VariationsUpdate = ({ id }) => {
    const [attributes, setAttributes] = useState();
    const [value] = useState();
    const [stockToUpdate, setStockToUpdate] = useState();
    const [pricesToUpdate, setPricesToUpdate] = useState();
    const [updateData, setUpdateData] = useState();
    const [price, setPrice] = useState();
    const [salePrice, setSalePrice] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("products/" + id + "/variations")
            .then((response) => {
                setPrice(response.data[0].regular_price);
                setSalePrice(response.data[0].sale_price);

                response.data.sort((a, b) => a.id - b.id);
                const stockByAttributes = [];
                const priceByAttributes = [];
                response.data.forEach((attribute) => {
                    stockByAttributes.push({
                        id: attribute.id,
                        stock_quantity: attribute.stock_quantity
                    })
                    priceByAttributes.push({
                        id: attribute.id,
                        price: attribute.regular_price,
                        sale_price: attribute.sale_price
                    })
                })
                setStockToUpdate(stockByAttributes);
                setPricesToUpdate(priceByAttributes);
                setAttributes(response.data);
            })
            .catch((error) => {
            });


    }, [id]);

    const updateDataFetch = () => {
        setLoading(true);
        const data = {
            update: updateData
        }
        api.post("products/" + id + "/variations/batch", data)
            .then((response) => {
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    const onChangeStock = (variation_id, value) => {
        let variationIndex = stockToUpdate.findIndex(elem => elem.id === variation_id);
        stockToUpdate[variationIndex].stock_quantity = value;
        setUpdateData(stockToUpdate);
    }

    const onChangeSalePrice = (value) => {

        setSalePrice(value);
        pricesToUpdate.forEach((price) => {
            price.sale_price = value;
        });
        setUpdateData(pricesToUpdate);
    }

    const onChangePrice = (value) => {

        setPrice(value);
        pricesToUpdate.forEach((price) => {
            price.regular_price = value;
        });
        setUpdateData(pricesToUpdate);
    }

    return (
        <>
            <Col span={4}>
                <Label>Stock By Variation</Label><br />
                {attributes && attributes.map((data) => (

                    <Col key={data.attributes[0].id + data.attributes[0].option}>
                        {data.attributes[0].name + ": " + data.attributes[0].option} <br />
                        <InputNumber key={data.id} min={0} defaultValue={data.stock_quantity ? data.stock_quantity : 0} value={value} onChange={onChangeStock.bind(value, data.id)} />
                    </Col>

                ))}<br />
                {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Stock</Button>}
            </Col >
            <Col span={4}>
                <Label>Price</Label><br />
                <InputNumber defaultValue={price} value={price} onChange={onChangePrice} /> {currencySymbol}<br /><br />
                <Label>Sale Price</Label><br />
                <InputNumber defaultValue={salePrice} value={salePrice} onChange={onChangeSalePrice} /> {currencySymbol}<br /><br />
                {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Price</Button>}
            </Col>

            {/* <Row>
                <Col span={4}>
                    {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Stock</Button>}
                </Col >
                <Col span={6}>
                    {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Price</Button>}
                </Col>
            </Row> */}
        </>
    );
}

export default VariationsUpdate;
