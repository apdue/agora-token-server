const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

module.exports = (req, res) => {
  const appId = "YOUR_APP_ID";
  const appCertificate = "YOUR_APP_CERTIFICATE";
  const channelName = req.query.channel;
  const uid = req.query.uid;
  const role = RtcRole.PUBLISHER;

  if (!channelName || !uid) {
    return res.status(400).json({ error: "channel and uid are required" });
  }

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    parseInt(uid),
    role,
    privilegeExpiredTs
  );

  return res.status(200).json({ token });
};
