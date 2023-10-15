import { createServer } from "http";
import { createSchema, createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type User {
        id: ID!
        name: String!
        email: String!
      }

      type Query {
        hello: String
        getUser(id: ID!): User
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from Yoga!",
        getUser: (_, { id }) => {
          return prisma.user.findUnique({
            where: {
              id: Number(id),
            },
          });
        },
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
