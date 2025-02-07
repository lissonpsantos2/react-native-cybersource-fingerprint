import { Platform } from 'react-native';

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

export type ProfilingResponse = {
  success: boolean;
  statusCode: number;
  sessionId: string;
  statusDescription: string;
};

import CybersourceFingerprint from './NativeCybersourceFingerprint';

export function config(
  orgId: string,
  fingerprintServerUrl: string
): Promise<string> {
  return CybersourceFingerprint.config(orgId, fingerprintServerUrl);
}

export async function startProfiling(
  sessionId: string
): Promise<ProfilingResponse> {
  const profilingData = await CybersourceFingerprint.startProfiling(sessionId);

  const profilingStatusMap =
    Platform.OS === 'ios' ? iosProfilingStatusMap : androidProfilingStatusMap;
  const mappedStatusDescription = profilingStatusMap[profilingData.statusCode];

  return {
    success: profilingData.statusCode === 1,
    statusCode: profilingData.statusCode,
    sessionId: profilingData.sessionId,
    statusDescription:
      typeof mappedStatusDescription !== 'undefined'
        ? mappedStatusDescription
        : 'Unknown status',
  };
}
