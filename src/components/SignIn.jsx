import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20
  },
  container: {
    flexDirection: 'column',
    flexGrow: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  formView: {
    backgroundColor: theme.colors.bgLight,
    borderRadius: 5,
    width: '90%',
    marginHorizontal: 'auto',
    padding: 16,
    ...theme.shadow
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be longer than ${min}')
    .required('Username is required'),
  password: yup
    .string()
    .min(4, "Password must be longer than ${min}")
    .required('Password is required'),
});

const SignInForm = ({onSubmit}) => {
  return (
    <View style={styles.formView}>
      <Text style={styles.title}>Sign In</Text>
      <FormikTextInput textContentType="username" name="username" placeholder="Username" />
      <FormikTextInput textContentType="password" name="password" secureTextEntry placeholder="Password" />
      <Button title='Sign in' onPress={onSubmit} />
    </View>
  );
};

const SignIn = () => (
  <View style={styles.container}>
    <Formik
      initialValues={{username: '', password: ''}} 
      onSubmit={(values) => {console.log(values);}}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  </View>
);

export default SignIn;