# OAuth Setup Guide

This guide explains how to set up OAuth providers for your Fusion AI platform.

## Current OAuth Status

✅ **Google** - Fully implemented and ready to use  
✅ **Microsoft** - Fully implemented and ready to use  
✅ **GitHub** - Fully implemented and ready to use  
⏳ **Apple** - Backend implementation pending (requires complex setup)

## Required Environment Variables

Add these to your backend `.env` file:

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Microsoft OAuth
1. Go to [Azure Portal(https://portal.azure.com/)]
2. Navigate to Azure Active Directory > App registrations
3. Create new registration
4. Add redirect URI: `http://localhost:5000/auth/microsoft/callback`
5. Generate client secret

```env
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/auth/github/callback`

```env
GITHUB_CLIENT_ID=Ov23liBFQkQKPIec2nfH
GITHUB_CLIENT_SECRET=a9ae39ca457cfa1eba8c05343de2a8eeba7c2137
```

### Apple OAuth (Future Implementation)
Apple OAuth requires more complex setup including:
- Apple Developer Account
- Service ID configuration
- Private key generation
- Domain verification

```env
# APPLE_CLIENT_ID=your-apple-service-id
# APPLE_TEAM_ID=your-apple-team-id
# APPLE_KEY_ID=your-apple-key-id
# APPLE_PRIVATE_KEY=your-apple-private-key
```

## Testing OAuth Integration

1. Start your backend server: `cd backend && npm run dev`
2. Start your frontend: `npm run dev`
3. Visit the login page and test each OAuth provider
4. Check browser network tab for any errors
5. Verify user creation in your database

## Troubleshooting

- **Invalid redirect URI**: Ensure callback URLs match exactly in provider settings
- **Missing scopes**: Check that required permissions are requested
- **Database errors**: Verify user table schema supports OAuth fields
- **Token issues**: Check JWT_SECRET is set in environment variables

## Production Setup

For production deployment:
1. Update callback URLs to your production domain
2. Use HTTPS for all OAuth flows
3. Set `NODE_ENV=production`
4. Use secure, randomly generated secrets
5. Configure proper CORS settings 