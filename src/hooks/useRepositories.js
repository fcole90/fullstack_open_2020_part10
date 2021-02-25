import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network',});

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;