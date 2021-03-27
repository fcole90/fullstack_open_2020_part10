import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews = false, first = undefined) => {
  const variables = { includeReviews, first };
  const { loading, error, data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return { authorizedUser: data?.authorizedUser, loading, refetch };
};

export default useAuthorizedUser;
