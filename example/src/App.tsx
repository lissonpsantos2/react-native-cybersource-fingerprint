import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { config, startProfiling } from 'react-native-cybersource-fingerprint';

const sessionId = uuidv4();

export default function App() {
  const [configStatus, setConfigStatus] =
    React.useState<string>('Configurando');
  const [profilingStatus, _setProfilingStatus] =
    React.useState<string>('Carregando...');

  React.useEffect(() => {
    configure();
  }, []);

  async function configure() {
    const localConfigStatus = await config('1snn5n9w', 'h.online-metrix.net');
    console.log(localConfigStatus);

    setConfigStatus(localConfigStatus);

    const localProfilingStatus = await startProfiling(`acqio_br${sessionId}`);
    console.log(localProfilingStatus);
    // setProfilingStatus(localProfilingStatus);
  }

  return (
    <View style={styles.container}>
      <Text>{sessionId}</Text>
      <Text>Config Status: {configStatus}</Text>
      <Text>StartProfiling Status: {profilingStatus}</Text>
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
