import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts';

// Data extracted from the document
const countryImpactData = [
  { country: 'Somalia', affected: 7500000, displaced: 185000, category: 'Critical' },
  { country: 'Kenya', affected: 2500000, displaced: 0, category: 'Severe' },
  { country: 'Ethiopia', affected: 1400000, displaced: 500000, category: 'Critical' },
  { country: 'South Sudan', affected: 1600000, displaced: 355000, category: 'Critical' },
  { country: 'DRC', affected: 650000, displaced: 4920000, category: 'Critical' },
  { country: 'Burundi', affected: 34000, displaced: 7305, category: 'High' },
  { country: 'Rwanda', affected: 50000, displaced: 5000, category: 'Moderate' },
  { country: 'Uganda', affected: 15000, displaced: 1500, category: 'Moderate' }
];

const disasterTypeData = [
  { type: 'Drought', count: 5, countries: ['Somalia', 'Kenya', 'Ethiopia', 'Burundi', 'Uganda'] },
  { type: 'Flooding', count: 8, countries: ['Uganda', 'Kenya', 'Ethiopia', 'South Sudan', 'Rwanda', 'Burundi', 'DRC'] },
  { type: 'Landslides', count: 4, countries: ['Uganda', 'Kenya', 'Rwanda', 'DRC'] },
  { type: 'Disease Outbreak', count: 6, countries: ['Ethiopia', 'South Sudan', 'Burundi', 'DRC', 'Kenya'] },
  { type: 'Conflict', count: 4, countries: ['Ethiopia', 'DRC', 'Sudan', 'South Sudan'] },
  { type: 'Food Insecurity', count: 5, countries: ['Somalia', 'Kenya', 'Ethiopia', 'Burundi', 'South Sudan'] }
];

const diseaseData = [
  { disease: 'Malaria', cases: 1400000, country: 'Ethiopia', severity: 'Outbreak' },
  { disease: 'Cholera', cases: 94549, country: 'South Sudan', severity: 'Epidemic' },
  { disease: 'Cholera', cases: 58000, country: 'DRC', severity: 'Epidemic' },
  { disease: 'Cholera', cases: 2968, country: 'Burundi', severity: 'Outbreak' },
  { disease: 'Ebola', cases: 64, country: 'DRC', severity: 'Contained' },
  { disease: 'Marburg', cases: 12, country: 'Ethiopia', severity: 'Active' }
];

const fatalitiesData = [
  { country: 'Rwanda', deaths: 297, cause: 'Floods/Landslides/Lightning' },
  { country: 'DRC (Ebola)', deaths: 45, cause: 'Ebola Outbreak' },
  { country: 'Kenya', deaths: 21, cause: 'Landslides' },
  { country: 'Uganda', deaths: 20, cause: 'Landslides' },
  { country: 'South Sudan', deaths: 1567, cause: 'Cholera' },
  { country: 'DRC (Cholera)', deaths: 1700, cause: 'Cholera' }
];

const southSudanFloodData = [
  { county: 'Twic East', affected: 102011, displaced: 24491 },
  { county: 'Panyijiar', affected: 82548, displaced: 37428 },
  { county: 'Bor South', affected: 76000, displaced: 0 },
  { county: 'Mayendit', affected: 58438, displaced: 6084 },
  { county: 'Ayod', affected: 57270, displaced: 44333 },
  { county: 'Fangak', affected: 37000, displaced: 1225 },
  { county: 'Pibor', affected: 33282, displaced: 0 },
  { county: 'Rubkona', affected: 31514, displaced: 0 },
  { county: 'Canal/Pigi', affected: 31182, displaced: 30182 }
];

const rainfallStatus = [
  { region: 'Somalia', rainfall: 30, normal: 100, status: 'Critical Deficit' },
  { region: 'Kenya ASAL', rainfall: 45, normal: 100, status: 'Severe Deficit' },
  { region: 'Ethiopia South', rainfall: 35, normal: 100, status: 'Critical Deficit' },
  { region: 'Uganda Teso', rainfall: 60, normal: 100, status: 'Below Normal' },
  { region: 'Karamoja', rainfall: 110, normal: 100, status: 'Above Normal' }
];

const timelineEvents = [
  { date: 'Oct 8', event: 'South Kivu Flash Floods', impact: 4200, type: 'flood' },
  { date: 'Oct 11', event: 'Afar Earthquake', impact: 1400, type: 'earthquake' },
  { date: 'Oct 27', event: 'Kenya Flash Flood', impact: 2, type: 'flood' },
  { date: 'Oct 30', event: 'Mt Elgon Landslides', impact: 20, type: 'landslide' },
  { date: 'Oct 31', event: 'Kenya Landslides', impact: 21, type: 'landslide' },
  { date: 'Nov 10', event: 'Somalia Drought Emergency', impact: 7500000, type: 'drought' },
  { date: 'Nov 13', event: 'Burundi Hailstorm', impact: 34000, type: 'storm' },
  { date: 'Dec 5', event: 'DRC Violence Escalation', impact: 200000, type: 'conflict' },
  { date: 'Dec 9', event: 'Boma Flooding', impact: 32000, type: 'flood' }
];

const COLORS = {
  critical: '#dc2626',
  severe: '#ea580c', 
  high: '#f59e0b',
  moderate: '#84cc16',
  drought: '#92400e',
  flood: '#0369a1',
  landslide: '#7c3aed',
  disease: '#be185d',
  conflict: '#1f2937',
  food: '#15803d'
};

const CHART_COLORS = ['#dc2626', '#ea580c', '#f59e0b', '#84cc16', '#0369a1', '#7c3aed', '#be185d', '#0891b2'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
      }}>
        <p style={{ color: '#f8fafc', fontWeight: 600, marginBottom: '4px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '14px' }}>
            {entry.name}: {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DisasterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'displacement', label: 'Displacement' },
    { id: 'health', label: 'Health Crises' },
    { id: 'southsudan', label: 'South Sudan Detail' }
  ];

  const totalAffected = countryImpactData.reduce((sum, d) => sum + d.affected, 0);
  const totalDisplaced = countryImpactData.reduce((sum, d) => sum + d.displaced, 0);
  const totalCholera = diseaseData.filter(d => d.disease === 'Cholera').reduce((sum, d) => sum + d.cases, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#f8fafc',
      padding: '24px'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '32px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(234, 88, 12, 0.1))',
        borderRadius: '16px',
        border: '1px solid rgba(220, 38, 38, 0.3)'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          background: 'rgba(220, 38, 38, 0.2)',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px',
          color: '#fca5a5',
          marginBottom: '12px'
        }}>
          HUMANITARIAN CRISIS MONITOR
        </div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #f8fafc, #cbd5e1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          Greater Horn of Africa Disaster Analysis
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>
          October – December 2025 | Multi-Hazard Impact Assessment
        </p>
      </header>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {[
          { label: 'Total Affected', value: totalAffected, color: '#dc2626', icon: '👥' },
          { label: 'Total Displaced', value: totalDisplaced, color: '#ea580c', icon: '🏃' },
          { label: 'Cholera Cases', value: totalCholera, color: '#7c3aed', icon: '🦠' },
          { label: 'Countries in Crisis', value: 8, color: '#0891b2', icon: '🌍' }
        ].map((metric, i) => (
          <div key={i} style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '12px',
            padding: '20px',
            border: `1px solid ${metric.color}33`,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{metric.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: metric.color }}>
              {metric.value.toLocaleString()}
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, #dc2626, #ea580c)' 
                : 'rgba(51, 65, 85, 0.5)',
              color: '#f8fafc',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gap: '24px' }}>
          {/* Country Impact Chart */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
              📊 People Affected by Country (Millions)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryImpactData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="country" stroke="#94a3b8" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="affected" fill="#dc2626" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Disaster Types */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
                ⚡ Disaster Types Distribution
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={disasterTypeData}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ type, count }) => `${type}: ${count}`}
                    labelLine={{ stroke: '#94a3b8' }}
                  >
                    {disasterTypeData.map((entry, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Rainfall Deficit */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
                🌧️ Rainfall vs Normal (%)
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={rainfallStatus}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="region" stroke="#94a3b8" fontSize={11} angle={-20} textAnchor="end" height={60} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="rainfall" fill="#0891b2" name="Actual %" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="normal" fill="#334155" name="Normal %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Timeline */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
              📅 Major Events Timeline (Oct-Dec 2025)
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {timelineEvents.map((event, i) => (
                <div key={i} style={{
                  background: 'rgba(51, 65, 85, 0.5)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  borderLeft: `4px solid ${
                    event.type === 'drought' ? COLORS.drought :
                    event.type === 'flood' ? COLORS.flood :
                    event.type === 'landslide' ? COLORS.landslide :
                    event.type === 'conflict' ? COLORS.conflict : '#94a3b8'
                  }`,
                  flex: '1 1 200px'
                }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{event.date}</div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{event.event}</div>
                  <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px' }}>
                    {event.impact.toLocaleString()} affected
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Displacement Tab */}
      {activeTab === 'displacement' && (
        <div style={{ display: 'grid', gap: '24px' }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
              🏃 Displacement by Country
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={countryImpactData.filter(d => d.displaced > 0).sort((a, b) => b.displaced - a.displaced)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="country" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="displaced" fill="#ea580c" radius={[4, 4, 0, 0]} name="Displaced People" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(234, 88, 12, 0.3)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#f1f5f9' }}>
              ⚠️ Displacement Crisis Summary
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ color: '#ea580c', fontSize: '16px', marginBottom: '8px' }}>DRC: 4.92M IDPs</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>71% in eastern provinces. M23 violence caused 200,000 new displacements in December alone.</p>
              </div>
              <div style={{ background: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ color: '#ea580c', fontSize: '16px', marginBottom: '8px' }}>Ethiopia: 500K+ IDPs</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Conflict in Amhara and Oromia regions, combined with drought in southern areas.</p>
              </div>
              <div style={{ background: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ color: '#ea580c', fontSize: '16px', marginBottom: '8px' }}>South Sudan: 355K Displaced</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Flooding affected 1M people across 29 counties. 1.2M Sudan refugees hosted.</p>
              </div>
              <div style={{ background: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ color: '#ea580c', fontSize: '16px', marginBottom: '8px' }}>Somalia: 185K Displaced</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>120,000 displaced Sept-Dec due to drought. National emergency declared Nov 10.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Health Tab */}
      {activeTab === 'health' && (
        <div style={{ display: 'grid', gap: '24px' }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
              🦠 Disease Outbreaks (Cases)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diseaseData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
                <YAxis type="category" dataKey={(d) => `${d.disease} (${d.country})`} stroke="#94a3b8" width={150} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="cases" fill="#7c3aed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(126, 34, 206, 0.2), rgba(190, 24, 93, 0.1))',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(126, 34, 206, 0.3)'
            }}>
              <h3 style={{ color: '#c084fc', fontSize: '16px', marginBottom: '12px' }}>🔴 Ethiopia Malaria Outbreak</h3>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#f8fafc' }}>1.4M</div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>cases (Sept-Oct 2025)</div>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '12px' }}>
                Severe outbreak reported nationwide between September 1 and October 31, 2025.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(234, 88, 12, 0.1))',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(220, 38, 38, 0.3)'
            }}>
              <h3 style={{ color: '#fca5a5', fontSize: '16px', marginBottom: '12px' }}>⚠️ Cholera Epidemic</h3>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#f8fafc' }}>155K+</div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>total cases across region</div>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '12px' }}>
                DRC worst in 20 years. South Sudan: 94,549 cases, 1,567 deaths. Projected surge in Dec.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2), rgba(245, 158, 11, 0.1))',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(234, 88, 12, 0.3)'
            }}>
              <h3 style={{ color: '#fdba74', fontSize: '16px', marginBottom: '12px' }}>🧬 Viral Hemorrhagic Fevers</h3>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc' }}>64</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Ebola (DRC)</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc' }}>12</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Marburg (Ethiopia)</div>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '12px' }}>
                DRC Ebola contained Dec 1. Ethiopia Marburg active in South Omo Zone.
              </p>
            </div>
          </div>

          {/* Fatalities */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
              💀 Reported Fatalities
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fatalitiesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="country" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="deaths" fill="#dc2626" radius={[4, 4, 0, 0]} name="Deaths" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* South Sudan Detail Tab */}
      {activeTab === 'southsudan' && (
        <div style={{ display: 'grid', gap: '24px' }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#f1f5f9' }}>
              🌊 South Sudan Flood Impact by County (Top 9)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={southSudanFloodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="county" stroke="#94a3b8" fontSize={11} angle={-30} textAnchor="end" height={80} />
                <YAxis stroke="#94a3b8" tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="affected" fill="#0891b2" name="People Affected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="displaced" fill="#ea580c" name="People Displaced" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              background: 'rgba(8, 145, 178, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(8, 145, 178, 0.3)'
            }}>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Total Flood Affected</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#22d3ee' }}>1.0M</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>29 counties, 6 states</div>
            </div>
            <div style={{
              background: 'rgba(234, 88, 12, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(234, 88, 12, 0.3)'
            }}>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Flood Displaced</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#fb923c' }}>355K</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>18 counties</div>
            </div>
            <div style={{
              background: 'rgba(126, 34, 206, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(126, 34, 206, 0.3)'
            }}>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Cholera Cases</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#c084fc' }}>94,549</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>1,567 deaths</div>
            </div>
            <div style={{
              background: 'rgba(245, 158, 11, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Sudan Refugees</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#fbbf24' }}>595K</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>95% Sudanese</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(220, 38, 38, 0.3)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#f1f5f9' }}>
              📋 Most Affected States
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {[
                { state: 'Jonglei', affected: 392206, pct: '39%' },
                { state: 'Unity', affected: 207666, pct: '21%' },
                { state: 'Lakes', affected: 21160, pct: '2%' },
                { state: 'Upper Nile', affected: 1200, pct: '<1%' },
                { state: 'Warrap', affected: 6432, pct: '<1%' },
                { state: 'Central Equatoria', affected: 8111, pct: '<1%' }
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(51, 65, 85, 0.5)',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{s.state}</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#0891b2' }}>
                    {(s.affected/1000).toFixed(0)}K
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{s.pct} of total</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        marginTop: '32px',
        padding: '16px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '12px',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)'
      }}>
        Data sources: ECHO, FEWS NET, IOM, UNOCHA, IPC, IFRC, WHO | Analysis period: October–December 2025
      </footer>
    </div>
  );
}
