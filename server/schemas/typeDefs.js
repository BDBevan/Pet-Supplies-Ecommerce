const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    address: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    collection: String
    stock: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type CheckoutSession {
    sessionId: String!
  }

  input BookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  input PriceDataInput {
    currency: String!
    product_data: ProductDataInput!
    unit_amount: Int!
  }

  input ProductDataInput {
    name: String!
    images: [String!]
  }

  input CheckoutSessionInput {
    lineItems: [CheckoutLineItemInput!]!
    successUrl: String!
    cancelUrl: String!
  }

  input CheckoutLineItemInput {
    price_data: PriceDataInput!
    quantity: Int!
  }

  type Query {
    me: User
    categories: [Category]
    products(collection: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    createCheckoutSession(input: CheckoutSessionInput!): CheckoutSession!
  }
`;

module.exports = typeDefs;
