import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { ProfilingResponse } from 'react-native-cybersource-fingerprint';

export interface Spec extends TurboModule {
  config(orgId: string, fingerprintServerUrl: string): Promise<string>;
  startProfiling(sessionId: string): Promise<ProfilingResponse>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('CybersourceFingerprint');
