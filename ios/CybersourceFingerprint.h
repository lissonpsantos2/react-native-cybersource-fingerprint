
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCybersourceFingerprintSpec.h"

@interface CybersourceFingerprint : NSObject <NativeCybersourceFingerprintSpec>
#else
#import <React/RCTBridgeModule.h>

@interface CybersourceFingerprint : NSObject <RCTBridgeModule>
#endif

@end
