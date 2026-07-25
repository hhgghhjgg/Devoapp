package com.myapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static final String TAG = "MainApplication";

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "myapp/index";
        }

        @Override
        protected String getBundleAssetName() {
            return "myapp/index.android.bundle";
        }

        @Override
        protected boolean isNewArchEnabled() {
            return false;
        }

        @Override
        protected Boolean isHermesEnabled() {
            return true;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "MainApplication onCreate started");
        SoLoader.init(this, false);
        Log.d(TAG, "SoLoader initialized");
        Log.d(TAG, "Hermes: enabled");
        Log.d(TAG, "New Architecture: disabled");
        Log.d(TAG, "MainApplication onCreate completed");
    }
}
