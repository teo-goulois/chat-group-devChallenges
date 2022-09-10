import { extendTheme, Theme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps | Record<string, any>) => ({
    body: {
      bg: mode("#fff", "#252329")(props),
    },
  }),
};

/*const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'"
}
*/
const colors = {
  primary: "#E0E0E0",
  secondary: "#828282",
  blue: "#2F80ED",
  red: "#EB5757",
  gray: {
    200: "#3C393F",
    500: "#252329",
    700: "#120F13",
    900: "#0B090C"
  },
  white: {
    200: "#F2F2F2",
    300: "#BDBDBD"
  }
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({ config, styles, colors });

export default theme;
