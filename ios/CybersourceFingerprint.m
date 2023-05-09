#import "CybersourceFingerprint.h"
#import <RLTMXProfiling/TMXProfiling.h>
#import <RLTMXProfilingConnections/TMXProfilingConnections.h>
#import <React/RCTLog.h>

@implementation CybersourceFingerprint
RLTMXProfiling *RLTMXProfilingInstance;

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(config,
                  withOrgId:(NSString *)orgId withServerUrl:(NSString *)serverUrl
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    RLTMXProfilingConnections *profilingConnections = [[RLTMXProfilingConnections alloc] init];

    profilingConnections.connectionTimeout = 20;
    profilingConnections.connectionRetryCount = 2;

    RLTMXProfilingInstance = [RLTMXProfiling sharedInstance];

    @try {
        [RLTMXProfilingInstance configure: @{
            RLTMXOrgID: orgId,
            RLTMXFingerprintServer: serverUrl,
            RLTMXProfileTimeout: @20,
            RLTMXProfilingConnectionsInstance: profilingConnections,
        }];
    } @catch (NSException *exception) {
        reject(@"CybersourceFingerprint", @"ERROR", nil);
    }

    resolve(@"Config finished");
}

RCT_REMAP_METHOD(startProfiling,
                  withSessionId:(NSString *)sessionId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"Profiling with sessionId: %@", sessionId);

    RLTMXProfileHandle *profileHandle = [
        RLTMXProfilingInstance
        profileDeviceUsing: @{RLTMXSessionID : sessionId}
        callbackBlock: ^(NSDictionary * _Nullable result) {
            RLTMXStatusCode statusCode = [
                [result valueForKey:RLTMXProfileStatus]
                integerValue
            ];

            resolve(@{
                @"sessionId": [result valueForKey:RLTMXSessionID],
                @"status": @(statusCode),
            });
        }
    ];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCybersourceFingerprintSpecJSI>(params);
}
#endif

@end
