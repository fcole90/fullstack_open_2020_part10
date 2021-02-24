import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.bgLight,
    shadowColor: theme.colors.lightShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 4
  },
  repoLogo: {
    width: 35,
    height: 35,
    borderRadius: 5,
    
  },
  repoLogoContainer: {
    padding: 10
  },
  topRightTextRow: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
  repoName: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  repoDescription: {
    margin: 5,
    fontWeight: '400',
    color: theme.colors.textSecondary,
  },
  repoLanguage: {
    margin: 5,
    color: 'white',
    textAlign: 'left',
  },
  repoLanguageContainer: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
  },
  topRightContainer: {
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexShrink: 1
  },
  topContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bottomContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10
  },
  bottomItem: {
    // ...
  },
  bottomItemTopRow: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bottomItemBottomRow: {
    fontWeight: '400',
    color: theme.colors.textSecondary,
    textAlign: 'center'
  }
});

const BottomItem = ({topRow, bottomRow}) => (
  <View style={styles.bottomItem}>
    <Text style={styles.bottomItemTopRow}>{topRow < 1000 ? `${Math.trunc(topRow * 10)/10}` : `${Math.trunc(topRow / 100)/10}k`}</Text>
    <Text style={styles.bottomItemBottomRow}>{bottomRow}</Text>
  </View>
);

const RepositoryItem = ({item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.topContainer}>
      <View style={styles.repoLogoContainer}>
        <Image style={styles.repoLogo} source={{uri: item.ownerAvatarUrl}}></Image>
      </View>
      <View style={styles.topRightContainer}> 
        <Text style={styles.repoName} >{item.fullName}</Text>
        <Text style={styles.repoDescription} >{item.description}</Text>
        <View style={styles.repoLanguageContainer}>
          <Text style={styles.repoLanguage} >{item.language}</Text>
        </View>
      </View>
    </View>
    <View style={styles.bottomContainer}>
      <BottomItem bottomRow='Stars' topRow={item.stargazersCount}/>
      <BottomItem bottomRow='Forks' topRow={item.forksCount}/>
      <BottomItem bottomRow='Reviews' topRow={item.reviewCount}/>
      <BottomItem bottomRow='Rating' topRow={item.ratingAverage}/>
    </View>
  </View>

  
);

RepositoryItem.proptypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    description: PropTypes.string,
    language: PropTypes.string,
    forksCount: PropTypes.number,
    stargazersCount: PropTypes.number,
    ratingAverage: PropTypes.number,
    reviewCount: PropTypes.number,
    ownerAvatarUrl: PropTypes.string
  })
};

export default RepositoryItem;