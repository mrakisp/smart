import { api,currencySymbol } from '../../Config';
import React, { useEffect, useState } from 'react';
import { Button, Spin, Card, Col, Row } from 'antd';

const StockReport = () => {
  const [currentPage, setCurrentPage] = useState()
  const [stockProducts, setStockProducts] = useState([])
  const [isFinal, setIsFinal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stockPurchasedPriceProducts, setStockPurchasedPriceProducts] = useState(0)
  const [totalStockItems, setTotalStockItems] = useState(0)
  const [totalPriceToBeSold, setTotalPriceToBeSold] = useState(0)

  useEffect(() => {

    if (currentPage > 0) {
      api.get("products", {
        page: currentPage,
        per_page: 100,
        stock_status: "instock",
        status: "publish",
      })
        .then((response) => {
          response.data.forEach((product) => {
            stockProducts.push(product)
          })
          if (response.data.length > 0) {
            setCurrentPage(currentPage + 1)
          } else {
            setIsFinal(true);
          }

        })
        .catch((error) => {
        });
    }

  }, [currentPage]);

  useEffect(() => {

    let totalPrice = 0;
    let totalStock = 0;
    let totalPriceToSell = 0;

    stockProducts.forEach((product) => {
      let priceKey = product.meta_data.findIndex(elem => elem.key === "price_promitheyth");
      let price = product.meta_data[priceKey] && product.meta_data[priceKey].value ? parseFloat(product.meta_data[priceKey].value) : 0;
      let pricefromstock = price * product.stock_quantity;
      totalPrice = totalPrice + pricefromstock;
      totalStock = totalStock + product.stock_quantity;
      let priceToSellfromStock = product.price && product.stock_quantity ? parseFloat(product.price)*product.stock_quantity : 0;
      totalPriceToSell = totalPriceToSell + priceToSellfromStock;
    })

    setStockPurchasedPriceProducts(totalPrice)
    setTotalStockItems(totalStock)
    setTotalPriceToBeSold(totalPriceToSell)
    setLoading(false)

  }, [isFinal]);

  const updateDataFetch = () => {
    setLoading(true)
    setStockProducts([])
    setIsFinal(false)
    setStockPurchasedPriceProducts(0)
    setCurrentPage(1)
  }
  return (

    <>
    
    <Row>
      <Col span={3}>
        <Card title="Unique SKU Items" bordered={false}>
        
        {loading ? <Spin /> : <>{stockProducts.length}</>}
        </Card>
      </Col>
      <Col span={3}>
        <Card title="Total Stock Items" bordered={false}>
        {loading ? <Spin /> : <>{totalStockItems}</>}
        </Card>
      </Col>
      <Col span={3}>
        <Card title="Total Purchased Price" bordered={false}>
        {loading ? <Spin /> : <>{stockPurchasedPriceProducts.toFixed(2)} {currencySymbol}</>}
        </Card>
      </Col>
      <Col span={3}>
        <Card title="Total Revenue Price" bordered={false}>
        {loading ? <Spin /> : <>{totalPriceToBeSold.toFixed(2)} {currencySymbol}</>}
        </Card>
      </Col>
    </Row>
    
    <Button type="primary" onClick={updateDataFetch}>Update Stock Stats</Button>
    </>
  );
}

export default StockReport;
