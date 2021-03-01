import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from './RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      // Check the content of textual properties exists
      const textPropertiesToCheck = ['fullName', 'description', 'language'];
      textPropertiesToCheck.forEach((property) => {
        const vals = repositories.edges.map((edge) => edge.node[property]);
        getAllByTestId(property).forEach((item, i) => {
          expect(item).toHaveTextContent(vals[i]);
      });
      });

      // Check the content of numeric properties exists
      const numberPropertiesToCheck = ['forksCount', 'stargazersCount', 'ratingAverage', 'reviewCount'];
      numberPropertiesToCheck.forEach((property) => {
        const vals = repositories.edges.map((edge) => edge.node[property]);
        getAllByTestId(property).forEach((item, i) => {
          const formattedText = vals[i] < 1000 ? `${Math.trunc(vals[i] * 10)/10}` : `${Math.trunc(vals[i] / 100)/10}k`;
          expect(item).toHaveTextContent(formattedText);
      });
      });    
      


    });
  });
});