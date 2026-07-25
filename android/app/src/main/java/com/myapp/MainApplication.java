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

            // پکیج‌های سفارشی خودت رو اینجا اضافه کن
            // packages.add(new MyCustomCameraPackage());
            // packages.add(new MyCustomSensorPackage());
            // packages.add(new MyCustomBluetoothPackage());

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
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
            return BuildConfig.IS_HERMES_ENABLED;
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

        // فعال کردن قابلیت‌های جدید React Native
        ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;

        // بارگذاری کتابخانه‌های Native
        SoLoader.init(this, /* native exopackage */ false);

        // غیرفعال کردن Flipper در حالت Release
        if (BuildConfig.DEBUG) {
            initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        }

        Log.d(TAG, "MainApplication onCreate completed");
        Log.d(TAG, "Hermes Enabled: " + BuildConfig.IS_HERMES_ENABLED);
        Log.d(TAG, "New Architecture: " + BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
    }

    /**
     * بارگذاری Flipper برای دیباگ (فقط در حالت Debug)
     */
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
