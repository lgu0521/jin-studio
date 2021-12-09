const calcEm = (size: number) => `${size}rem`;

const fontSizes = {
  title8: calcEm(0.8),
  title7: calcEm(1.0),
  title6: calcEm(1.1),
  title5: calcEm(1.3),
  title4: calcEm(1.5),
  title3: calcEm(1.8),
  title2: calcEm(2.0),
  title1: calcEm(2.3),
};

const paddings = {
  xm: calcEm(0.59), //13px
  sm: calcEm(0.73), //16px
  md: calcEm(0.82), //18px
  lg: calcEm(0.91), //20px
  xl: calcEm(1.09), //24px
};

const margins = {
  small: calcEm(8),
  base: calcEm(10),
  lg: calcEm(12),
  xl: calcEm(14),
  xxl: calcEm(16),
  xxxl: calcEm(18),
};

const colors = {
  menu_name: "#000000",
  bg_content: "#F2F2F2",
  line: "#000000",
  footer_name: " #000000",
};

const device = {
  mobileS: `only screen and (max-width: 600px)`,
  mobileM: `only screen and (min-width: 600px)`,
  mobileL: `only screen and (min-width: 768px)`,
  tablet: `only screen and (min-width: 992px)`,
  tabletL: `only screen and (min-width: 1200px)`,
};

const theme = {
  fontSizes,
  colors,
  device,
  paddings,
  margins,
};

export default theme;
