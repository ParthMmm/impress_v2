import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByRole,
  queryByText,
} from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import Sidebar from '../components/Sidebar/Sidebar';
describe('first', () => {
  const queryClient = new QueryClient();

  test('', async () => {
    render(
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Sidebar />
        </QueryClientProvider>
      </ChakraProvider>
    );
    // screen.debug();
    const search = screen.getAllByPlaceholderText(/search/);
    // console.log(search.value);
    // expect(search.value).toBe('');
    expect(screen.getByPlaceholderText(/search/)).toBeInTheDocument();
  });
});
