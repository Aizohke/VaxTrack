
import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from '@clerk/express';

export const requireAuth = ClerkExpressRequireAuth();

export const withAuth = ClerkExpressWithAuth();
