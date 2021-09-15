import { List, Avatar, Button } from 'antd';

const ProductsList = ({model, onDeleteItem}) => {

  return (
    <List
      itemLayout="horizontal"
      dataSource={model}
      renderItem={item => (
        <List.Item actions={ [<Button onClick={onDeleteItem.bind(this,item.key)}>DELETE</Button>]}>
          <List.Item.Meta
            avatar={<img style={{ maxHeight: '100px' }} src={item.image} />}
            title={item.name}
            description={"Price: " +item.wholeModel.price }
          />
         
        </List.Item>
      )}
    />
  );
}

export default ProductsList;
