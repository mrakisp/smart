import { api, currencySymbol } from '../../Config';
import React, { useEffect, useState } from 'react';
import { Button, Spin, Card, Col, Row } from 'antd';
import { DatePicker, Space } from 'antd';


const ProfitReport = () => {
  const [currentPage, setCurrentPage] = useState()
  const [orders, setOrders] = useState([])
  const [isFinal, setIsFinal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [totalProfit, setTotalProfit] = useState(0)
  const [totalItems, setTotalPurchasedItems] = useState(0)
  const [dateAfter, setDateAfter] = useState()
  const [datebefore, setDateBefore] = useState()
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [posOrders, setPosOrders] = useState(0)
  const [notposOrders, setNotposOrders] = useState(0)

  
  useEffect(() => {


    if (currentPage > 0) {

      api.get("orders", {
        page: currentPage,
        per_page: 100,
        status: "completed",
        before: datebefore,
        after: dateAfter,
      })
        .then((response) => {
          response.data.forEach((order) => {
            orders.push(order)
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

    let totalProfit = 0
    let totalPurchasedProducts = 0
    let totalRevenue = 0
    let cposOrders = 0
    let cnotPosOrders = 0
    
    orders.forEach((product) => {
      
      if (product.created_via == "checkout"){
        cnotPosOrders = cnotPosOrders + 1;
      }else{
        cposOrders = cposOrders +1;
      }

      if(product.kerdos > 0){
        totalProfit = totalProfit + parseFloat(product.kerdos);
      }
      
      product.line_items.forEach((pro) => {
        if(pro.price > 0){
          totalRevenue = totalRevenue + parseFloat(pro.price*pro.quantity);
          totalPurchasedProducts = totalPurchasedProducts + pro.quantity
        }
        
      })

      //totalPurchasedProducts = totalPurchasedProducts + product.line_items.length
    })
    
    setTotalProfit(totalProfit)
    setNotposOrders(cnotPosOrders)
    setPosOrders(cposOrders)
    setTotalRevenue(totalRevenue)
    setTotalPurchasedItems(totalPurchasedProducts)
    setLoading(false)

  }, [isFinal]);

  // const updateDataFetch = () => {
  //   setLoading(true)
  //   setOrders([])
  //   setIsFinal(false)
  //   setTotalPurchasedItems(0)
  //   setTotalProfit(0)
  //   setCurrentPage(1)
  // }

  const onChangeAfter = (date, dateString) => {
    setDateAfter(dateString + "T00:00:00")
    // setLoading(true)
    // setOrders([])
    // setIsFinal(false)
    // setTotalPurchasedItems(0)
    // setTotalProfit(0)
    // setCurrentPage(1)
  }

  const onChangeBefore = (date, dateString) => {
    setLoading(true)
    setDateBefore(dateString + "T00:00:00")
    setOrders([])
    setIsFinal(false)
    setTotalPurchasedItems(0)
    setTotalProfit(0)
    setCurrentPage(1)
  }

  return (

    <>
      <Row>
      <Space direction="vertical">
          Απο<DatePicker onChange={onChangeAfter} />
        </Space>
        <Space direction="vertical">
          Μεχρι Πριν<DatePicker onChange={onChangeBefore} />
        </Space>
      </Row>
      <Row>
        
        <Col span={3}>
          <Card title="Total Orders" bordered={false}>
            {loading ? <Spin /> : <>{orders.length}</>}
          </Card>
        </Col>
        <Col span={3}>
          <Card title="Pos Orders" bordered={false}>
            {loading ? <Spin /> : <>{posOrders}</>}
          </Card>
        </Col>
        <Col span={3}>
          <Card title="Site Orders" bordered={false}>
            {loading ? <Spin /> : <>{notposOrders}</>}
          </Card>
        </Col>
        <Col span={3}>
          <Card title="Total Items" bordered={false}>
            {loading ? <Spin /> : <>{totalItems}</>}
          </Card>
        </Col>
        <Col span={3}>
          <Card title="Total Revenue" bordered={false}>
            {loading ? <Spin /> : <>{totalRevenue.toFixed(2)} {currencySymbol}</>}
          </Card>
        </Col>
        <Col span={3}>
          <Card title="Profit" bordered={false}>
            {loading ? <Spin /> : <>{totalProfit.toFixed(2)} {currencySymbol}</>}
          </Card>
        </Col>
      </Row>

      {/* <Button type="primary" onClick={updateDataFetch}>Update Stock Stat1s</Button> */}
    </>
  );
}

export default ProfitReport;
