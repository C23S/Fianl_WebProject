import React from "react";
import { Card, Row, Col, Pagination } from "antd";

const products = [
  {
    id: 1,
    name: "商品1",
    price: 100,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 2,
    name: "商品2",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 3,
    name: "商品3",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 4,
    name: "商品4",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 5,
    name: "商品5",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 6,
    name: "商品6",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 7,
    name: "商品7",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 8,
    name: "商品9",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
  {
    id: 10,
    name: "商品10",
    price: 150,
    image: "../../../images/Goods/G1.jpg",
  },
];

const pageSize = 12;

const Goods = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = currentPage * pageSize;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {products.slice(startIdx, endIdx).map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img alt={product.name} src={product.image} />}
              title={product.name}
            >
              <p>价格: ¥{product.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        total={totalProducts}
        pageSize={pageSize}
        onChange={handleChangePage}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
};

export default Goods;
