import React from 'react';
import { StyleSheet, View} from 'react-native';
import LoginPage from './Scenes/loginPage';

export default function App() {  
  return (
    <View style={styles.container}>
      <LoginPage></LoginPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
