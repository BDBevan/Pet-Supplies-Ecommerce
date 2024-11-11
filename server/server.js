const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const cors = require("cors");

const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    // Log the error details server-side
    console.error("GraphQL Error:", error);
    return error;
  },
});

// Create a new instance of Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  // Middleware configuration
  app.use(cors()); // Enable CORS for all routes
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(authMiddleware);

  // Set up Apollo Server middleware
  app.use(
    "/graphql",
    cors(), // Enable CORS specifically for GraphQL endpoint
    expressMiddleware(server, {
      context: ({ req }) => {
        return { user: req.user } // to resolvers
      }
    })
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Database connection and server startup
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}!`);
      console.log(`🌍 Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Handle any uncaught errors
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

startApolloServer();
