# Inventory Control API — Assignment 3

A fresh implementation of an inventory REST API using Node.js, Express, MongoDB and Mongoose. It uses a different folder layout, naming and controller organization while covering the same learning goals as the reference repository.

## Features

- Create, list, read, update and delete inventory items.
- Filter by category and search item names.
- Sort by price or name; paginate results.
- Low-stock report based on `quantity <= reorderLevel`.
- Category report using a MongoDB aggregation pipeline.
- Atomic stock adjustment that prevents stock from becoming negative.
- Schema validation, unique SKU handling and centralized API errors.

## Requirements

- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB Atlas connection string.

## Setup

1. Extract the ZIP and open `inventory-control-api-assignment3` in VS Code.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and confirm `MONGO_URI` points to your MongoDB instance:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/inventory_control_db
   ```

4. Add sample data:

   ```bash
   npm run seed
   ```

5. Start the API:

   ```bash
   npm start
   ```

6. Open `http://localhost:5000/`.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Health check |
| POST | `/api/items` | Create item |
| GET | `/api/items` | List, search, filter, sort and paginate |
| GET | `/api/items/:id` | Get one item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |
| GET | `/api/items/low-stock` | Low-stock report |
| GET | `/api/items/category-report` | Category aggregation |
| PATCH | `/api/items/:id/stock` | Adjust stock |

### Query examples

- `/api/items?category=Electronics`
- `/api/items?search=mouse`
- `/api/items?sort=price_asc`
- `/api/items?page=2&limit=5`
- `/api/items?category=Home&sort=price_desc&page=1&limit=10`

### Create item example

```json
{
  "name": "Portable SSD",
  "sku": "ELC-SSD-901",
  "category": "Electronics",
  "price": 3499,
  "quantity": 8,
  "reorderLevel": 3,
  "supplier": "Storage Hub"
}
```

### Stock adjustment example

Send `PATCH /api/items/ITEM_ID/stock` with:

```json
{ "change": 5 }
```

Use a negative `change` to reduce stock. The API rejects adjustments that would make stock negative.

## Tests

Run:

```bash
npm test
```

The HTTP smoke tests do not require MongoDB. Database-backed endpoints require a running MongoDB instance and can be tested after seeding.

## Important

Do not upload `node_modules` or your real `.env` file to GitHub. The `.gitignore` file excludes both.
