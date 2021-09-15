
// import { api, defaultPerPageProducts } from '../../Config';
import SearchProduct from '../CommonComponents/SearchProduct';
import { Col, Row, Spin } from 'antd';
import React, { useState } from 'react';
import ProductsList from './components/ProductsList';

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
      <Row>
        <Col span={12}>
          {spinEnabled ? <Spin/>  : <ProductsList onDeleteItem={onDeleteItem} model={products}/>}
        </Col>
        <Col span={12}>
          user inputs
        </Col>
      </Row>
    </>

  );
}

export default OrdersPos;
