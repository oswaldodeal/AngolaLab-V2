// app/page.tsx
import { runQuery, runExecute } from './lib/db';
import ClientDashboard from './ClientDashboard';

// ✅ SERVER COMPONENT
export default async function HomePage() {
  // 1. Create tables if they don't exist
  await runExecute(`
    CREATE TABLE IF NOT EXISTS financial (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      category TEXT,
      amount REAL,
      description TEXT
    )
  `);

  await runExecute(`
    CREATE TABLE IF NOT EXISTS tourism (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      location TEXT,
      visitor_count INTEGER,
      revenue REAL,
      season TEXT
    )
  `);

  // 2. Add sample data — ONLY IF EMPTY
  const financialCount = await runQuery(`SELECT COUNT(*) as count FROM financial`);
  if (financialCount[0].count === 0) {
    await runExecute(`
      INSERT INTO financial (date, category, amount, description) VALUES
      ('2026-01-15', 'Transport', 1250000, 'Fuel and vehicle maintenance'),
      ('2026-02-03', 'Accommodation', 3800000, 'Hotel and guest house expenses'),
      ('2026-02-20', 'Food & Beverage', 950000, 'Restaurant and catering supplies'),
      ('2026-03-10', 'Marketing', 2100000, 'Online ads and brochures'),
      ('2026-04-05', 'Staff', 4500000, 'Salaries and benefits')
    `);
  }

  const tourismCount = await runQuery(`SELECT COUNT(*) as count FROM tourism`);
  if (tourismCount[0].count === 0) {
    await runExecute(`
      INSERT INTO tourism (year, location, visitor_count, revenue, season) VALUES
      (2023, 'Luanda', 145000, 285000000, 'High'),
      (2023, 'Benguela', 68000, 122000000, 'High'),
      (2023, 'Namibe', 42000, 89000000, 'Medium'),
      (2024, 'Luanda', 172000, 340000000, 'High'),
      (2024, 'Benguela', 79000, 148000000, 'High'),
      (2024, 'Namibe', 51000, 110000000, 'High')
    `);
  }

  // 3. Fetch data
  const financial = await runQuery(`SELECT * FROM financial ORDER BY date DESC`);
  const tourism = await runQuery(`SELECT * FROM tourism ORDER BY year DESC, location ASC`);
  
  const revenueByYear = await runQuery(`
    SELECT year, SUM(revenue) as total_revenue FROM tourism GROUP BY year ORDER BY year
  `);
  const visitorsByLoc = await runQuery(`
    SELECT location, SUM(visitor_count) as total_visitors FROM tourism GROUP BY location
  `);
  const financeBreakdown = await runQuery(`
    SELECT category, SUM(amount) as total_amount FROM financial GROUP BY category
  `);

  // 4. KNOWLEDGE ARTICLES
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

  // 5. PASS EVERYTHING
  return (
    <div style={{ 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fcfcfc'
    }}>

      {/* ✅ STICKY NAVIGATION MENU */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: '#1a237e',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <a href="#knowledge" style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            backgroundColor: '#303f9f'
          }}>🧠 KNOWLEDGE</a>
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
        <p style={{textAlign: 'center', fontSize: '1.1rem', color: '#555', marginBottom: '3rem'}}>
          Knowledge • Analytics • Development
        </p>


        {/* ✅ KNOWLEDGE SECTION */}
        <section id="knowledge" style={{marginBottom: '5rem', scrollMarginTop: '100px'}}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            color: '#1a237e',
            borderBottom: '3px solid #1a237e',
            paddingBottom: '0.75rem',
            marginBottom: '2rem'
          }}>
            🧠 KNOWLEDGE — The Center of Everything
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem'
          }}>
            {knowledgeArticles.map(article => (
              <div 
                key={article.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <h3 style={{color: '#1a237e', marginTop: 0, fontSize: '1.3rem'}}>
                  {article.title}
                </h3>
                <p style={{color: '#666', fontStyle: 'italic', marginBottom: '1rem'}}>
                  {article.summary}
                </p>
                <div style={{
                  color: '#333',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-line',
                  fontSize: '0.95rem'
                }}>
                  {article.content}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ✅ CLIENT DASHBOARD — CHARTS + TABLES */}
        <ClientDashboard 
          financial={financial}
          tourism={tourism}
          revenueByYear={revenueByYear}
          visitorsByLoc={visitorsByLoc}
          financeBreakdown={financeBreakdown}
        />


        {/* ✅ YOUR SYSTEM THINKING NOTE — NEW PERMANENT SECTION */}
        <section style={{
          marginTop: '6rem',
          padding: '2rem',
          background: '#f0f4ff',
          border: '1px solid #d1d9ff',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{color: '#1a237e', fontSize: '1.4rem', marginBottom: '1rem'}}>
            💡 Built on System Thinking
          </h3>
          <p style={{fontSize: '1rem', color: '#333', lineHeight: '1.7', maxWidth: '900px', margin: '0 auto 1.5rem auto'}}>
            <strong>“The hardest part is not the technical part — it is System Thinking.”</strong><br/>
            This entire platform was built from one clear vision: <strong>KNOWLEDGE at the center, connecting every sector.</strong><br/>
            Technical skills are just tools — but understanding how parts connect, influence, and build upon each other is what creates real, powerful systems.
          </p>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: '#1a237e',
            background: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #c5cae9',
            overflowX: 'auto',
            lineHeight: '1.5'
          }}>
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
          <p style={{fontSize: '0.9rem', color: '#555', marginTop: '1.5rem', fontStyle: 'italic'}}>
            ✅ AngolaLab — From Idea to Reality • Knowledge is Gold
          </p>
        </section>

      </div>
    </div>
  );
}

// ✅ Reusable nav link style
const navLinkStyle = {
  color: '#e8eaf6',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  transition: 'background 0.2s',
  fontSize: '1rem'
};