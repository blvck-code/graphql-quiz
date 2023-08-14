import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const orderList = [
  {
    id: "1",
    deliveryAddress: "123 Main St, Cityville",
    items: ["Product A", "Product B"],
    total: 150.0,
    discountableCode: "SUMMER20",
    comment: "Please deliver in the evening.",
    status: "PROCESSING",
  },
  {
    id: "2",
    deliveryAddress: "456 Elm St, Townsville",
    items: ["Product C", "Product D", "Product E"],
    total: 250.0,
    discountableCode: null,
    comment: "",
    status: "SHIPPED",
  },
  {
    id: "3",
    deliveryAddress: "789 Oak Rd, Villageton",
    items: ["Product A", "Product F"],
    total: 80.0,
    discountableCode: "FALL10",
    comment: "Call before delivery.",
    status: "DELIVERED",
  },
  {
    id: "4",
    deliveryAddress: "101 Pine Ln, Countryside",
    items: ["Product B", "Product C"],
    total: 120.0,
    discountableCode: null,
    comment: "Leave at the front porch.",
    status: "PROCESSING",
  },
  {
    id: "5",
    deliveryAddress: "202 Maple Ave, Suburbia",
    items: ["Product A", "Product D", "Product E"],
    total: 220.0,
    discountableCode: "SPRING15",
    comment: "Call for delivery instructions.",
    status: "SHIPPED",
  },
  {
    id: "6",
    deliveryAddress: "303 Oak Rd, Countryside",
    items: ["Product F", "Product G"],
    total: 75.0,
    discountableCode: "SALE25",
    comment: "",
    status: "DELIVERED",
  },
];
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Order {
    id: ID!
    deliveryAddress: String!
    items: [String]!
    total: Float!
    discountableCode: String
    comment: String
    status: STATUS
  }

  enum STATUS {
    PENDING
    PAID
    IN_PROGRESS
    IN_DELIVERY
    DELIVERED
  }

  input StatusInput {
    status: STATUS!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    orders(status: StatusInput): [Order]
    order(id: ID!): Order
  }
`;

const resolvers = {
  Query: {
    orders: () => orderList,
    order: (_, { id }, context) => {
      return orderList.find((order) => order.id === id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
