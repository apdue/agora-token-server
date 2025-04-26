const { RtcTokenBuilder, RtcRole } = require('agora-token');

module.exports = (req, res) => {
  try {
    // Get credentials from environment variables
    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    
    // Get channel name and uid from query parameters
    const channelName = req.query.channel || '7d72365eb983485397e3e3f9d460bdda';
    const uid = req.query.uid ? parseInt(req.query.uid) : 2882341273;
    
    // Token validity configuration
    const tokenExpirationInSecond = 3600;
    const privilegeExpirationInSecond = 3600;
    const role = RtcRole.PUBLISHER;
    
    // Check if credentials are configured
    if (!appId || !appCertificate) {
      return res.status(500).json({ 
        error: "Server configuration error. Missing Agora credentials." 
      });
    }
    
    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      tokenExpirationInSecond,
      privilegeExpirationInSecond
    );
    
    // Return the token in the response
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({ error: "Failed to generate token" });
  }
};