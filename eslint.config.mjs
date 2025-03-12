import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends : ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "prefer-template": ["error"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
      "eol-last": ["error", "always"],
    },

  })
];

export default eslintConfig;
