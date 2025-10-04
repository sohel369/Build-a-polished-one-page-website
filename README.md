# UCE Website - Urmărirea Comportării în Exploatare

A polished, responsive one-page website for construction monitoring services (UCE) in Romania, built with modern web standards and best practices.

## 🎨 Design Features

- **Cream & Emerald Theme**: Professional color scheme with `#F9F4EC` (cream) background and `#0E7B6B` (emerald) accents
- **Floating Action Buttons**: Transparent phone and WhatsApp buttons with smooth animations
- **Mobile-First Responsive**: Optimized for all devices with progressive enhancement
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Lazy loading, optimized assets, and fast loading times

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet with CSS variables
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── img/
│       ├── favicon.ico     # Site favicon
│       ├── social-preview.jpg # Social media preview image
│       └── logo.jpeg      # Company logo
└── README.md              # This file
```

## 🛠️ How to Edit

### 1. Text Content

Edit the HTML file (`index.html`) to update:
- Company name and contact information
- Service descriptions
- Pricing information
- FAQ content

**Key sections to modify:**
- Hero section: Lines 47-57
- Services: Lines 63-85
- Pricing: Lines 89-108
- Contact info: Lines 255-258

### 2. Colors & Theme

Edit CSS variables in `assets/css/style.css` (lines 3-25):

```css
:root {
  /* Main Colors */
  --cream-bg: #F9F4EC;           /* Background */
  --emerald: #0E7B6B;           /* Primary accent */
  --emerald-dark: #0A5D4F;       /* Darker accent */
  --emerald-light: #1A9B8A;     /* Lighter accent */
  
  /* Text Colors */
  --text-primary: #2C3E50;      /* Main text */
  --text-secondary: #5A6C7D;    /* Secondary text */
  --text-muted: #8A9BA8;         /* Muted text */
}
```

### 3. Contact Information

Update contact details in `assets/js/main.js` (lines 8-12):

```javascript
const CONFIG = {
  phone: '+40700000000',                    // Your phone number
  whatsappMessage: 'Your WhatsApp message', // WhatsApp default message
  email: 'your-email@domain.com',          // Your email
};
```

### 4. Calculator Pricing

Modify calculator prices in `assets/js/main.js` (lines 45-50):

```javascript
this.prices = {
  bloc: 3990,    // Price for apartment buildings
  casa: 2990,    // Price for houses
  hala: 5490,    // Price for warehouses
  birouri: 4490  // Price for offices
};
```

### 5. Images

Replace placeholder images in `assets/img/`:
- `logo.jpeg` - Your company logo
- `favicon.ico` - Site favicon (16x16, 32x32, 48x48)
- `social-preview.jpg` - Social media preview (1200x630px)

### 6. SEO & Meta Tags

Update meta information in `index.html` (lines 6-18):
- Page title
- Meta description
- OpenGraph tags
- Twitter cards
- Canonical URL

## 🎯 Key Features

### Floating Action Buttons
- **Phone Button**: Direct calling functionality
- **WhatsApp Button**: Opens WhatsApp with pre-filled message
- **Responsive**: Adapts to mobile and desktop
- **Smooth Animations**: CSS transitions and hover effects

### Calculator
- **Real-time Calculation**: Updates as you type
- **Romanian Lei**: Prices in local currency
- **Area-based Pricing**: Scales with building size
- **Instrumentation Option**: Additional service toggle

### Contact Form
- **Mailto Integration**: Opens email client with pre-filled content
- **Form Validation**: Required field checking
- **Responsive Design**: Works on all devices
- **Accessibility**: Proper labels and ARIA attributes

### Performance Optimizations
- **Lazy Loading**: Images load as needed
- **CSS Variables**: Efficient theming system
- **Minified Assets**: Optimized file sizes
- **Progressive Enhancement**: Works without JavaScript

## 🚀 Deployment

1. **Upload Files**: Upload all files to your web server
2. **Update URLs**: Change canonical and OpenGraph URLs in `index.html`
3. **Test Functionality**: Verify calculator and contact form work
4. **Check Mobile**: Test on various devices and screen sizes

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: Screen readers, keyboard navigation
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🔧 Customization

### Adding New Sections
1. Add HTML structure in `index.html`
2. Style with CSS classes in `assets/css/style.css`
3. Add navigation links if needed
4. Update JavaScript for any interactive elements

### Changing Layout
- Modify grid classes: `grid--2-cols`, `grid--3-cols`, `grid--4-cols`
- Adjust spacing with CSS variables: `--space-sm`, `--space-md`, `--space-lg`
- Update responsive breakpoints in media queries

### Adding Animations
- Use existing animation classes: `animate-fade-in`, `animate-fade-in-up`
- Create custom animations in CSS
- Add JavaScript triggers for scroll-based animations

## 📊 Performance Tips

1. **Optimize Images**: Use WebP format when possible
2. **Minify CSS/JS**: Compress files for production
3. **Enable Compression**: Use gzip/brotli on server
4. **CDN**: Consider using a CDN for assets
5. **Caching**: Set appropriate cache headers

## 🐛 Troubleshooting

### Common Issues

**Calculator not working:**
- Check JavaScript console for errors
- Verify form IDs match in HTML and JS
- Ensure all required fields are present

**Floating buttons not showing:**
- Check CSS is loading properly
- Verify JavaScript is enabled
- Test on different screen sizes

**Contact form not working:**
- Check email client is configured
- Verify mailto links are properly formatted
- Test on different devices/browsers

### Debug Mode
Add `?debug=1` to URL to enable console logging for troubleshooting.

## 📞 Support

For technical support or customization requests, contact the development team.

---

**Built with ❤️ for UCE services in Romania**
