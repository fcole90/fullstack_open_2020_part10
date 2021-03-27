import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const useRepositoryReviews = (id, first) => {
  const variables = { id, first };
  const { loading, data, refetch, error, fetchMore } = useQuery(
    GET_REPOSITORY_REVIEWS,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    },
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...data.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    refetch,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepositoryReviews;
