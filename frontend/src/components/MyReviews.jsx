import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacityBase, TouchableOpacity, Alert } from 'react-native';

import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import useRepositoryReviews from '../hooks/useRepositoryReviews';
import RepositoryView, { RepositoryInfo, ReviewItem } from './RepositoryView';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import * as WebBrowser from 'expo-web-browser';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
  },
  separator: {
    height: 10,
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  bottomMenuButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    padding: 15,
    
  }, 
  bottomMenuButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  bottomMenuViewRepoButton: {
    backgroundColor: theme.colors.primary
  }, 
  bottomMenuDeleteRepoButton: {
    backgroundColor: theme.colors.alert
  }
});

export const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { id } = { id: "jaredpalmer.formik" };
  const { authorizedUser, refetch } = useAuthorizedUser(true, 8);
  const [ deleteReview ] = useDeleteReview();
  const reviews = authorizedUser
  ? authorizedUser.reviews.edges.map((edge) => edge.node)
  : [];

  const handleDeleteRepo = (id) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            const result = deleteReview(id);
            if (result) {
              refetch();
            } else {
              console.log('Something went wrong deleting repo', id);
            }
          } 
        }
      ],
      { cancelable: false }
    );
  };

  const onEndReach = () => {
    console.log('End reached');
    // fetchMore();
  };

  return (
    <FlatList
      style={styles.mainContainer}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} showRepoName bottomMenu={
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={[styles.bottomMenuButton, styles.bottomMenuViewRepoButton]} onPress={() => (WebBrowser.openBrowserAsync(item.repository.url))}>
          <Text style={styles.bottomMenuButtonText}>View Repository</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomMenuButton, styles.bottomMenuDeleteRepoButton]} onPress={() => (handleDeleteRepo(item.id))}>
          <Text style={styles.bottomMenuButtonText}>Delete review</Text>
        </TouchableOpacity>
      </View>
      }/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      // ListHeaderComponent={() => <RepositoryInfo {...useRepositoryResults} />}
      // ListHeaderComponentStyle={styles.headerExtraStyle}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;