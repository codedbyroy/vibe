'use client';
import { useState } from 'react';
import { IconUser, IconMapPin, IconPlus, IconTrash, IconCheck, IconMail } from '@/components/Icons';
import styles from './page.module.css';

const mockAddresses = [
  { id: '1', label: 'Home', fullName: 'Ankush Roy', phone: '+91 98765 43210', addressLine1: '42, Sector 15', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301', isDefault: true },
  { id: '2', label: 'Office', fullName: 'Ankush Roy', phone: '+91 98765 43210', addressLine1: '12th Floor, Tower B', city: 'Gurugram', state: 'Haryana', pincode: '122001', isDefault: false },
];

export default function AccountPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const removeAddress = (id) => setAddresses(addresses.filter(a => a.id !== id));
  const setDefault = (id) => setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>My Account</h1>

        {/* Tabs */}
        <div className={styles.tabs} id="account-tabs">
          {[{ key: 'profile', label: 'Profile', icon: <IconUser size={16} /> }, { key: 'addresses', label: 'Addresses', icon: <IconMapPin size={16} /> }].map(tab => (
            <button key={tab.key} className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`} onClick={() => setActiveTab(tab.key)}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className={styles.section}>
            <div className={styles.profileCard}>
              <div className={styles.avatar}>
                <IconUser size={32} />
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.profileField}>
                  <label className="input-label">Display Name</label>
                  <input type="text" className="input-field" defaultValue="Ankush Roy" id="profile-name" />
                </div>
                <div className={styles.profileField}>
                  <label className="input-label">Email</label>
                  <input type="email" className="input-field" defaultValue="ankush@example.com" disabled id="profile-email" />
                </div>
                <div className={styles.profileField}>
                  <label className="input-label">Phone</label>
                  <input type="tel" className="input-field" defaultValue="+91 98765 43210" id="profile-phone" />
                </div>
                <div className={styles.profileField}>
                  <label className="input-label">Unique ID</label>
                  <div className={styles.uniqueId}>
                    <span>ANK-7X2K9</span>
                    <span className="badge badge-primary">Your ID</span>
                  </div>
                </div>
                <button className="btn btn-primary" id="save-profile-btn">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className={styles.section}>
            <div className={styles.addressHeader}>
              <h2 className={styles.sectionTitle}>
                Saved Addresses
                <span className={styles.addrCount}>{addresses.length}/5</span>
              </h2>
              {addresses.length < 5 && (
                <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(true)} id="add-address-btn">
                  <IconPlus size={14} /> Add Address
                </button>
              )}
            </div>

            {/* Address Limit Bar */}
            <div className={styles.limitBar}>
              <div className={styles.limitFill} style={{ width: `${(addresses.length / 5) * 100}%` }} />
            </div>

            <div className={styles.addressGrid}>
              {addresses.map((addr, i) => (
                <div key={addr.id} className={`${styles.addressCard} ${addr.isDefault ? styles.addressDefault : ''}`} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className={styles.addrTop}>
                    <span className={styles.addrLabel}>{addr.label}</span>
                    {addr.isDefault && <span className="badge badge-success"><IconCheck size={10} /> Default</span>}
                  </div>
                  <p className={styles.addrName}>{addr.fullName}</p>
                  <p className={styles.addrLine}>{addr.addressLine1}</p>
                  <p className={styles.addrLine}>{addr.city}, {addr.state} — {addr.pincode}</p>
                  <p className={styles.addrPhone}>{addr.phone}</p>
                  <div className={styles.addrActions}>
                    {!addr.isDefault && (
                      <button className={styles.addrBtn} onClick={() => setDefault(addr.id)}>Set Default</button>
                    )}
                    <button className={styles.addrBtnDanger} onClick={() => removeAddress(addr.id)}>
                      <IconTrash size={14} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Address Form */}
            {showAddForm && (
              <div className={styles.addForm}>
                <h3 className={styles.formTitle}>New Address</h3>
                <div className={styles.formGrid}>
                  <div><label className="input-label">Label</label><input className="input-field" placeholder="e.g. Home, Office" id="addr-label" /></div>
                  <div><label className="input-label">Full Name</label><input className="input-field" placeholder="Full name" id="addr-name" /></div>
                  <div><label className="input-label">Phone</label><input className="input-field" placeholder="+91" id="addr-phone" /></div>
                  <div style={{ gridColumn: '1 / -1' }}><label className="input-label">Address Line 1</label><input className="input-field" placeholder="Street, building" id="addr-line1" /></div>
                  <div><label className="input-label">City</label><input className="input-field" placeholder="City" id="addr-city" /></div>
                  <div><label className="input-label">State</label><input className="input-field" placeholder="State" id="addr-state" /></div>
                  <div><label className="input-label">Pincode</label><input className="input-field" placeholder="6 digits" id="addr-pincode" /></div>
                </div>
                <div className={styles.formActions}>
                  <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setShowAddForm(false)} id="save-address-btn">Save Address</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
