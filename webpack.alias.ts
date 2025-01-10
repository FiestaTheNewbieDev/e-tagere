import path from "path";

export const alias = {
  "@": path.resolve(__dirname, "src"),
  "@app": path.resolve(__dirname, "src/app"),
  "@assets": path.resolve(__dirname, "src/assets"),
  "@components": path.resolve(__dirname, "src/components"),
  "@styles": path.resolve(__dirname, "src/styles"),
  "@types": path.resolve(__dirname, "src/types"),
};
