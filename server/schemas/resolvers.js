const { GraphQLError } = require("graphql");
const { User, Product, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log("ME QUERY - Context:", context);
      try {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id });
          console.log("ME QUERY - Found user data:", userData);
          return userData;
        }
        console.log("ME QUERY - No user in context");
        throw new GraphQLError("Not logged in", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      } catch (err) {
        console.error("ME QUERY - Error:", err);
        throw err;
      }
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new GraphQLError("Not logged in", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/cancel`,
      });

      return { session: session.id };
    },
    products: async (parent, { collection }) => {
      const response = await Product.find({ collection }).populate("category");
      console.log(response);
      return response;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        console.log("Login attempt for email:", email);
        const user = await User.findOne({ email });

        if (!user) {
          console.log("No user found with email:", email);
          throw new GraphQLError("No user found with this email address", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }

        const correctPw = await user.isCorrectPassword(password);
        console.log("Password correct:", correctPw);

        if (!correctPw) {
          throw new GraphQLError("Incorrect credentials", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }

        const token = signToken(user);
        console.log("Login successful, token generated");
        return { token, user };
      } catch (err) {
        console.error("Login error:", err);
        throw err;
      }
    },

    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        console.log("User created:", user);
        const token = signToken(user);
        console.log(token);
        return { token, user };
      } catch (err) {
        console.error("Error creating user:", err);
        throw new GraphQLError("Failed to create user", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    },

    createCheckoutSession: async (_, { input }) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: input.lineItems,
          mode: "payment",
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
        });

        return {
          sessionId: session.id,
        };
      } catch (error) {
        console.error("Stripe session creation error:", error);
        throw new GraphQLError("Failed to create checkout session", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw new GraphQLError("Not logged in", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
  },
};

module.exports = resolvers;
