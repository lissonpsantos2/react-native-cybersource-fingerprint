#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CybersourceFingerprint, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXPORT_METHOD(config:(NSString *)orgId
                  fpsUrl:(NSString *)fingerprintServerUrl
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
