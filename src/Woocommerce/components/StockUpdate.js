
import { api } from '../../Config';
import React, { useState, useEffect } from 'react';
import { InputNumber, Col, Button  } from 'antd';

const StockUpdate = ({ id }) => {
    const [attributes, setAttributes] = useState();
    useEffect(() => {
        api.get("products/" + id + "/variations")
            .then((response) => {
                response.data.sort((a, b) => a.id - b.id);

                setAttributes(response.data);
            })
            .catch((error) => {
            });


    }, [id]);

    const updateStock = (page, pageSize) => {
        debugger;
      }

      const onChangeStock = (value) =>  {
        console.log('changed', value);
      }

    return (

        <>
            {attributes && attributes.map((data) => (
   
                    <Col key={data.attributes[0].id + data.attributes[0].option}>
                        {data.attributes[0].name + ": " + data.attributes[0].option} <br/> 
                        <InputNumber key={data.id} min={0} defaultValue={data.stock_quantity ? data.stock_quantity : 0} onChange={onChangeStock} />
                    </Col>
               
            ))}
            <Button type="primary"  onClick={updateStock}>Primary Button</Button>
        </>
    );
}

export default StockUpdate;
