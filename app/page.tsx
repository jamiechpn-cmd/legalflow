'use client';

import React, { useState, useEffect } from 'react';

// Types
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  practice: string;
  status: 'Active' | 'Pending' | 'Inactive';
  cases: number;
  notes: string;
}

interface Appointment {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  duration: number;
  type: 'In-Person' | 'Video Call' | 'Phone' | 'Deadline';
  status: 'confirmed' | 'pending';
}

interface Task {
  id: string;
  title: string;
  client: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Overdue' | 'Completed';
  category: string;
}

interface Message {
  id: string;
  client: string;
  channel: 'email' | 'sms' | 'phone';
  subject: string;
  direction: 'inbound' | 'outbound';
  date: string;
}

// Sample Data
const CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    phone: '(920) 555-0142',
    practice: 'Family Law',
    status: 'Active',
    cases: 2,
    notes: 'Custody hearing scheduled for April. Needs updated financial docs.'
  },
  {
    id: '2',
    name: 'Robert Chen',
    email: 'r.chen@outlook.com',
    phone: '(920) 555-0187',
    practice: 'Estate Planning',
    status: 'Active',
    cases: 1,
    notes: 'Will revision in progress. Meeting next Tuesday.'
  },
  {
    id: '3',
    name: 'Maria Gonzalez',
    email: 'maria.g@gmail.com',
    phone: '(920) 555-0203',
    practice: 'Personal Injury',
    status: 'Active',
    cases: 1,
    notes: 'Settlement negotiations ongoing. Insurance adjuster responsive.'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'j.wilson@email.com',
    phone: '(920) 555-0156',
    practice: 'Criminal Defense',
    status: 'Pending',
    cases: 1,
    notes: 'Arraignment complete. Discovery phase starting.'
  },
  {
    id: '5',
    name: 'Angela Park',
    email: 'a.park@email.com',
    phone: '(920) 555-0231',
    practice: 'Business Law',
    status: 'Active',
    cases: 3,
    notes: 'LLC formation docs ready for review. Also handling lease negotiation.'
  },
  {
    id: '6',
    name: 'David Thompson',
    email: 'd.thompson@email.com',
    phone: '(920) 555-0178',
    practice: 'Real Estate',
    status: 'Inactive',
    cases: 1,
    notes: 'Closing completed. Follow up in 30 days for referral ask.'
  }
];

const APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    title: 'Custody Hearing Prep',
    client: 'Sarah Mitchell',
    date: '2026-03-17',
    time: '9:00 AM',
    duration: 60,
    type: 'In-Person',
    status: 'confirmed'
  },
  {
    id: '2',
    title: 'LLC Review Meeting',
    client: 'Angela Park',
    date: '2026-03-17',
    time: '11:00 AM',
    duration: 45,
    type: 'Video Call',
    status: 'confirmed'
  },
  {
    id: '3',
    title: 'Will Revision Review',
    client: 'Robert Chen',
    date: '2026-03-18',
    time: '2:00 PM',
    duration: 60,
    type: 'In-Person',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Settlement Discussion',
    client: 'Maria Gonzalez',
    date: '2026-03-19',
    time: '10:00 AM',
    duration: 30,
    type: 'Phone',
    status: 'confirmed'
  },
  {
    id: '5',
    title: 'Discovery Review',
    client: 'James Wilson',
    date: '2026-03-20',
    time: '3:00 PM',
    duration: 90,
    type: 'In-Person',
    status: 'pending'
  },
  {
    id: '6',
    title: 'Document Filing Deadline',
    client: 'Sarah Mitchell',
    date: '2026-03-21',
    time: '5:00 PM',
    duration: 0,
    type: 'Deadline',
    status: 'confirmed'
  }
];

const TASKS: Task[] = [
  {
    id: '1',
    title: 'Prepare custody motion',
    client: 'Sarah Mitchell',
    priority: 'High',
    dueDate: '2026-03-17',
    status: 'In Progress',
    category: 'Filing'
  },
  {
    id: '2',
    title: 'Draft updated will',
    client: 'Robert Chen',
    priority: 'Medium',
    dueDate: '2026-03-18',
    status: 'In Progress',
    category: 'Drafting'
  },
  {
    id: '3',
    title: 'Review medical records',
    client: 'Maria Gonzalez',
    priority: 'High',
    dueDate: '2026-03-17',
    status: 'To Do',
    category: 'Review'
  },
  {
    id: '4',
    title: 'File LLC articles of organization',
    client: 'Angela Park',
    priority: 'Medium',
    dueDate: '2026-03-19',
    status: 'To Do',
    category: 'Filing'
  },
  {
    id: '5',
    title: 'Submit discovery requests',
    client: 'James Wilson',
    priority: 'High',
    dueDate: '2026-03-20',
    status: 'To Do',
    category: 'Filing'
  },
  {
    id: '6',
    title: 'Review lease agreement',
    client: 'Angela Park',
    priority: 'Low',
    dueDate: '2026-03-22',
    status: 'To Do',
    category: 'Review'
  },
  {
    id: '7',
    title: 'Gather financial disclosures',
    client: 'Sarah Mitchell',
    priority: 'High',
    dueDate: '2026-03-16',
    status: 'Overdue',
    category: 'Client Request'
  },
  {
    id: '8',
    title: 'Send 30-day follow-up',
    client: 'David Thompson',
    priority: 'Low',
    dueDate: '2026-03-22',
    status: 'To Do',
    category: 'Communication'
  }
];

const MESSAGES: Message[] = [
  {
    id: '1',
    client: 'Sarah Mitchell',
    channel: 'email',
    subject: 'Hearing Reminder',
    direction: 'outbound',
    date: '2026-03-16'
  },
  {
    id: '2',
    client: 'Robert Chen',
    channel: 'email',
    subject: 'Will Revision Update',
    direction: 'outbound',
    date: '2026-03-15'
  },
  {
    id: '3',
    client: 'Maria Gonzalez',
    channel: 'sms',
    subject: '',
    direction: 'outbound',
    date: '2026-03-14'
  },
  {
    id: '4',
    client: 'Angela Park',
    channel: 'email',
    subject: 'LLC Documents Ready',
    direction: 'outbound',
    date: '2026-03-15'
  },
  {
    id: '5',
    client: 'Sarah Mitchell',
    channel: 'email',
    subject: 'Re: Financial Documents',
    direction: 'inbound',
    date: '2026-03-15'
  }
];

const MESSAGE_TEMPLATES = [
  { id: '1', name: 'Appointment Reminder', category: 'Scheduling' },
  { id: '2', name: 'Case Update', category: 'Status' },
  { id: '3', name: 'Document Request', category: 'Documents' },
  { id: '4', name: 'Follow-Up Check-In', category: 'Retention' },
  { id: '5', name: 'Payment Reminder', category: 'Billing' }
];

// SVG Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m0 5.08l-4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08 0l4.24 4.24M19.78 19.78l-4.24-4.24m0-5.08l4.24-4.24M23 12h-6m-6 0H5" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);


// Global hover styles
const GlobalStyles = () => (
  <style>{`
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .lf-card { transition: all 0.2s ease; }
    .lf-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .lf-btn-primary { transition: all 0.2s ease; }
    .lf-btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,0.3); }
    .lf-nav-btn { transition: all 0.15s ease; }
    .lf-nav-btn:hover { background-color: rgba(99,102,241,0.1) !important; }
    .lf-clickable { transition: all 0.15s ease; }
    .lf-clickable:hover { background-color: rgba(99,102,241,0.04) !important; border-color: rgba(99,102,241,0.3) !important; }
    .lf-skeleton { background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 8px; }
    .lf-fade-in { animation: fadeIn 0.3s ease forwards; }
    @media (max-width: 768px) {
      .lf-mobile-hide { display: none !important; }
      .lf-mobile-stack { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

const SkeletonLoader = () => (
  <div style={{ padding: '24px' }}>
    <div className="lf-skeleton" style={{ width: '200px', height: '32px', marginBottom: '24px' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
      {[1,2,3,4].map(i => <div key={i} className="lf-skeleton" style={{ height: '90px' }} />)}
    </div>
    {[1,2,3].map(i => <div key={i} className="lf-skeleton" style={{ height: '72px', marginBottom: '8px' }} />)}
  </div>
);

const EmptyState = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', color: 'var(--color-text-tertiary)' }}>
    <div style={{ width: '48px', height: '48px', marginBottom: '16px', opacity: 0.4 }}>{icon}</div>
    <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>{title}</div>
    <div style={{ fontSize: '14px' }}>{subtitle}</div>
  </div>
);

// Component: Sidebar
interface SidebarProps {
  collapsed: boolean;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'clients', label: 'Clients', icon: UsersIcon },
    { id: 'schedule', label: 'Schedule', icon: CalendarIcon },
    { id: 'tasks', label: 'Tasks', icon: CheckboxIcon },
    { id: 'messages', label: 'Messages', icon: ChatIcon },
    { id: 'settings', label: 'Settings', icon: GearIcon }
  ];

  return (
    <div style={{
      width: collapsed ? '80px' : '280px',
      backgroundColor: 'var(--color-background-secondary)',
      borderRight: '1px solid var(--color-border-tertiary)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      padding: '20px 16px',
      overflowY: 'auto'
    }}>
      {/* Logo */}
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '32px',
        color: '#6366f1',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#6366f1',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          L
        </div>
        {!collapsed && 'LegalFlow'}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              style={{
                width: '100%',
                padding: '12px 12px',
                marginBottom: '8px',
                border: 'none',
                background: isActive ? '#6366f1' : 'transparent',
                color: isActive ? 'white' : 'var(--color-text-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              className={isActive ? '' : 'lf-nav-btn'}
            >
              <div style={{ width: '24px', height: '24px' }}>
                <Icon />
              </div>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div style={{
        padding: '16px 12px',
        borderTop: '1px solid var(--color-border-tertiary)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#6366f1',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          JM
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
              Jamie M.
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
              Admin
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component: Dashboard
const Dashboard: React.FC<{ clients: Client[] }> = ({ clients }) => {
  const activeCases = clients.filter(c => c.status === 'Active').length;
  const totalCases = clients.reduce((sum, c) => sum + c.cases, 0);
  const upcomingAppointments = 3;
  const tasksDue = TASKS.filter(t => t.status !== 'Completed').length;

  const stats = [
    { label: 'Active Clients', value: activeCases.toString() },
    { label: 'Total Cases', value: totalCases.toString() },
    { label: 'Appointments', value: upcomingAppointments.toString() },
    { label: 'Tasks Due', value: tasksDue.toString() }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: 'var(--color-text-primary)', fontSize: '28px', fontWeight: '700', letterSpacing: '-0.02em' }}>Dashboard</h1>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="lf-card"
            style={{
              backgroundColor: 'var(--color-background-secondary)',
              border: '1px solid var(--color-border-tertiary)',
              borderRadius: '12px',
              padding: '20px',
              color: 'var(--color-text-primary)'
            }}
          >
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6366f1' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Upcoming Appointments
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {APPOINTMENTS.slice(0, 3).map((apt) => (
            <div
              key={apt.id}
              style={{
                backgroundColor: 'var(--color-background-secondary)',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  {apt.title}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {apt.client} • {apt.date} at {apt.time}
                </div>
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: apt.status === 'confirmed' ? '#ecfdf5' : '#fffbeb',
                color: apt.status === 'confirmed' ? '#065f46' : '#92400e',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Tasks */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Priority Tasks
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {TASKS.filter(t => t.priority === 'High' && t.status !== 'Completed').slice(0, 3).map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: 'var(--color-background-secondary)',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  {task.title}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {task.client} • Due {task.dueDate}
                </div>
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: task.status === 'Overdue' ? '#fee2e2' : '#fef3c7',
                color: task.status === 'Overdue' ? '#991b1b' : '#92400e',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {task.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Communications */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Recent Communications
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MESSAGES.slice(0, 3).map((msg) => (
            <div
              key={msg.id}
              style={{
                backgroundColor: 'var(--color-background-secondary)',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', color: 'var(--color-text-secondary)' }}>
                  {msg.channel === 'email' ? <MailIcon /> : <PhoneIcon />}
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                    {msg.client}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    {msg.subject || `${msg.channel} - ${msg.date}`}
                  </div>
                </div>
              </div>
              <div style={{
                padding: '6px 12px',
                backgroundColor: msg.direction === 'inbound' ? '#f0f9ff' : '#f5f3ff',
                color: msg.direction === 'inbound' ? '#0c4a6e' : '#5b21b6',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {msg.direction === 'inbound' ? 'Inbound' : 'Sent'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Component: Clients
interface ClientsPageProps {
  clients: Client[];
  onAddClient?: () => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onAddClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const statuses = ['All', 'Active', 'Pending', 'Inactive'];
  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selectedClient ? '1fr 1fr' : '1fr', gap: '24px', minHeight: '100vh' }}>
      {/* Client List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ color: 'var(--color-text-primary)' }}>Clients</h1>
          <button
            onClick={onAddClient}
            style={{
              padding: '10px 16px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <div style={{ width: '18px', height: '18px' }}>
              <PlusIcon />
            </div>
            Add Client
          </button>
        </div>

        {/* Search */}
        <div style={{
          position: 'relative',
          marginBottom: '16px'
        }}>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              border: '1px solid var(--color-border-tertiary)',
              borderRadius: '8px',
              backgroundColor: 'var(--color-background-secondary)',
              color: 'var(--color-text-primary)',
              fontSize: '14px'
            }}
          />
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '18px',
            height: '18px',
            color: 'var(--color-text-secondary)'
          }}>
            <SearchIcon />
          </div>
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '8px 12px',
                border: statusFilter === status ? 'none' : `1px solid var(--color-border-tertiary)`,
                background: statusFilter === status ? '#6366f1' : 'transparent',
                color: statusFilter === status ? 'white' : 'var(--color-text-secondary)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Client List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredClients.length === 0 ? (
            <EmptyState icon={<UsersIcon />} title="No clients found" subtitle={searchTerm ? 'Try adjusting your search' : 'No clients match this filter'} />
          ) : filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className="lf-clickable"
              style={{
                backgroundColor: selectedClient?.id === client.id ? '#eef2ff' : 'var(--color-background-secondary)',
                border: selectedClient?.id === client.id ? '2px solid #6366f1' : '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                {client.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                {client.practice}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                {client.cases} case{client.cases !== 1 ? 's' : ''} • {client.email}
              </div>
              <div style={{
                marginTop: '12px',
                padding: '8px',
                backgroundColor: 'var(--color-background-primary)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--color-text-secondary)'
              }}>
                {client.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Detail */}
      {selectedClient && (
        <div style={{
          backgroundColor: 'var(--color-background-secondary)',
          border: '1px solid var(--color-border-tertiary)',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                {selectedClient.name}
              </h2>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                {selectedClient.practice}
              </div>
            </div>
            <button
              onClick={() => setSelectedClient(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                width: '24px',
                height: '24px'
              }}
            >
              <XIcon />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
                Email
              </div>
              <div style={{ color: 'var(--color-text-primary)' }}>
                {selectedClient.email}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
                Phone
              </div>
              <div style={{ color: 'var(--color-text-primary)' }}>
                {selectedClient.phone}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
                Status
              </div>
              <div style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: selectedClient.status === 'Active' ? '#ecfdf5' : selectedClient.status === 'Pending' ? '#fffbeb' : '#f3f4f6',
                color: selectedClient.status === 'Active' ? '#065f46' : selectedClient.status === 'Pending' ? '#92400e' : '#374151',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {selectedClient.status}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
                Cases
              </div>
              <div style={{ color: 'var(--color-text-primary)' }}>
                {selectedClient.cases}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '8px' }}>
                Notes
              </div>
              <div style={{
                backgroundColor: 'var(--color-background-primary)',
                padding: '12px',
                borderRadius: '8px',
                color: 'var(--color-text-primary)',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {selectedClient.notes}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-border-tertiary)' }}>
            <button style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <div style={{ width: '18px', height: '18px' }}>
                <EditIcon />
              </div>
              Edit
            </button>
            <button style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <div style={{ width: '18px', height: '18px' }}>
                <TrashIcon />
              </div>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Component: Schedule
const SchedulePage: React.FC<{ appointments: Appointment[] }> = ({ appointments }) => {
  const [selectedDate, setSelectedDate] = useState('2026-03-21');
  const [showAddModal, setShowAddModal] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date('2026-03-21');
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  const selectedDayAppointments = appointments.filter(apt => apt.date === selectedDate);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: 'var(--color-text-primary)' }}>Schedule</h1>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '10px 16px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <div style={{ width: '18px', height: '18px' }}>
            <PlusIcon />
          </div>
          Add Appointment
        </button>
      </div>

      {/* Week View */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
        gap: '8px',
        marginBottom: '32px'
      }}>
        {weekDates.map((date, index) => {
          const dateStr = date.toISOString().split('T')[0];
          const isSelected = selectedDate === dateStr;
          const dayAppointments = appointments.filter(apt => apt.date === dateStr);

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              style={{
                padding: '16px',
                backgroundColor: isSelected ? '#6366f1' : 'var(--color-background-secondary)',
                color: isSelected ? 'white' : 'var(--color-text-primary)',
                border: isSelected ? 'none' : '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: '500' }}>
                {daysOfWeek[date.getDay()]}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {date.getDate()}
              </div>
              {dayAppointments.length > 0 && (
                <div style={{
                  fontSize: '11px',
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : '#f0f0f0',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {dayAppointments.length} apt
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Appointments for Selected Day */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>

        {selectedDayAppointments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--color-text-tertiary)'
          }}>
            No appointments scheduled for this day
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {selectedDayAppointments.map((apt) => (
              <div
                key={apt.id}
                style={{
                  backgroundColor: 'var(--color-background-secondary)',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div style={{
                    width: '60px',
                    padding: '8px',
                    backgroundColor: 'var(--color-background-primary)',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {apt.time}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                      {apt.title}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                      {apt.client} • {apt.type}{apt.duration > 0 ? ` • ${apt.duration}min` : ''}
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '6px 12px',
                  backgroundColor: apt.status === 'confirmed' ? '#ecfdf5' : '#fffbeb',
                  color: apt.status === 'confirmed' ? '#065f46' : '#92400e',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--color-background-primary)',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                Add Appointment
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  width: '24px',
                  height: '24px'
                }}
              >
                <XIcon />
              </button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Appointment title"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-background-secondary)',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Client
                </label>
                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)',
                  fontSize: '14px'
                }}>
                  <option>Select a client</option>
                  {CLIENTS.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--color-border-tertiary)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-background-secondary)',
                      color: 'var(--color-text-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                    Time
                  </label>
                  <input
                    type="time"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--color-border-tertiary)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-background-secondary)',
                      color: 'var(--color-text-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    placeholder="60"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--color-border-tertiary)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-background-secondary)',
                      color: 'var(--color-text-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                    Type
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-background-secondary)',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px'
                  }}>
                    <option>In-Person</option>
                    <option>Video Call</option>
                    <option>Phone</option>
                    <option>Deadline</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Add Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Component: Tasks
const TasksPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [tasks, setTasks] = useState(TASKS);

  const statuses = ['All', 'To Do', 'In Progress', 'Completed', 'Overdue'];
  const filteredTasks = tasks.filter((t) => statusFilter === 'All' || t.status === statusFilter);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === 'Completed' ? 'To Do' : 'Completed' }
        : t
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: 'var(--color-text-primary)' }}>Tasks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '10px 16px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <div style={{ width: '18px', height: '18px' }}>
            <PlusIcon />
          </div>
          Add Task
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              padding: '8px 16px',
              border: statusFilter === status ? 'none' : `1px solid var(--color-border-tertiary)`,
              background: statusFilter === status ? '#6366f1' : 'transparent',
              color: statusFilter === status ? 'white' : 'var(--color-text-secondary)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredTasks.length === 0 ? (
          <EmptyState icon={<CheckboxIcon />} title="No tasks found" subtitle={statusFilter === 'All' ? 'Create a task to get started' : 'No tasks with status "' + statusFilter + '"'} />
        ) : filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: 'var(--color-background-secondary)',
              border: '1px solid var(--color-border-tertiary)',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <button
              onClick={() => toggleTaskStatus(task.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '24px',
                height: '24px',
                color: task.status === 'Completed' ? '#10b981' : 'var(--color-text-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckboxIcon />
            </button>

            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: '500',
                color: 'var(--color-text-primary)',
                textDecoration: task.status === 'Completed' ? 'line-through' : 'none'
              }}>
                {task.title}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                {task.client} • {task.category} • Due {task.dueDate}
              </div>
            </div>

            <div style={{
              padding: '6px 12px',
              backgroundColor: task.priority === 'High' ? '#fee2e2' : task.priority === 'Medium' ? '#fef3c7' : '#f0fdf4',
              color: task.priority === 'High' ? '#991b1b' : task.priority === 'Medium' ? '#92400e' : '#166534',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {task.priority}
            </div>

            <div style={{
              padding: '6px 12px',
              backgroundColor: task.status === 'Completed' ? '#ecfdf5' : task.status === 'Overdue' ? '#fee2e2' : '#f5f3ff',
              color: task.status === 'Completed' ? '#065f46' : task.status === 'Overdue' ? '#991b1b' : '#5b21b6',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {task.status}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--color-background-primary)',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                Add Task
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  width: '24px',
                  height: '24px'
                }}
              >
                <XIcon />
              </button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="Task title"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-background-secondary)',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Client
                </label>
                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)',
                  fontSize: '14px'
                }}>
                  <option>Select a client</option>
                  {CLIENTS.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                    Priority
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-background-secondary)',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px'
                  }}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--color-border-tertiary)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-background-secondary)',
                      color: 'var(--color-text-primary)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Category
                </label>
                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)',
                  fontSize: '14px'
                }}>
                  <option>Filing</option>
                  <option>Drafting</option>
                  <option>Review</option>
                  <option>Communication</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Component: Messages
const MessagesPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      {/* Quick Templates */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Quick Templates
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MESSAGE_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              style={{
                padding: '12px 16px',
                backgroundColor: selectedTemplate === template.id ? '#eef2ff' : 'var(--color-background-secondary)',
                border: selectedTemplate === template.id ? '2px solid #6366f1' : '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                {template.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                {template.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Automation Settings */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Automation
        </h2>
        <div style={{
          backgroundColor: 'var(--color-background-secondary)',
          border: '1px solid var(--color-border-tertiary)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Auto-Response
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Send automatic replies
              </div>
            </div>
            <button
              onClick={() => setAutomationEnabled(!automationEnabled)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: automationEnabled ? '#10b981' : 'var(--color-border-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: 'white',
                borderRadius: '50%',
                top: '2px',
                left: automationEnabled ? '22px' : '2px',
                transition: 'left 0.2s ease'
              }} />
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-tertiary)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Appointment Reminders
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Send 24-hour reminders
              </div>
            </div>
            <button
              onClick={() => setRemindersEnabled(!remindersEnabled)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: remindersEnabled ? '#10b981' : 'var(--color-border-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: 'white',
                borderRadius: '50%',
                top: '2px',
                left: remindersEnabled ? '22px' : '2px',
                transition: 'left 0.2s ease'
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Message History & Compose */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
            Message History
          </h2>
          <button
            onClick={() => setShowComposeModal(true)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            <div style={{ width: '16px', height: '16px' }}>
              <SendIcon />
            </div>
            Send
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
          {MESSAGES.map((msg) => (
            <div
              key={msg.id}
              style={{
                backgroundColor: 'var(--color-background-secondary)',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <div style={{ width: '24px', height: '24px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                {msg.channel === 'email' ? <MailIcon /> : <PhoneIcon />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: '500', fontSize: '13px', color: 'var(--color-text-primary)' }}>
                  {msg.client}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  {msg.subject || msg.channel}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                  {msg.date}
                </div>
              </div>
              <div style={{
                padding: '4px 8px',
                backgroundColor: msg.direction === 'inbound' ? '#f0f9ff' : '#f5f3ff',
                color: msg.direction === 'inbound' ? '#0c4a6e' : '#5b21b6',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}>
                {msg.direction === 'inbound' ? 'In' : 'Out'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--color-background-primary)',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                Compose Message
              </h2>
              <button
                onClick={() => setShowComposeModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  width: '24px',
                  height: '24px'
                }}
              >
                <XIcon />
              </button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  To
                </label>
                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)',
                  fontSize: '14px'
                }}>
                  <option>Select recipient</option>
                  {CLIENTS.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Channel
                </label>
                <select style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)',
                  fontSize: '14px'
                }}>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>Phone</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Message subject"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-background-secondary)',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Message
                </label>
                <textarea
                  placeholder="Type your message..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-background-secondary)',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px',
                    minHeight: '120px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Component: Settings
const SettingsPage: React.FC = () => {
  const [firmName, setFirmName] = useState('Mitchell & Associates');
  const [firmEmail, setFirmEmail] = useState('info@mitchellaw.com');
  const [firmPhone, setFirmPhone] = useState('(920) 555-0100');
  const [firmAddress, setFirmAddress] = useState('123 Main St, Oshkosh, WI 54901');
  const [firmWebsite, setFirmWebsite] = useState('mitchellaw.com');
  const [notifyAppointments, setNotifyAppointments] = useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(false);

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '32px', color: 'var(--color-text-primary)' }}>Settings</h1>

      {/* Firm Profile */}
      <div style={{
        backgroundColor: 'var(--color-background-secondary)',
        border: '1px solid var(--color-border-tertiary)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: 'var(--color-text-primary)' }}>
          Firm Profile
        </h2>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              Firm Name
            </label>
            <input
              type="text"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              Email
            </label>
            <input
              type="email"
              value={firmEmail}
              onChange={(e) => setFirmEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              Phone
            </label>
            <input
              type="tel"
              value={firmPhone}
              onChange={(e) => setFirmPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              Address
            </label>
            <input
              type="text"
              value={firmAddress}
              onChange={(e) => setFirmAddress(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              Website
            </label>
            <input
              type="text"
              value={firmWebsite}
              onChange={(e) => setFirmWebsite(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                fontSize: '14px'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 16px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              marginTop: '8px'
            }}
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div style={{
        backgroundColor: 'var(--color-background-secondary)',
        border: '1px solid var(--color-border-tertiary)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: 'var(--color-text-primary)' }}>
          Notification Preferences
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Appointment Notifications
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Get notified about upcoming appointments
              </div>
            </div>
            <button
              onClick={() => setNotifyAppointments(!notifyAppointments)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: notifyAppointments ? '#10b981' : 'var(--color-border-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: 'white',
                borderRadius: '50%',
                top: '2px',
                left: notifyAppointments ? '22px' : '2px',
                transition: 'left 0.2s ease'
              }} />
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-tertiary)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Deadline Reminders
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Alerts for upcoming deadlines
              </div>
            </div>
            <button
              onClick={() => setNotifyDeadlines(!notifyDeadlines)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: notifyDeadlines ? '#10b981' : 'var(--color-border-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: 'white',
                borderRadius: '50%',
                top: '2px',
                left: notifyDeadlines ? '22px' : '2px',
                transition: 'left 0.2s ease'
              }} />
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-tertiary)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Message Notifications
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Alerts for new client messages
              </div>
            </div>
            <button
              onClick={() => setNotifyMessages(!notifyMessages)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: notifyMessages ? '#10b981' : 'var(--color-border-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: 'white',
                borderRadius: '50%',
                top: '2px',
                left: notifyMessages ? '22px' : '2px',
                transition: 'left 0.2s ease'
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Plan Information */}
      <div style={{
        backgroundColor: 'var(--color-background-secondary)',
        border: '1px solid var(--color-border-tertiary)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: 'var(--color-text-primary)' }}>
          Plan Information
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--color-border-tertiary)' }}>
            <div>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Current Plan
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Professional
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6366f1' }}>
              $49/month
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Included Features
            </div>
            <ul style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Unlimited clients</li>
              <li>Appointment scheduling</li>
              <li>Task management</li>
              <li>Client messaging</li>
              <li>Email automation</li>
              <li>Basic analytics</li>
            </ul>
          </div>

          <button
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: '#6366f1',
              border: '2px solid #6366f1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              marginTop: '8px'
            }}
          >
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function LegalFlowApp() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => { window.removeEventListener('resize', checkMobile); clearTimeout(timer); };
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard clients={CLIENTS} />;
      case 'clients':
        return <ClientsPage clients={CLIENTS} />;
      case 'schedule':
        return <SchedulePage appointments={APPOINTMENTS} />;
      case 'tasks':
        return <TasksPage />;
      case 'messages':
        return <MessagesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard clients={CLIENTS} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: 'var(--color-background-primary)',
      color: 'var(--color-text-primary)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <GlobalStyles />

      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40
        }} />
      )}

      {/* Sidebar */}
      <div style={{
        position: isMobile ? 'fixed' : 'relative',
        zIndex: isMobile ? 50 : 'auto',
        transform: isMobile && !mobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease',
        height: '100vh'
      }}>
        <Sidebar
          collapsed={isMobile ? false : sidebarCollapsed}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%'
      }}>
        {/* Top Bar */}
        <div style={{
          backgroundColor: 'var(--color-background-secondary)',
          borderBottom: '1px solid var(--color-border-tertiary)',
          padding: isMobile ? '12px 16px' : '16px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <button
            onClick={() => isMobile ? setMobileMenuOpen(!mobileMenuOpen) : setSidebarCollapsed(!sidebarCollapsed)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '24px', height: '24px', color: 'var(--color-text-secondary)' }}
          >
            {isMobile ? <MenuIcon /> : (sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />)}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              color: 'var(--color-text-secondary)',
              position: 'relative'
            }}>
              <BellIcon />
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '12px',
                height: '12px',
                backgroundColor: '#ef4444',
                borderRadius: '50%'
              }} />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="lf-fade-in" style={{
          flex: 1,
          overflowY: 'auto',
          padding: isMobile ? '16px' : '24px'
        }}>
          {isLoading ? <SkeletonLoader /> : renderPage()}
        </div>
      </div>
    </div>
  );
}
