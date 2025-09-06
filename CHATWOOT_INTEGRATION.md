# Chatwoot Widget Integration

## Overview
The Chatwoot widget is conditionally loaded on Fusion AI pages based on route classification. It only appears on public-facing marketing pages and is completely hidden from internal/authenticated pages.

## Implementation

### Component Location
- **File**: `app/components/ChatwootWidget.tsx`
- **Usage**: Imported in `app/layout.tsx` for global availability

### Route Classification

#### 🚫 Hidden Routes (Internal/Authenticated)
```typescript
const HIDE_CHAT_ROUTES = [
  '/dashboard',    // User dashboard
  '/admin',        // Admin panel
  '/chat',         // Chat interface
  '/settings',     // User settings
  '/keys',         // API key management
  '/models',       // Model management
  '/rankings',     // User rankings
  '/contact',      // Contact forms
  '/auth',         // Authentication pages
  '/components',   // Internal components
  '/contexts',     // React contexts
  '/utils',        // Utility functions
  '/lib',          // Library functions
  '/types'         // TypeScript types
]
```

#### ✅ Allowed Routes (Public/Marketing)
```typescript
const ALLOWED_CHAT_ROUTES = [
  '/',             // Homepage
  '/about',        // About page
  '/terms',        // Terms of service
  '/privacy',      // Privacy policy
  '/roadmap',      // Product roadmap
  '/docs',         // Documentation
  '/pages'         // Public content pages
]
```

### Logic Flow
1. **Route Check**: Uses `usePathname()` to get current route
2. **Hide Check**: Checks if route starts with any hidden route
3. **Allow Check**: Checks if route is explicitly allowed
4. **Render Decision**: Shows widget only if allowed AND not hidden
5. **Script Injection**: Uses Next.js `Script` component with `afterInteractive` strategy

### Performance Benefits
- **No SSR Issues**: Script only loads client-side
- **Conditional Loading**: Widget script never loads on internal pages
- **Clean DOM**: No hidden elements or CSS tricks
- **Maintainable**: Centralized route configuration

## Maintenance

### Adding New Hidden Routes
```typescript
const HIDE_CHAT_ROUTES = [
  // ... existing routes
  '/new-internal-route'
]
```

### Adding New Public Routes
```typescript
const ALLOWED_CHAT_ROUTES = [
  // ... existing routes
  '/new-public-route'
]
```

### Debugging
In development mode, the component logs route decisions to console:
```typescript
console.log('ChatwootWidget Debug:', {
  pathname,
  shouldHideWidget,
  isExplicitlyAllowed,
  shouldShowWidget
})
```

## Testing

### Widget Should Appear On:
- `/` (homepage)
- `/about`
- `/terms`
- `/privacy`
- `/roadmap`
- `/docs`

### Widget Should NOT Appear On:
- `/dashboard`
- `/admin`
- `/chat`
- `/settings`
- `/keys`
- `/models`
- `/rankings`
- `/contact`
- `/auth`

## Future Enhancements
- **User Role Check**: Could integrate with user authentication state
- **A/B Testing**: Could add feature flags for widget visibility
- **Analytics**: Could track widget usage patterns
- **Customization**: Could add user preference toggles
