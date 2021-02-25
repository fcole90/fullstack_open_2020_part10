import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';


const useAuthorizedUser = () => {
  const { loading, error, data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network'
  });

  return { authorizedUser: data?.authorizedUser, loading, refetch };
};

export default useAuthorizedUser;