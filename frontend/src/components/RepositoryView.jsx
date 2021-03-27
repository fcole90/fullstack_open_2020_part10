import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import useRepositoryReviews from '../hooks/useRepositoryReviews';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
  },
  repoInfoContainer: {
    flex: 1,
    flexGrow: 1,
  },
  separator: {
    height: 10,
  },
  headerExtraStyle: {
    marginBottom: 10
  },
  reviewItemContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: theme.colors.bgLight,
    ...theme.shadow,
    padding: 15
  },
  reviewItem: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    
  },
  reviewItemLeft: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewItemLeftText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    padding: 10
  },
  reviewItemRight: {
    flex: 1
  },
  reviewItemUsername: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  reviewItemDate: {
    color: theme.colors.textSecondary,
    fontSize: 16
  },
  reviewItemText: {
    marginTop: 10
  },
});

const RepositoryView = () => {
  const { id } = useParams();
  const useRepositoryResults = useRepository(id);
  const { repository, fetchMore } = useRepositoryReviews(id, 3);
  const reviews = repository
  ? repository.reviews.edges.map((edge) => edge.node)
  : [];

  const onEndReach = () => {
    console.log('End reached');
    fetchMore();
  };

  console.log(`uri: /repo/${id}`);

  return (
    <FlatList
      style={styles.mainContainer}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} showUsername/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo {...useRepositoryResults} />}
      ListHeaderComponentStyle={styles.headerExtraStyle}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryInfo = ({ repository, loading, error }) =>  (
    <View style={styles.repoInfoContainer}>
      { loading && <Text>Loading...</Text>}
      { error && <Text>{error}</Text>}
      {repository && <RepositoryItem item={repository} asPage /> }
    </View>
);

export const ReviewItem = ({ review, showUsername=false, showRepoName=false, bottomMenu }) => {
  const niceDate = (date) => date.slice(0, 10).split('-').reverse().join('.');

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.reviewItem}>
        <View style={styles.reviewItemLeft}>
          <Text style={styles.reviewItemLeftText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewItemRight}>
          {showRepoName && <Text style={styles.reviewItemUsername}>{review.repository.fullName}</Text>}
          {showUsername && <Text style={styles.reviewItemUsername}>{review.user.username}</Text>}
          <Text style={styles.reviewItemDate}>{niceDate(review.createdAt)}</Text>
          <Text style={styles.reviewItemText}>{review.text}</Text>
        </View>
      </View>
      {bottomMenu && <View style={{flex: 1, flexGrow: 1}}>{bottomMenu}</View>}
    </View>
  );
};

export default RepositoryView;