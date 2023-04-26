import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { config, startProfiling } from 'react-native-cybersource-fingerprint';

export default function App() {
  React.useEffect(() => {
    configura();
  }, []);

  async function configura() {
    const a = await config('1snn5n9w', 'h.online-metrix.net');
    console.log(a);

    const b = await startProfiling('idoidera1');
    console.log(b);
  }

  return (
    <View style={styles.container}>
      <Text>Result: 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
