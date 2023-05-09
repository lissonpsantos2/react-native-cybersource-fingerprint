import { NativeModules, Platform } from 'react-native';

const iosProfilingStatusMap: string[] = [
  'TMXStatusCodeNotYet',
  'TMXStatusCodeOk',
  'TMXStatusCodeHostNotFoundError',
  'TMXStatusCodeNetworkTimeoutError',
  'TMXStatusCodeHostVerificationError',
  'TMXStatusCodeInternalError',
  'TMXStatusCodeInterruptedError',
  'TMXStatusCodePartialProfile',
  'TMXStatusCodeInvalidOrgID',
  'TMXStatusCodeNotConfigured',
  'TMXStatusCodeCertificateMismatch',
];

const androidProfilingStatusMap: string[] = [
  'TMX_NotYet',
  'TMX_OK',
  'TMX_Connection_Error',
  'TMX_HostNotFound_Error',
  'TMX_NetworkTimeout_Error',
  'TMX_HostVerification_Error',
  'TMX_Internal_Error',
  'TMX_Interrupted_Error',
  'TMX_InvalidOrgID',
  'TMX_ConfigurationError',
  'TMX_Already_Initialised',
  'TMX_EndNotifier_Not_Found',
  'TMX_PartialProfile',
  'TMX_Blocked',
  'TMX_ThirdPartyLibrary_Not_Found',
];

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

type profilingResponse = {
  success: boolean;
  statusCode: number;
  sessionId: string;
  statusDescription: string;
};

export function config(
  orgId: string,
  fingerprintServerUrl: string
): Promise<any> {
  return CybersourceFingerprint.config(orgId, fingerprintServerUrl);
}

export async function startProfiling(sessionId: string): Promise<profilingResponse> {
  const profilingData = await CybersourceFingerprint.startProfiling(sessionId);

  const profilingStatusMap =
    Platform.OS === 'ios' ? iosProfilingStatusMap : androidProfilingStatusMap;
  const mappedStatusDescription = profilingStatusMap[profilingData.status];

  return {
    success: profilingData.status === 1,
    statusCode: profilingData.status,
    sessionId: profilingData.sessionId,
    statusDescription:
      typeof mappedStatusDescription !== 'undefined'
        ? mappedStatusDescription
        : 'Unknown status',
  };
}
