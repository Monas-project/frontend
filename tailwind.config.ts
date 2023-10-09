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
        titleBg: "url('../../public/bg_title.png')",
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
      },

      fontFamily: {
        SegoeUI: ["Segoe UI"],
      },

      fontWeight: {
        semilight: "350",
      },

      fontSize: {
        h1: "4em",
        h2: "1.5em",
        button: "1rem",
        label: "1rem",

        heading: "1.55rem",
      },

      spacing: {
        "3.5%": "3.5%",
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
  },
  plugins: [
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
  ],
};
export default config;
