import React from "react";
import { Form, Accordion } from "react-bootstrap";

const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Categories</Accordion.Header>
        <Accordion.Body>
          {categories.map((category) => (
            <Form.Check
              key={category.id}
              type="checkbox"
              id={`category-${category.id}`}
              label={category.name}
              checked={selectedCategories.includes(category.id)}
              onChange={() => onCategoryChange(category.id)}
              className="mb-2"
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Price Range</Accordion.Header>
        <Accordion.Body>
          <Form.Label>Min Price: $0</Form.Label>
          <Form.Range />
          <Form.Label>Max Price: $100</Form.Label>
          <Form.Range />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CategoryFilter;
