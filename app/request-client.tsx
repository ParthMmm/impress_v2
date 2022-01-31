import { request, GraphQLClient } from 'graphql-request';

const server = process.env.NEXT_PUBLIC_SERVER;

const requestHeaders = {
  authorization: 'Bearer MY_TOKEN',
};
const client = new GraphQLClient(server, {
  headers: requestHeaders,
  credentials: 'include',
});
// client.request(query, variables).then((data) => console.log(data));

// // export client
export default client;
