import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';


import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import useCreateReview from '../hooks/useCreateReview';


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
  error: {
    width: '90%',
    backgroundColor: '#ba000d',
    minHeight: 50,
    padding: 15,
    color: 'white',
    fontSize: 15,
    borderRadius: 5
  }
});

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .min(4, 'Repository owner name must be longer than ${min}')
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .min(3, "Repository name must be longer than ${min}")
    .required('Repository name is required'),
  repositoryRating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least ${min}')
    .max(100, 'Rating must be at most ${max}')
    .required('Rating is required'),
  repositoryReview: yup
    .string()
    .optional(),
});

export const NewReviewForm = ({onSubmit}) => {
  return (
    <Formik
        initialValues={{ 
          repositoryOwner: '',
          repositoryName: '',
          repositoryRating: '',
          repositoryReview: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
        <View style={styles.formView}>
          <Text style={styles.title}>New Review</Text>
          <FormikTextInput name="repositoryOwner" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="repositoryRating" placeholder="Rating between 0 and 100" />
          <FormikTextInput multiline name="repositoryReview" placeholder="Review" />
          <Button testID='submitButton' title='Create a review' onPress={handleSubmit} />
        </View>
        )}
    </Formik>
  );
};

const NewReview = () => {
  const [createReview, result, errors] = useCreateReview();
  const history = useHistory();
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('effect:', errors);
    console.log('effect slice:', errors[0]);
    if(errors?.length > 0) {
      setError(errors[0]);
    }
  }, [errors]);

  const onSubmit = async (values) => {
    console.log("New review:", values);

    try {
      setError('');
      const data = await createReview(values);
      console.log("Data:", data);
      if (data.id) {
        history.push(`/repo/${data.repositoryId}`);
      }
      else {
        if (data?.errors?.message) {
          setError(data?.errors?.message);
        }
        else {
          setError('Something went wrong...');
        }
      }
    } catch (e) {
      console.log("Error:", e);
      console.log("Error result:", errors);

      if (!error) {
        setError('Something went wrong...');
      }
      
    }
  };

  return (
    <View style={styles.container}>
      {error !== '' && <Text style={styles.error}>{'Oops:\n'}{error}</Text>}
      <NewReviewForm onSubmit={onSubmit} />
    </View>
  );
};

export default NewReview;