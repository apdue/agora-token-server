# Agora Token Server

A simple serverless function to generate Agora tokens for real-time communications.

## Setup

1. Clone this repository
2. Install dependencies with `npm install`
3. Set up environment variables in Vercel:
   - `AGORA_APP_ID`: Your Agora App ID
   - `AGORA_APP_CERTIFICATE`: Your Agora App Certificate

## Deployment on Vercel

1. Push this repository to GitHub
2. Create a new project on Vercel and import your GitHub repository
3. In the Vercel project settings, add the environment variables:
   - `AGORA_APP_ID`
   - `AGORA_APP_CERTIFICATE`
4. Deploy the project

## Local Development

1. Install the Vercel CLI: `npm i -g vercel`
2. Create a `.env` file with your environment variables:
   ```
   AGORA_APP_ID=your_app_id
   AGORA_APP_CERTIFICATE=your_app_certificate
   ```
3. Run `vercel dev` to start a local development server

## API Usage

Generate a token:
```
GET /api?channel=your_channel_name&uid=user_id
```

Required query parameters:
- `channel`: The channel name (defaults to '7d72365eb983485397e3e3f9d460bdda' if not provided)
- `uid`: The user ID (numeric, defaults to 2882341273 if not provided)

Response:
```json
{
  "token": "generated_agora_token"
}
```

Example usage with fetch:
```javascript
// Get a token for a specific channel and user
fetch('https://your-vercel-app.vercel.app/api?channel=test_channel&uid=1234')
  .then(response => response.json())
  .then(data => {
    console.log('Token:', data.token);
  });
```

## Common Errors

If you're seeing the "Serverless Function has crashed" error, check:
1. Ensure you've set up the environment variables in Vercel
2. Verify that your Agora credentials are correct
3. Check Vercel deployment logs for more detailed error information 