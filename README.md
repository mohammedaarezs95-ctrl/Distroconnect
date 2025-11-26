# Distro Connect Website

A professional distributor onboarding and management platform.

## 📁 Project Structure

```
Distro Connect/
├── index.html                    # Welcome/Home page
├── loginui.html                  # Quick login page
├── distributorjoin.html          # Company information form
├── distributorproof.html         # Document upload
├── optionbrand.html              # Brand/path selection
├── waitpage.html                 # Application processing
├── dashboard.html                # User dashboard
├── assets/
│   ├── css/
│   │   └── styles.css           # Global stylesheet
│   ├── js/
│   │   └── utils.js             # Utility functions
│   ├── images/                  # Image assets
│   └── icons/                   # Icon files
└── README.md                     # This file
```

## 🚀 Getting Started

1. Open `index.html` in a web browser to start
2. Follow the onboarding flow:
   - Welcome page
   - Quick login or full registration
   - Company information
   - Document upload
   - Application status

## 📋 Pages Overview

### index.html
- Welcome page for new users
- City and volume selection
- Entry point to the application

### loginui.html
- Quick login with name and phone
- Form validation
- Demo fill button for testing

### distributorjoin.html
- Company information form
- Collects company name, phone, and city
- Data persisted to localStorage

### distributorproof.html
- Business registration document upload
- GST number validation
- File upload with size validation (max 10MB)
- Supports PDF and image files

### optionbrand.html
- Brand/service selection
- Multiple path options
- Navigation to different application flows

### waitpage.html
- Application processing status
- Animated loader with progress bar
- Status checklist
- Auto-redirects to dashboard after 4 seconds

### dashboard.html
- User dashboard
- Displays submitted information
- Shows application status
- Activity log
- Logout functionality

## 🛠 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with modern features
- **Vanilla JavaScript** - No frameworks, lightweight
- **localStorage** - Client-side data persistence

## 🎨 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation
- ✅ File upload handling
- ✅ Data persistence
- ✅ Modern UI components
- ✅ Smooth animations
- ✅ Accessibility features
- ✅ Error handling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 💾 Data Storage

The application uses browser's `localStorage` to persist user data:

```javascript
- userLogin: { name, phone }
- companyInfo: { company, phone, city }
- businessDocs: { registrationType, gst, files }
- distributorPrefs: { city, volume }
```

## 🔐 Security Notes

- This is a frontend-only application
- Implement backend API for production use
- Add proper authentication
- Encrypt sensitive data
- Use HTTPS in production
- Validate data server-side

## 📝 Utility Functions

Available in `assets/js/utils.js`:

```javascript
Utils.getValue(id)           // Get form input value
Utils.showError(id, message) // Show error message
Utils.clearError(id)         // Clear error message
Utils.isValidEmail(email)    // Email validation
Utils.isValidPhone(phone)    // Phone validation
Utils.isValidGST(gst)        // GST validation
Utils.storeData(key, data)   // Save to localStorage
Utils.getData(key)           // Load from localStorage
Utils.navigate(url)          // Navigate to page
```

## 🎯 Customization

### Modify Colors
Edit CSS variables in `assets/css/styles.css`:

```css
:root {
  --primary: #4f46e5;
  --success: #10b981;
  --danger: #ef4444;
  /* ... more variables */
}
```

### Add New Pages
1. Create HTML file in root directory
2. Link CSS: `<link rel="stylesheet" href="assets/css/styles.css" />`
3. Include JavaScript: `<script src="assets/js/utils.js"></script>`
4. Update navigation links

## 📞 Support

For issues or questions, implement a support system or add contact information.

## 📄 License

All rights reserved. Distro Connect © 2025

---

**Last Updated:** November 26, 2025
