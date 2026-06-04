'use client';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>🇦🇴 AngolaLab</h1>
        <h2 className={styles.subtitle}>Professional Finance & Management System</h2>
        <p className={styles.tagline}>Built by Oswaldo — Powered by Nzinga Spirit 💪</p>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>📊 Financial Intelligence</h3>
            <p>Real-time analysis, forecasting & reporting</p>
          </div>
          <div className={styles.card}>
            <h3>⚙️ Management Tools</h3>
            <p>Operations, planning & strategic control</p>
          </div>
          <div className={styles.card}>
            <h3>🔭 Vision 2035</h3>
            <p>Education • Innovation • Research • AI • Systems Thinking</p>
          </div>
        </div>
      </div>
    </main>
  );
}