import { request, GraphQLClient } from 'graphql-request';

const requestHeaders = {
  authorization: 'Bearer MY_TOKEN',
};
const client = new GraphQLClient('http://localhost:8000/graphql', {
  headers: requestHeaders,
  credentials: 'include',
});
// client.request(query, variables).then((data) => console.log(data));

// // export client
export default client;
