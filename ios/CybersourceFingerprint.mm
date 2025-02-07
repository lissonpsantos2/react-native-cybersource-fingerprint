#import "CybersourceFingerprint.h"
#import <RLTMXProfiling/TMXProfiling.h>
#import <RLTMXProfilingConnections/TMXProfilingConnections.h>
#import <React/RCTLog.h>

@implementation CybersourceFingerprint
RLTMXProfiling *RLTMXProfilingInstance;

RCT_EXPORT_MODULE()

- (void)config:(nonnull NSString *)orgId fingerprintServerUrl:(nonnull NSString *)fingerprintServerUrl resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    RLTMXProfilingConnections *profilingConnections = [[RLTMXProfilingConnections alloc] init];

     profilingConnections.connectionTimeout = 20;
     profilingConnections.connectionRetryCount = 2;

     RLTMXProfilingInstance = [RLTMXProfiling sharedInstance];

     @try {
         [RLTMXProfilingInstance configure: @{
             RLTMXOrgID: orgId,
             RLTMXFingerprintServer: fingerprintServerUrl,
             RLTMXProfileTimeout: @20,
             RLTMXProfilingConnectionsInstance: profilingConnections,
         }];
     } @catch (NSException *exception) {
         reject(@"CybersourceFingerprint", @"ERROR", nil);
     }

     resolve(@"Config finished");
}

- (void)startProfiling:(nonnull NSString *)sessionId resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  RCTLogInfo(@"Profiling with sessionId: %@", sessionId);

  RLTMXProfileHandle *profileHandle = [
      RLTMXProfilingInstance
      profileDeviceUsing: @{RLTMXSessionID : sessionId}
      callbackBlock: ^(NSDictionary * _Nullable result) {
          RLTMXStatusCode statusCode = (RLTMXStatusCode)[
              [result valueForKey:RLTMXProfileStatus]
              integerValue
          ];

          resolve(@{
              @"sessionId": [result valueForKey:RLTMXSessionID],
              @"statusCode": @(statusCode),
          });
      }
  ];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCybersourceFingerprintSpecJSI>(params);
}

@end
