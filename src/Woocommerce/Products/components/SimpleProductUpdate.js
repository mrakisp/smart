
import { api, currencySymbol } from '../../../Config';
import React, { useState } from 'react';
import { InputNumber, Col, Button, Spin } from 'antd';
import styled from 'styled-components';

const Label = styled.div`
    text-align: left;
    font-size: 16px;
    letter-spacing: 0.4px;
    color: #484848;
`;

const SimpleProductUpdate = ({ id, model }) => {
   

    const [stockValue] = useState();
    const [loading, setLoading] = useState(false);
    const [updateData, setUpdateData] = useState();
    const [price, setPrice] = useState();
    const [salePrice, setSalePrice] = useState();

    const updateDataFetch = () => {
        setLoading(true);
      
        const data = {
            update: [updateData]
        }
        api.post("products/batch", data)
            .then((response) => {
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    const onChangeStock = (value) => {

        let stockToUpdate = {
            id:model.id,
            stock_quantity:value
        }
        setUpdateData(stockToUpdate);
    }

    const onChangeSalePrice = (value) => {

        setSalePrice(value);
        let pricesToUpdate = {
            id:model.id,
            sale_price:value
        }
        setUpdateData(pricesToUpdate);
    }

    const onChangePrice = (value) => {

        setPrice(value);
        let pricesToUpdate = {
            id:model.id,
            regular_price:value
        }
        setUpdateData(pricesToUpdate);
    }

    return (
        <>
            <Col span={4}>
                <Label>Stock</Label><br />
                <Col>
                    <InputNumber min={0} defaultValue={model.stock_quantity ? model.stock_quantity : 0} value={stockValue} onChange={onChangeStock} />
                </Col>
                <br />
                {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Stock</Button>} 
            </Col >
            <Col span={4}>
                <Label>Price</Label><br />
                <InputNumber defaultValue={model.regular_price} value={price} onChange={onChangePrice} /> {currencySymbol}<br /><br />
                <Label>Sale Price</Label><br />
                <InputNumber defaultValue={model.sale_price} value={salePrice} onChange={onChangeSalePrice} /> {currencySymbol}<br /><br />
                {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Price</Button>}
            </Col>
        </>
    );
}

export default SimpleProductUpdate;
