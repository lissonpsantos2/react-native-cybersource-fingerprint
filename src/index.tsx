import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-cybersource-fingerprint' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CybersourceFingerprint = NativeModules.CybersourceFingerprint
  ? NativeModules.CybersourceFingerprint
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type response = {
  status: Boolean;
  message: string;
};

export function multiply(a: number, b: number): Promise<number> {
  return CybersourceFingerprint.multiply(a, b);
}

export function config(
  orgId: string,
  fingerprintServerUrl: string
): Promise<response> {
  return CybersourceFingerprint.config(orgId, fingerprintServerUrl);
}

export function startProfiling(sessionId: string): Promise<string> {
  return CybersourceFingerprint.startProfiling(sessionId);
}
