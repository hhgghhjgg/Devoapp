package com.myapp;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    private static final String TAG = "MyApp";
    private static final int PERMISSION_REQUEST_CODE = 1001;
    private static final String APP_NAME = "MyApp";

    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;
    private boolean mIsReactLoaded = false;
    private boolean mIsLoading = false;

    private FrameLayout mRootLayout;
    private LinearLayout mStartLayout;
    private Button mStartButton;
    private ProgressBar mLoadingBar;
    private TextView mStatusText;
    private TextView mLogText;
    private ScrollView mLogScrollView;

    private String[] requiredPermissions;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().setStatusBarColor(Color.parseColor("#1a1a2e"));
            getWindow().setNavigationBarColor(Color.parseColor("#1a1a2e"));
        }

        setupRequiredPermissions();
        setupStartUI();
        copyMyAppFiles();
    }

    private void setupRequiredPermissions() {
        List<String> permissions = new ArrayList<>();
        permissions.add(Manifest.permission.CAMERA);
        permissions.add(Manifest.permission.RECORD_AUDIO);
        permissions.add(Manifest.permission.INTERNET);
        permissions.add(Manifest.permission.ACCESS_NETWORK_STATE);
        permissions.add(Manifest.permission.VIBRATE);
        permissions.add(Manifest.permission.WAKE_LOCK);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.READ_MEDIA_IMAGES);
            permissions.add(Manifest.permission.READ_MEDIA_VIDEO);
        } else {
            permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE);
            permissions.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        }

        permissions.add(Manifest.permission.ACCESS_FINE_LOCATION);
        permissions.add(Manifest.permission.ACCESS_COARSE_LOCATION);

        requiredPermissions = permissions.toArray(new String[0]);
    }

    private void setupStartUI() {
        mRootLayout = new FrameLayout(this);
        mRootLayout.setBackgroundColor(Color.parseColor("#1a1a2e"));

        mStartLayout = new LinearLayout(this);
        mStartLayout.setOrientation(LinearLayout.VERTICAL);
        mStartLayout.setGravity(Gravity.CENTER);
        mStartLayout.setBackgroundColor(Color.parseColor("#1a1a2e"));
        mStartLayout.setPadding(48, 48, 48, 48);

        TextView titleText = new TextView(this);
        titleText.setText("My Dynamic App");
        titleText.setTextColor(Color.WHITE);
        titleText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 28);
        titleText.setTypeface(Typeface.DEFAULT_BOLD);
        titleText.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams titleParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        titleParams.bottomMargin = 16;
        titleText.setLayoutParams(titleParams);
        mStartLayout.addView(titleText);

        TextView subtitleText = new TextView(this);
        subtitleText.setText("React Native Runtime Engine");
        subtitleText.setTextColor(Color.parseColor("#8888aa"));
        subtitleText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        subtitleText.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams subtitleParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        subtitleParams.bottomMargin = 80;
        subtitleText.setLayoutParams(subtitleParams);
        mStartLayout.addView(subtitleText);

        mStartButton = new Button(this);
        mStartButton.setText("▶  استارت");
        mStartButton.setTextColor(Color.WHITE);
        mStartButton.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        mStartButton.setTypeface(Typeface.DEFAULT_BOLD);
        mStartButton.setAllCaps(false);
        mStartButton.setPadding(64, 32, 64, 32);

        GradientDrawable buttonBackground = new GradientDrawable();
        buttonBackground.setShape(GradientDrawable.RECTANGLE);
        buttonBackground.setCornerRadius(50);
        buttonBackground.setColor(Color.parseColor("#e94560"));
        mStartButton.setBackground(buttonBackground);

        LinearLayout.LayoutParams buttonParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        buttonParams.gravity = Gravity.CENTER;
        buttonParams.bottomMargin = 40;
        mStartButton.setLayoutParams(buttonParams);

        mStartButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onStartButtonClicked();
            }
        });
        mStartLayout.addView(mStartButton);

        mLoadingBar = new ProgressBar(this);
        mLoadingBar.setVisibility(View.GONE);
        LinearLayout.LayoutParams progressParams = new LinearLayout.LayoutParams(100, 100);
        progressParams.gravity = Gravity.CENTER;
        progressParams.bottomMargin = 24;
        mLoadingBar.setLayoutParams(progressParams);
        mStartLayout.addView(mLoadingBar);

        mStatusText = new TextView(this);
        mStatusText.setText("آماده برای شروع");
        mStatusText.setTextColor(Color.parseColor("#aaaacc"));
        mStatusText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        mStatusText.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams statusParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        statusParams.bottomMargin = 24;
        mStatusText.setLayoutParams(statusParams);
        mStartLayout.addView(mStatusText);

        mLogScrollView = new ScrollView(this);
        LinearLayout.LayoutParams logScrollParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT, 300
        );
        logScrollParams.topMargin = 20;
        mLogScrollView.setLayoutParams(logScrollParams);
        mLogScrollView.setBackgroundColor(Color.parseColor("#0f0f23"));
        mLogScrollView.setPadding(16, 16, 16, 16);

        mLogText = new TextView(this);
        mLogText.setText("");
        mLogText.setTextColor(Color.parseColor("#00ff88"));
        mLogText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 11);
        mLogText.setTypeface(Typeface.MONOSPACE);
        mLogText.setLayoutParams(new ScrollView.LayoutParams(
            ScrollView.LayoutParams.MATCH_PARENT,
            ScrollView.LayoutParams.WRAP_CONTENT
        ));
        mLogScrollView.addView(mLogText);
        mStartLayout.addView(mLogScrollView);

        FrameLayout.LayoutParams startLayoutParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        );
        mRootLayout.addView(mStartLayout, startLayoutParams);

        setContentView(mRootLayout);
    }

    private void onStartButtonClicked() {
        if (mIsLoading) return;
        mIsLoading = true;

        addLog("[INFO] دکمه استارت فشرده شد...");
        updateStatus("در حال بررسی مجوزها...");

        mStartButton.setEnabled(false);
        mStartButton.setAlpha(0.5f);
        mLoadingBar.setVisibility(View.VISIBLE);

        if (checkAndRequestPermissions()) {
            addLog("[OK] تمام مجوزها تأیید شده‌اند");
            loadReactNativeApp();
        } else {
            addLog("[WARN] در حال درخواست مجوزها...");
            updateStatus("لطفاً مجوزها را تأیید کنید...");
        }
    }

    private boolean checkAndRequestPermissions() {
        List<String> listPermissionsNeeded = new ArrayList<>();

        for (String permission : requiredPermissions) {
            if (ContextCompat.checkSelfPermission(this, permission)
                    != PackageManager.PERMISSION_GRANTED) {
                listPermissionsNeeded.add(permission);
            }
        }

        if (!listPermissionsNeeded.isEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                listPermissionsNeeded.toArray(new String[0]),
                PERMISSION_REQUEST_CODE
            );
            return false;
        }

        return true;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == PERMISSION_REQUEST_CODE) {
            boolean allGranted = true;
            for (int result : grantResults) {
                if (result != PackageManager.PERMISSION_GRANTED) {
                    allGranted = false;
                    break;
                }
            }

            if (allGranted) {
                addLog("[OK] تمام مجوزها تأیید شدند");
                loadReactNativeApp();
            } else {
                addLog("[ERROR] برخی مجوزها رد شدند!");
                updateStatus("بدون مجوزها اپ کار نمی‌کند. دوباره تلاش کنید.");
                mStartButton.setEnabled(true);
                mStartButton.setAlpha(1.0f);
                mLoadingBar.setVisibility(View.GONE);
                mIsLoading = false;
            }
        }
    }

    private void loadReactNativeApp() {
        addLog("[INFO] در حال بارگذاری React Native Runtime...");
        updateStatus("در حال بارگذاری موتور React Native...");

        try {
            mReactRootView = new ReactRootView(this);

            mReactInstanceManager = ((MainApplication) getApplication())
                .getReactNativeHost()
                .getReactInstanceManager();

            addLog("[OK] ReactInstanceManager گرفته شد");
            updateStatus("در حال اجرای اپلیکیشن...");

            Bundle initialProps = new Bundle();
            initialProps.putString("appPath", getMyAppPath());
            initialProps.putBoolean("isDynamic", true);

            mReactRootView.startReactApplication(
                mReactInstanceManager,
                APP_NAME,
                initialProps
            );

            mIsReactLoaded = true;

            mReactInstanceManager.onHostResume(this, this);

            addLog("[OK] اپلیکیشن React Native شروع شد!");
            updateStatus("اپلیکیشن در حال اجراست ✓");

            mStartLayout.setVisibility(View.GONE);
            mRootLayout.addView(mReactRootView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            ));

            mIsLoading = false;

            addLog("[SUCCESS] ✓ اپلیکیشن با موفقیت بارگذاری شد!");

        } catch (Exception e) {
            addLog("[ERROR] خطا: " + e.getMessage());
            updateStatus("خطا در بارگذاری: " + e.getMessage());
            mStartButton.setEnabled(true);
            mStartButton.setAlpha(1.0f);
            mLoadingBar.setVisibility(View.GONE);
            mIsLoading = false;
            Log.e(TAG, "Error loading React Native", e);
        }
    }

    private String getMyAppPath() {
        File myAppDir = new File(getFilesDir(), "myapp");
        if (!myAppDir.exists()) {
            myAppDir.mkdirs();
        }
        return myAppDir.getAbsolutePath();
    }

    private void copyMyAppFiles() {
        addLog("[INFO] در حال کپی فایل‌های myapp...");

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    File targetDir = new File(getFilesDir(), "myapp");
                    if (!targetDir.exists()) {
                        targetDir.mkdirs();
                    }

                    copyAssetFile("myapp/index.android.bundle",
                        new File(targetDir, "index.android.bundle"));

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            addLog("[OK] فایل‌های myapp کپی شدند");
                        }
                    });

                } catch (Exception e) {
                    final String errorMsg = e.getMessage();
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            addLog("[WARN] کپی فایل: " + errorMsg);
                        }
                    });
                }
            }
        }).start();
    }

    private void copyAssetFile(String assetPath, File targetFile) throws IOException {
        InputStream in = null;
        OutputStream out = null;

        try {
            in = getAssets().open(assetPath);
            out = new FileOutputStream(targetFile);

            byte[] buffer = new byte[4096];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            out.flush();
        } finally {
            if (in != null) in.close();
            if (out != null) out.close();
        }
    }

    private void updateStatus(final String status) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mStatusText != null) {
                    mStatusText.setText(status);
                }
            }
        });
    }

    private void addLog(final String message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mLogText != null) {
                    String timestamp = new java.text.SimpleDateFormat(
                        "HH:mm:ss", java.util.Locale.getDefault()
                    ).format(new java.util.Date());
                    mLogText.append("[" + timestamp + "] " + message + "\n");

                    if (mLogScrollView != null) {
                        mLogScrollView.post(new Runnable() {
                            @Override
                            public void run() {
                                mLogScrollView.fullScroll(View.FOCUS_DOWN);
                            }
                        });
                    }
                }
                Log.d(TAG, message);
            }
        });
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        if (mIsReactLoaded && mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void onBackPressed() {
        if (mIsReactLoaded && mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mReactInstanceManager != null && mIsReactLoaded) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
            mReactRootView = null;
        }
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
            mReactInstanceManager = null;
        }
        mIsReactLoaded = false;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onActivityResult(this, requestCode, resultCode, data);
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, android.view.KeyEvent event) {
        if (keyCode == android.view.KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
}
