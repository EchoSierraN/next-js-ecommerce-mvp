// copy-env.js
const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, ".env");
const destination = path.join(__dirname, "node_modules", "react-email", ".env");

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error("Error copying .env file:", err);
  } else {
    console.log(".env file copied to node_modules/react-email");
  }
});
