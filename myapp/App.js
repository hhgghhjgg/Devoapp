import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  NativeModules,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
  TextInput,
  Switch,
  RefreshControl,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================
// رنگ‌های تم اپلیکیشن
// ============================================================
const COLORS = {
  primary: '#e94560',
  primaryDark: '#c73e54',
  secondary: '#0f3460',
  background: '#1a1a2e',
  backgroundLight: '#16213e',
  card: '#0f3460',
  cardLight: '#1a4080',
  text: '#ffffff',
  textSecondary: '#8888aa',
  textMuted: '#555577',
  success: '#00ff88',
  warning: '#ffaa00',
  error: '#ff4444',
  info: '#4488ff',
  border: '#2a2a4e',
  overlay: 'rgba(0,0,0,0.7)',
  gradient1: '#e94560',
  gradient2: '#0f3460',
  shadow: 'rgba(0,0,0,0.3)',
};

// ============================================================
// آیکون‌های ساده (بدون نیاز به کتابخانه خارجی)
// ============================================================
const Icons = {
  camera: '📷',
  gallery: '🖼️',
  settings: '⚙️',
  home: '🏠',
  info: 'ℹ️',
  refresh: '🔄',
  save: '💾',
  trash: '🗑️',
  play: '▶️',
  stop: '⏹️',
  check: '✅',
  close: '❌',
  warning: '⚠️',
  location: '📍',
  bluetooth: '🔵',
  wifi: '📶',
  battery: '🔋',
  sensor: '📡',
  mic: '🎤',
  flash: '⚡',
  timer: '⏱️',
  filter: '🎨',
  share: '📤',
  download: '📥',
  lock: '🔒',
  unlock: '🔓',
  star: '⭐',
  heart: '❤️',
  user: '👤',
  search: '🔍',
  plus: '➕',
  minus: '➖',
  edit: '✏️',
  copy: '📋',
  send: '📨',
  phone: '📞',
  mail: '📧',
  calendar: '📅',
  clock: '🕐',
  folder: '📁',
  file: '📄',
  code: '💻',
  rocket: '🚀',
  fire: '🔥',
  lightning: '⚡',
  globe: '🌐',
  shield: '🛡️',
  key: '🔑',
  bell: '🔔',
  volume: '🔊',
  mute: '🔇',
  sun: '☀️',
  moon: '🌙',
  cloud: '☁️',
  rain: '🌧️',
  snow: '❄️',
  wind: '💨',
  thermometer: '🌡️',
  compass: '🧭',
  map: '🗺️',
  car: '🚗',
  plane: '✈️',
  train: '🚆',
  bike: '🚲',
  walk: '🚶',
  run: '🏃',
  swim: '🏊',
  ball: '⚽',
  trophy: '🏆',
  medal: '🥇',
  gift: '🎁',
  music: '🎵',
  video: '🎬',
  book: '📚',
  pen: '🖊️',
  brush: '🖌️',
  scissors: '✂️',
  ruler: '📏',
  magnet: '🧲',
  bulb: '💡',
  wrench: '🔧',
  hammer: '🔨',
  screwdriver: '🪛',
  gear: '⚙️',
  nut: '🔩',
  plug: '🔌',
  batteryFull: '🔋',
  batteryLow: '🪫',
  signal: '📶',
  satellite: '📡',
  telescope: '🔭',
  microscope: '🔬',
  dna: '🧬',
  atom: '⚛️',
  planet: '🪐',
  star2: '🌟',
  comet: '☄️',
  explosion: '💥',
  sparkles: '✨',
  rainbow: '🌈',
  umbrella: '☂️',
  snowflake: '❄️',
  tornado: '🌪️',
  volcano: '🌋',
  mountain: '⛰️',
  island: '🏝️',
  beach: '🏖️',
  city: '🏙️',
  castle: '🏰',
  house: '🏠',
  building: '🏢',
  factory: '🏭',
  hospital: '🏥',
  school: '🏫',
  church: '⛪',
  mosque: '🕌',
  temple: '🛕',
  stadium: '🏟️',
  bridge: '🌉',
  fountain: '⛲',
  tent: '⛺',
  campfire: '🏕️',
  sunrise: '🌅',
  sunset: '🌇',
  night: '🌃',
  fog: '🌫️',
  lightning2: '🌩️',
  hurricane: '🌀',
  droplet: '💧',
  ocean: '🌊',
  fish: '🐟',
  whale: '🐋',
  shark: '🦈',
  octopus: '🐙',
  crab: '🦀',
  lobster: '🦞',
  shrimp: '🦐',
  snail: '🐌',
  butterfly: '🦋',
  bee: '🐝',
  ant: '🐜',
  spider: '🕷️',
  web: '🕸️',
  turtle: '🐢',
  snake: '🐍',
  lizard: '🦎',
  frog: '🐸',
  rabbit: '🐰',
  cat: '🐱',
  dog: '🐶',
  wolf: '🐺',
  fox: '🦊',
  bear: '🐻',
  panda: '🐼',
  koala: '🐨',
  tiger: '🐯',
  lion: '🦁',
  cow: '🐮',
  pig: '🐷',
  sheep: '🐑',
  goat: '🐐',
  deer: '🦌',
  horse: '🐴',
  unicorn: '🦄',
  chicken: '🐔',
  rooster: '🐓',
  turkey: '🦃',
  duck: '🦆',
  eagle: '🦅',
  owl: '🦉',
  parrot: '🦜',
  flamingo: '🦩',
  peacock: '🦚',
  penguin: '🐧',
  dove: '🕊️',
  swan: '🦢',
  goose: '🪿',
  bat: '🦇',
  monkey: '🐵',
  gorilla: '🦍',
  orangutan: '🦧',
  elephant: '🐘',
  rhino: '🦏',
  hippo: '🦛',
  giraffe: '🦒',
  zebra: '🦓',
  camel: '🐪',
  llama: '🦙',
  kangaroo: '🦘',
  sloth: '🦥',
  otter: '🦦',
  beaver: '🦫',
  hedgehog: '🦔',
  raccoon: '🦝',
  skunk: '🦨',
  badger: '🦡',
  mole: '🐀',
  mouse: '🐭',
  rat: '🐀',
  hamster: '🐹',
  guineaPig: '🐹',
  chinchilla: '🐹',
  ferret: '🦡',
  armadillo: '🦔',
  anteater: '🐜',
  platypus: '🦆',
  echidna: '🦔',
  wombat: '🐻',
  possum: '🐀',
  sugarGlider: '🐿️',
  squirrel: '🐿️',
  chipmunk: '🐿️',
  prairieDog: '🐿️',
  marmot: '🐿️',
  groundhog: '🐿️',
  capybara: '🐹',
  porcupine: '🦔',
  pangolin: '🦔',
  aardvark: '🐜',
  tapir: '🐷',
  peccary: '🐷',
  warthog: '🐗',
  boar: '🐗',
  bison: '🐂',
  buffalo: '🐃',
  yak: '🐂',
  muskox: '🐂',
  antelope: '🦌',
  gazelle: '🦌',
  impala: '🦌',
  wildebeest: '🦌',
  moose: '🫎',
  elk: '🫎',
  caribou: '🦌',
  reindeer: '🦌',
  okapi: '🦒',
  bongo: '🦌',
  nyala: '🦌',
  kudu: '🦌',
  oryx: '🦌',
  addax: '🦌',
  dikDik: '🦌',
  duiker: '🦌',
  steenbok: '🦌',
  grysbok: '🦌',
  klipspringer: '🦌',
  oribi: '🦌',
  roan: '🦌',
  sable: '🦌',
  hartebeest: '🦌',
  topi: '🦌',
  tsessebe: '🦌',
  blesbok: '🦌',
  springbok: '🦌',
  waterbuck: '🦌',
  kob: '🦌',
  lechwe: '🦌',
  puku: '🦌',
  sitatunga: '🦌',
  bushbuck: '🦌',
  nyala2: '🦌',
  greaterKudu: '🦌',
  lesserKudu: '🦌',
  mountainNyala: '🦌',
  bongo2: '🦌',
  okapi2: '🦒',
  giraffe2: '🦒',
  zebra2: '🦓',
  horse2: '🐴',
  donkey: '🫏',
  mule: '🫏',
  pony: '🐴',
  foal: '🐴',
  stallion: '🐴',
  mare: '🐴',
  colt: '🐴',
  filly: '🐴',
  gelding: '🐴',
  yearling: '🐴',
  weanling: '🐴',
  broodmare: '🐴',
  sire: '🐴',
  dam: '🐴',
};

// ============================================================
// کامپوننت دکمه سفارشی
// ============================================================
const CustomButton = ({
  title,
  onPress,
  icon,
  color = COLORS.primary,
  textColor = COLORS.text,
  style,
  textStyle,
  disabled = false,
  loading = false,
  size = 'medium',
  fullWidth = false,
}) => {
  const [pressed, setPressed] = useState(false);

  const sizes = {
    small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 13 },
    medium: { paddingVertical: 14, paddingHorizontal: 24, fontSize: 16 },
    large: { paddingVertical: 18, paddingHorizontal: 32, fontSize: 18 },
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? COLORS.textMuted : color,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {icon && (
            <Text style={{ fontSize: currentSize.fontSize + 2, marginRight: 8 }}>
              {icon}
            </Text>
          )}
          <Text
            style={[
              styles.buttonText,
              {
                color: textColor,
                fontSize: currentSize.fontSize,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

// ============================================================
// کامپوننت کارت
// ============================================================
const Card = ({ children, style, title, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      {(title || icon) && (
        <View style={styles.cardHeader}>
          {icon && <Text style={styles.cardIcon}>{icon}</Text>}
          {title && <Text style={styles.cardTitle}>{title}</Text>}
        </View>
      )}
      {children}
    </TouchableOpacity>
  );
};

// ============================================================
// کامپوننت هدر
// ============================================================
const Header = ({ title, subtitle, rightIcon, onRightPress, leftIcon, onLeftPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.headerButton}>
            <Text style={styles.headerIcon}>{leftIcon}</Text>
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightIcon && (
        <TouchableOpacity onPress={onRightPress} style={styles.headerButton}>
          <Text style={styles.headerIcon}>{rightIcon}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ============================================================
// کامپوننت تب بار
// ============================================================
const TabBar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabItem,
            activeTab === index && styles.tabItemActive,
          ]}
          onPress={() => onTabChange(index)}
        >
          <Text style={styles.tabIcon}>{tab.icon}</Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === index && styles.tabLabelActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ============================================================
// صفحه اصلی (Home)
// ============================================================
const HomeScreen = ({ navigation }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    platform: Platform.OS,
    version: Platform.Version,
    isTV: Platform.isTV,
  });

  const [stats, setStats] = useState({
    photos: 0,
    videos: 0,
    sensors: 0,
    connections: 0,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
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
        onRightPress={() => Alert.alert('تنظیمات', 'به زودی...')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* بنر خوش‌آمدگویی */}
        <Card style={styles.welcomeCard}>
          <Text style={styles.welcomeEmoji}>🚀</Text>
          <Text style={styles.welcomeTitle}>خوش آمدید!</Text>
          <Text style={styles.welcomeText}>
            این اپلیکیشن کاملاً Native اجرا می‌شود.
            {'\n'}
            هر تغییری در کد، فوری اعمال می‌شود.
          </Text>
        </Card>

        {/* آمار */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>{Icons.camera}</Text>
            <Text style={styles.statValue}>{stats.photos}</Text>
            <Text style={styles.statLabel}>عکس</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>{Icons.video}</Text>
            <Text style={styles.statValue}>{stats.videos}</Text>
            <Text style={styles.statLabel}>ویدیو</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>{Icons.sensor}</Text>
            <Text style={styles.statValue}>{stats.sensors}</Text>
            <Text style={styles.statLabel}>سنسور</Text>
          </Card>
        </View>

        {/* اطلاعات دستگاه */}
        <Card title="اطلاعات دستگاه" icon={Icons.info} style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>سیستم‌عامل:</Text>
            <Text style={styles.infoValue}>
              {deviceInfo.platform === 'android' ? '🤖 Android' : '🍎 iOS'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>نسخه:</Text>
            <Text style={styles.infoValue}>{deviceInfo.version}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>معماری:</Text>
            <Text style={styles.infoValue}>
              {Platform.constants?.reactNativeVersion
                ? `RN ${Platform.constants.reactNativeVersion.major}.${Platform.constants.reactNativeVersion.minor}`
                : 'React Native'}
            </Text>
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

        {/* دسترسی سریع */}
        <Card title="دسترسی سریع" icon={Icons.lightning} style={styles.quickCard}>
          <View style={styles.quickGrid}>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={() => Alert.alert('دوربین', 'دوربین باز شد! 📷')}
            >
              <Text style={styles.quickIcon}>{Icons.camera}</Text>
              <Text style={styles.quickLabel}>دوربین</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={() => Alert.alert('گالری', 'گالری باز شد! 🖼️')}
            >
              <Text style={styles.quickIcon}>{Icons.gallery}</Text>
              <Text style={styles.quickLabel}>گالری</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={() => Alert.alert('سنسورها', 'سنسورها فعال شدند! 📡')}
            >
              <Text style={styles.quickIcon}>{Icons.sensor}</Text>
              <Text style={styles.quickLabel}>سنسورها</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={() => Alert.alert('بلوتوث', 'بلوتوث فعال شد! 🔵')}
            >
              <Text style={styles.quickIcon}>{Icons.bluetooth}</Text>
              <Text style={styles.quickLabel}>بلوتوث</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={() => Alert.alert('موقعیت', 'GPS فعال شد! 📍')}
            >
              <Text style={styles.quickIcon}>{Icons.location}</Text>
              <Text style={styles.quickLabel}>موقعیت</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickItem}
              onPress={() => Alert.alert('فایل‌ها', 'مدیریت فایل! 📁')}
            >
              <Text style={styles.quickIcon}>{Icons.folder}</Text>
              <Text style={styles.quickLabel}>فایل‌ها</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* دکمه‌های عملیاتی */}
        <View style={styles.actionButtons}>
          <CustomButton
            title="شروع عکاسی"
            icon={Icons.camera}
            onPress={() => Alert.alert('دوربین', 'حالت عکاسی فعال شد!')}
            fullWidth
            size="large"
          />
          <CustomButton
            title="اسکن محیط"
            icon={Icons.search}
            color={COLORS.secondary}
            onPress={() => Alert.alert('اسکن', 'اسکن محیط شروع شد!')}
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
// صفحه دوربین (Camera)
// ============================================================
const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [flashMode, setFlashMode] = useState('off');
  const [facing, setFacing] = useState('back');
  const [photoCount, setPhotoCount] = useState(0);
  const [lastPhoto, setLastPhoto] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [filters, setFilters] = useState([
    { name: 'بدون فیلتر', id: 'none', active: true },
    { name: 'سیاه‌وسفید', id: 'bw', active: false },
    { name: 'سپیا', id: 'sepia', active: false },
    { name: 'وینتیج', id: 'vintage', active: false },
    { name: 'سرد', id: 'cold', active: false },
    { name: 'گرم', id: 'warm', active: false },
  ]);
  const [activeFilter, setActiveFilter] = useState('none');

  const recordTimer = useRef(null);

  useEffect(() => {
    requestCameraPermission();
    return () => {
      if (recordTimer.current) clearInterval(recordTimer.current);
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
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
      console.warn('Camera permission error:', err);
      setHasPermission(false);
    }
  };

  const takePhoto = () => {
    setPhotoCount((prev) => prev + 1);
    setLastPhoto({
      id: Date.now(),
      timestamp: new Date().toLocaleString('fa-IR'),
      filter: activeFilter,
      facing: facing,
    });
    Alert.alert('📸 عکس گرفته شد!', `عکس شماره ${photoCount + 1} ذخیره شد.`);
  };

  const toggleRecording = () => {
    if (isRecording) {
      clearInterval(recordTimer.current);
      setIsRecording(false);
      Alert.alert('⏹️ ضبط متوقف شد', `مدت ضبط: ${recordTime} ثانیه`);
      setRecordTime(0);
    } else {
      setIsRecording(true);
      setRecordTime(0);
      recordTimer.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const toggleFlash = () => {
    const modes = ['off', 'on', 'auto', 'torch'];
    const currentIndex = modes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex]);
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const selectFilter = (filterId) => {
    setActiveFilter(filterId);
    setFilters((prev) =>
      prev.map((f) => ({ ...f, active: f.id === filterId }))
    );
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

  return (
    <View style={styles.screen}>
      <Header
        title="دوربین"
        subtitle={facing === 'back' ? 'دوربین پشت' : 'دوربین جلو'}
        leftIcon={Icons.close}
        onLeftPress={() => setCameraActive(false)}
        rightIcon={Icons.settings}
        onRightPress={() => Alert.alert('تنظیمات دوربین')}
      />

      {/* نمای دوربین (شبیه‌سازی) */}
      <View style={styles.cameraPreview}>
        <View style={styles.cameraOverlay}>
          <Text style={styles.cameraPlaceholder}>
            {cameraActive ? '📷' : '📵'}
          </Text>
          <Text style={styles.cameraText}>
            {cameraActive
              ? `دوربین ${facing === 'back' ? 'پشت' : 'جلو'} فعال است`
              : 'دوربین غیرفعال است'}
          </Text>
          {isRecording && (
            <View style={styles.recordingBadge}>
              <Text style={styles.recordingDot}>●</Text>
              <Text style={styles.recordingTime}>
                {Math.floor(recordTime / 60)
                  .toString()
                  .padStart(2, '0')}
                :{(recordTime % 60).toString().padStart(2, '0')}
              </Text>
            </View>
          )}
        </View>

        {/* اطلاعات فیلتر */}
        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>
            {Icons.filter} {filters.find((f) => f.id === activeFilter)?.name}
          </Text>
        </View>

        {/* اطلاعات فلش */}
        <View style={styles.flashBadge}>
          <Text style={styles.flashBadgeText}>
            {flashMode === 'off'
              ? '⚡ خاموش'
              : flashMode === 'on'
              ? '⚡ روشن'
              : flashMode === 'auto'
              ? '⚡ خودکار'
              : '⚡ چراغ'}
          </Text>
        </View>
      </View>

      {/* فیلترها */}
      <ScrollView
        horizontal
        style={styles.filterScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterItem,
              filter.active && styles.filterItemActive,
            ]}
            onPress={() => selectFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                filter.active && styles.filterTextActive,
              ]}
            >
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* کنترل‌های دوربین */}
      <View style={styles.cameraControls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={toggleFlash}
        >
          <Text style={styles.controlIcon}>
            {flashMode === 'off'
              ? '⚡'
              : flashMode === 'on'
              ? '⚡'
              : flashMode === 'auto'
              ? '⚡'
              : '🔦'}
          </Text>
          <Text style={styles.controlLabel}>فلش</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shutterButton}
          onPress={takePhoto}
          onLongPress={toggleRecording}
        >
          <View
            style={[
              styles.shutterInner,
              isRecording && styles.shutterRecording,
            ]}
          >
            <Text style={styles.shutterIcon}>
              {isRecording ? '⏹️' : '📸'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={toggleFacing}
        >
          <Text style={styles.controlIcon}>🔄</Text>
          <Text style={styles.controlLabel}>چرخش</Text>
        </TouchableOpacity>
      </View>

      {/* آمار عکس‌ها */}
      <View style={styles.photoStats}>
        <Text style={styles.photoStatsText}>
          📸 {photoCount} عکس گرفته شده
        </Text>
        {lastPhoto && (
          <Text style={styles.lastPhotoText}>
            آخرین: {lastPhoto.timestamp}
          </Text>
        )}
      </View>
    </View>
  );
};

// ============================================================
// صفحه سنسورها (Sensors)
// ============================================================
const SensorsScreen = () => {
  const [sensors, setSensors] = useState({
    accelerometer: { x: 0, y: 0, z: 0, active: false },
    gyroscope: { x: 0, y: 0, z: 0, active: false },
    magnetometer: { x: 0, y: 0, z: 0, active: false },
    barometer: { pressure: 0, active: false },
    light: { lux: 0, active: false },
    proximity: { distance: 0, active: false },
  });

  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) => ({
        ...prev,
        accelerometer: prev.accelerometer.active
          ? {
              ...prev.accelerometer,
              x: (Math.random() * 2 - 1).toFixed(3),
              y: (Math.random() * 2 - 1).toFixed(3),
              z: (Math.random() * 2 - 1 + 9.8).toFixed(3),
            }
          : prev.accelerometer,
        gyroscope: prev.gyroscope.active
          ? {
              ...prev.gyroscope,
              x: (Math.random() * 2 - 1).toFixed(3),
              y: (Math.random() * 2 - 1).toFixed(3),
              z: (Math.random() * 2 - 1).toFixed(3),
            }
          : prev.gyroscope,
        magnetometer: prev.magnetometer.active
          ? {
              ...prev.magnetometer,
              x: (Math.random() * 100 - 50).toFixed(1),
              y: (Math.random() * 100 - 50).toFixed(1),
              z: (Math.random() * 100 - 50).toFixed(1),
            }
          : prev.magnetometer,
        barometer: prev.barometer.active
          ? {
              ...prev.barometer,
              pressure: (1013 + Math.random() * 10 - 5).toFixed(1),
            }
          : prev.barometer,
        light: prev.light.active
          ? {
              ...prev.light,
              lux: Math.floor(Math.random() * 1000),
            }
          : prev.light,
        proximity: prev.proximity.active
          ? {
              ...prev.proximity,
              distance: Math.random() > 0.5 ? 0 : 5,
            }
          : prev.proximity,
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const toggleSensor = (sensorName) => {
    setSensors((prev) => ({
      ...prev,
      [sensorName]: {
        ...prev[sensorName],
        active: !prev[sensorName].active,
      },
    }));
  };

  const SensorCard = ({ name, icon, data, active, onToggle }) => (
    <Card style={styles.sensorCard}>
      <View style={styles.sensorHeader}>
        <View style={styles.sensorTitleRow}>
          <Text style={styles.sensorIcon}>{icon}</Text>
          <Text style={styles.sensorName}>{name}</Text>
        </View>
        <Switch
          value={active}
          onValueChange={onToggle}
          trackColor={{ true: COLORS.success, false: COLORS.textMuted }}
          thumbColor={active ? '#fff' : '#ccc'}
        />
      </View>
      {active && (
        <View style={styles.sensorData}>
          {Object.entries(data).map(([key, value]) => (
            <View key={key} style={styles.sensorDataRow}>
              <Text style={styles.sensorDataLabel}>{key}:</Text>
              <Text style={styles.sensorDataValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );

  return (
    <View style={styles.screen}>
      <Header title="سنسورها" subtitle="پایش زنده سنسورهای دستگاه" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* باتری */}
        <Card title="باتری" icon={Icons.battery} style={styles.batteryCard}>
          <View style={styles.batteryRow}>
            <Text style={styles.batteryIcon}>
              {batteryLevel > 50 ? '🔋' : batteryLevel > 20 ? '🪫' : '🪫'}
            </Text>
            <View style={styles.batteryInfo}>
              <Text style={styles.batteryLevel}>{batteryLevel}%</Text>
              <Text style={styles.batteryStatus}>
                {isCharging ? '⚡ در حال شارژ' : '🔌 بدون شارژ'}
              </Text>
            </View>
            <View style={styles.batteryBar}>
              <View
                style={[
                  styles.batteryFill,
                  {
                    width: `${batteryLevel}%`,
                    backgroundColor:
                      batteryLevel > 50
                        ? COLORS.success
                        : batteryLevel > 20
                        ? COLORS.warning
                        : COLORS.error,
                  },
                ]}
              />
            </View>
          </View>
        </Card>

        {/* شتاب‌سنج */}
        <SensorCard
          name="شتاب‌سنج (Accelerometer)"
          icon="📱"
          data={{
            x: sensors.accelerometer.x,
            y: sensors.accelerometer.y,
            z: sensors.accelerometer.z,
          }}
          active={sensors.accelerometer.active}
          onToggle={() => toggleSensor('accelerometer')}
        />

        {/* ژیروسکوپ */}
        <SensorCard
          name="ژیروسکوپ (Gyroscope)"
          icon="🔄"
          data={{
            x: sensors.gyroscope.x,
            y: sensors.gyroscope.y,
            z: sensors.gyroscope.z,
          }}
          active={sensors.gyroscope.active}
          onToggle={() => toggleSensor('gyroscope')}
        />

        {/* مغناطیس‌سنج */}
        <SensorCard
          name="مغناطیس‌سنج (Magnetometer)"
          icon="🧭"
          data={{
            x: sensors.magnetometer.x,
            y: sensors.magnetometer.y,
            z: sensors.magnetometer.z,
          }}
          active={sensors.magnetometer.active}
          onToggle={() => toggleSensor('magnetometer')}
        />

        {/* فشارسنج */}
        <SensorCard
          name="فشارسنج (Barometer)"
          icon="🌡️"
          data={{ pressure: sensors.barometer.pressure + ' hPa' }}
          active={sensors.barometer.active}
          onToggle={() => toggleSensor('barometer')}
        />

        {/* نورسنج */}
        <SensorCard
          name="نورسنج (Light Sensor)"
          icon="☀️"
          data={{ lux: sensors.light.lux + ' lux' }}
          active={sensors.light.active}
          onToggle={() => toggleSensor('light')}
        />

        {/* مجاورت */}
        <SensorCard
          name="مجاورت (Proximity)"
          icon="📡"
          data={{
            distance: sensors.proximity.distance + ' cm',
            status: sensors.proximity.distance === 0 ? 'نزدیک' : 'دور',
          }}
          active={sensors.proximity.active}
          onToggle={() => toggleSensor('proximity')}
        />
      </ScrollView>
    </View>
  );
};

// ============================================================
// صفحه تنظیمات (Settings)
// ============================================================
const SettingsScreen = () => {
  const [settings, setSettings] = useState({
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

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const SettingRow = ({ label, icon, value, onToggle, description }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <View style={styles.settingLabelRow}>
          <Text style={styles.settingIcon}>{icon}</Text>
          <Text style={styles.settingLabel}>{label}</Text>
        </View>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ true: COLORS.primary, false: COLORS.textMuted }}
        thumbColor={value ? '#fff' : '#ccc'}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header title="تنظیمات" subtitle="پیکربندی اپلیکیشن" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ظاهر */}
        <Card title="ظاهر" icon="🎨" style={styles.settingsCard}>
          <SettingRow
            label="حالت تاریک"
            icon="🌙"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
            description="استفاده از تم تاریک"
          />
          <SettingRow
            label="نمایش FPS"
            icon="📊"
            value={settings.showFPS}
            onToggle={() => toggleSetting('showFPS')}
            description="نمایش فریم بر ثانیه"
          />
        </Card>

        {/* اعلان‌ها */}
        <Card title="اعلان‌ها" icon="🔔" style={styles.settingsCard}>
          <SettingRow
            label="اعلان‌ها"
            icon="🔔"
            value={settings.notifications}
            onToggle={() => toggleSetting('notifications')}
            description="دریافت اعلان‌ها"
          />
          <SettingRow
            label="صدا"
            icon="🔊"
            value={settings.sound}
            onToggle={() => toggleSetting('sound')}
            description="پخش صدا"
          />
          <SettingRow
            label="لرزش"
            icon="📳"
            value={settings.vibration}
            onToggle={() => toggleSetting('vibration')}
            description="لرزش دستگاه"
          />
        </Card>

        {/* دوربین */}
        <Card title="دوربین" icon="📷" style={styles.settingsCard}>
          <SettingRow
            label="ذخیره خودکار"
            icon="💾"
            value={settings.autoSave}
            onToggle={() => toggleSetting('autoSave')}
            description="ذخیره خودکار عکس‌ها"
          />
          <SettingRow
            label="کیفیت بالا"
            icon="✨"
            value={settings.highQuality}
            onToggle={() => toggleSetting('highQuality')}
            description="عکاسی با کیفیت بالا"
          />
        </Card>

        {/* توسعه‌دهنده */}
        <Card title="توسعه‌دهنده" icon="💻" style={styles.settingsCard}>
          <SettingRow
            label="حالت توسعه‌دهنده"
            icon="🔧"
            value={settings.developerMode}
            onToggle={() => toggleSetting('developerMode')}
            description="فعال‌سازی ابزارهای توسعه"
          />
          <SettingRow
            label="Hot Reload"
            icon="🔄"
            value={settings.hotReload}
            onToggle={() => toggleSetting('hotReload')}
            description="بارگذاری مجدد خودکار"
          />
          <SettingRow
            label="کش"
            icon="📦"
            value={settings.cacheEnabled}
            onToggle={() => toggleSetting('cacheEnabled')}
            description="استفاده از حافظه موقت"
          />
        </Card>

        {/* اطلاعات */}
        <Card title="درباره اپلیکیشن" icon="ℹ️" style={styles.settingsCard}>
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
            <Text style={styles.aboutValue}>
              {new Date().toLocaleDateString('fa-IR')}
            </Text>
          </View>
        </Card>

        {/* دکمه‌ها */}
        <View style={styles.settingsButtons}>
          <CustomButton
            title="پاک کردن کش"
            icon={Icons.trash}
            color={COLORS.warning}
            onPress={() => Alert.alert('کش', 'کش پاک شد! ✅')}
            fullWidth
          />
          <CustomButton
            title="بازنشانی تنظیمات"
            icon={Icons.refresh}
            color={COLORS.error}
            onPress={() =>
              Alert.alert('بازنشانی', 'تنظیمات به حالت اولیه بازگشت! ✅')
            }
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
const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { label: 'خانه', icon: Icons.home },
    { label: 'دوربین', icon: Icons.camera },
    { label: 'سنسورها', icon: Icons.sensor },
    { label: 'تنظیمات', icon: Icons.settings },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <Text style={styles.loadingEmoji}>🚀</Text>
        <Text style={styles.loadingTitle}>My Dynamic App</Text>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 20 }}
        />
        <Text style={styles.loadingText}>در حال بارگذاری...</Text>
        <Text style={styles.loadingSubtext}>React Native + Hermes Engine</Text>
      </View>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 0:
        return <HomeScreen />;
      case 1:
        return <CameraScreen />;
      case 2:
        return <SensorsScreen />;
      case 3:
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      {renderScreen()}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
};

// ============================================================
// استایل‌ها
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },

  // Loading Screen
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  headerButton: {
    padding: 8,
  },
  headerIcon: {
    fontSize: 22,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  tabItemActive: {
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    borderRadius: 12,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  // Button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
  },

  // Card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // Welcome Card
  welcomeCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: COLORS.secondary,
  },
  welcomeEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 16,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  // Info Card
  infoCard: {},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
  },

  // Quick Access
  quickCard: {},
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickItem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 16,
    marginBottom: 10,
  },
  quickIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  quickLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  // Action Buttons
  actionButtons: {
    marginTop: 8,
  },

  // Permission
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  // Camera
  cameraPreview: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraOverlay: {
    alignItems: 'center',
  },
  cameraPlaceholder: {
    fontSize: 80,
    marginBottom: 16,
  },
  cameraText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  recordingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
  },
  recordingDot: {
    color: '#fff',
    fontSize: 12,
    marginRight: 6,
  },
  recordingTime: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  filterBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  flashBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  flashBadgeText: {
    color: '#fff',
    fontSize: 12,
  },

  // Filters
  filterScroll: {
    maxHeight: 50,
    backgroundColor: COLORS.backgroundLight,
  },
  filterScrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Camera Controls
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.backgroundLight,
  },
  controlButton: {
    alignItems: 'center',
    padding: 12,
  },
  controlIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  controlLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterRecording: {
    backgroundColor: COLORS.error,
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  shutterIcon: {
    fontSize: 24,
  },

  // Photo Stats
  photoStats: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  photoStatsText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  lastPhotoText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  // Sensors
  sensorCard: {
    marginBottom: 12,
  },
  sensorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sensorTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sensorIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sensorName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  sensorData: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  sensorDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  sensorDataLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sensorDataValue: {
    fontSize: 12,
    color: COLORS.success,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // Battery
  batteryCard: {},
  batteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  batteryInfo: {
    marginRight: 16,
  },
  batteryLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  batteryStatus: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  batteryBar: {
    flex: 1,
    height: 12,
    backgroundColor: COLORS.background,
    borderRadius: 6,
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 6,
  },

  // Settings
  settingsCard: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingDescription: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    marginLeft: 26,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  aboutLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  aboutValue: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
  },
  settingsButtons: {
    marginTop: 8,
  },
});

export default App;
