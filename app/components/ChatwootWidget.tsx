'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

// Routes where Chatwoot widget should NOT appear (internal/authenticated pages)
const HIDE_CHAT_ROUTES = [
  '/dashboard',
  '/admin',
  '/chat',
  '/settings',
  '/keys',
  '/models',
  '/rankings',
  '/contact',
  '/auth',
  '/components',
  '/contexts',
  '/utils',
  '/lib',
  '/types'
]

// Routes where Chatwoot widget IS allowed (public/marketing pages)
const ALLOWED_CHAT_ROUTES = [
  '/',
  '/about',
  '/terms',
  '/privacy',
  '/roadmap',
  '/docs',
  '/pages' // Assuming this contains public content
]

export default function ChatwootWidget() {
  const pathname = usePathname()
  
  // Check if current route should hide the chat widget
  const shouldHideWidget = HIDE_CHAT_ROUTES.some(route => 
    pathname?.startsWith(route)
  )
  
  // Check if current route is explicitly allowed
  const isExplicitlyAllowed = ALLOWED_CHAT_ROUTES.some(route => 
    pathname === route || (route !== '/' && pathname?.startsWith(route))
  )
  
  // Show widget only on explicitly allowed routes (not on internal/authenticated routes)
  const shouldShowWidget = isExplicitlyAllowed && !shouldHideWidget
  
  // Optional: Enable debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('ChatwootWidget Debug:', {
      pathname,
      shouldHideWidget,
      isExplicitlyAllowed,
      shouldShowWidget
    })
  }
  
  // Don't render anything if widget should be hidden
  if (!shouldShowWidget) {
    return null
  }
  
  return (
    <Script
      id="chatwoot-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(d,t) {
            var BASE_URL="https://chatwoot.mcp4.ai";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'm2Su4efUzBYgRgdFe4WtoSh6',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        `
      }}
    />
  )
}
