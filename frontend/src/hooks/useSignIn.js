import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Line ${locations[0].line}:${locations[0].column}: ${message}, path: ${path}`,
          ),
        );
      }

      if (networkError?.result?.errors) {
        networkError.result.errors.map(({ message, locations, extensions }) =>
          console.log(
            `[Network error]: Line ${locations[0].line}:${locations[0].column}: ${message} Extension:`,
            extensions,
          ),
        );
      }
    },
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return {
      data: { authorize: { accessToken: await authStorage.getAccessToken() } },
    };
  };

  return [signIn, result];
};

export default useSignIn;
