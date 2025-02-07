import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { config, startProfiling } from 'react-native-cybersource-fingerprint';
import uuid from 'react-native-uuid';

const sessionId = uuid.v4();

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

    setConfigStatus(localConfigStatus);

    const localProfilingStatus = await startProfiling(`acqio_br${sessionId}`);
    console.log(localProfilingStatus);
    _setProfilingStatus(localProfilingStatus.statusCode.toString());
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
    backgroundColor: '#ecf0f1',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
