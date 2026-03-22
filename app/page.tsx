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
  }
];

const MESSAGE_TEMPLATES = [
  { id: '1', name: 'Appointment Reminder', category: 'Scheduling' },
  { id: '2', name: 'Case Update', category: 'Status' }
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
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);Maria Gonzalez',
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

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m0 5.08l-4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m5.08 0l4.24 4.24" />
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

const CheckboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
);"12" y2="19" />
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
);const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
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
    <path d="m22 7-10 5L2 7" />
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
);// Component: SettingsPage
const SettingsPage: React.FC = () => {
  const [firmName, setFirmName] = React.useState('Mitchell & Associates');
  const [firmEmail, setFirmEmail] = React.useState('info@mitchelllaw.com');
  const [firmPhone, setFirmPhone] = React.useState('(920) 555-0100');
  const [firmAddress, setFirmAddress] = React.useState('123 Main St, Oshkosh, WI 54901');
  const [firmWebsite, setFirmWebsite] = React.useState('mitchelllaw.com');
  const [notifyAppointments, setNotifyAppointments] = React.useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = React.useState(true);
  const [notifyMessages, setNotifyMessages] = React.useState(false);
  const [automationEnabled, setAutomationEnabled] = React.useState(true);
  const [remindersEnabled, setRemindersEnabled] = React.useState(true);
  const [showComposeModal, setShowComposeModal] = React.useState(false);

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

      {/* Notification Preferences */}
      <div style={{
        backgroundColor: 'var(--color-background-secondary)',
        border: '1px solid var(--color-border-tertiary)',
        borderRadius: '12px',
        padding: '24px',
        marginTop: '24px'
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

          <div style={{ borderTop: '1px solid var(--color-border-tertiary)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Email Automation
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Auto-send confirmation emails
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
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function LegalFlowApp() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('dashboard');

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
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Top Bar */}
        <div style={{
          backgroundColor: 'var(--color-background-secondary)',
          borderBottom: '1px solid var(--color-border-tertiary)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              color: 'var(--color-text-secondary)'
            }}
          >
            {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px'
        }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
