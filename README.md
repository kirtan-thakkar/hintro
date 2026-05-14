# Hintro Dashboard

AI-powered conversation assistant dashboard for analyzing and improving calls.

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router) - routing, Server Actions, API routes
- **UI/Styling:** Tailwind CSS 4, DM_Sans (Google Fonts)
- **Authentication:** Auth.js v5 (NextAuth) - credential-based login with JWT callbacks
- **State Management:** React Hooks (`useState`, `useEffect`) - local state only
- **Responsive Design:** React-Responsive 10.0.1 - media queries and conditional rendering
- **Icons:** Lucide React 1.14.0

## Setup & Run

```bash
# Install dependencies
npm install

# Set environment
# AUTH_SECRET=<your-secret> 

# Development server
npm run dev

# Production build
npm build
npm start

# Linting
npm run lint
```

Server runs on `http://localhost:3000`. Mock API serves dashboard data based on user ID (`u1` = empty state, `u2` = populated data).

## Folder Structure

```
app/                    # Next.js App Router
├── api/                # Route handlers (auth, call-sessions)
├── login/              # Auth flow (Server Actions, forms)
├── feedback-history/   # Feedback page
├── layout.jsx          # Root layout with Providers
├── page.jsx            # Dashboard entry point
└── globals.css         # Tailwind imports

components/             # React components
├── ui/                 # Reusable base elements (button, stat-card, call-item)
├── dashboard.jsx       # Main dashboard logic
├── navbar.jsx          # Header with user menu
├── sidebar.jsx         # Navigation drawer
├── feedback-modal.jsx  # Feedback form modal
├── feedback-history.jsx # History page component
├── logout-modal.jsx    # Logout confirmation
└── info-tooltip.jsx    # Tooltip utility
```

**Implementation Strategy:**
  - **Font:** DM_Sans (weights: 400, 500, 700)
  - **Borders:** #E2E2E8 (1px)
  - **Shadows:** `0_1px_2px_rgba(0,0,0,0.02)` for subtle depth
- Component-level precision
  - StatCard: 80px height, 42px icon containers with fixed padding/gaps
  - Button variants: primary (black), outline, secondary (gray)
  - Navbar: 64px height 
  - Sidebar: 262px fixed width on desktop, full-screen drawer on mobile

**Responsive Strategy:**
- **React-Responsive:** `useMediaQuery` hook for conditional layouts (maxWidth: 767px = mobile breakpoint)
- **Tailwind:** Utility-first with base styles
- **Mobile-first:** Sidebar collapses to hamburger menu; top nav title centers; drawer overlays content
- **Device Detection:** isMobile state prevents hydration mismatches via `mounted` flag

## Conventions

**Component Architecture:**
- `/ui` folder: Single-responsibility, composition-ready components (Button, StatCard, CallItem)
- Page components: Handle business logic, data fetching, state management
- All client-side components: `"use client"` directive at top
- Props drilling over context: Keeps dependencies explicit for small app scale

**Authentication:**
- Next Auth with Credentials provider (mock emails: `u1@email.com`, `u2@email.com`)
- JWT callbacks for session enrichment
- Protected routes via `auth()` middleware wrapper in `proxy.js`
- Redirect to `/login` on auth failure

**Data Fetching:**
- `fetch()` API inside `useEffect()` 
- User ID passed via `x-user-id` header (extracted from session)
- Mock backend integration for development
- Error handling: beautifully fails with fallback UI (empty states)

**Styling:**
- Tailwind CSS 

**Error Handling:**
- Try-catch for async operations
- error messages in UI
- Fallback states for failed data fetches

**Requirements:**
- `AUTH_SECRET` environment variable
- Backend API endpoint (currently pointing to mock)
- Node.js 18+ (for React 19 and Next.js 16 compatibility)


## Key Assumptions

1. **Single User Session:** No multi-user tenant isolation needed
2. **Mock Data:** Development uses mock API; 
3. **No Server-Side Rendering:** Dashboard always client-side rendered
4. **State Scope:** All data fetches are per-component; no global state 


