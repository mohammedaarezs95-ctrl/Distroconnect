// Utility Functions
const Utils = {
  // Show/hide element
  show: (id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  },
  
  hide: (id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  },
  
  // Get form value
  getValue: (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  },
  
  // Show error message
  showError: (id, message) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = message;
      el.style.display = 'block';
    }
  },
  
  // Clear error message
  clearError: (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = '';
      el.style.display = 'none';
    }
  },
  
  // Validate email
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  // Validate phone
  isValidPhone: (phone) => {
    const re = /^\+?\d{7,15}$/;
    return re.test(phone.replace(/\s/g, ''));
  },
  
  // Validate GST
  isValidGST: (gst) => {
    if (!gst) return true;
    const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
    return re.test(gst.trim());
  },
  
  // Store data to localStorage
  storeData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  
  // Get data from localStorage
  getData: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  
  // Navigate to page
  navigate: (url) => {
    window.location.href = url;
  },
  
  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
