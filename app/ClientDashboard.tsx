// app/ClientDashboard.tsx
'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

type DataRow = { [key: string]: any };

type Props = {
  financial: DataRow[];
  tourism: DataRow[];
  revenueByYear: DataRow[];
  visitorsByLoc: DataRow[];
  financeBreakdown: DataRow[];
};

export default function ClientDashboard({
  financial,
  tourism,
  revenueByYear,
  visitorsByLoc,
  financeBreakdown
}: Props) {

  // --- 📊 CHART DATA ---
  const barData = {
    labels: revenueByYear.map((row) => row.year),
    datasets: [
      {
        label: 'Total Revenue (AOA)',
        data: revenueByYear.map((row) => row.total_revenue),
        backgroundColor: ['#1565c0', '#2e7d32'],
        borderRadius: 8,
        barThickness: 60,
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Tourism Revenue Growth',
        font: { size: 16, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return new Intl.NumberFormat('en-AO', { style: 'currency', currency: 'AOA' }).format(context.raw);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v:any) => v.toLocaleString() }
      }
    }
  };

  const doughnutData = {
    labels: visitorsByLoc.map((row) => row.location),
    datasets: [
      {
        label: 'Visitors',
        data: visitorsByLoc.map((row) => row.total_visitors),
        backgroundColor: ['#1565c0', '#2e7d32', '#f57c00'],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom' as const, labels: { font: { size: 13 }, padding: 15 } },
      title: { display: true, text: 'Visitors by Region', font: { size: 16, weight: 'bold' }, padding: { top: 10, bottom: 10 } },
      tooltip: { callbacks: { label: (c:any) => `${c.label}: ${c.raw.toLocaleString()} visitors` } }
    }
  };

  const pieData = {
    labels: financeBreakdown.map((row) => row.category),
    datasets: [
      {
        label: 'Expenses',
        data: financeBreakdown.map((row) => row.total_amount),
        backgroundColor: ['#1565c0', '#2e7d32', '#f57c00', '#7b1fa2', '#c62828'],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom' as const, labels: { font: { size: 12 }, padding: 10 } },
      title: { display: true, text: 'Expense Distribution', font: { size: 16, weight: 'bold' }, padding: { top: 10, bottom: 10 } },
      tooltip: { callbacks: { label: (c:any) => `${c.label}: ${new Intl.NumberFormat('en-AO', { style: 'currency', currency: 'AOA' }).format(c.raw)}` } }
    }
  };

  return (
    <>
      {/* 📊 CHARTS SECTION */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '2rem',
        marginBottom: '5rem',
        padding: '2rem',
        background: '#fafafa',
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        <div style={{ height: '320px', position: 'relative' }}>
          <Bar data={barData} options={barOptions} />
        </div>
        <div style={{ height: '320px', position: 'relative' }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        <div style={{ height: '320px', position: 'relative' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>


      {/* 🧳 TOURISM SECTION — ANCHOR LINK */}
      <section id="tourism" style={{marginBottom: '5rem', scrollMarginTop: '100px'}}>
        <h2 style={{color: '#1565c0', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', fontSize: '1.6rem'}}>
          🧳 TOURISM RECORDS
        </h2>
        {tourism.length === 0 ? (
          <p style={{color: '#666', fontStyle: 'italic'}}>No tourism data yet</p>
        ) : (
          <div style={{overflowX: 'auto', borderRadius: '8px', border: '1px solid #eee', marginTop: '1rem'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{background: '#f5f5f5'}}>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Year</th>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Location</th>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Visitors</th>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Revenue (AOA)</th>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Season</th>
                </tr>
              </thead>
              <tbody>
                {tourism.map((row) => (
                  <tr key={row.id} style={{background: '#fff', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseOut={(e) => e.currentTarget.style.background = '#fff'}>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.year}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.location}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.visitor_count.toLocaleString()}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd', fontWeight: '500'}}>{row.revenue?.toLocaleString() ?? '-'}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.season}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>


      {/* 💰 FINANCE SECTION — ANCHOR LINK */}
      <section id="finance" style={{scrollMarginTop: '100px'}}>
        <h2 style={{color: '#2e7d32', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', fontSize: '1.6rem'}}>
          💰 FINANCIAL RECORDS
        </h2>
        {financial.length === 0 ? (
          <p style={{color: '#666', fontStyle: 'italic'}}>No financial data yet</p>
        ) : (
          <div style={{overflowX: 'auto', borderRadius: '8px', border: '1px solid #eee', marginTop: '1rem'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{background: '#f5f5f5'}}>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Date</th>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Category</th>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Amount (AOA)</th>
                  <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Description</th>
                </tr>
              </thead>
              <tbody>
                {financial.map((row) => (
                  <tr key={row.id} style={{background: '#fff', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseOut={(e) => e.currentTarget.style.background = '#fff'}>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.date}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.category}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd', fontWeight: '500'}}>{row.amount.toLocaleString()}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}