# API Configuration

## Environment Setup

Create a `.env.local` file in the `rawbify` directory with:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Environment
NODE_ENV=development
```

## API Endpoints

The frontend now uses a centralized API configuration located in `app/config/api.ts`.

### Available Endpoints:

- **Waitlist Join**: `POST /api/waitlist/join`
- **Waitlist Stats**: `GET /api/waitlist/stats`
- **User Validation**: `POST /api/validate-user`
- **Data Processing**: `POST /api/process-data`

### Configuration Structure:

```typescript
// app/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  API_VERSION: 'v1',
  ENDPOINTS: {
    WAITLIST_JOIN: '/api/waitlist/join',
    WAITLIST_STATS: '/api/waitlist/stats',
    VALIDATE_USER: '/api/validate-user',
    PROCESS_DATA: '/api/process-data',
  }
}
```

### Usage:

```typescript
import { getApiUrl, getEndpoint } from '../config/api'

// Get full URL
const url = getApiUrl(getEndpoint('VALIDATE_USER'))
// Result: http://localhost:8000/api/validate-user
```

## Production Deployment

For production, update the environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Testing

The frontend now properly connects to the FastAPI backend running on `localhost:8000`.

Test user IDs:
- `test123`
- `demo456` 
- `trial789`
- `user_admin` (special admin user) 