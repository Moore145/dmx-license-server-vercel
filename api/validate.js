const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { license, device } = req.query;
  if (!license || !device) {
    return res.status(400).json({ valid: false, error: "Missing license or device" });
  }

  const filePath = path.join(process.cwd(), "licenses.json");
  let licenses = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let licenseEntry = licenses.find(l => l.key === license);

  if (!licenseEntry) {
    return res.status(403).json({ valid: false, error: "License not found" });
  }

  // For now, ignore device binding to avoid writes
  // if (licenseEntry.device && licenseEntry.device !== device) {
  //   return res.status(403).json({ valid: false, error: "License bound to another device" });
  // }

  return res.json({ valid: true });
};
