// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [],
// }
// export default config

import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        homeBgLight: "url('../../public/homeBgLight.png')",
        homeBgDark: "url('/homeBgDark.png')",
      },

      colors: {
        black01: "#1F1F1F",
        black02: "#444746",
        pink01: "#FF4185",
        pink01Hover: "#E93374",
        pink02: "#FFFAFC",
        pink03: "#FFECF2",
        gray01: "#CCCCCC",
        gray02: "#757575",

        lightFont: "#0F0F0F",
        darkFont: "#FCFCFC",

        lightBg: "#fff",
        darkBg: "#0D0C0C",
        lightInputBg: "#FAF2F4",
        darkInputBg: "#423036",
        lightInputFont: "#ACA0A4",
        darkInputFont: "#8A7F82",
        lightInputOutline: "#FFEBF1",
        darkInputOutline: "#4A2632",
        lightInputActiveBg: "#fff",
        darkInputActiveBg: "#4A2632",
        lightBorder: "#DECFD5",
        darkBorder: "#71535E",
      },

      fontFamily: {
        SegoeUI: ["Segoe UI"],
      },

      fontWeight: {
        semilight: "350",
      },

      fontSize: {
        h1: "377%",
        h2: "145%",

        label: "100%rem",

        heading: "1.55rem",
      },

      spacing: {
        "3": "3%",
        "15.7": "15.7%",
        "54": "54%",
        buttonPy: "3%",
        placefolderT: "25%",
        placefolderL: "5%",
        inputPx: "5.3%",
        inputPt: "7.5%",
        inputPb: "1.5%",

        "3.5": "3.5%",
        "4%": "4%",
        "4.5%": "4.5%",
        "6%": "6%",
        "11.5%": "11.5%",
        "15%": "15%",
        "18%": "18%",
        "20%": "20%",
        "23%": "23%",
        "30%": "30%",
        "49%": "49%",
        "82%": "82%",

        "0.25rem": "0.25rem",
        "0.5rem": "0.5rem",
        "1rem": "1rem",
        "1.25rem": "1.25rem",
        "2rem": "2rem",
        "2.5rem": "2.5rem",
        "4rem": "4rem",
        "13rem": "13rem",
      },
    },

    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },

  darkMode: "class",

  /*  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".transform-gpu": {
          transform: "translateY(-1.5rem) scale(0.75)",
        },
        "input:not(:placeholder-shown) + span, input:focus + span": {
          transform: "translateY(-1.5rem) scale(0.75)",
          top: "40%",
          left: "0",
          fontSize: "1em",
          color: "#FF4185",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ], */
};
export default config;
