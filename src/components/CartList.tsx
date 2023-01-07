import React from "react";
import { Table, Button } from "antd";
import { IProduct } from "./Interfaces";

interface DataType {
  title: string;
  dataIndex: string;
  render?: (text: any, index: any, arr: number) => JSX.Element;
}

interface Props {
  data: IProduct[];
  setItemLists: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const CartList = ({ data, setItemLists }: Props) => {
  const columns: DataType[] = [
    { title: "Sl No", dataIndex: "sl" },
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Quantity", dataIndex: "quantity" },
    {
      title: "",
      dataIndex: "",

      render: (item, index, arr) => {
        const addQuantity = () => {
          let updatedData = [...data];
          updatedData[arr]["quantity"] = updatedData[arr]["quantity"] + 1;
          updatedData[arr]["total"] =
            updatedData[arr]["price"] * updatedData[arr]["quantity"];
          setItemLists(updatedData);
        };

        const substQuantity = () => {
          let updatedData = [...data];
          updatedData[arr]["quantity"] =
            updatedData[arr]["quantity"] > 1
              ? updatedData[arr]["quantity"] - 1
              : 1;
          updatedData[arr]["total"] =
            updatedData[arr]["price"] * updatedData[arr]["quantity"];
          setItemLists(updatedData);
        };

        return (
          <>
            <Button onClick={addQuantity}>+</Button>{" "}
            <Button onClick={substQuantity}>-</Button>
          </>
        );
      }
    },

    { title: "Total", dataIndex: "total" },
    {
      title: "Action",
      dataIndex: "",

      render: (item, index, arr) => {
        const deleteItem = () => {
          let xData = [...data];
          let newData = xData.filter(
            xitem => xitem.value !== data[arr]["value"]
          );
          setItemLists(newData);
        };

        return (
          <Button danger onClick={deleteItem}>
            Delete
          </Button>
        );
      }
    }
  ];

  let tableData = data.map((tdata: any, index: number) => {
    return {
      key: index + 1,
      sl: index + 1,
      name: tdata.label,
      price: tdata.price,
      quantity: tdata.quantity,
      total: tdata.total
    };
  });

  return (
    <>
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </>
  );
};

export default CartList;
