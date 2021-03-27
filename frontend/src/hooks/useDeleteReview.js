import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [errors, setErrors] = useState([]);
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: ({ graphQLErrors, networkError }) => {
      setErrors({ graphQLErrors, networkError });
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          const msg = `[GraphQL error]: Line ${locations[0].line}:${locations[0].column}: ${message}, path: ${path}`;
          console.log(msg);
          setErrors([...errors, message]);
        });
      }

      if (networkError?.result?.errors) {
        networkError.result.errors.map(({ message, locations, extensions }) => {
          const msg = `[Network error]: Line ${locations[0].line}:${
            locations[0].column
          }: ${message} Extension: ${JSON.stringify(extensions)}`;
          console.log(msg, extensions);
          setErrors([...errors, message]);
        });
      }
    },
  });

  const deleteReview = async (id) => {
    setErrors([]);
    const { data } = await mutate({
      variables: {
        id,
      },
    });
    return data;
  };

  return [deleteReview, result, errors];
};

export default useDeleteReview;
