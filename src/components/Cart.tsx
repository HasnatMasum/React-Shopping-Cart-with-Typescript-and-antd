import React, { useState, useCallback } from "react";
import { Col, Row, Select, Button, Typography } from "antd";
import { IProduct } from "./Interfaces";
import CartList from "./CartList";
const { Text, Title } = Typography;
const items: IProduct[] = [
  {
    label: "Coca Cola",
    value: "coca-cola",
    price: 30,
    quantity: 1,
    total: 0
  },
  {
    label: "Pepsi",
    value: "pessi",
    price: 25,
    quantity: 1,
    total: 0
  },
  {
    label: "Fanta",
    value: "fanta",
    price: 25,
    quantity: 1,
    total: 0
  },
  {
    label: "Mojo",
    value: "mojo",
    price: 25,
    quantity: 1,
    total: 0
  },
  {
    label: "Tiger",
    value: "tiger",
    price: 35,
    quantity: 1,
    total: 0
  },
  {
    label: "Speed",
    value: "speed",
    price: 35,
    quantity: 1,
    total: 0
  }
];

const Cart: React.FC = () => {
  const [selectProduct, setSelectProduct] = useState({
    label: "",
    value: "",
    price: 0,
    quantity: 1,
    total: 0
  });
  const [itemLists, setItemLists] = useState<IProduct[]>([]);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 20px",
    marginBottom: "20px"
  };

  const handleChange = (value: string) => {
    let selectedItem = items.filter(item => item.value === value);
    let selectedObj = { ...selectedItem[0] };

    setSelectProduct(selectedObj);
    setIsInputEmpty(false);
    setIsDuplicate(false);
  };

  const addItemHandler = () => {
    //if input is empty
    if (!selectProduct.value) {
      setIsInputEmpty(true);
      return;
    }

    // if product exist in list
    let duplicateItem = itemLists.filter(
      item => item.value === selectProduct.value
    );

    if (duplicateItem.length > 0) {
      setIsDuplicate(true);
      return;
    }

    let newData = {
      ...selectProduct,
      total: selectProduct.price * selectProduct.quantity
    };

    setItemLists([...itemLists, newData]);
    setIsDuplicate(false);
  };

  const totalQuantity = useCallback(
    itemLists.reduce((acc: any, item: IProduct) => acc + item.quantity, 0),
    [itemLists]
  );

  const totalAmount = useCallback(
    itemLists.reduce((acc: any, item: IProduct) => acc + item.total, 0),
    [itemLists]
  );

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <div style={style}>
            <Select
              placeholder="Add product to cart"
              style={{ width: "82%" }}
              onChange={handleChange}
              options={items}
            />
            <Button
              style={{ marginLeft: 20, fontWeight: 700 }}
              onClick={addItemHandler}
            >
              Add to Cart
            </Button>
          </div>
          {isInputEmpty && <Text type="danger">Please Select a Product</Text>}
          {isDuplicate && <Text type="warning">Product already in list</Text>}
          <CartList data={itemLists} setItemLists={setItemLists} />
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Title style={{ margin: 0 }} level={5}>
              Total Product:{" "}
              <span style={{ color: "#006400" }}>{totalQuantity}</span>
            </Title>
            <Title mark style={{ marginTop: 0 }} level={4}>
              Net Amount: {totalAmount}
            </Title>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
