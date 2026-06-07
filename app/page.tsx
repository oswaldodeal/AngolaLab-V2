// app/page.tsx
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

export default function HomePage() {

  // --------------------------
  // ALL DATA — HARDCODED, NO DATABASE
  // --------------------------
  const financial = [
    { id: 1, date: '2026-01-15', category: 'Transport', amount: 1250000, description: 'Fuel and vehicle maintenance' },
    { id: 2, date: '2026-02-03', category: 'Accommodation', amount: 3800000, description: 'Hotel and guest house expenses' },
    { id: 3, date: '2026-02-20', category: 'Food & Beverage', amount: 950000, description: 'Restaurant and catering supplies' },
    { id: 4, date: '2026-03-10', category: 'Marketing', amount: 2100000, description: 'Online ads and brochures' },
    { id: 5, date: '2026-04-05', category: 'Staff', amount: 4500000, description: 'Salaries and benefits' }
  ];

  const tourism = [
    { id: 1, year: 2023, location: 'Luanda', visitor_count: 145000, revenue: 285000000, season: 'High' },
    { id: 2, year: 2023, location: 'Benguela', visitor_count: 68000, revenue: 122000000, season: 'High' },
    { id: 3, year: 2023, location: 'Namibe', visitor_count: 42000, revenue: 89000000, season: 'Medium' },
    { id: 4, year: 2024, location: 'Luanda', visitor_count: 172000, revenue: 340000000, season: 'High' },
    { id: 5, year: 2024, location: 'Benguela', visitor_count: 79000, revenue: 148000000, season: 'High' },
    { id: 6, year: 2024, location: 'Namibe', visitor_count: 51000, revenue: 110000000, season: 'High' }
  ];

  const revenueByYear = [
    { year: 2023, total_revenue: 496000000 },
    { year: 2024, total_revenue: 598000000 }
  ];
  const visitorsByLoc = [
    { location: 'Luanda', total_visitors: 317000 },
    { location: 'Benguela', total_visitors: 147000 },
    { location: 'Namibe', total_visitors: 93000 }
  ];
  const financeBreakdown = [
    { category: 'Transport', total_amount: 1250000 },
    { category: 'Accommodation', total_amount: 3800000 },
    { category: 'Food & Beverage', total_amount: 950000 },
    { category: 'Marketing', total_amount: 2100000 },
    { category: 'Staff', total_amount: 4500000 }
  ];

  const knowledgeArticles = [
    {
      id: 1,
      title: "The Lobito Corridor: Gateway to Development",
      summary: "One of Africa’s most strategic logistics routes, connecting the Atlantic coast to the heart of the continent — driving trade, transport, and economic growth across Angola, DR Congo, and Zambia.",
      content: `
The Lobito Corridor is more than just a railway line — it is Angola’s economic backbone and a key piece of African infrastructure. 

Stretching from the port city of Lobito (Benguela) eastwards through Huambo, Bié, and Moxico, all the way to the border with the Democratic Republic of the Congo and beyond to Zambia, this corridor creates a direct link between the Atlantic Ocean and central Africa.

🔹 **TRANSPORT**: It moves minerals, agriculture, fuel, and goods faster and cheaper than roads.
🔹 **TRADING**: It turns Angola into a major hub for import/export across the region.
🔹 **TOURISM**: It opens up previously hard-to-reach provinces for visitors and investment.
🔹 **PROPERTY & ENVIRONMENT**: New towns, industrial zones, and sustainable projects are growing along its path.

For AngolaLab, the Lobito Corridor represents the physical connection between every sector we track — powered by **Knowledge** at the center.
      `
    },
    {
      id: 2,
      title: "Hold-Youth: Investing in the Future",
      summary: "A movement and strategy focused on empowering Angola’s greatest natural resource — its young population — through education, skills, entrepreneurship, and leadership.",
      content: `
With over 60% of Angola’s population under the age of 25, youth is not just a demographic — it is the country’s biggest opportunity.

**Hold-Youth** is the idea that development cannot happen without the active participation, training, and inclusion of young people in every sector of the economy.

🔹 **KNOWLEDGE**: Education and technical training are the foundation.
🔹 **TOURISM**: Young guides, managers, and innovators shape the visitor experience.
🔹 **TRANSPORT & TRADING**: New generations bring digital skills and modern logistics.
🔹 **PROPERTY**: Youth-led construction, architecture, and urban planning.
🔹 **ENVIRONMENT**: Young leaders lead sustainability and conservation efforts.

At AngolaLab, we believe: *When we hold and lift up the youth, we hold and lift up the entire nation.* Knowledge is the tool that makes this possible.
      `
    }
  ];

  // --------------------------
  // CHART OPTIONS
  // --------------------------
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
      title: { display: true, text: 'Tourism Revenue Growth', font: { size: 16, weight: 'bold' }, padding: { top: 10, bottom: 20 } },
      tooltip: { callbacks: { label: (ctx) => new Intl.NumberFormat('en-AO', { style: 'currency', currency: 'AOA' }).format(ctx.raw) } }
    },
    scales: { y: { beginAtZero: true, ticks: { callback: (v) => v.toLocaleString() } } }
  };

  const doughnutData = {
    labels: visitorsByLoc.map((row) => row.location),
    datasets: [
      { label: 'Visitors', data: visitorsByLoc.map((row) => row.total_visitors), backgroundColor: ['#1565c0', '#2e7d32', '#f57c00'], borderWidth: 0, hoverOffset: 8 }
    ]
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 13 }, padding: 15 } },
      title: { display: true, text: 'Visitors by Region', font: { size: 16, weight: 'bold' }, padding: { top: 10, bottom: 10 } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw.toLocaleString()} visitors` } }
    }
  };

  const pieData = {
    labels: financeBreakdown.map((row) => row.category),
    datasets: [
      { label: 'Expenses', data: financeBreakdown.map((row) => row.total_amount), backgroundColor: ['#1565c0', '#2e7d32', '#f57c00', '#7b1fa2', '#c62828'], borderWidth: 0, hoverOffset: 5 }
    ]
  };
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 10 } },
      title: { display: true, text: 'Expense Distribution', font: { size: 16, weight: 'bold' }, padding: { top: 10, bottom: 10 } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${new Intl.NumberFormat('en-AO', { style: 'currency', currency: 'AOA' }).format(ctx.raw)}` } }
    }
  };

  // --------------------------
  // PAGE RENDER
  // --------------------------
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#fcfcfc' }}>

      {/* NAVIGATION */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 999, background: '#1a237e', color: 'white', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>
          <a href="#knowledge" style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '6px', backgroundColor: '#303f9f' }}>🧠 KNOWLEDGE</a>
          <a href="#tourism" style={navLinkStyle}>🧳 TOURISM</a>
          <a href="#finance" style={navLinkStyle}>💰 FINANCE</a>
          <span style={{color: '#9fa8da', fontStyle: 'italic', fontSize: '0.9rem'}}>🚧 TRANSPORT</span>
          <span style={{color: '#9fa8da', fontStyle: 'italic', fontSize: '0.9rem'}}>🚧 TRADING</span>
          <span style={{color: '#9fa8da', fontStyle: 'italic', fontSize: '0.9rem'}}>🚧 PROPERTY</span>
          <span style={{color: '#9fa8da', fontStyle: 'italic', fontSize: '0.9rem'}}>🚧 ENVIRONMENT</span>
        </div>
      </nav>

      <div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', fontSize: '2.2rem', color: '#1a237e', marginBottom: '0.5rem'}}>AngolaLab</h1>
        <p style={{textAlign: 'center', fontSize: '1.1rem', color: '#555', marginBottom: '3rem'}}>Knowledge • Analytics • Development</p>

        {/* KNOWLEDGE */}
        <section id="knowledge" style={{marginBottom: '5rem', scrollMarginTop: '100px'}}>
          <h2 style={{textAlign: 'center', fontSize: '1.8rem', color: '#1a237e', borderBottom: '3px solid #1a237e', paddingBottom: '0.75rem', marginBottom: '2rem'}}>🧠 KNOWLEDGE — The Center of Everything</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem'}}>
            {knowledgeArticles.map(article => (
              <div key={article.id} style={{background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                <h3 style={{color: '#1a237e', marginTop: 0, fontSize: '1.3rem'}}>{article.title}</h3>
                <p style={{color: '#666', fontStyle: 'italic', marginBottom: '1rem'}}>{article.summary}</p>
                <div style={{color: '#333', lineHeight: '1.6', whiteSpace: 'pre-line', fontSize: '0.95rem'}}>{article.content}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CHARTS */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem', marginBottom: '5rem', padding: '2rem', background: '#fafafa', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <div style={{ height: '320px', position: 'relative' }}><Bar data={barData} options={barOptions} /></div>
          <div style={{ height: '320px', position: 'relative' }}><Doughnut data={doughnutData} options={doughnutOptions} /></div>
          <div style={{ height: '320px', position: 'relative' }}><Pie data={pieData} options={pieOptions} /></div>
        </div>

        {/* TOURISM */}
        <section id="tourism" style={{marginBottom: '5rem', scrollMarginTop: '100px'}}>
          <h2 style={{color: '#1565c0', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', fontSize: '1.6rem'}}>🧳 TOURISM RECORDS</h2>
          <div style={{overflowX: 'auto', borderRadius: '8px', border: '1px solid #eee', marginTop: '1rem'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead><tr style={{background: '#f5f5f5'}}>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Year</th>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Location</th>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Visitors</th>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Revenue (AOA)</th>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Season</th>
              </tr></thead>
              <tbody>
                {tourism.map(row => (
                  <tr key={row.id} style={{background: '#fff'}}>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.year}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.location}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.visitor_count.toLocaleString()}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd', fontWeight: '500'}}>{row.revenue.toLocaleString()}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.season}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FINANCE */}
        <section id="finance" style={{scrollMarginTop: '100px'}}>
          <h2 style={{color: '#2e7d32', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', fontSize: '1.6rem'}}>💰 FINANCIAL RECORDS</h2>
          <div style={{overflowX: 'auto', borderRadius: '8px', border: '1px solid #eee', marginTop: '1rem'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead><tr style={{background: '#f5f5f5'}}>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Date</th>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Category</th>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Amount (AOA)</th>
                <th style={{padding: '0.85rem', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600'}}>Description</th>
              </tr></thead>
              <tbody>
                {financial.map(row => (
                  <tr key={row.id} style={{background: '#fff'}}>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.date}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.category}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd', fontWeight: '500'}}>{row.amount.toLocaleString()}</td>
                    <td style={{padding: '0.85rem', border: '1px solid #ddd'}}>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SYSTEM THINKING FOOTER */}
        <section style={{marginTop: '6rem', padding: '2rem', background: '#f0f4ff', border: '1px solid #d1d9ff', borderRadius: '12px', textAlign: 'center'}}>
          <h3 style={{color: '#1a237e', fontSize: '1.4rem', marginBottom: '1rem'}}>💡 Built on System Thinking</h3>
          <p style={{fontSize: '1rem', color: '#333', lineHeight: '1.7', maxWidth: '900px', margin: '0 auto 1.5rem auto'}}>
            <strong>“The hardest part is not the technical part — it is System Thinking.”</strong><br/>
            This entire platform was built from one clear vision: <strong>KNOWLEDGE at the center, connecting every sector.</strong><br/>
            Technical skills are just tools — but understanding how parts connect, influence, and build upon each other is what creates real, powerful systems.
          </p>
          <pre style={{fontFamily: 'monospace', fontSize: '0.9rem', color: '#1a237e', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #c5cae9', overflowX: 'auto', lineHeight: '1.5'}}>
                                                           KNOWLEDGE
                                                                 |
                         ----------------------------------------+----------------------------------------
                         |                 |                   |                   |                   |
                   TRADING           TOURISM            PROPERTY           TRANSPORT           FINANCE
                         |                 |                   |                   |                   |
                         +-----------------+-------------------+-------------------+-------------------+
                                                                 |
                                                           ENVIRONMENT
          </pre>
          <p style={{fontSize: '0.9rem', color: '#555', marginTop: '1.5rem', fontStyle: 'italic'}}>✅ AngolaLab — From Idea to Reality • Knowledge is Gold</p>
        </section>

      </div>
    </div>
  );
}

const navLinkStyle = {
  color: '#e8eaf6',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  transition: 'background 0.2s',
  fontSize: '1rem'
};