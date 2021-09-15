
// import { api, defaultPerPageProducts } from '../../Config';
import SearchProduct from '../CommonComponents/SearchProduct';
import { Col, Row, Spin } from 'antd';
import React, { useState } from 'react';
import ProductsList from './components/ProductsList';
import styled from 'styled-components';

const colStyles = {
  borderRight: '1px solid #eee',
};

const rowStyles = {
  borderTop: '1px solid #eee',
  margin: '10px 0 0 0', 
  paddingTop: '10px'
};

const Label = styled.div`
    text-align: left;
    font-size: 20px;
    letter-spacing: 0.4px;
    color: #484848;
    background: #1890ff;
    color: #fff;
    padding: 5px 10px 7px;
`;

const OrdersPos = () => {

  const [spinEnabled, setSpinEnabled] = useState(false);
  const [products,setProducts] = useState([])

  const onSearchResult = (value) => {
    let finalProducts = products;
    if(value && value.length === 1 && value[0].wholeModel.type !== "variable"){
      
      const currentProductKey = value[0].key;
      const productExist = finalProducts.find(x => x.key === currentProductKey)
      if(!productExist){
        value.forEach((product) => {
          finalProducts.push(product);
        })
      }
    }
    setProducts([...finalProducts])
    setSpinEnabled(false);
  }

  const onDeleteItem = (id) => {

    let finalProducts = products;
    const itemToBeDeleted = products.findIndex(elem => elem.id === id);
    if(products.length === 1){
      setProducts([]); 
    }else{
      finalProducts.splice(itemToBeDeleted, 1)
      setProducts([...finalProducts]);
    }  
  }

  return (
    <>
      <SearchProduct showSpinnerOnClear={false} onSearchResult={onSearchResult} setSpinEnabled={setSpinEnabled} />
      <Row style={rowStyles}>
        <Col span={12} style={colStyles}>
        <Label>Cart</Label>
          {spinEnabled ? <Spin/>  : <ProductsList onDeleteItem={onDeleteItem} model={products}/>}
        </Col>
        <Col span={12}>
        <Label>Order Details</Label>
        </Col>
      </Row>
    </>

  );
}

export default OrdersPos;
