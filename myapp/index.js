/**
 * @format
 * نقطه ورود اپلیکیشن React Native
 * این فایل اولین فایلی است که توسط موتور Hermes اجرا می‌شود
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// غیرفعال کردن هشدارهای غیرضروری در حالت توسعه
if (__DEV__) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'ViewPropTypes will be removed from React Native',
    'Require cycle:',
  ]);
  LogBox.ignoreAllLogs(false);
}

// ثبت کامپوننت اصلی اپلیکیشن
AppRegistry.registerComponent(appName, () => App);

// لاگ اولیه برای دیباگ
console.log('==========================================');
console.log('  My Dynamic App - React Native Runtime');
console.log('  Engine: Hermes');
console.log('  Mode:', __DEV__ ? 'Development' : 'Production');
console.log('  Timestamp:', new Date().toISOString());
console.log('==========================================');

// خروجی برای دیباگ در کنسول اندروید
if (typeof global !== 'undefined') {
  global.__MY_APP_LOADED__ = true;
  global.__MY_APP_VERSION__ = '1.0.0';
  global.__MY_APP_BUILD_TIME__ = new Date().toISOString();
}
