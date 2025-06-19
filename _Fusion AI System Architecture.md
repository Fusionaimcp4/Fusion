### **1\. Frontend Architecture**

### **text**

### **Apply**

### Frontend (Next.js)

### ├── Pages

### │   ├── Dashboard

### │   │   ├── Activity (usage logs & metrics)

### │   │   ├── Credits (credit management)

### │   │   └── API Keys (API key management)

### │   └── Chat Interface

### └── Components

###     ├── ActivityTable

###     ├── CreditBalance

###     └── APIKeyList

### **2\. Backend Architecture**

### **text**

### **Apply**

### Backend (Express.js)

### ├── Routes

### │   ├── User Activity

### │   │   ├── GET /api/user/activity (fetch logs)

### │   │   └── GET /api/user/activity/export (CSV export)

### │   ├── Chat

### │   │   └── POST /api/chat (handle chat requests)

### │   └── Credits

### │       └── GET /api/user/credits (credit balance)

### ├── Database

### │   └── PostgreSQL

### │       ├── usage\_logs

### │       ├── credit\_transactions

### │       └── api\_keys

### └── Middleware

###     └── Authentication (verifyToken)

### **3\. Data Flow**

### **text**

### **Apply**

### User Request → Frontend → Backend → Database

###      ↑            ↓          ↓         ↓

###      └────────────┴──────────┴─────────┘

### **4\. Key Components**

1. Authentication System  
* JWT-based authentication  
* Token verification middleware  
* User session management  
1. Credit System  
* Credit balance tracking  
* Transaction logging  
* Cost calculation per request  
1. Usage Tracking  
* Token usage monitoring  
* Response time tracking  
* Cost per request  
* API key usage tracking  
1. API Key Management  
* API key creation/deletion  
* Usage tracking per key  
* Key name/description

### **5\. Database Schema**

### **text**

### **Apply**

### PostgreSQL

### ├── usage\_logs

### │   ├── user\_id

### │   ├── provider

### │   ├── model

### │   ├── prompt\_tokens

### │   ├── completion\_tokens

### │   ├── total\_tokens

### │   ├── response\_time

### │   ├── cost

### │   └── api\_key\_id

### ├── credit\_transactions

### │   ├── user\_id

### │   ├── amount

### │   ├── type

### │   └── description

### └── api\_keys

###     ├── user\_id

###     ├── name

###     └── key

### **6\. Key Features**

1. Activity Monitoring  
* Real-time usage tracking  
* Cost per request  
* Response time monitoring  
* Token usage tracking  
1. Credit Management  
* Balance tracking  
* Transaction history  
* Cost deduction per request  
1. API Key System  
* Multiple API keys per user  
* Usage tracking per key  
* Key naming/description  
1. Export Capabilities  
* CSV export of activity logs  
* Detailed usage statistics

### **7\. Security Features**

1. Authentication  
* JWT token verification  
* User-specific data access  
* API key validation  
1. Data Protection  
* User data isolation  
* Secure API key storage  
* Transaction logging

### **8\. Performance Considerations**

1. Database  
* Indexed queries for performance  
* Efficient pagination  
* Optimized joins  
1. API  
* Rate limiting  
* Response time tracking  
* Error handling

This architecture provides a scalable, secure, and maintainable system for managing AI chat interactions with proper usage tracking and credit management.