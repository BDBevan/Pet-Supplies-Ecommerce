// import { useState } from "react";
// import { Container, Row, Col, Form } from "react-bootstrap";
// import ProductGrid from "../components/Product/ProductGrid";
// import CategoryFilter from "../components/Common/CategoryFilter";
import { useParams } from "react-router-dom";

const Collections = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [sortBy, setSortBy] = useState("featured");
  const { category } = useParams();
  console.log(category);

  return (
    // <div className="collections-container">
    //   <Container>
    //     <Row className="my-4">
    //       <Col md={8}>
    //         <Form.Control
    //           type="search"
    //           placeholder="Search products..."
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           className="search-input"
    //         />
    //       </Col>
    //       <Col md={4}>
    //         <Form.Select
    //           value={sortBy}
    //           onChange={(e) => setSortBy(e.target.value)}
    //         >
    //           <option value="featured">Featured</option>
    //           <option value="price-asc">Price: Low to High</option>
    //           <option value="price-desc">Price: High to Low</option>
    //           <option value="newest">Newest</option>
    //         </Form.Select>
    //       </Col>
    //     </Row>

    //     <Row>
    //       <Col md={3}>
    //         <CategoryFilter />
    //       </Col>
    //       <Col md={9}>
    //         <ProductGrid />
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
    <div> Collections </div>
  );
};

export default Collections;
