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
        pink01: "#FF4185",
        pink01Hover: "#E93374",
        pink02: "#FFFAFC",
        pink03: "#FFECF2",
        gray01: "#CCCCCC",
        gray02: "#757575",

        lightFont: "#111111",
        darkFont: "#F1F1F1",

        lightBg: "#fff",
        darkBg: "#0f0f0f",

        lightDropDownBg: "#fff",
        darkDropDownBg: "#252525",

        lightContentsBorder: "#f2f2f2",
        lightLoginBtnBorder: "#DECFD5", // ログインボタンのborder
        darkContentsBorder: "#3F3F3F",

        lightItemBorder: "#111111",
        darkItemBorder: "#F1F1F1",

        lightSkelton01: "#EBEBEB",
        darkSkelton01: "#252525",
        lightSkelton02: "#E5E5E5",
        darkSkelton02: "#292929",

        lightHoverBtn: "#F2F2F2",
        darkHoverBtn: "#3C3C3C",

        lightTableBorder: "#ddd",
        darkTableBorder: "#3F3F3F",
        lightHoverTrBg: "#F2F2F2",
        darkHoverTrBg: "#272727",

        folder: "#FBCB4F",
        document: "#2DCDFF",
      },

      fontSize: {
        h1: "4rem",
        h2: "1.688rem",

        base: "1.063rem",
        folderTitle: "1.25rem",

        recentContentsDate: "0.75rem",

        tableTh: "1.0625rem",

        "14": "0.875rem",
      },

      lineHeight: {
        accountNameHeight: "0.9375rem",
        recentText: "1.125rem",
      },

      spacing: {
        "299.2": "18.7rem",
        "60.8": "3.8rem",

        logoType: "1.36rem",
        logoMark: "5.6rem",
        navLogoType: "0.936rem",

        sideberWidth: "15rem",

        serchbarHeight: "3.5rem",
        searchInputPt: "0.2rem",
        accountNameHeight: "0.9375rem",
      },

      width: {
        welcomeCatWidth: "23.6%",
      },

      minWidth: {
        filterItemGrid: "6.6rem",
      },

      borderWidth: {
        "1": "1px",
      },

      gridTemplateColumns: {
        filterGrid: "max-content 1fr 1fr",
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
