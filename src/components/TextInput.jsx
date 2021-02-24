import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    borderRadius: 4,
    padding: 6
  },
  errorBox: {
     borderColor: 'darkred'
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.box, error && styles.errorBox];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;