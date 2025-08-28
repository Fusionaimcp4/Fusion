# Environment Variables Setup

## DigitalOcean Spaces Configuration

Add the following environment variables to your `.env` file:

```bash
# DigitalOcean Spaces Configuration (required for file/image uploads)
DO_SPACES_KEY=your-spaces-access-key
DO_SPACES_SECRET=your-spaces-secret-key
DO_SPACES_BUCKET=your-bucket-name
DO_SPACES_ENDPOINT=https://nyc3.digitaloceanspaces.com
DO_SPACES_CDN_ENDPOINT=https://your-cdn-url.com
```

## Setup Instructions

1. **Create DigitalOcean Space:**
   - Log into DigitalOcean Dashboard
   - Create a new Space in your preferred region
   - Enable CDN for better performance

2. **Generate API Keys:**
   - Go to API section in DigitalOcean
   - Generate Spaces access key and secret
   - Set appropriate permissions (read/write)

3. **Configure Environment:**
   - `DO_SPACES_KEY`: Your Spaces access key
   - `DO_SPACES_SECRET`: Your Spaces secret key  
   - `DO_SPACES_BUCKET`: Name of your Space
   - `DO_SPACES_ENDPOINT`: Regional endpoint URL
   - `DO_SPACES_CDN_ENDPOINT`: CDN URL (optional, improves performance)

## File Organization

Files will be organized in your Space as:
```
your-bucket/
├── ai-generated/
│   ├── images/
│   │   └── timestamp-hash-filename.ext
│   └── files/
│       └── timestamp-hash-filename.ext
```

## Security Notes

- Files are uploaded with `public-read` ACL
- Files have 1-year cache headers for performance
- Temp files are automatically cleaned up after upload
- Original filenames are sanitized for security 