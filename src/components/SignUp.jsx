import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';


import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import useSignUp from '../hooks/useSignUp';


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
    .min(1, 'Username must be longer than ${min}')
    .max(30, 'Username must be shorter than ${max}')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, "Password must be longer than ${min}")
    .max(50, 'Password must be shorter than ${max}')
    .required('Password is required'),
  passwordValidation: yup
    .string()
    .oneOf([yup.ref('password')], "Password does not match")
    .required('Password confirmation is required')
});

export const SignUpForm = ({onSubmit}) => {
  return (
    <Formik
        initialValues={{ username: '', password: '', passwordValidation: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
        <View style={styles.formView}>
          <Text style={styles.title}>Sign Up</Text>
          <FormikTextInput testID='usernameField' textContentType="username" name="username" placeholder="Username" />
          <FormikTextInput testID='passwordField' textContentType="password" name="password" secureTextEntry placeholder="Password" />
          <FormikTextInput testID='passwordValidationField' textContentType="password" name="passwordValidation" secureTextEntry placeholder="Confirm Password" />
          <Button testID='submitButton' title='Sign up' onPress={handleSubmit} />
        </View>
        )}
    </Formik>
  );
};

const SignUp = () => {
  const [signIn, signInResult] = useSignIn();
  const [signUp, result] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      console.log("SignUp Data:", data);
      if (data.data.createUser.username === username.toLocaleLowerCase()) {
        const signInData = await signIn({ username, password });
        console.log("SignIn Data:", signInData);
        history.push('/');
      }
      else {
        console.log('Something went wrong...', data.data.createUser.username, username, '!');
      }
      // history.push('/');
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <SignUpForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignUp;