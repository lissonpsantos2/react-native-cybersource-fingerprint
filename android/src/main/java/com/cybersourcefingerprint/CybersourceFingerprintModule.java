package com.cybersourcefingerprint;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import com.threatmetrix.TrustDefender.TMXConfig;
import com.threatmetrix.TrustDefender.TMXProfiling;
import com.threatmetrix.TrustDefender.TMXProfilingOptions;
import com.threatmetrix.TrustDefender.TMXProfilingHandle;
import com.threatmetrix.TrustDefender.TMXEndNotifier;

@ReactModule(name = CybersourceFingerprintModule.NAME)
public class CybersourceFingerprintModule extends ReactContextBaseJavaModule {
  private Context applicationContext;
  public static final String NAME = "CybersourceFingerprint";

  public CybersourceFingerprintModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.applicationContext = reactContext.getApplicationContext();
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }

  @ReactMethod
  public void config(String orgId, String fingerprintServerUrl, Promise promise) {
    try {
      TMXConfig config = new TMXConfig()
        .setOrgId(orgId)
        .setFPServer(fingerprintServerUrl)
        .setContext(this.applicationContext);
      TMXProfiling.getInstance().init(config);
      promise.resolve("Configuração completa");
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void startProfiling(String sessionId, Promise promise) {
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
      Log.i("PROFILE COMPLETED", "Profile completed with: " + result.getSessionID()+ " - "
        + result.getStatus().name()+ " - " + result.getStatus().getDesc());
      promise.resolve("asd");
    }
  }
}
