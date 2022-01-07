import {
  Exact,
  InputMaybe,
  SignUpMutation,
  useSignUpMutation,
} from '../generates';
import { UseMutateFunction } from 'react-query';

export interface FormValues {
  username: string;
  password: string;
}

export interface MutateProps {
  mutate: UseMutateFunction<
    SignUpMutation,
    unknown,
    Exact<{
      username?: InputMaybe<string> | undefined;
      password?: InputMaybe<string> | undefined;
    }>,
    unknown
  >;
  isLoading: boolean;
  error: any;
  data: SignUpMutation | undefined;
}
