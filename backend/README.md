# Harshal Portfolio Backend

Backend API for the portfolio contact functionality with email sending, database storage, and auto-reply features.

## Features

- ✅ **Email Notifications**: Sends email notifications to you when someone submits the contact form
- ✅ **Auto-Reply**: Sends a professional auto-reply email to the user
- ✅ **Database Storage**: Saves all messages to MongoDB for record keeping
- ✅ **Input Validation**: Validates all form inputs with proper error messages
- ✅ **Rate Limiting**: Prevents spam with rate limiting (10 requests per 15 minutes)
- ✅ **Security**: Includes helmet, CORS, and other security measures
- ✅ **Admin Panel Ready**: API endpoints to view and manage messages

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/harshal-portfolio

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Your personal email to receive messages
RECIPIENT_EMAIL=harshalshirsath2001@gmail.com

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Gmail Setup

To use Gmail for sending emails:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS`

### 4. Database Setup

Install and start MongoDB:

**Windows:**
```bash
# Install MongoDB Community Server from https://www.mongodb.com/try/download/community
# Start MongoDB service
net start MongoDB
```

**Alternative: Use MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/atlas
- Create a cluster and get connection string
- Replace `MONGODB_URI` with your Atlas connection string

### 5. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### POST /api/contact
Submit contact form message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! You should receive a confirmation email shortly.",
  "data": {
    "id": "message_id",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/contact/messages
Get all messages (for admin use)

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Messages per page (default: 10)
- `status`: Filter by status (new, read, replied)

### PUT /api/contact/messages/:id/status
Update message status

**Request Body:**
```json
{
  "status": "read"
}
```

### GET /api/health
Health check endpoint

## Email Templates

The backend includes professional email templates:

1. **Notification Email**: Sent to you with the contact form details
2. **Auto-Reply Email**: Sent to the user confirming receipt of their message

## Security Features

- **Rate Limiting**: 10 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation with sanitization
- **CORS Protection**: Configured for your frontend domain
- **Helmet**: Security headers
- **Error Handling**: Proper error responses without exposing sensitive data

## Testing

Test the API with curl:

```bash
# Test contact form submission
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message from the API."
  }'

# Test health endpoint
curl http://localhost:5000/api/health
```

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2
3. Set up a reverse proxy with Nginx
4. Use a production MongoDB instance
5. Configure proper SSL certificates

## Troubleshooting

**Email not sending:**
- Check Gmail app password is correct
- Verify 2FA is enabled on Gmail
- Check firewall/antivirus blocking SMTP

**Database connection issues:**
- Ensure MongoDB is running
- Check connection string format
- Verify network connectivity

**CORS errors:**
- Update `FRONTEND_URL` in .env
- Check frontend is running on correct port