// Service Worker for PWA functionality and security
const CACHE_NAME = 'digital-card-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/js/admin.js',
    '/assets/profile.jpg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for contact form
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(sendPendingMessages());
    }
});

async function sendPendingMessages() {
    // Handle offline form submissions
    const pendingMessages = await getStoredMessages();
    
    for (const message of pendingMessages) {
        try {
            // Send message to your backend
            await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message)
            });
            
            // Remove from storage after successful send
            await removeStoredMessage(message.id);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }
}

async function getStoredMessages() {
    // Implementation depends on your storage mechanism
    return [];
}

async function removeStoredMessage(id) {
    // Implementation depends on your storage mechanism
}

// Push notifications (optional)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: '/assets/icon-192x192.png',
        badge: '/assets/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Card',
                icon: '/assets/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Digital Card Update', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Security headers and CSP enforcement
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).then((response) => {
                const newResponse = new Response(response.body, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: {
                        ...response.headers,
                        'X-Frame-Options': 'DENY',
                        'X-Content-Type-Options': 'nosniff',
                        'Referrer-Policy': 'strict-origin-when-cross-origin',
                        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
                    }
                });
                return newResponse;
            })
        );
    }
});