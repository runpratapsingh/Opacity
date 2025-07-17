// // SplashScreen.tsx
// import React, { useEffect } from 'react';
// import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
// } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('window');

// const SplashScreen = ({ navigation }: any) => {
//   const logoOpacity = useSharedValue(0);
//   const textOpacity = useSharedValue(0);

//   useEffect(() => {
//     logoOpacity.value = withTiming(1, {
//       duration: 1000,
//       easing: Easing.inOut(Easing.ease),
//     });
//     textOpacity.value = withTiming(1, {
//       duration: 1500,
//       easing: Easing.inOut(Easing.ease),
//     });

//     // Navigate after delay
//     setTimeout(() => {
//       navigation.replace('Home'); // Replace 'Home' with your actual screen
//     }, 3000);
//   }, []);

//   const logoAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: logoOpacity.value,
//     transform: [{ scale: withTiming(logoOpacity.value ? 1 : 0.8) }],
//   }));

//   const textAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: textOpacity.value,
//     transform: [{ translateY: withTiming(textOpacity.value ? 0 : 20) }],
//   }));

//   return (
//     <View style={styles.container}>
//       <Animated.Image
//         source={require('../assets/Logo.png')} // Put your logo path here
//         style={[styles.logo, logoAnimatedStyle]}
//         resizeMode="contain"
//       />
//       <Animated.Text style={[styles.text, textAnimatedStyle]}>
//         OPACITY
//       </Animated.Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#101010',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: width * 0.4,
//     height: width * 0.4,
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     letterSpacing: 4,
//   },
// });

// export default SplashScreen;
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { StatusBar } from 'react-native';

const SplashScreen: React.FC = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Fade In
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Stay visible for 2 seconds
      setTimeout(() => {
        // Fade Out
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          // Navigate after fade out
          navigation.replace('Login'); // or navigation.navigate()
        });
      }, 2000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Animated.View style={{ opacity, alignItems: 'center' }}>
        <Image source={require('../../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>𝕆ℙ𝔸ℂ𝕀𝕋𝕐</Text>
      </Animated.View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0C2646',
    marginTop: 10,
  },
});

export default SplashScreen;
