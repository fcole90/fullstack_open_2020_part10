import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import theme from '../theme';


const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.bgLightUnfocused
  },
});

const Main = () => {
  return (  
  <View style={styles.container}>
    <AppBar/> 
    <View style={styles.container}>
    <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/sign-in" >
          <SignIn />
        </Route>
        <Redirect to="/" />
      </Switch>
  </View>
  </View>
  
  );
};

export default Main;