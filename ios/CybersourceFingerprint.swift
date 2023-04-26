import RLTMXProfiling
import RLTMXProfilingConnections

@objc(CybersourceFingerprint)
class CybersourceFingerprint: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(config:fpsUrl:withResolver:withRejecter:)
    func config(orgId: String, fingerprintServerUrl: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let profilingConnections: RLTMXProfilingConnections  = RLTMXProfilingConnections.init()
        profilingConnections.connectionTimeout    = 20;
        profilingConnections.connectionRetryCount = 2;
        
        let profile = RLTMXProfiling.sharedInstance()!
        
        profile.configure(configData:[
           RLTMXOrgID              :orgId,
           RLTMXFingerprintServer  :fingerprintServerUrl,
           RLTMXProfilingConnectionsInstance:profilingConnections,
        ])
    }
}
