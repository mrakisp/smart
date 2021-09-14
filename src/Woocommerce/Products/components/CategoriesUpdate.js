
import { api } from '../../../Config';
import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Spin } from 'antd';
import styled from 'styled-components';

const Label = styled.div`
    text-align: left;
    font-size: 16px;
    letter-spacing: 0.4px;
    color: #484848;
`;

const CategoriesUpdate = ({ id }) => {
    // const [attributes, setAttributes] = useState();
    // const [value] = useState();
    // const [stockToUpdate, setStockToUpdate] = useState();
    // const [pricesToUpdate, setPricesToUpdate] = useState();
    // const [updateData, setUpdateData] = useState();
    // const [price, setPrice] = useState();
    // const [salePrice, setSalePrice] = useState();
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("products/categories")
            .then((response) => {
             
            })
            .catch((error) => {
            });


    }, [id]);

    // const updateDataFetch = () => {
    //     setLoading(true);
    //     const data = {
    //         update: updateData
    //     }
    //     api.post("products/" + id + "/variations/batch", data)
    //         .then((response) => {
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log(error.response.data);
    //         });
    // }


    // const onChangePrice = (value) => {

    // }

    return (
        <>
            <Col span={4}>
                <Label>Categories</Label><br />
                {/* {attributes && attributes.map((data) => (

                    <Col key={data.attributes[0].id + data.attributes[0].option}>
                        {data.attributes[0].name + ": " + data.attributes[0].option} <br />
                        <InputNumber key={data.id} min={0} defaultValue={data.stock_quantity ? data.stock_quantity : 0} value={value} onChange={onChangeStock.bind(value, data.id)} />
                    </Col>

                ))}<br />
                {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Stock</Button>} */}
            </Col >
            {/* <Col span={6} style={{ alignSelf: 'normal' }}>
                <Label>Price</Label><br />
                <InputNumber defaultValue={price} value={price} onChange={onChangePrice} /> €<br /><br />
                <Label>Sale Price</Label><br />
                <InputNumber defaultValue={salePrice} value={salePrice} onChange={onChangeSalePrice} /> €<br /><br />
                {loading ? <Spin /> : <Button type="primary" onClick={updateDataFetch}>Update Price</Button>}
            </Col> */}
        </>
    );
}

export default CategoriesUpdate;
