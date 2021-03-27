import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';


import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';


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

export const SignInForm = ({onSubmit}) => {
  return (
    <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
        <View style={styles.formView}>
          <Text style={styles.title}>Sign In</Text>
          <FormikTextInput testID='usernameField' textContentType="username" name="username" placeholder="Username" />
          <FormikTextInput testID='passwordField' textContentType="password" name="password" secureTextEntry placeholder="Password" />
          <Button testID='submitButton' title='Sign in' onPress={handleSubmit} />
        </View>
        )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log("Data:", data.data);
      history.push('/');
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;