# Security Policy

## CSP (Content Security Policy)
The application implements strict Content Security Policy to prevent XSS attacks:
- `default-src 'self'`
- `style-src 'self' 'unsafe-inline'` (for dynamic styling)
- `script-src 'self' 'unsafe-inline'`
- `img-src 'self' data: https:`

## Authentication
- Admin panel protected by password authentication
- Default password: `admin123` (MUST be changed on first login)
- Password stored locally with bcrypt-like hashing (in production)
- Session management for admin access

## Data Protection
- All data stored locally in browser (localStorage)
- No sensitive data transmitted to external servers
- User data backup/restore functionality
- Input validation and sanitization

## HTTPS Enforcement
- Application should be served over HTTPS in production
- Service Worker requires HTTPS for full functionality
- Secure cookie settings when implementing server-side features

## Best Practices
1. Change default admin password immediately
2. Regularly backup your data
3. Keep the application updated
4. Use strong, unique passwords
5. Be cautious when restoring data from unknown sources

## Reporting Security Issues
If you discover a security vulnerability, please create an issue in the GitHub repository with the label "security".