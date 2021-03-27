import { gql } from 'apollo-boost';

export const MainRepoInfo = gql`
  fragment MainRepoInfo on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;
