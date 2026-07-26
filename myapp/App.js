import React, { Component, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
  Switch,
} from 'react-native';

var SCREEN_WIDTH = 360;
var SCREEN_HEIGHT = 640;
try {
  var dims = Dimensions.get('window');
  SCREEN_WIDTH = dims.width;
  SCREEN_HEIGHT = dims.height;
} catch (e) {}

var COLORS = {
  primary: '#e94560',
  primaryDark: '#c73e54',
  secondary: '#0f3460',
  background: '#1a1a2e',
  backgroundLight: '#16213e',
  card: '#0f3460',
  text: '#ffffff',
  textSecondary: '#8888aa',
  textMuted: '#555577',
  success: '#00ff88',
  warning: '#ffaa00',
  error: '#ff4444',
  info: '#4488ff',
  border: '#2a2a4e',
};

var Icons = {
  camera: '📷',
  gallery: '🖼️',
  settings: '⚙️',
  home: '🏠',
  info: 'ℹ️',
  refresh: '🔄',
  trash: '🗑️',
  close: '❌',
  location: '📍',
  bluetooth: '🔵',
  battery: '🔋',
  sensor: '📡',
  flash: '⚡',
  filter: '🎨',
  search: '🔍',
  folder: '📁',
  video: '🎬',
  unlock: '🔓',
  lightning: '⚡',
};

// ============================================================
// Error Boundary - هیچوقت crash نمی‌کنه
// ============================================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  copyError = () => {
    var errorText = '=== ERROR ===\n';
    if (this.state.error) {
      errorText = errorText + 'Message: ' + String(this.state.error.message) + '\n';
      errorText = errorText + 'Stack: ' + String(this.state.error.stack) + '\n';
    }
    if (this.state.errorInfo) {
      errorText = errorText + 'Component Stack: ' + String(this.state.errorInfo.componentStack) + '\n';
    }
    try {
      var React = require('react-native');
      if (React.Clipboard) {
        React.Clipboard.setString(errorText);
        this.setState({ copied: true });
      }
    } catch (e) {}
    Alert.alert('خطا کپی شد', errorText);
  };

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    });
  };

  render() {
    if (this.state.hasError) {
      var errorMsg = 'Unknown Error';
      var errorStack = '';
      var componentStack = '';

      if (this.state.error) {
        errorMsg = String(this.state.error.message || 'Unknown Error');
        errorStack = String(this.state.error.stack || '');
      }
      if (this.state.errorInfo && this.state.errorInfo.componentStack) {
        componentStack = String(this.state.errorInfo.componentStack);
      }

      return (
        <View style={errorStyles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#1a0000" />
          <ScrollView style={errorStyles.scrollView}>
            <Text style={errorStyles.emoji}>💥</Text>
            <Text style={errorStyles.title}>خطایی رخ داد!</Text>
            <Text style={errorStyles.subtitle}>اپ crash نکرد. خطا رو کپی کن و بفرست.</Text>

            <View style={errorStyles.errorBox}>
              <Text style={errorStyles.errorLabel}>Message:</Text>
              <Text style={errorStyles.errorText}>{errorMsg}</Text>
            </View>

            {errorStack !== '' ? (
              <View style={errorStyles.errorBox}>
                <Text style={errorStyles.errorLabel}>Stack:</Text>
                <Text style={errorStyles.errorTextSmall}>{errorStack}</Text>
              </View>
            ) : null}

            {componentStack !== '' ? (
              <View style={errorStyles.errorBox}>
                <Text style={errorStyles.errorLabel}>Component:</Text>
                <Text style={errorStyles.errorTextSmall}>{componentStack}</Text>
              </View>
            ) : null}

            <TouchableOpacity style={errorStyles.copyButton} onPress={this.copyError}>
              <Text style={errorStyles.copyButtonText}>
                {this.state.copied ? '✅ کپی شد!' : '📋 کپی خطا'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={errorStyles.retryButton} onPress={this.resetError}>
              <Text style={errorStyles.retryButtonText}>🔄 تلاش مجدد</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

var errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0000',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#ffaaaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorBox: {
    backgroundColor: '#2a0000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  errorLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff8888',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  errorTextSmall: {
    fontSize: 10,
    color: '#ffcccc',
    lineHeight: 16,
  },
  copyButton: {
    backgroundColor: '#e94560',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  copyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  retryButton: {
    backgroundColor: '#0f3460',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

// ============================================================
// کامپوننت‌های UI
// ============================================================

var CustomButton = function(props) {
  var title = props.title;
  var onPress = props.onPress;
  var icon = props.icon;
  var color = props.color || COLORS.primary;
  var textColor = props.textColor || COLORS.text;
  var style = props.style;
  var disabled = props.disabled || false;
  var loading = props.loading || false;
  var size = props.size || 'medium';
  var fullWidth = props.fullWidth || false;

  var sizes = {
    small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 13 },
    medium: { paddingVertical: 14, paddingHorizontal: 24, fontSize: 16 },
    large: { paddingVertical: 18, paddingHorizontal: 32, fontSize: 18 },
  };

  var currentSize = sizes[size] || sizes.medium;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? COLORS.textMuted : color,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon ? (
            <Text style={{ fontSize: currentSize.fontSize + 2, marginRight: 8 }}>
              {icon}
            </Text>
          ) : null}
          <Text
            style={[
              styles.buttonText,
              { color: textColor, fontSize: currentSize.fontSize },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

var Card = function(props) {
  var children = props.children;
  var style = props.style;
  var title = props.title;
  var icon = props.icon;
  var onPress = props.onPress;

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      {(title || icon) ? (
        <View style={styles.cardHeader}>
          {icon ? <Text style={styles.cardIcon}>{icon}</Text> : null}
          {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
        </View>
      ) : null}
      {children}
    </TouchableOpacity>
  );
};

var Header = function(props) {
  var title = props.title;
  var subtitle = props.subtitle;
  var rightIcon = props.rightIcon;
  var onRightPress = props.onRightPress;
  var leftIcon = props.leftIcon;
  var onLeftPress = props.onLeftPress;

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {leftIcon ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.headerButton}>
            <Text style={styles.headerIcon}>{leftIcon}</Text>
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.headerButton}>
          <Text style={styles.headerIcon}>{rightIcon}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

var TabBar = function(props) {
  var tabs = props.tabs;
  var activeTab = props.activeTab;
  var onTabChange = props.onTabChange;

  return (
    <View style={styles.tabBar}>
      {tabs.map(function(tab, index) {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabItem,
              activeTab === index ? styles.tabItemActive : null,
            ]}
            onPress={function() { onTabChange(index); }}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === index ? styles.tabLabelActive : null,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ============================================================
// صفحه اصلی
// ============================================================
var HomeScreen = function() {
  var statsRef = useRef({ photos: 0, videos: 0, sensors: 0 });
  var fadeAnim = useRef(new Animated.Value(0)).current;
  var slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(function() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  var platformName = 'Unknown';
  try {
    platformName = Platform.OS === 'android' ? '🤖 Android' : '🍎 iOS';
  } catch (e) {}

  var platformVersion = 'Unknown';
  try {
    platformVersion = String(Platform.Version);
  } catch (e) {}

  return (
    <Animated.View
      style={[
        styles.screen,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Header
        title="My Dynamic App"
        subtitle="React Native Runtime Engine"
        rightIcon={Icons.settings}
        onRightPress={function() { Alert.alert('تنظیمات', 'به زودی...'); }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.welcomeCard}>
          <Text style={styles.welcomeEmoji}>🚀</Text>
          <Text style={styles.welcomeTitle}>خوش آمدید!</Text>
          <Text style={styles.welcomeText}>
            این اپلیکیشن کاملاً Native اجرا می‌شود.
            {'\n'}
            هر تغییری در کد، فوری اعمال می‌شود.
          </Text>
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>{Icons.camera}</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>عکس</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>{Icons.video}</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>ویدیو</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>{Icons.sensor}</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>سنسور</Text>
          </Card>
        </View>

        <Card title="اطلاعات دستگاه" icon={Icons.info}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>سیستم‌عامل:</Text>
            <Text style={styles.infoValue}>{platformName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>نسخه:</Text>
            <Text style={styles.infoValue}>{platformVersion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>موتور JS:</Text>
            <Text style={styles.infoValue}>⚡ Hermes</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ابعاد صفحه:</Text>
            <Text style={styles.infoValue}>
              {Math.round(SCREEN_WIDTH)} × {Math.round(SCREEN_HEIGHT)}
            </Text>
          </View>
        </Card>

        <Card title="دسترسی سریع" icon={Icons.lightning}>
          <View style={styles.quickGrid}>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={function() { Alert.alert('دوربین', 'دوربین باز شد! 📷'); }}
            >
              <Text style={styles.quickIcon}>{Icons.camera}</Text>
              <Text style={styles.quickLabel}>دوربین</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={function() { Alert.alert('گالری', 'گالری باز شد! 🖼️'); }}
            >
              <Text style={styles.quickIcon}>{Icons.gallery}</Text>
              <Text style={styles.quickLabel}>گالری</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={function() { Alert.alert('سنسورها', 'سنسورها فعال شدند! 📡'); }}
            >
              <Text style={styles.quickIcon}>{Icons.sensor}</Text>
              <Text style={styles.quickLabel}>سنسورها</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={function() { Alert.alert('بلوتوث', 'بلوتوث فعال شد! 🔵'); }}
            >
              <Text style={styles.quickIcon}>{Icons.bluetooth}</Text>
              <Text style={styles.quickLabel}>بلوتوث</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={function() { Alert.alert('موقعیت', 'GPS فعال شد! 📍'); }}
            >
              <Text style={styles.quickIcon}>{Icons.location}</Text>
              <Text style={styles.quickLabel}>موقعیت</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={function() { Alert.alert('فایل‌ها', 'مدیریت فایل! 📁'); }}
            >
              <Text style={styles.quickIcon}>{Icons.folder}</Text>
              <Text style={styles.quickLabel}>فایل‌ها</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.actionButtons}>
          <CustomButton
            title="شروع عکاسی"
            icon={Icons.camera}
            onPress={function() { Alert.alert('دوربین', 'حالت عکاسی فعال شد!'); }}
            fullWidth
            size="large"
          />
          <CustomButton
            title="اسکن محیط"
            icon={Icons.search}
            color={COLORS.secondary}
            onPress={function() { Alert.alert('اسکن', 'اسکن محیط شروع شد!'); }}
            fullWidth
            size="large"
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

// ============================================================
// صفحه دوربین
// ============================================================
var CameraScreen = function() {
  var hasPermissionState = useState(false);
  var hasPermission = hasPermissionState[0];
  var setHasPermission = hasPermissionState[1];

  var flashModeState = useState('off');
  var flashMode = flashModeState[0];
  var setFlashMode = flashModeState[1];

  var facingState = useState('back');
  var facing = facingState[0];
  var setFacing = facingState[1];

  var photoCountState = useState(0);
  var photoCount = photoCountState[0];
  var setPhotoCount = photoCountState[1];

  var isRecordingState = useState(false);
  var isRecording = isRecordingState[0];
  var setIsRecording = isRecordingState[1];

  var recordTimeState = useState(0);
  var recordTime = recordTimeState[0];
  var setRecordTime = recordTimeState[1];

  var activeFilterState = useState('none');
  var activeFilter = activeFilterState[0];
  var setActiveFilter = activeFilterState[1];

  var recordTimer = useRef(null);

  var filters = [
    { name: 'بدون فیلتر', id: 'none' },
    { name: 'سیاه‌وسفید', id: 'bw' },
    { name: 'سپیا', id: 'sepia' },
    { name: 'وینتیج', id: 'vintage' },
    { name: 'سرد', id: 'cold' },
    { name: 'گرم', id: 'warm' },
  ];

  useEffect(function() {
    requestCameraPermission();
    return function() {
      if (recordTimer.current) {
        clearInterval(recordTimer.current);
      }
    };
  }, []);

  var requestCameraPermission = async function() {
    try {
      if (Platform.OS === 'android') {
        var granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'مجوز دوربین',
            message: 'اپلیکیشن برای عکاسی به دوربین نیاز دارد',
            buttonPositive: 'تأیید',
            buttonNegative: 'رد',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    } catch (err) {
      setHasPermission(false);
    }
  };

  var takePhoto = function() {
    setPhotoCount(photoCount + 1);
    Alert.alert('📸 عکس گرفته شد!', 'عکس شماره ' + String(photoCount + 1) + ' ذخیره شد.');
  };

  var toggleRecording = function() {
    if (isRecording) {
      clearInterval(recordTimer.current);
      setIsRecording(false);
      Alert.alert('⏹️ ضبط متوقف شد', 'مدت ضبط: ' + String(recordTime) + ' ثانیه');
      setRecordTime(0);
    } else {
      setIsRecording(true);
      setRecordTime(0);
      recordTimer.current = setInterval(function() {
        setRecordTime(function(prev) { return prev + 1; });
      }, 1000);
    }
  };

  var toggleFlash = function() {
    var modes = ['off', 'on', 'auto', 'torch'];
    var currentIndex = modes.indexOf(flashMode);
    var nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex]);
  };

  var toggleFacing = function() {
    setFacing(facing === 'back' ? 'front' : 'back');
  };

  if (!hasPermission) {
    return (
      <View style={styles.screen}>
        <Header title="دوربین" icon={Icons.camera} />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionEmoji}>📷</Text>
          <Text style={styles.permissionTitle}>دسترسی به دوربین</Text>
          <Text style={styles.permissionText}>
            برای استفاده از دوربین، لطفاً مجوز دسترسی را تأیید کنید.
          </Text>
          <CustomButton
            title="درخواست مجوز"
            icon={Icons.unlock}
            onPress={requestCameraPermission}
            size="large"
          />
        </View>
      </View>
    );
  }

  var flashText = '⚡ خاموش';
  if (flashMode === 'on') flashText = '⚡ روشن';
  if (flashMode === 'auto') flashText = '⚡ خودکار';
  if (flashMode === 'torch') flashText = '⚡ چراغ';

  var filterName = 'بدون فیلتر';
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].id === activeFilter) {
      filterName = filters[i].name;
      break;
    }
  }

  var minutes = String(Math.floor(recordTime / 60));
  if (minutes.length < 2) minutes = '0' + minutes;
  var seconds = String(recordTime % 60);
  if (seconds.length < 2) seconds = '0' + seconds;

  return (
    <View style={styles.screen}>
      <Header
        title="دوربین"
        subtitle={facing === 'back' ? 'دوربین پشت' : 'دوربین جلو'}
        leftIcon={Icons.close}
        onLeftPress={function() { Alert.alert('بستن دوربین'); }}
        rightIcon={Icons.settings}
        onRightPress={function() { Alert.alert('تنظیمات دوربین'); }}
      />

      <View style={styles.cameraPreview}>
        <View style={styles.cameraOverlay}>
          <Text style={styles.cameraPlaceholder}>📷</Text>
          <Text style={styles.cameraText}>
            دوربین {facing === 'back' ? 'پشت' : 'جلو'} فعال است
          </Text>
          {isRecording ? (
            <View style={styles.recordingBadge}>
              <Text style={styles.recordingDot}>●</Text>
              <Text style={styles.recordingTime}>{minutes}:{seconds}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>{Icons.filter} {filterName}</Text>
        </View>

        <View style={styles.flashBadge}>
          <Text style={styles.flashBadgeText}>{flashText}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        style={styles.filterScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {filters.map(function(filter) {
          return (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterItem,
                activeFilter === filter.id ? styles.filterItemActive : null,
              ]}
              onPress={function() { setActiveFilter(filter.id); }}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.id ? styles.filterTextActive : null,
                ]}
              >
                {filter.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Text style={styles.controlIcon}>⚡</Text>
          <Text style={styles.controlLabel}>فلش</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shutterButton}
          onPress={takePhoto}
          onLongPress={toggleRecording}
        >
          <View style={[styles.shutterInner, isRecording ? styles.shutterRecording : null]}>
            <Text style={styles.shutterIcon}>{isRecording ? '⏹️' : '📸'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleFacing}>
          <Text style={styles.controlIcon}>🔄</Text>
          <Text style={styles.controlLabel}>چرخش</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.photoStats}>
        <Text style={styles.photoStatsText}>📸 {String(photoCount)} عکس گرفته شده</Text>
      </View>
    </View>
  );
};

// ============================================================
// صفحه سنسورها
// ============================================================
var SensorsScreen = function() {
  var sensorsState = useState({
    accelerometer: { x: '0.000', y: '0.000', z: '9.800', active: false },
    gyroscope: { x: '0.000', y: '0.000', z: '0.000', active: false },
    magnetometer: { x: '0.0', y: '0.0', z: '0.0', active: false },
    barometer: { pressure: '1013.0', active: false },
    light: { lux: '0', active: false },
    proximity: { distance: '5', active: false },
  });
  var sensors = sensorsState[0];
  var setSensors = sensorsState[1];

  useEffect(function() {
    var interval = setInterval(function() {
      setSensors(function(prev) {
        var next = {};
        var keys = Object.keys(prev);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (prev[key].active) {
            if (key === 'accelerometer') {
              next[key] = {
                x: (Math.random() * 2 - 1).toFixed(3),
                y: (Math.random() * 2 - 1).toFixed(3),
                z: (Math.random() * 2 - 1 + 9.8).toFixed(3),
                active: true,
              };
            } else if (key === 'gyroscope') {
              next[key] = {
                x: (Math.random() * 2 - 1).toFixed(3),
                y: (Math.random() * 2 - 1).toFixed(3),
                z: (Math.random() * 2 - 1).toFixed(3),
                active: true,
              };
            } else if (key === 'magnetometer') {
              next[key] = {
                x: (Math.random() * 100 - 50).toFixed(1),
                y: (Math.random() * 100 - 50).toFixed(1),
                z: (Math.random() * 100 - 50).toFixed(1),
                active: true,
              };
            } else if (key === 'barometer') {
              next[key] = {
                pressure: (1013 + Math.random() * 10 - 5).toFixed(1),
                active: true,
              };
            } else if (key === 'light') {
              next[key] = {
                lux: String(Math.floor(Math.random() * 1000)),
                active: true,
              };
            } else if (key === 'proximity') {
              next[key] = {
                distance: Math.random() > 0.5 ? '0' : '5',
                active: true,
              };
            } else {
              next[key] = prev[key];
            }
          } else {
            next[key] = prev[key];
          }
        }
        return next;
      });
    }, 500);

    return function() { clearInterval(interval); };
  }, []);

  var toggleSensor = function(sensorName) {
    setSensors(function(prev) {
      var next = {};
      var keys = Object.keys(prev);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key === sensorName) {
          var copy = {};
          var propKeys = Object.keys(prev[key]);
          for (var j = 0; j < propKeys.length; j++) {
            copy[propKeys[j]] = prev[key][propKeys[j]];
          }
          copy.active = !prev[key].active;
          next[key] = copy;
        } else {
          next[key] = prev[key];
        }
      }
      return next;
    });
  };

  var renderSensorCard = function(name, icon, sensorKey) {
    var sensor = sensors[sensorKey];
    var dataKeys = Object.keys(sensor);
    var dataItems = [];
    for (var i = 0; i < dataKeys.length; i++) {
      if (dataKeys[i] !== 'active') {
        dataItems.push({ key: dataKeys[i], value: String(sensor[dataKeys[i]]) });
      }
    }

    return (
      <Card key={sensorKey} style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <View style={styles.sensorTitleRow}>
            <Text style={styles.sensorIcon}>{icon}</Text>
            <Text style={styles.sensorName}>{name}</Text>
          </View>
          <Switch
            value={sensor.active}
            onValueChange={function() { toggleSensor(sensorKey); }}
            trackColor={{ true: COLORS.success, false: COLORS.textMuted }}
            thumbColor={sensor.active ? '#fff' : '#ccc'}
          />
        </View>
        {sensor.active ? (
          <View style={styles.sensorData}>
            {dataItems.map(function(item) {
              return (
                <View key={item.key} style={styles.sensorDataRow}>
                  <Text style={styles.sensorDataLabel}>{item.key}:</Text>
                  <Text style={styles.sensorDataValue}>{item.value}</Text>
                </View>
              );
            })}
          </View>
        ) : null}
      </Card>
    );
  };

  return (
    <View style={styles.screen}>
      <Header title="سنسورها" subtitle="پایش زنده سنسورهای دستگاه" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card title="باتری" icon={Icons.battery}>
          <View style={styles.batteryRow}>
            <Text style={styles.batteryIcon}>🔋</Text>
            <View style={styles.batteryInfo}>
              <Text style={styles.batteryLevel}>85%</Text>
              <Text style={styles.batteryStatus}>🔌 بدون شارژ</Text>
            </View>
            <View style={styles.batteryBar}>
              <View style={[styles.batteryFill, { width: '85%', backgroundColor: COLORS.success }]} />
            </View>
          </View>
        </Card>

        {renderSensorCard('شتاب‌سنج (Accelerometer)', '📱', 'accelerometer')}
        {renderSensorCard('ژیروسکوپ (Gyroscope)', '🔄', 'gyroscope')}
        {renderSensorCard('مغناطیس‌سنج (Magnetometer)', '🧭', 'magnetometer')}
        {renderSensorCard('فشارسنج (Barometer)', '🌡️', 'barometer')}
        {renderSensorCard('نورسنج (Light Sensor)', '☀️', 'light')}
        {renderSensorCard('مجاورت (Proximity)', '📡', 'proximity')}
      </ScrollView>
    </View>
  );
};

// ============================================================
// صفحه تنظیمات
// ============================================================
var SettingsScreen = function() {
  var settingsState = useState({
    darkMode: true,
    notifications: true,
    sound: true,
    vibration: true,
    autoSave: true,
    highQuality: true,
    showFPS: false,
    developerMode: false,
    hotReload: true,
    cacheEnabled: true,
  });
  var settings = settingsState[0];
  var setSettings = settingsState[1];

  var toggleSetting = function(key) {
    setSettings(function(prev) {
      var next = {};
      var keys = Object.keys(prev);
      for (var i = 0; i < keys.length; i++) {
        next[keys[i]] = prev[keys[i]];
      }
      next[key] = !prev[key];
      return next;
    });
  };

  var renderSettingRow = function(label, icon, key, description) {
    return (
      <View key={key} style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <View style={styles.settingLabelRow}>
            <Text style={styles.settingIcon}>{icon}</Text>
            <Text style={styles.settingLabel}>{label}</Text>
          </View>
          {description ? (
            <Text style={styles.settingDescription}>{description}</Text>
          ) : null}
        </View>
        <Switch
          value={settings[key]}
          onValueChange={function() { toggleSetting(key); }}
          trackColor={{ true: COLORS.primary, false: COLORS.textMuted }}
          thumbColor={settings[key] ? '#fff' : '#ccc'}
        />
      </View>
    );
  };

  var buildDate = '';
  try {
    buildDate = new Date().toLocaleDateString();
  } catch (e) {
    buildDate = 'Unknown';
  }

  return (
    <View style={styles.screen}>
      <Header title="تنظیمات" subtitle="پیکربندی اپلیکیشن" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card title="ظاهر" icon="🎨">
          {renderSettingRow('حالت تاریک', '🌙', 'darkMode', 'استفاده از تم تاریک')}
          {renderSettingRow('نمایش FPS', '📊', 'showFPS', 'نمایش فریم بر ثانیه')}
        </Card>

        <Card title="اعلان‌ها" icon="🔔">
          {renderSettingRow('اعلان‌ها', '🔔', 'notifications', 'دریافت اعلان‌ها')}
          {renderSettingRow('صدا', '🔊', 'sound', 'پخش صدا')}
          {renderSettingRow('لرزش', '📳', 'vibration', 'لرزش دستگاه')}
        </Card>

        <Card title="دوربین" icon="📷">
          {renderSettingRow('ذخیره خودکار', '💾', 'autoSave', 'ذخیره خودکار عکس‌ها')}
          {renderSettingRow('کیفیت بالا', '✨', 'highQuality', 'عکاسی با کیفیت بالا')}
        </Card>

        <Card title="توسعه‌دهنده" icon="💻">
          {renderSettingRow('حالت توسعه‌دهنده', '🔧', 'developerMode', 'فعال‌سازی ابزارهای توسعه')}
          {renderSettingRow('Hot Reload', '🔄', 'hotReload', 'بارگذاری مجدد خودکار')}
          {renderSettingRow('کش', '📦', 'cacheEnabled', 'استفاده از حافظه موقت')}
        </Card>

        <Card title="درباره اپلیکیشن" icon="ℹ️">
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>نسخه:</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>موتور:</Text>
            <Text style={styles.aboutValue}>React Native + Hermes</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>معماری:</Text>
            <Text style={styles.aboutValue}>Dynamic Bundle Loading</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>تاریخ ساخت:</Text>
            <Text style={styles.aboutValue}>{buildDate}</Text>
          </View>
        </Card>

        <View style={styles.settingsButtons}>
          <CustomButton
            title="پاک کردن کش"
            icon={Icons.trash}
            color={COLORS.warning}
            onPress={function() { Alert.alert('کش', 'کش پاک شد! ✅'); }}
            fullWidth
          />
          <CustomButton
            title="بازنشانی تنظیمات"
            icon={Icons.refresh}
            color={COLORS.error}
            onPress={function() { Alert.alert('بازنشانی', 'تنظیمات به حالت اولیه بازگشت! ✅'); }}
            fullWidth
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// ============================================================
// اپلیکیشن اصلی
// ============================================================
var AppContent = function() {
  var activeTabState = useState(0);
  var activeTab = activeTabState[0];
  var setActiveTab = activeTabState[1];

  var isLoadingState = useState(true);
  var isLoading = isLoadingState[0];
  var setIsLoading = isLoadingState[1];

  var tabs = [
    { label: 'خانه', icon: Icons.home },
    { label: 'دوربین', icon: Icons.camera },
    { label: 'سنسورها', icon: Icons.sensor },
    { label: 'تنظیمات', icon: Icons.settings },
  ];

  useEffect(function() {
    var timer = setTimeout(function() {
      setIsLoading(false);
    }, 1500);

    return function() { clearTimeout(timer); };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <Text style={styles.loadingEmoji}>🚀</Text>
        <Text style={styles.loadingTitle}>My Dynamic App</Text>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        <Text style={styles.loadingText}>در حال بارگذاری...</Text>
        <Text style={styles.loadingSubtext}>React Native + Hermes Engine</Text>
      </View>
    );
  }

  var screen = null;
  if (activeTab === 0) {
    screen = <HomeScreen />;
  } else if (activeTab === 1) {
    screen = <CameraScreen />;
  } else if (activeTab === 2) {
    screen = <SensorsScreen />;
  } else if (activeTab === 3) {
    screen = <SettingsScreen />;
  } else {
    screen = <HomeScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      {screen}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
};

var App = function() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

// ============================================================
// استایل‌ها
// ============================================================
var styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  screen: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  loadingScreen: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingEmoji: { fontSize: 80, marginBottom: 20 },
  loadingTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
  loadingText: { fontSize: 16, color: COLORS.textSecondary, marginTop: 20 },
  loadingSubtext: { fontSize: 12, color: COLORS.textMuted, marginTop: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.backgroundLight, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  headerSubtitle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  headerButton: { padding: 8 },
  headerIcon: { fontSize: 22 },
  tabBar: { flexDirection: 'row', backgroundColor: COLORS.backgroundLight, borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 8, paddingTop: 8 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  tabItemActive: { backgroundColor: 'rgba(233, 69, 96, 0.1)', borderRadius: 12 },
  tabIcon: { fontSize: 20, marginBottom: 2 },
  tabLabel: { fontSize: 10, color: COLORS.textMuted },
  tabLabelActive: { color: COLORS.primary, fontWeight: 'bold' },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 16, elevation: 4 },
  buttonText: { fontWeight: 'bold' },
  card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardIcon: { fontSize: 20, marginRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  welcomeCard: { alignItems: 'center', paddingVertical: 24, backgroundColor: COLORS.secondary },
  welcomeEmoji: { fontSize: 50, marginBottom: 12 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  welcomeText: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: { flex: 1, alignItems: 'center', marginHorizontal: 4, paddingVertical: 16 },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 4 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoLabel: { fontSize: 13, color: COLORS.textSecondary },
  infoValue: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickItem: { width: '30%', alignItems: 'center', paddingVertical: 16, backgroundColor: COLORS.backgroundLight, borderRadius: 16, marginBottom: 10 },
  quickIcon: { fontSize: 28, marginBottom: 6 },
  quickLabel: { fontSize: 11, color: COLORS.textSecondary },
  actionButtons: { marginTop: 8 },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  permissionEmoji: { fontSize: 80, marginBottom: 20 },
  permissionTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },
  permissionText: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  cameraPreview: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  cameraOverlay: { alignItems: 'center' },
  cameraPlaceholder: { fontSize: 80, marginBottom: 16 },
  cameraText: { fontSize: 16, color: COLORS.textSecondary },
  recordingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.8)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 16 },
  recordingDot: { color: '#fff', fontSize: 12, marginRight: 6 },
  recordingTime: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  filterBadge: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  filterBadgeText: { color: '#fff', fontSize: 12 },
  flashBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  flashBadgeText: { color: '#fff', fontSize: 12 },
  filterScroll: { maxHeight: 50, backgroundColor: COLORS.backgroundLight },
  filterScrollContent: { paddingHorizontal: 12, paddingVertical: 8 },
  filterItem: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.card, marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
  filterItemActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 12, color: COLORS.textSecondary },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
  cameraControls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 20, backgroundColor: COLORS.backgroundLight },
  controlButton: { alignItems: 'center', padding: 12 },
  controlIcon: { fontSize: 28, marginBottom: 4 },
  controlLabel: { fontSize: 10, color: COLORS.textSecondary },
  shutterButton: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#fff' },
  shutterInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  shutterRecording: { backgroundColor: COLORS.error, borderRadius: 8, width: 40, height: 40 },
  shutterIcon: { fontSize: 24 },
  photoStats: { paddingVertical: 12, alignItems: 'center', backgroundColor: COLORS.background },
  photoStatsText: { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  sensorCard: { marginBottom: 12 },
  sensorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sensorTitleRow: { flexDirection: 'row', alignItems: 'center' },
  sensorIcon: { fontSize: 20, marginRight: 8 },
  sensorName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  sensorData: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  sensorDataRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  sensorDataLabel: { fontSize: 12, color: COLORS.textSecondary },
  sensorDataValue: { fontSize: 12, color: COLORS.success },
  batteryRow: { flexDirection: 'row', alignItems: 'center' },
  batteryIcon: { fontSize: 32, marginRight: 12 },
  batteryInfo: { marginRight: 16 },
  batteryLevel: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  batteryStatus: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  batteryBar: { flex: 1, height: 12, backgroundColor: COLORS.background, borderRadius: 6, overflow: 'hidden' },
  batteryFill: { height: '100%', borderRadius: 6 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  settingInfo: { flex: 1, marginRight: 12 },
  settingLabelRow: { flexDirection: 'row', alignItems: 'center' },
  settingIcon: { fontSize: 18, marginRight: 8 },
  settingLabel: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  settingDescription: { fontSize: 11, color: COLORS.textMuted, marginTop: 4, marginLeft: 26 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  aboutLabel: { fontSize: 13, color: COLORS.textSecondary },
  aboutValue: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  settingsButtons: { marginTop: 8 },
});

export default App;
