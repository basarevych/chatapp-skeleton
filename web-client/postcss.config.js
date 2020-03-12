const path = require("path");
const fs = require("fs-extra");
const crypto = require("crypto");

// this will copy asset files into /dist/assets/
function copyAssets({ url, relativePath }, { from }) {
  let name = path.basename(relativePath);
  let match = name.match(/^(.*)\.([^.]+)$/);
  let base = match ? match[1] : name;
  let ext = match ? match[2] : "";

  if (name === "." || url[0] === "/") return url;

  let absolutePath = path.join(from, relativePath);

  let file;
  try {
    file = fs.readFileSync(absolutePath);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  let hash = crypto.createHash("md5");
  hash.update(file);

  let hashedName = ext ? `${base}.${hash.digest("hex")}.${ext}` : `${hash.digest("hex")}.${name}`;
  fs.outputFileSync(path.join(__dirname, "dist", "assets", hashedName), file);
  return "/assets/" + hashedName;
}

module.exports = () => {
  const plugins = {
    tailwindcss: {},
    "postcss-url": { url: copyAssets },
    "postcss-preset-env": {},
  };

  if (process.env.NODE_ENV === "production") {
    plugins["postcss-clean"] = {
      inline: false,
      level: { 1: { specialComments: 0 } },
    };
  }

  return { plugins };
};
