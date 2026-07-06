// src/data/roles.js
// Role definitions with permissions and nav access

export const ROLES = {
  admin: {
    key: 'admin',
    label: 'Super Admin',
    badge: '👑',
    color: 'bg-gradient-primary',
    description: 'Full system access — all modules, data, and settings',
    permissions: ['all'], // wildcard — has everything
  },
  operator: {
    key: 'operator',
    label: 'Librarian Operator',
    badge: '🔧',
    color: 'bg-gradient-success',
    description: 'Manages daily operations — issue, return, attendance, fines',
    permissions: [
      'dashboard', 'books', 'categories', 'authors', 'publishers',
      'members', 'issue', 'return', 'fines', 'reservations',
      'barcodes', 'attendance', 'notifications', 'profile',
    ],
  },
  user: {
    key: 'user',
    label: 'General User',
    badge: '📚',
    color: 'bg-gradient-purple-solid',
    description: 'Browse books, view reservations and your own fine history',
    permissions: [
      'dashboard', 'books', 'my-reservations', 'my-fines', 'notifications', 'profile',
    ],
  },
};

export const DEMO_USERS = [
  {
    id: 1,
    name: 'Prathamesh Giri',
    email: 'admin@libraryms.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'PG',
    memberId: null,
  },
  {
    id: 2,
    name: 'Ravi Shankar',
    email: 'operator@libraryms.com',
    password: 'operator123',
    role: 'operator',
    avatar: 'RS',
    memberId: null,
  },
  {
    id: 3,
    name: 'Aarav Sharma',
    email: 'user@libraryms.com',
    password: 'user123',
    role: 'user',
    avatar: 'AS',
    memberId: 'MEM-2024-001',
  },
];

/** Check if a user has a specific permission */
export function hasPermission(user, permission) {
  if (!user) return false;
  const roleData = ROLES[user.role];
  if (!roleData) return false;
  if (roleData.permissions.includes('all')) return true;
  return roleData.permissions.includes(permission);
}

/** Check if user is admin */
export const isAdmin = (user) => user?.role === 'admin';

/** Check if user is operator */
export const isOperator = (user) => user?.role === 'operator';

/** Check if user is general user */
export const isGeneralUser = (user) => user?.role === 'user';
