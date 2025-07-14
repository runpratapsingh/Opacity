import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  icon: string;
  secureTextEntry?: boolean;
}

const { width } = Dimensions.get('window');

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  icon,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        cursorColor="#FFF"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholder={placeholder}
        placeholderTextColor="#FFF"
        left={<TextInput.Icon style={styles.icon} icon={icon} color="#FFF" />}
        secureTextEntry={secureTextEntry}
        textColor="#FFF"
        {...props}
      />
      <View style={styles.underline} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.8,
    height: 40,
    backgroundColor: '#4158F4',
    borderColor: '#FFF',
  },
  underline: {
    width: width * 0.8,
    height: 0.5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  icon: {
    bottom: 0,
  },
});

export default CustomTextInput;
