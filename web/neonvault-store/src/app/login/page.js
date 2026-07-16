'use client';
import { useState } from 'react';
import Link from 'next/link';
import { IconMail, IconArrowRight, IconZap } from '@/components/Icons';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSent(true);
    }
  };

  return (
    <div className={styles.page}>
      {/* Background Effects */}
      <div className={styles.bgEffects}>
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
      </div>

      <div className={styles.formContainer}>
        <div className={styles.card}>
          {!sent ? (
            <>
              <div className={styles.header}>
                <div className={styles.logoMark}><IconZap size={28} /></div>
                <h1 className={styles.title}>Welcome to the <span className={styles.gradient}>Vault</span></h1>
                <p className={styles.desc}>Enter your email to sign in or create an account. No passwords needed.</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className="input-label" htmlFor="login-email">Email Address</label>
                  <div className={styles.inputWrap}>
                    <IconMail size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    <input
                      type="email"
                      id="login-email"
                      className={styles.input}
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <button type="submit" className={`btn btn-primary btn-lg ${styles.submitBtn}`} id="login-submit">
                  Continue with Email <IconArrowRight size={18} />
                </button>
              </form>

              <div className={styles.dividerRow}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or</span>
                <span className={styles.dividerLine} />
              </div>

              <button className={`btn btn-secondary btn-lg ${styles.googleBtn}`} id="google-login-btn">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <p className={styles.terms}>
                By continuing, you agree to our{' '}
                <Link href="/policies/terms">Terms</Link> and{' '}
                <Link href="/policies/privacy">Privacy Policy</Link>.
              </p>
            </>
          ) : (
            <div className={styles.sentState}>
              <div className={styles.sentIcon}>✉️</div>
              <h2 className={styles.sentTitle}>Check Your Email</h2>
              <p className={styles.sentDesc}>
                We sent a magic link to <strong>{email}</strong>. Click the link in the email to sign in.
              </p>
              <p className={styles.sentNote}>Didn&apos;t receive it? Check your spam folder or <button onClick={() => setSent(false)} className={styles.retryLink}>try again</button>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
