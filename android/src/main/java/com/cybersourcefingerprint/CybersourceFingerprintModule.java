package com.cybersourcefingerprint;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;

import com.threatmetrix.TrustDefender.RL.*;

@ReactModule(name = CybersourceFingerprintModule.NAME)
public class CybersourceFingerprintModule extends ReactContextBaseJavaModule {
  public static final String NAME = "CybersourceFingerprint";
  private Context applicationContext;

  public CybersourceFingerprintModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.applicationContext = reactContext.getApplicationContext();
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void config(String orgId, String fingerprintServerUrl, Promise promise) {
    try {
      TMXConfig config = new TMXConfig()
        .setOrgId(orgId)
        .setFPServer(fingerprintServerUrl)
        .setContext(this.applicationContext);
      TMXProfiling.getInstance().init(config);
    } catch (Exception e) {
      promise.reject(e);
    }

    Log.i(this.NAME, "Config finished");
    promise.resolve("Config finished");
  }

  @ReactMethod
  public void startProfiling(String sessionId, Promise promise) {
    Log.i(this.NAME, "Profiling with sessionId: " + sessionId);

    TMXProfilingOptions options = new TMXProfilingOptions().setCustomAttributes(null);
    options.setSessionID(sessionId);
    TMXProfilingHandle profilingHandle = TMXProfiling.getInstance().profile(options, new CompletionNotifier(promise));
  }

  private class CompletionNotifier implements TMXEndNotifier
  {
    Promise promise;
    CompletionNotifier(Promise promise) {
      super();
      this.promise = promise;
    }
    @Override
    public void complete(TMXProfilingHandle.Result result) {
      WritableMap map = new WritableNativeMap();

      map.putString("sessionId", result.getSessionID());
      map.putInt("status", result.getStatus().ordinal());
      promise.resolve(map);
    }
  }
}
