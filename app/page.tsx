'use client';

import React, { useState } from 'react';

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
    <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0z" />
  
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
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m0 5.08l-4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08 0l4.24 4.24M19.78 19.78l-4.24-4.24m0-5.08l4.24-4.24M23 12h-6m-6 0HO[" />
  
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
    <polyline points="20 6 9 17 412" />
  
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
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1è¸ôI1239s.9-9.5z" />
  
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
      width: collapsed ?  '80px' : '280px',
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
                transition: 'all 0.2s ease'
              }}
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(-mcolor-text-primary)' }}>
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
      <h1 style={{ marginBottom: '24px', color: 'var(--color-text-primary)' }}>Dashboard</h1>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(rup250px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
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
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(-color-text-primary)' }}>
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
                  {apt.client} Â  {apt.date} at {apt.time}
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
                  {task.client} â¢ Due {task.dueDate}
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
                    <div style={{ fontWeight: '500', color: 'var(-color-text-primary)' }}>
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
(((¼¼
½µÁ½¹¹Ðè
±¥¹ÑÌ)¥¹ÑÉ
±¥¹ÑÍAAÉ½ÁÌì(±¥¹ÑÌè
±¥¹Ñmtì(½¹
±¥¹Ðüè ¤ôøÙ½¥ì)ô()½¹ÍÐ
±¥¹ÑÍAèIÐ¹ñ
±¥¹ÑÍAAÉ½ÁÌøô¡ì±¥¹ÑÌ°½¹
±¥¹Ðô¤ôøì(½¹ÍÐmÍÉ¡QÉ´°ÍÑMÉ¡QÉµtôÕÍMÑÑ ¤ì(½¹ÍÐmÍ±Ñ
±¥¹Ð°ÍÑM±Ñ
±¥¹ÑtôÕÍMÑÑñ
±¥¹Ðð¹Õ±°ø¡¹Õ±°¤ì(½¹ÍÐmÍÑÑÕÍ¥±ÑÈ°ÍÑMÑÑÕÍ¥±ÑÉtôÕÍMÑÑñÍÑÉ¥¹ø ±°¤ì((½¹ÍÐÍÑÑÕÍÌôl±°°Ñ¥Ù°A¹¥¹°%¹Ñ¥Ùtì(½¹ÍÐ¥±ÑÉ
±¥¹ÑÌô±¥¹ÑÌ¹¥±ÑÈ ¡¤ôøì(½¹ÍÐµÑ¡ÍMÉ ô¹¹µ¹Ñ½1½ÝÉ
Í ¤¹¥¹±ÕÌ¡ÍÉ¡QÉ´¹Ñ½1½ÝÉ
Í ¤¤ñð(¹µ¥°¹Ñ½1½ÝÉ
Í ¤¹¥¹±ÕÌ¡ÍÉ¡QÉ´¹Ñ½1½ÝÉ
Í ¤¤ì(½¹ÍÐµÑ¡ÍMÑÑÕÌôÍÑÑÕÍ¥±ÑÈôôô±°ñð¹ÍÑÑÕÌôôôÍÑÑÕÍ¥±ÑÈì(ÉÑÕÉ¸µÑ¡ÍMÉ µÑ¡ÍMÑÑÕÌì(ô¤ì((ÉÑÕÉ¸ (ñ¥ØÍÑå±õíì¥ÍÁ±äèÉ¥°É¥QµÁ±Ñ
½±Õµ¹ÌèÅÈÅÈ°ÀèÈÑÁà°µ¥¹!¥¡ÐèÄÀÁÙ õôø(ì¼¨
±¥¹Ð1¥ÍÐ¨½ô(ñ¥Øø(ñ¥ØÍÑå±õíì¥ÍÁ±äè±à°©ÕÍÑ¥å
½¹Ñ¹ÐèÍÁµÑÝ¸°±¥¹%ÑµÌè¹ÑÈ°µÉ¥¹	½ÑÑ½´èÈÑÁàõôø(ñ ÄÍÑå±õíì½±½ÈèÙÈ µ½±½ÈµÑáÐµÁÉ¥µÉä¤õôù
±¥¹ÑÌð½ Äø(ñÕÑÑ½¸(½¹
±¥¬õí½¹
±¥¹Ñô(ÍÑå±õíì(Á¥¹èÄÁÁàÄÙÁà°(­É½Õ¹
½±½ÈèØÌØÙÄ°(½±½ÈèÝ¡¥Ñ°(½ÉÈè¹½¹°(½ÉÉI¥ÕÌèáÁà°(ÕÉÍ½ÈèÁ½¥¹ÑÈ°(¥ÍÁ±äè±à°(±¥¹%ÑµÌè¹ÑÈ°(ÀèáÁà°(½¹ÑM¥éèÄÑÁà°(½¹Ñ]¥¡ÐèÔÀÀ(õô(ø(ñ¥ØÍÑå±õíìÝ¥Ñ èÄáÁà°¡¥¡ÐèÄáÁàõôø(ñA±ÕÍ%½¸¼ø(ð½¥Øø(
±¥¹Ð(ð½ÕÑÑ½¸ø(ð½¥Øø((ì¼¨MÉ ¨½ô(ñ¥ØÍÑå±õíì(Á½Í¥Ñ¥½¸èÉ±Ñ¥Ù°(µÉ¥¹	½ÑÑ½´èÄÙÁà(õôø(ñ¥¹ÁÕÐ(ÑåÁôÑáÐ(Á±¡½±ÈôMÉ ±¥¹ÑÌ¸¸¸(Ù±ÕõíÍÉ¡QÉµô(½¹
¡¹õì¡¤ôøÍÑMÉ¡QÉ´¡¹ÑÉÐ¹Ù±Õ¥ô(ÍÑå±õíì(Ý¥Ñ èÄÀÀ°(Á¥¹èÄÁÁàÄÙÁàÄÁÁàÐÁÁà°(½ÉÈèÅÁàÍ½±¥ÙÈ µ½±½Èµ½ÉÈµÑÉÑ¥Éä¤°(½ÉÉI¥ÕÌèáÁà°(­É½Õ¹
½±½ÈèÙÈ ´µ½±½Èµ­É½Õ¹µÍ½¹Éä¤°(½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÁÉ¥µÉä¤°(½¹ÑM¥éèÄÑÁà(õô(¼ø(ñ¥ØÍÑå±õíì(Á½Í¥Ñ¥½¸èÍ½±ÕÑ°(±ÐèÄÉÁà°(Ñ½ÀèÔÀ°(ÑÉ¹Í½É´èÑÉ¹Í±Ñd ´ÔÀ¤°(Ý¥Ñ èÄáÁà°(¡¥¡ÐèÄáÁà°(½±½ÈèÙÈ µ½±½ÈµÑáÐµÍ½¹Éä¤(õôø(ñMÉ¡%½¸¼ø(ð½¥Øø(ð½¥Øø((ì¼¨MÑÑÕÌ¥±ÑÈ¨½ô(ñ¥ØÍÑå±õíì¥ÍÁ±äè±à°ÀèáÁà°µÉ¥¹	½ÑÑ½´èÄÙÁàõôø(íÍÑÑÕÍÌ¹µÀ ¡ÍÑÑÕÌ¤ôø (ñÕÑÑ½¸(­äõíÍÑÑÕÍô(½¹
±¥¬õì ¤ôøÍÑMÑÑÕÍ¥±ÑÈ¡ÍÑÑÕÌ¥ô(ÍÑå±õíì(Á¥¹èáÁàÄÉÁà°(½ÉÈèÍÑÑÕÍ¥±ÑÈôôôÍÑÑÕÌü¹½¹èÅÁàÍ½±¥ÙÈ ´µ½±½Èµ½ÉÈµÑÉÑ¥Éä¥°(­É½Õ¹èÍÑÑÕÍ¥±ÑÈôôôÍÑÑÕÌüØÌØÙÄèÑÉ¹ÍÁÉ¹Ð°(½±½ÈèÍÑÑÕÍ¥±ÑÈôôôÍÑÑÕÌüÝ¡¥ÑèÙÈ ´µ½±½ÈµÑáÐµÍ½¹Éä¤°(½ÉÉI¥ÕÌèÙÁà°(ÕÉÍ½ÈèÁ½¥¹ÑÈ°(½¹ÑM¥éèÄÉÁà°(½¹Ñ]¥¡ÐèÔÀÀ(õô(ø(íÍÑÑÕÍô(ð½ÕÑÑ½¸ø(¤¥ô(ð½¥Øø((ì¼¨
±¥¹Ð1¥ÍÐ¨½ô(ñ¥ØÍÑå±õíì¥ÍÁ±äè±à°±á¥ÉÑ¥½¸è½±Õµ¸°ÀèáÁàõôø(í¥±ÑÉ
±¥¹ÑÌ¹µÀ ¡±¥¹Ð¤ôø (ñ¥Ø(­äõí±¥¹Ð¹¥ô(½¹
±¥¬õì ¤ôøÍÑM±Ñ
±¥¹Ð¡±¥¹Ð¥ô(ÍÑå±õíì(­É½Õ¹
½±½ÈèÍ±Ñ
±¥¹Ðü¹¥ôôô±¥¹Ð¹¥üÉèÙÈ ´µ½±½Èµ­É½Õ¹µÍ½¹Éä¤°(½ÉÈèÍ±Ñ
±¥¹Ðü¹¥ôôô±¥¹Ð¹¥üÉÁàÍ½±¥ØÌØÙÄèÅÁàÍ½±¥ÙÈ ´µ½±½Èµ½ÉÈµÑÉÑ¥Éä¤°(½ÉÉI¥ÕÌèáÁà°(Á¥¹èÄÙÁà°(ÕÉÍ½ÈèÁ½¥¹ÑÈ°(ÑÉ¹Í¥Ñ¥½¸è±°À¸ÉÌÍ(õô(ø(ñ¥ØÍÑå±õíì½¹Ñ]¥¡ÐèÔÀÀ°½±½ÈèÙÈ µ½±½ÈµÑáÐµÁÉ¥µÉä¤õôø(í±¥¹Ð¹¹µô(ð½¥Øø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÉÁà°½±½ÈèÙÈ µ½±½ÈµÑáÐµÑÉÑ¥Éä¤°µÉ¥¹Q½ÀèÑÁàõôø(í±¥¹Ð¹ÁÉÑ¥ô(ð½¥Øø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÉÁà°½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÍ½¹Éä¤°µÉ¥¹Q½ÀèáÁàõôø(í±¥¹Ð¹ÍÍôÍí±¥¹Ð¹ÍÌôôÄüÌèôí±¥¹Ð¹µ¥±ô(ð½¥Øø(ñ¥ØÍÑå±õíì(µÉ¥¹Q½ÀèÄÉÁà°(Á¥¹èáÁà°(­É½Õ¹
½±½ÈèÙÈ ´µ½±½Èµ­É½Õ¹µÁÉ¥µÉä¤°(½ÉÉI¥ÕÌèÙÁà°(½¹ÑM¥éèÄÉÁà°(½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÍ½¹Éä¤(õôø(í±¥¹Ð¹ÍÑÑÕÍô(ð½¥Øø(ð½¥Øø(¤¥ô(ð½¥Øø(ð½¥Øø((ì¼¨
±¥¹ÐÑ¥°¨½ô(ìÍ±Ñ
±¥¹Ð (ñ¥ØÍÑå±õíì(­É½Õ¹
½±½ÈèÙÈ µ½±½Èµ­É½Õ¹µÍ½¹Éä¤°(½ÉÈèÅÁàÍ½±¥ÙÈ ´µ½±½Èµ½ÉÈµÑÉÑ¥Éä¤°(½ÉÉI¥ÕÌèÄÉÁà°(Á¥¹èÈÑÁà°(¥ÍÁ±äè±à°(±á¥ÉÑ¥½¸è½±Õµ¸(õôø(ñ¥ØÍÑå±õíì¥ÍÁ±äè±à°©ÕÍÑ¥å
½¹Ñ¹ÐèÍÁµÑÝ¸°±¥¹%ÑµÌè±àµÍÑÉÐ°µÉ¥¹	½ÑÑ½´èÈÑÁàõôø(ñ¥Øø(ñ ÈÍÑå±õíì½¹ÑM¥éèÈÑÁà°½¹Ñ]¥¡Ðè½±°½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÁÉ¥µÉä¤õôø(íÍ±Ñ
±¥¹Ð¹¹µô(ð½ Èø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÑÁà°½±½ÈèÙÈ µ½±½ÈµÑáÐµÍ½¹Éä¤°µÉ¥¹Q½ÀèáÁàõôø(íÍ±Ñ
±¥¹Ð¹ÁÉÑ¥ô(ð½¥Øø(ð½¥Øø(ñÕÑÑ½¸(½¹
±¥¬õì ¤ôøÍÑM±Ñ
±¥¹Ð¡¹Õ±°¥ô(ÍÑå±õíì(­É½Õ¹è¹½¹°(½ÉÈè¹½¹°(ÕÉÍ½ÈèÁ½¥¹ÑÈ°(½±½ÈèÙÈ µ½±½ÈµÑáÐµÍ½¹Éä¤°(Ý¥Ñ èÈÑÁà°(¡¥¡ÐèÈÑÁà(õô(ø(ña%½¸¼ø(ð½ÕÑÑ½¸ø(ð½¥Øø((ñ¥ØÍÑå±õíì¥ÍÁ±äè±à°±á¥ÉÑ¥½¸è½±Õµ¸°ÀèÄÙÁàõôø(ñ¥Øø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÉÁà°½±½ÈèÙÈ µ½±½ÈµÑáÐµÑÉÑ¥Éä¤°µÉ¥¹	½ÑÑ½´èÑÁàõôø(µ¥°(ð½¥Øø(ñ¥ØÍÑå±õíì½±½ÈèÙÈ µ½±½ÈµÑáÐµÁÉ¥µÉä¤õôø(íÍ±Ñ
±¥¹Ð¹µ¥±ô(ð½¥Øø(ð½¥Øø((ñ¥Øø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÉÁà°½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÑÉÑ¥Éä¤°µÉ¥¹	½ÑÑ½´èÑÁàõôø(A¡½¹(ð½¥Øø(ñ¥ØÍÑå±õíì½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÁÉ¥µÉä¤õôø(íÍ±Ñ
±¥¹Ð¹Á¡½¹ô(ð½¥Øø(ð½¥Øø((ñ¥Øø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÉÁà°½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÑÉÑ¥Éä¤°µÉ¥¹	½ÑÑ½´èÑÁàõôø(MÑÑÕÌ(ð½¥Øø(ñ¥ØÍÑå±õíì(¥ÍÁ±äè¥¹±¥¹µ±½¬°(Á¥¹èÙÁàÄÉÁà°(­É½Õ¹
½±½ÈèÍ±Ñ
±¥¹Ð¹ÍÑÑÕÌôôôÑ¥ÙüÔèÍ±Ñ
±¥¹Ð¹ÍÑÑÕÌôôôA¹¥¹üèÍÑØ°(½±½ÈèÍ±Ñ
±¥¹Ð¹ÍÑÑÕÌôôôÑ¥ÙüÀØÕÐØèÍ±Ñ
±¥¹Ð¹ÍÑÑÕÌôôôA¹¥¹üäÈÐÀÁèÌÜÐÄÔÄ°(½ÉÉI¥ÕÌèÙÁà°(½¹ÑM¥éèÄÉÁà°(½¹Ñ]¥¡ÐèÔÀÀ(õôø(íÍ±Ñ
±¥¹Ð¹ÍÑÑÕÍô(ð½¥Øø(ð½¥Øø((ñ¥Øø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÉÁà°½±½ÈèÙÈ µ½±½ÈµÑáÐµÑÉÑ¥Éä¤°µÉ¥¹	½ÑÑ½´èÑÁàõôø(
ÍÌ(ð½¥Øø(ñ¥ØÍÑå±õíì½±½ÈèÙÈ µ½±½ÈµÑáÐµÁÉ¥µÉä¤õôø(íÍ±Ñ
±¥¹Ð¹ÍÍô(ð½¥Øø(ð½¥Øø((ñ¥Øø(ñ¥ØÍÑå±õíì½¹ÑM¥éèÄÉÁà°½±½ÈèÙÈ ´µ½±½ÈµÑáÐµÑÉÑ¥Éä¤°µÉ¥¹	½ÑÑ½´èáÁàõôø(9½ÑÌ(ð½¥Øø(ñ¥ØÍÑå±õíì(­É½Õ¹
½±½ÈèÙÈ ´µ½±½Èµ­É½Õ¹µÁÉ¥µÉä¤°(Á¥¹èÄÉÁà°(½ÉÉI¥ÕÌèáÁà°(½±½ÈèÙÈ µ½±½ÈµÑáÐµÁÉ¥µÉä¤°(½¹ÑM¥éèÄÑÁà°(±¥¹!¥¡ÐèÄ¸Ô(õôø(íÍ±Ñ
±¥¹Ð¹¹½ÑÍô(ð½¥Øø(ð½¥Øø(ð½¥Øø((ñ¥ØÍÑå±õíì¥ÍÁ±äè±à°ÀèÄÉÁà°µÉ¥¹Q½ÀèÈÑÁà°Á¥¹Q½ÀèÈÑÁà°½ÉÉQ½ÀèÅÁàÍ½±¥ÙÈ µ½±½Èµ½ÉÈµÑÉÑ¥Éä¤õôø(ñÕÑÑ½¸ÍÑå±õíì(±àèÄ°(Á¥¹èÄÁÁàÄÙÁà°(­É½Õ¹
½±½ÈèØÌØÙÄ°(½±½ÈèÝ¡¥Ñ°(½ÉÈè¹½¹°(½ÉÉI¥ÕÌèáÁà°(ÕÉÍ½ÈèÁ½¥¹ÑÈ°(¥ÍÁ±äè±à°(±¥¹%ÑµÌè¹ÑÈ°(©ÕÍÑ¥å
½¹Ñ¹Ðè¹ÑÈ°(ÀèáÁà°(½¹ÑM¥éèÄÑÁà°(½¹Ñ]¥¡ÐèÔÀÀ(õôø(ñ¥ØÍÑå±õíìÝ¥Ñ èÄáÁà°¡¥¡ÐèÄáÁàõôø(ñ¥Ñ%½¸¼ø(ð½¥Øø(¥Ð(ð½ÕÑÑ½¸ø(ñÕÑÑ½¸ÍÑå±õíì(±àèÄ°(Á¥¹èÄÁÁàÄÙÁà°(­É½Õ¹
½±½ÈèÑÉ¹ÍÁÉ¹Ð°(½±½ÈèÐÐÐÐ°(½ÉÈèÅÁàÍ½±¥ÐÐÐÐ°(½ÉÉI¥ÕÌèáÁà°(ÕÉÍ½ÈèÁ½¥¹ÑÈ°(¥ÍÁ±äè±à°(±¥¹%ÑµÌè¹ÑÈ°(©ÕÍÑ¥å
½¹Ñ¹Ðè¹ÑÈ°(ÀèáÁà°(½¹ÑM¥éèÄÑÁà°(½¹Ñ]¥¡ÐèÔÀÀ(õôø(ñ¥ØÍÑå±õíìÝ¥Ñ èÄáÁà°¡¥¡ÐèÄáÁàõôø(ñQÉÍ¡%½¸¼ø(ð½¥Øø(±Ñ(ð½ÕÑÑ½¸ø(ð½¥Øø(ð½¥Øø(%ô(ð½¥Øø(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((¢°§Ð
