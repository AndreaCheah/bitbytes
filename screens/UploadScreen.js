import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Upload Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   // aligns children vertically at the center
    alignItems: 'center',   // aligns children horizontally at the center
  },
});
