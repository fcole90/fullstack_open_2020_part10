import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const variables = { id };
  const { loading, data, refetch, error } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { repository: data?.repository, loading, refetch, error};
};

export default useRepository;