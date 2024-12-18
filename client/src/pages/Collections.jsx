import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import { products } from "../Stub";
import { useOutletContext } from "react-router-dom";
import "../styles/Collections.css";

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCartItems, cartCount } = useOutletContext();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const handleQuantityChange = (productId, change) => {
    setProductQuantities((prev) => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + change);
      return { ...prev, [productId]: newQty };
    });
  };

  // Initialize sorted products
  useEffect(() => {
    const filtered = category
      ? products.filter((product) => product.collections === category)
      : products;
    setSortedProducts(filtered);
  }, [category]);

  const filteredProducts = category
    ? products.filter((product) => product.collections === category)
    : products;

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
      handleSearch(searchQuery);
    }
  }, [searchParams]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm.trim() });
      handleSearch(searchTerm.trim());
    }
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    const filtered = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedProducts(filtered);
  };

  // Sort functionality
  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sorted = [...filteredProducts];

    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        sorted = filteredProducts;
    }

    setSortedProducts(sorted);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 bg-light py-4">
        <Container>
          {/* Filters and Sort */}
          <Row className="mb-4">
            <Col md={8}>
              <Form onSubmit={handleLocalSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search for pet supplies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2 mb-md-0"
                />
              </Form>
            </Col>
            <Col md={4}>
              <Form.Select value={sortBy} onChange={handleSort}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Products Grid */}
          <div className="products-container">
            <h2 className="collection-header text-center">
              {searchTerm
                ? `Showing results for "${searchTerm}"`
                : `Showing Products For ${category || "All Categories"}`}
            </h2>
            <div className="product-grid">
              {(searchTerm || sortBy !== "featured"
                ? sortedProducts
                : filteredProducts
              ).map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <div className="product-details">
                    <h5 className="product-title">{product.name}</h5>
                    <p className="product-price">${product.price}</p>
                    <div className="quantity-controls">
                      {productQuantities[product.id] ? (
                        <>
                          <div className="d-flex align-items-center justify-content-center mb-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(product.id, -1)
                              }
                              className="quantity-btn"
                            >
                              -
                            </Button>
                            <span className="mx-2">
                              {productQuantities[product.id]}
                            </span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(product.id, 1)
                              }
                              className="quantity-btn"
                            >
                              +
                            </Button>
                          </div>
                          <button
                            className="add-to-cart-button"
                            onClick={() => {
                              const cartItems =
                                JSON.parse(localStorage.getItem("cartItems")) ||
                                [];
                              const existingProduct = cartItems.find(
                                (item) => item.id === product.id
                              );
                              const quantity = productQuantities[product.id];
                              if (existingProduct) {
                                existingProduct.quantity += quantity;
                              } else {
                                cartItems.push({ ...product, quantity });
                              }
                              localStorage.setItem(
                                "cartItems",
                                JSON.stringify(cartItems)
                              );
                              setCartItems(cartCount + quantity);
                              localStorage.setItem(
                                "counts",
                                cartCount + quantity
                              );
                              setProductQuantities((prev) => ({
                                ...prev,
                                [product.id]: 0,
                              }));
                            }}
                          >
                            Add to Cart
                          </button>
                        </>
                      ) : (
                        <button
                          className="add-to-cart-button"
                          onClick={() => {
                            const cartItems =
                              JSON.parse(localStorage.getItem("cartItems")) ||
                              [];
                            const existingProduct = cartItems.find(
                              (item) => item.id === product.id
                            );
                            if (existingProduct) {
                              existingProduct.quantity += 1;
                            } else {
                              cartItems.push({ ...product, quantity: 1 });
                            }
                            localStorage.setItem(
                              "cartItems",
                              JSON.stringify(cartItems)
                            );
                            setCartItems(cartCount + 1);
                            localStorage.setItem("counts", cartCount + 1);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Scroll to Top Button */}
        <Button
          onClick={scrollToTop}
          className="scroll-to-top"
          variant="light"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2d3290",
            color: "white",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <FaArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default Collections;
