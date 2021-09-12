
import { api } from '../Config';
import { List, Avatar, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    api.get("products", {
      page: page,
      per_page: 5, // 20 products per page
    })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
      })
      .finally(() => {
        // Always executed.
      });
  }

  const handleLoadMore = () => {

    setLoading(true);
    

    api.get("products", {
      page: page+1,
      per_page: 5, // 20 products per page
    })
      .then((response) => {
        setPage(page + 1)
        let products = response.data;
        products.forEach((product) => {
          data.push(product)
        });
        
        setData(data)
        setLoading(false);
      })
      .catch((error) => {
      })
      .finally(() => {
        // Always executed.
      });
  };



  return (
    <div className="demo-infinite-container">

      <List
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.id}</a>}
              description={item.name}
            />
            <div>Content</div>
          </List.Item>
        )}
      >
        <Button type="primary" onClick={handleLoadMore}>Load More</Button>
        {loading && hasMore && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )}
      </List>

    </div>
  );
}

export default Dashboard;
