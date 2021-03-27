import { gql } from 'apollo-boost';
import { MainRepoInfo } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...MainRepoInfo
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }

  ${MainRepoInfo}
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      url
      ...MainRepoInfo
    }
  }

  ${MainRepoInfo}
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query RepositoryReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            repository {
              name
              id
              fullName
              url
            }
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            repository {
              name
              id
              fullName
              url
            }
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;
