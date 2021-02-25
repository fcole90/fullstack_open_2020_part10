import React from 'react';
import { Platform, Text, View, StyleSheet, ScrollView, TouchableHighlight, TouchableNativeFeedback, Alert } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import { Link, useLocation } from 'react-router-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgDark,
    ...theme.shadow
  },
  tabLink: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 1
  },
  tabLinkSelected: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    
  },
  tabLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textOnDark,
    textTransform: 'uppercase'
  },
  tabLinkTextSelected: {
    color: 'white'
  }
});

const TabLink = ({title, to, currentLocation, onPress}) => (
  <Link 
    to={to}
    component={Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight}
    onPress={onPress}
    >
    <View style={[
      styles.tabLink,
      currentLocation === to && styles.tabLinkSelected
    ]}>
      <Text style={[
        styles.tabLinkText,
        currentLocation === to && styles.tabLinkTextSelected
      ]}>{title}</Text>
    </View>
  </Link>
);

const AppBar = () => {
  const location = useLocation();
  const { authorizedUser } = useAuthorizedUser();
  const signOut = useSignOut();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: signOut }
      ],
      { cancelable: false }
    );
  };

  console.log('Authorized user:', authorizedUser);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TabLink currentLocation={location.pathname} to='/' title='Repositories' />
        {
          authorizedUser ?
          <TabLink currentLocation={location.pathname} onPress={handleSignOut} title='Sign Out'/>
          :
          <TabLink currentLocation={location.pathname} to='/sign-in' title='Sign In'/>
        }
        
      </ScrollView>
    </View>
  );
};

export default AppBar;