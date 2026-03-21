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
    name: 'Maria Gonzale{(¬
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
    priority: 'High',(ÕÑèÈÀÈØ´ÀÌ-20',
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
(×XÑ ô4ÄÜÈÅØ´ÉÐÐÀÀÀ´Ð´Ñ ÕÐÐÀÀÀ´ÐÑØÈ¼ø(ñ¥É±àôääôÜÈôÐ¼ø(ñÁÑ ô4ÈÌÈÅØ´ÉÐÐÀÀÀ´Ì´Ì¸àÜ¼ø(ñÁÑ ô4ÄØÌ¸ÄÍÐÐÀÀÄÀÜ¸ÜÔ¼ø(ð½ÍÙø(¤ì()½¹ÍÐ
±¹É%½¸ô ¤ôø (ñÍÙÙ¥Ý	½àôÀÀÈÐÈÐ¥±°ô¹½¹ÍÑÉ½­ôÕÉÉ¹Ñ
½±½ÈÍÑÉ½­]¥Ñ ôÈÍÑÉ½­1¥¹ÀôÉ½Õ¹ÍÑÉ½­1¥¹©½¥¸ôÉ½Õ¹ø(ñÉÐàôÌäôÐÝ¥Ñ ôÄà¡¥¡ÐôÄàÉàôÈÉäôÈ¼ø(ñ±¥¹àÄôÄØäÄôÈàÈôÄØäÈôØ¼ø(ñ±¥¹àÄôàäÄôÈàÈôàäÈôØ¼ø(ñ±¥¹àÄôÌäÄôÄÀàÈôÈÄäÈôÄÀ¼ø(ð½ÍÙø(¤ì()½¹ÍÐ
¡­½á%½¸ô ¤ôø (ñÍÙÙ¥Ý	½àôÀÀÈÐÈÐ¥±°ô¹½¹ÍÑÉ½­ôÕÉÉ¹Ñ
½±½ÈÍÑÉ½­]¥Ñ ôÈÍÑÉ½­1¥¹ÀôÉ½Õ¹ÍÑÉ½­1¥¹©½¥¸ôÉ½Õ¹ø(ñÁ½±å±¥¹Á½¥¹ÑÌôäÄÄÄÈÄÐÈÈÐ¼ø(ñÁÑ ô4ÈÄÄÉääÀÄÄ´ÄàÀääÀÀÄÄàÁè¼ø((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((¢ cÂ÷7fsà¢° ¦6öç7B6D6öâÒÓâ¢Ç7frfWt&÷Ò##B#B"fÆÃÒ&æöæR"7G&ö¶SÒ&7W'&VçD6öÆ÷""7G&ö¶UvGFÒ#""7G&ö¶TÆæV6Ò'&÷VæB"7G&ö¶TÆæV¦öãÒ'&÷VæB#à¢ÇFCÒ$Ó#V""Ó"$vÂÓBEcV"""Ó&F"""'¢"óà¢Â÷7fsà¢° ¦6öç7BvV$6öâÒÓâ¢Ç7frfWt&÷Ò##B#B"fÆÃÒ&æöæR"7G&ö¶SÒ&7W'&VçD6öÆ÷""7G&ö¶UvGFÒ#""7G&ö¶TÆæV6Ò'&÷VæB"7G&ö¶TÆæV¦öãÒ'&÷VæB#à¢Æ6&6ÆR7Ò#""7Ò#""#Ò#2"óà¢ÇFCÒ$Ó"cfÓgcdÓBã#"Bã#&ÃBã#BBã#FÓRãÂÓBã#BBã#DÓ&fÓbdÓBã#"ãsÃBã#BÓBã#FÓRãÃBã#BBã#DÓãsãsÂÓBã#BÓBã#FÓÓRãÃBã#BÓBã#DÓ#2&ÓfÒÓbR"óà¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ ¢ÜÝÏNÜHÝ[ÝÚÙS[ZÚ[HÝ[Û[[HÚ[ÏH
HMÈ
Ï  </svg>
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 20.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
/>
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
/>
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 9.5-12. 1.ToDo&& t.status !== 'Completed').slice(0, 3).map((task) => (
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
                    {task.client} â Due {task.dueDate}
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢  
  
 ¢ ¦¤Æ ¥Ïsvg>
 );*


const MessagesPage: React.FC = () => { // Now including join in file
  return (<div>Page for messages</div>)
};

// Component: Settings
const SettingsPage: React.FC = () => {
  return (<div>Page for settings</div>)
};
	/oSUEnp  padding: '10px 16px',
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
