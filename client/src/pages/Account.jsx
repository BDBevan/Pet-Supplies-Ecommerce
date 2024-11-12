import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Auth from "../utils/auth";
import { ApolloClient, InMemoryCache, HttpLink,useQuery } from '@apollo/client';
import { ME_QUERY } from "../utils/queries.js";
const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    headers: {
      'Authorization': `Bearer your-token`, 
      'Custom-Header': 'your-custom-value' 
    }
  }),
  cache: new InMemoryCache(),
});

const Account = () => {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    client.query({
      query: ME_QUERY,
      context: {
        headers: {
          'Authorization': `Bearer ` + Auth.getToken(),
        }
      }
    }).then(data => {
      const user = data.data.me
      console.log(data.data)
      setUserForm(user)
      console.log(userForm)
    })
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle update logic here
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Header>
              <h4 className="mb-0">My Account</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userForm.username}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userForm.email}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="address"
                    value={userForm.address}
                    onChange={(e) =>
                      setUserForm({ ...userForm, address: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={userForm.confirmPassword}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Button type="submit" variant="primary" nma>
                  Update Profile
                </Button>

                <Card.Header>
                <h4 className="mb-0">Order History</h4>
            </Card.Header>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;

