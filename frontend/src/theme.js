import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textOnDark: '#bfbfbf',
    primary: '#0366d6',
    alert: '#b3203d',
    bgDark: '#24292e',
    bgLight: '#fff',
    bgLightUnfocused: '#e1e4e8',
    lightShadow: 'rgba(99,99,99,0.45)',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  shadow: {
    shadowColor: 'rgba(99,99,99,0.45)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 0,
  },
};

export default theme;
