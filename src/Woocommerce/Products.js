
import { api, defaultPerPageProducts } from '../Config';
import StockUpdate from './components/StockUpdate';
import { Table } from 'antd';
import React, { useState, useEffect } from 'react';

const per_page = defaultPerPageProducts;

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => {
      return (
        <img alt="product" style={{ maxHeight: '50px' }} src={record.image} />
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '10%',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Sku',
    dataIndex: 'sku',
    width: '10%',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: '10%',
  },
  {
    title: 'Sale Price',
    dataIndex: 'sale_price',
    width: '10%',
  },
  {
    title: 'Stock Status',
    dataIndex: 'stock_status',
    width: '10%',
  },
  {
    title: 'Categories',
    dataIndex: 'categories',
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '10%',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'action',
    render: () => <div>Edit</div>,
    width: '10%',
  },
];

const Products = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [spinEnabled, setSpinEnabled] = useState(false);

  useEffect(() => {

    api.get("reports/products/totals",)
      .then((response) => {
        let simple_productsIndex = response.data.findIndex(elem => elem.slug === "simple");
        let var_productsIndex = response.data.findIndex(elem => elem.slug === "variable");
        const totalCount = response.data[simple_productsIndex].total + response.data[var_productsIndex].total;

        setCount(totalCount);
      })
      .catch((error) => {
      });

    fetchData();

  }, []);

  const fetchData = (state = null, page = 1, pageSize = per_page) => {
    if (state) {
      setSpinEnabled(true);
    }

    api.get("products", {
      page: page,
      per_page: pageSize,
    })
      .then((response) => {
        setSpinEnabled(false);
        setPage(page);

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
            price: product.regular_price ? product.regular_price : product.price,
            sale_price: product.on_sale ? product.price : product.sale_price,
            stock_status: product.stock_status,
            status: product.status,
            categories: product_categories,
            description: product.description,
          })
        });
        setData(productsData);
        
      })
      .catch((error) => {
      });
  }

  const changePage = (page, pageSize) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    fetchData('pageChanged', page, pageSize);
  }

  return (
    <Table
      loading={spinEnabled}
      columns={columns}
      expandable={{
        expandedRowRender: record => <StockUpdate id={record.id}/>,
        rowExpandable: record => record.name !== 'Not Expandable',
      }}
      dataSource={data}
      pagination={{ current: page, total: count, defaultPageSize: per_page, onChange: changePage }}
    />
  );
}

export default Products;
