import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

export default (req, res) => {
  // Get credentials from environment variables
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const channelName = req.query.channel;
  const uid = req.query.uid;
  const role = RtcRole.PUBLISHER;

  // Check if credentials are configured
  if (!appId || !appCertificate) {
    return res.status(500).json({ error: "Server configuration error. Missing Agora credentials." });
  }

  // Check required parameters
  if (!channelName || !uid) {
    return res.status(400).json({ error: "channel and uid are required" });
  }

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  try {
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      parseInt(uid),
      role,
      privilegeExpiredTs
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({ error: "Failed to generate token" });
  }
};
