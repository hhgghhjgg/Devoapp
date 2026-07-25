package com.myapp;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
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
            List<ReactPackage> packages = new PackageList(this).getPackages();
            return packages;
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

        ReactFeatureFlags.useTurboModules = false;

        SoLoader.init(this, false);

        if (BuildConfig.DEBUG) {
            initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        }

        Log.d(TAG, "MainApplication onCreate completed");
        Log.d(TAG, "Hermes Enabled: true");
        Log.d(TAG, "New Architecture: false");
    }

    private static void initializeFlipper(
            Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                Class<?> aClass = Class.forName("com.myapp.ReactNativeFlipper");
                aClass
                    .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                    .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                Log.e(TAG, "Flipper class not found", e);
            } catch (NoSuchMethodException e) {
                Log.e(TAG, "Flipper method not found", e);
            } catch (IllegalAccessException e) {
                Log.e(TAG, "Flipper access error", e);
            } catch (InvocationTargetException e) {
                Log.e(TAG, "Flipper invocation error", e);
            }
        }
    }
}
