const RtcTokenBuilder = require("../src/RtcTokenBuilder2").RtcTokenBuilder;
const RtcRole = require("../src/RtcTokenBuilder2").Role;

// Get the value of the environment variable AGORA_APP_ID. Make sure you set this variable to the App ID you obtained from Agora console.
const appId = process.env.AGORA_APP_ID;
// Get the value of the environment variable AGORA_APP_CERTIFICATE. Make sure you set this variable to the App certificate you obtained from Agora console
const appCertificate = process.env.AGORA_APP_CERTIFICATE;
// Replace channelName with the name of the channel you want to join
const channelName = "channelName";
// Fill in your actual user ID
const uid = 2882341273;
// Set streaming permissions
const role = RtcRole.PUBLISHER;
// Token validity time in seconds
const tokenExpirationInSecond = 3600;
// The validity time of all permissions in seconds
const privilegeExpirationInSecond = 3600;

console.log("App Id:", appId);
console.log("App Certificate:", appCertificate);
if (appId == undefined || appId == "" || appCertificate == undefined || appCertificate == "") {
  console.log("Need to set environment variable AGORA_APP_ID and AGORA_APP_CERTIFICATE");
  process.exit(1);
}

// Generate Token
const tokenWithUid = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, tokenExpirationInSecond, privilegeExpirationInSecond);
console.log("Token with int uid:", tokenWithUid);
