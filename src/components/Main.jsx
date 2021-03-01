import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect, useHistory } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import RepositoryView from './RepositoryView';
import NewReview from './NewReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';


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
  const history = useHistory();
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    history.goBack();
    return true;
  });
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
        <Route path="/sign-up" >
          <SignUp />
        </Route>
        <Route path="/new-review" >
          <NewReview />
        </Route>
        <Route path="/my-reviews" >
          <MyReviews />
        </Route>
        <Route path="/repo/:id" >
          <RepositoryView />
        </Route>
        <Redirect to="/" />
      </Switch>
  </View>
  </View>
  
  );
};

export default Main;