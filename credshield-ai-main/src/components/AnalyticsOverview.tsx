import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, AlertTriangle, Zap, Timer, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

interface Props {
  kpis?: any[];
  chartData?: any[];
  authData?: any[];
  alerts?: any[];
}

// Fallback Data
const defaultKpis = [
  { title: 'Total Documents Scanned', value: '1,245', change: '+12% vs last period', trend: 'up', icon: FileText, color: 'text-accent' },
  { title: 'Fraud Detected', value: '84', change: '+3% vs last period', trend: 'up', icon: AlertTriangle, color: 'text-red-500' },
  { title: 'API Requests', value: '12.4k', change: 'Consistent volume', trend: 'neutral', icon: Zap, color: 'text-brand' },
  { title: 'Avg. Verification Time', value: '1.2s', change: '-0.3s faster', trend: 'down', icon: Timer, color: 'text-blue-500' },
];

const defaultChartData = [
  { name: 'Mon', value: 400 }, { name: 'Tue', value: 300 }, { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 }, { name: 'Fri', value: 500 }, { name: 'Sat', value: 900 }, { name: 'Sun', value: 1100 },
];

const defaultAuthData = [
  { name: 'Authentic', value: 1145, color: '#22c55e' },
  { name: 'Flagged', value: 84, color: '#ef4444' },
  { name: 'Manual', value: 16, color: '#6B7280' },
];

const defaultAlerts = [
  { id: '#DOC-8924-A', candidate: 'Sarah Jenkins', type: 'ID Manipulation', status: 'Flagged' },
  { id: '#DOC-8911-B', candidate: 'Marcus Thorne', type: 'Selfie Mismatch', status: 'Flagged' },
  { id: '#DOC-8890-C', candidate: 'Elena Rodriguez', type: 'Expired Document', status: 'Flagged' },
];

export default function AnalyticsOverview({ 
  kpis = defaultKpis, 
  chartData = defaultChartData, 
  authData = defaultAuthData, 
  alerts = defaultAlerts 
}: Props) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-brand">Analytics Overview</h2>
        <div className="flex items-center gap-3">
          <select className="appearance-none pl-4 pr-10 py-2 border border-brand/10 rounded-xl bg-white text-sm font-semibold text-brand focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-muted-bg/50 backdrop-blur rounded-2xl p-6 border border-brand/10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-semibold text-muted max-w-[120px]">{kpi.title}</h3>
              <div className={`p-2 rounded-xl bg-white shadow-sm ${kpi.color}`}><kpi.icon className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-bold text-brand">{kpi.value}</div>
            <div className={`mt-2 flex items-center gap-1 text-xs font-bold ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-green-600' : 'text-muted'}`}>
              {kpi.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {kpi.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {kpi.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-brand/10 p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-brand">Verification Volume</h3>
            <button className="text-muted hover:text-brand transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7A45" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FF7A45" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#FF7A45" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand/10 p-6 flex flex-col items-center h-[400px]">
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="font-bold text-brand">Authentication Status</h3>
            <button className="text-muted hover:text-brand transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          <div className="relative w-full aspect-square max-w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={authData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                  {authData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-brand">92%</span>
              <span className="text-xs font-bold text-muted">Authentic</span>
            </div>
          </div>
          <div className="w-full mt-auto space-y-3">
            {authData.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-semibold text-brand/70">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-brand">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <section className="bg-white rounded-2xl border border-brand/10 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-brand/10 flex justify-between items-center">
          <h3 className="font-bold text-brand">Recent Alerts</h3>
          <button className="text-sm font-bold text-accent hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted-bg/30">
                <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Document ID</th>
                <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Candidate</th>
                <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Alert Type</th>
                <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/5">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-muted-bg/20 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-muted font-mono">{alert.id}</td>
                  <td className="py-4 px-6 text-sm font-bold text-brand">{alert.candidate}</td>
                  <td className="py-4 px-6 text-sm font-medium text-muted">{alert.type}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-sm font-bold text-accent hover:underline">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}