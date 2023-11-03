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

        lightPink: "#FFEEF4",
        darkPink: "#4D001B",

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
        title: "1.25rem",

        recentContentsDate: "0.75rem",

        tableTh: "1.0625rem",

        "14": "0.875rem",

        xl: "1.375rem",
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

        serchbarHeight: "3rem",
        searchInputPt: "0.2rem",
        accountNameHeight: "0.9375rem",
      },

      width: {
        welcomeCatWidth: "23.6%",
      },

      height: {
        tdHeight: "3.125rem",
        buttonHeight: "2.9375rem",
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

      boxShadow: {
        dropShadow: "0 0 15px -5px rgb(53 0 19 / 0.25)",
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
};
export default config;
