import RLTMXProfiling
import RLTMXProfilingConnections

@objc(CybersourceFingerprint)
class CybersourceFingerprint: NSObject {
    private var profile: RLTMXProfiling = RLTMXProfiling.sharedInstance()!

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(config:fpsUrl:resolver:rejecter:)
    func config(_ orgId: String, fingerprintServerUrl: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
//        let profile = RLTMXProfiling.sharedInstance()!
        let profilingConnections: RLTMXProfilingConnections  = RLTMXProfilingConnections.init()
        profilingConnections.connectionTimeout    = 20;
        profilingConnections.connectionRetryCount = 2;
        
        profile.configure(configData:[
           RLTMXOrgID              :orgId,
           RLTMXFingerprintServer  :fingerprintServerUrl,
           RLTMXProfilingConnectionsInstance: profilingConnections,
        ])
        resolve("PUTARIA!")
    }
    
    @objc(startProfiling:resolver:rejecter:)
    func startProfiling(_ sessionId: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let customAttributes : [String : String] = [RLTMXSessionID: sessionId]
        let profileHandle: RLTMXProfileHandle = profile.profileDevice(profileOptions: customAttributes, callbackBlock: {(result: [AnyHashable : Any]?) -> Void in
            let results:NSDictionary! = result! as NSDictionary
            let status:RLTMXStatusCode  = RLTMXStatusCode(rawValue:(results.value(forKey: RLTMXProfileStatus) as! NSNumber).intValue)!
            let iddasessao = results.value(forKey: RLTMXSessionID) as! String
//            let localresolver =
            resolve(iddasessao)
//            localresolver(status)
//            if (status == .ok) {
//                resolve()
//            }
        })
    }
}


