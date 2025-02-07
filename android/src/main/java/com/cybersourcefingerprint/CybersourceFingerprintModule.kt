package com.cybersourcefingerprint

import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

import android.util.Log;

import com.threatmetrix.TrustDefender.RL.*;

@ReactModule(name = CybersourceFingerprintModule.NAME)
class CybersourceFingerprintModule(reactContext: ReactApplicationContext) :
  NativeCybersourceFingerprintSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  override fun config(orgId: String, fingerprintServerUrl: String, promise: Promise) {
    try {
        val config = TMXConfig()
          .setOrgId(orgId)
          .setFPServer(fingerprintServerUrl)
          .setContext(reactApplicationContext)
        TMXProfiling.getInstance().init(config)
        Log.i(NAME, "Config finished")
        promise.resolve("Config finished")
    } catch (e: Exception) {
        promise.reject(e)
    }
  }

  override fun startProfiling(sessionId: String, promise: Promise) {
    Log.i(NAME, "Profiling with sessionId: $sessionId")

    val options = TMXProfilingOptions().apply {
      setCustomAttributes(null)
      setSessionID(sessionId)
    }

    TMXProfiling.getInstance().profile(options, CompletionNotifier(promise))
  }

  private class CompletionNotifier(private val promise: Promise) : TMXEndNotifier {
    override fun complete(result: TMXProfilingHandle.Result) {
      val map = WritableNativeMap().apply {
        putString("sessionId", result.sessionID)
        putInt("statusCode", result.status.ordinal)
      }
      promise.resolve(map)
    }
  }

  companion object {
    const val NAME = "CybersourceFingerprint"
  }
}
