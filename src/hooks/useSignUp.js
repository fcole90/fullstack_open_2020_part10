import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: ({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Line ${locations[0].line}:${locations[0].column}: ${message}, path: ${path}`
        ),
        );
      }

      if (networkError?.result?.errors) {
        networkError.result.errors.map(({ message, locations, extensions }) =>
          console.log(
            `[Network error]: Line ${locations[0].line}:${locations[0].column}: ${message} Extension:`,  extensions
          ),
        );
      } 
    }
  });

  const signUp = async ({ username, password }) => {
    return await mutate({ variables: { username, password } });
  };

  return [signUp, result];
};

export default useSignUp;