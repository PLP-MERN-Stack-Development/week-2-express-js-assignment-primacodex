# Express RESTful API

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

## API Endpoints

### GET /api/products
- Query params: `category`, `search`, `page`, `limit`

### GET /api/products/:id

### POST /api/products
- Requires header: `x-api-key`
- Body: JSON with `name`, `description`, `price`, `category`, `inStock`

### PUT /api/products/:id
- Requires header: `x-api-key`
- Body: Same as POST

### DELETE /api/products/:id
- Requires header: `x-api-key`
