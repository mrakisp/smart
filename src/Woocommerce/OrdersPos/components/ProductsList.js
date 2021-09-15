import { List, Avatar, Button } from 'antd';

const ProductsList = ({model, onDeleteItem}) => {

  return (
    <List
      itemLayout="horizontal"
      dataSource={model}
      renderItem={item => (
        <List.Item actions={ [<Button onClick={onDeleteItem.bind(this,item.key)}>DELETE</Button>]}>
          <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={item.name}
            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
         
        </List.Item>
      )}
    />
  );
}

export default ProductsList;
