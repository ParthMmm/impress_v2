import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByRole,
  queryByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import '@testing-library/jest-dom';
import LogIn from '../components/Auth/LogInComponent';
import { renderHook } from '@testing-library/react-hooks';
import { useCurrentUserQuery } from 'generates';
describe('LogIn', () => {
  const queryClient = new QueryClient();

  let usernameInput, passwordInput, submitButton;
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const { result } = renderHook(() => useCurrentUserQuery(), { wrapper });

  beforeEach(() => {
    render(
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <LogIn />
        </QueryClientProvider>
      </ChakraProvider>
    );
    usernameInput = screen.getByRole('textbox', { label: /username/i });
    passwordInput = screen.getByRole('textbox', { label: /password/i });
    submitButton = screen.getByText('submit');
  });

  test('user should login', async () => {
    screen.debug();
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    // user.clear(usernameInput);
    // user.click(usernameInput);
    // user.type(usernameInput, 'xyz');

    fireEvent.change(usernameInput, { target: { value: 'xyz' } });
    expect(usernameInput).toHaveValue('xyz');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(passwordInput).toHaveValue('password');

    fireEvent.click(submitButton);

    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    // expect(usernameInput.value).toBe('xyz');
    // fireEvent.click
    // expect(screen.getByTitle('login')).toBeInTheDocument();
  });
});
