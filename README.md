# Digital Visiting Card

A modern, responsive, and secure digital visiting card with admin panel for easy content management.

[![Deploy to GitHub Pages](https://github.com/Vinnuvinny/Digital-Card-Vinny-s/actions/workflows/deploy.yml/badge.svg)](https://github.com/Vinnuvinny/Digital-Card-Vinny-s/actions/workflows/deploy.yml)

## 🌟 Features

### 🎨 **Modern Design**
- Responsive design that works on all devices
- Dark/Light theme toggle
- Smooth animations and transitions
- Professional gradient backgrounds
- Font Awesome icons integration

### 📱 **PWA (Progressive Web App)**
- Installable on mobile and desktop
- Offline functionality
- Fast loading with service worker caching
- App-like experience

### 🔧 **Interactive Features**
- Copy contact information to clipboard
- Download vCard (.vcf) file
- Share card functionality
- Contact form with validation
- Skill progress bars with animations

### 🛡️ **Secure Admin Panel**
- Password-protected admin access
- Real-time content editing
- Profile, contact, and social media management
- Skills management with add/remove functionality
- Data backup and restore
- Password change functionality

### 🚀 **Easy Deployment**
- Automated GitHub Pages deployment
- No server required
- CDN-optimized resources
- SEO-friendly structure

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Vinnuvinny/Digital-Card-Vinny-s.git
cd Digital-Card-Vinny-s
```

### 2. Open in Browser
Simply open `index.html` in your web browser, or serve it using a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

### 3. Access Admin Panel
1. Click the gear icon (⚙️) in the bottom-left corner
2. Enter the default password: `admin123`
3. **Important:** Change the default password immediately!

## 📁 Project Structure

```
Digital-Card-Vinny-s/
├── 📄 index.html              # Main HTML file
├── 📁 css/
│   └── 📄 style.css           # Styles and animations
├── 📁 js/
│   ├── 📄 main.js             # Core functionality
│   └── 📄 admin.js            # Admin panel logic
├── 📁 assets/                 # Images and icons
├── 📁 admin/                  # Admin-related files
├── 📁 .github/workflows/      # GitHub Actions
├── 📄 manifest.json           # PWA manifest
├── 📄 sw.js                   # Service worker
├── 📄 SECURITY.md            # Security guidelines
└── 📄 README.md              # This file
```

## 🎨 Customization

### 🖼️ **Update Profile Information**
1. Access the admin panel (gear icon)
2. Go to the "Profile" tab
3. Update your name, title, bio, and profile image
4. Click "Save Profile"

### 📞 **Update Contact Details**
1. In admin panel, go to "Contact" tab
2. Update email, phone, location, and website
3. Click "Save Contact"

### 🔗 **Update Social Links**
1. In admin panel, go to "Social" tab
2. Add your LinkedIn, Twitter, GitHub, Instagram URLs
3. Click "Save Social Links"

### 🎯 **Manage Skills**
1. In admin panel, go to "Skills" tab
2. Edit existing skills or add new ones
3. Set skill levels (0-100)
4. Remove unwanted skills

### 🎨 **Customize Colors and Styling**
Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #6366f1;     /* Main theme color */
    --secondary-color: #8b5cf6;   /* Secondary theme color */
    --accent-color: #06b6d4;      /* Accent color */
    /* ... more variables */
}
```

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Fork or clone this repository
2. Enable GitHub Pages in repository settings
3. Choose "GitHub Actions" as the source
4. Push changes to the `main` branch
5. Your site will be available at `https://yourusername.github.io/Digital-Card-Vinny-s`

### Other Hosting Options
- **Netlify:** Connect your GitHub repo and deploy automatically
- **Vercel:** Import your GitHub project and deploy
- **Firebase Hosting:** Use Firebase CLI to deploy
- **Any Web Server:** Upload all files to your web server

## 🔒 Security Features

- 🔐 **Admin Authentication:** Password-protected admin panel
- 🛡️ **Content Security Policy:** Prevents XSS attacks
- 🔒 **Input Validation:** All forms include proper validation
- 💾 **Local Storage:** Data stored locally, no external servers
- 🚫 **No External Dependencies:** Core functionality works offline

## 📱 PWA Features

- ⚡ **Fast Loading:** Service worker caching
- 📱 **Installable:** Add to home screen on mobile
- 🔄 **Offline Support:** Works without internet connection
- 📱 **App-like:** Full-screen experience
- 🔔 **Notifications:** Push notification support (optional)

## ⚙️ Advanced Configuration

### Environment Variables
Create a `.env` file for custom configurations:

```env
# Custom API endpoints (if using backend)
CONTACT_API_URL=https://your-api.com/contact
ANALYTICS_ID=your-analytics-id

# Custom branding
CARD_TITLE=Your Digital Card
CARD_DESCRIPTION=Professional digital visiting card
```

### Custom Domains
To use a custom domain with GitHub Pages:
1. Add a `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in repository settings

## 🐛 Troubleshooting

### Common Issues

**Admin panel not opening:**
- Clear browser cache and cookies
- Check browser console for errors
- Try incognito/private browsing mode

**Styles not loading:**
- Ensure CSS file paths are correct
- Check if files are properly uploaded
- Verify web server configuration

**PWA not installing:**
- Serve over HTTPS (required for PWA)
- Check manifest.json syntax
- Ensure service worker is registered

### Browser Support
- ✅ **Chrome 70+**
- ✅ **Firefox 65+**
- ✅ **Safari 12+**
- ✅ **Edge 79+**
- ⚠️ **Internet Explorer:** Not supported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for beautiful icons
- **Google Fonts** for typography
- **CSS Grid & Flexbox** for responsive layouts
- **Service Workers** for PWA functionality

## 📞 Support

- 📧 **Email:** Create an issue in this repository
- 📚 **Documentation:** Check the [Wiki](../../wiki)
- 🐛 **Bug Reports:** Use the [Issues](../../issues) tab
- 💡 **Feature Requests:** Use the [Discussions](../../discussions) tab

## 🔄 Changelog

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Responsive design
- ✅ Admin panel
- ✅ PWA support
- ✅ GitHub Pages deployment
- ✅ Security features

---

### 🌟 Star this repository if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/Vinnuvinny/Digital-Card-Vinny-s.svg?style=social&label=Star)](https://github.com/Vinnuvinny/Digital-Card-Vinny-s/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Vinnuvinny/Digital-Card-Vinny-s.svg?style=social&label=Fork)](https://github.com/Vinnuvinny/Digital-Card-Vinny-s/network)

**Made with ❤️ by [Vinny](https://github.com/Vinnuvinny)**
Welcome Vinny's.....
