import React, { useState } from 'react';
import { Platform, Text, View, StyleSheet, ScrollView, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import { Link } from 'react-router-native';

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

const TabLink = ({title, to, setSelected, selection}) => (
  <Link 
    to={to} 
    onPress={() => {setSelected(to);}} 
    component={Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight}
    >
    <View style={[
      styles.tabLink,
      selection === to && styles.tabLinkSelected
    ]}>
      <Text style={[
        styles.tabLinkText,
        selection === to && styles.tabLinkTextSelected
      ]}>{title}</Text>
    </View>
  </Link>
);

const AppBar = ({initialSelection}) => {
  const [selectedTab, setSelectedTab] = useState(initialSelection);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TabLink selection={selectedTab} setSelected={setSelectedTab} to='/' title='Repositories' />
        <TabLink selection={selectedTab} setSelected={setSelectedTab} to='/sign-in' title='Sign In'/>
      </ScrollView>
    </View>
  );
};

export default AppBar;