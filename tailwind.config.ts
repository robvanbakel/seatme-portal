import colors from "tailwindcss/colors";
import type { Config } from "tailwindcss";

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        error: colors.orange,
      },
      gridTemplateColumns: {
        "auto-fill-80": "repeat(auto-fill, minmax(20rem, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
