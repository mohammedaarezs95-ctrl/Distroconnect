# Distro Connect - API Integration Guide

## 📡 Backend Integration

### Current State
This is a frontend-only application using localStorage for data persistence. To make it production-ready, implement a backend API.

### Recommended Tech Stack

**Backend Options:**
- Node.js + Express
- Python + Flask/Django
- Java + Spring Boot
- PHP + Laravel
- .NET + ASP.NET

**Database:**
- PostgreSQL (recommended)
- MySQL
- MongoDB

---

## 🔌 API Endpoints Required

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET /api/auth/profile
```

### Distributors
```
POST /api/distributors/create
GET /api/distributors/:id
PUT /api/distributors/:id
GET /api/distributors
```

### Company Info
```
POST /api/company/create
GET /api/company/:id
PUT /api/company/:id
DELETE /api/company/:id
```

### Documents
```
POST /api/documents/upload
GET /api/documents/:id
DELETE /api/documents/:id
GET /api/documents/distributor/:distributorId
```

### Applications
```
POST /api/applications/submit
GET /api/applications/:id
GET /api/applications/status/:id
PUT /api/applications/:id/status
GET /api/applications/my-applications
```

---

## 🔄 Data Flow

### Current Frontend Flow:
```
User Input → Validation → localStorage → UI Update
```

### With Backend:
```
User Input → Validation → API Request → Backend Processing → Database → Response → UI Update
```

---

## 📝 API Integration Examples

### Example: Submitting Company Info

**Frontend (Current - localStorage):**
```javascript
const data = { company, phone, city };
Utils.storeData("companyInfo", data);
```

**Frontend (With Backend):**
```javascript
const data = { company, phone, city };

fetch('https://api.distroconnect.com/api/company/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    Utils.navigate("distributorproof.html");
  } else {
    Utils.showError("companyError", data.message);
  }
})
.catch(error => {
  console.error('Error:', error);
  Utils.showError("companyError", "Server error. Please try again.");
});
```

### Example: File Upload

**Enhanced Utils Function:**
```javascript
Utils.uploadFile = async (file, endpoint) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Utils.getToken()}`
      },
      body: formData
    });
    
    if (!response.ok) throw new Error('Upload failed');
    return await response.json();
  } catch (error) {
    throw new Error('Upload failed: ' + error.message);
  }
};
```

---

## 🛡️ Security Implementation

### Authentication
```javascript
// Store JWT token
Utils.setToken = (token) => {
  localStorage.setItem('auth_token', token);
};

// Get token for requests
Utils.getToken = () => {
  return localStorage.getItem('auth_token');
};

// Check if authenticated
Utils.isAuthenticated = () => {
  return !!Utils.getToken();
};
```

### Protected Routes
```javascript
// Middleware to check authentication
function requireAuth() {
  if (!Utils.isAuthenticated()) {
    Utils.navigate('loginui.html');
  }
}

// Call on protected pages
window.addEventListener('load', requireAuth);
```

---

## 📊 Database Schema

### users table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### companies table
```sql
CREATE TABLE companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  gst_number VARCHAR(15) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### documents table
```sql
CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_id INT NOT NULL,
  doc_type VARCHAR(100),
  file_url VARCHAR(500),
  file_size INT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

### applications table
```sql
CREATE TABLE applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  company_id INT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  review_date TIMESTAMP,
  approval_date TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

---

## 🔄 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "phone": "Invalid phone format"
    }
  }
}
```

### Frontend Error Handler
```javascript
Utils.handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    
    if (status === 401) {
      Utils.navigate('loginui.html');
    } else if (status === 400) {
      return data.error.details;
    } else if (status === 500) {
      console.error('Server error:', data);
    }
  }
  return null;
};
```

---

## 📚 Environment Configuration

### .env.production
```
API_BASE_URL=https://api.distroconnect.com
API_TIMEOUT=30000
LOG_LEVEL=error
ENABLE_ANALYTICS=true
```

### .env.development
```
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000
LOG_LEVEL=debug
ENABLE_ANALYTICS=false
```

---

## 🧪 Testing API Integration

### Using cURL
```bash
curl -X POST https://api.distroconnect.com/api/company/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"company":"ABC Ltd","phone":"9876543210","city":"Bangalore"}'
```

### Using Postman
1. Import API collection
2. Set up environment variables
3. Test each endpoint
4. Generate test scripts

---

## 📈 Rate Limiting

**Implement rate limiting:**
```
- 100 requests per minute (authenticated)
- 20 requests per minute (unauthenticated)
- File upload: 10MB max per file
- Document storage: 100MB per account
```

---

## 📞 Migration Path

### Phase 1: API Setup
- Set up backend server
- Implement authentication
- Create database schema

### Phase 2: Integration
- Update frontend API calls
- Test all flows
- Error handling

### Phase 3: Migration
- Migrate localStorage data to database
- Deprecate frontend storage
- Monitor system

### Phase 4: Production
- Deploy to production
- Monitor performance
- Collect feedback

---

**Last Updated:** November 26, 2025
