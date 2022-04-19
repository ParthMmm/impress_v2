import { graphql } from 'msw';

export const handlers = [
  // Handles a "Login" mutation

  graphql.mutation('Login', (req, res, ctx) => {
    const { username } = req.variables;
    const { password } = req.variables;

    sessionStorage.setItem('is-authenticated', username);

    return res(
      ctx.data({
        login: {
          username,
          password,
        },
      })
    );
  }),

  // Handles a "GetUserInfo" query

  // graphql.query('GetUserInfo', null),
];

// mutation LogIn($username: String, $password: String) {
//   logIn(username: $username, password: $password) {
//     username
//     id
//   }
// }
