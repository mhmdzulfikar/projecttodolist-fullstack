import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

import { useProductivityChart } from "../hooks/useProductivityChart";

const ProductivityChart = () => {
  const { chartData, isEmpty, loading } = useProductivityChart();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm h-[300px] flex items-center justify-center animate-pulse">
        <div className="text-gray-400">Loading chart data...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] min-h-[300px]"> 
      
      {isEmpty ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
           <div className="text-4xl mb-2">📊</div>
           <p>No activity recorded yet.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: -20, bottom: 5 }} 
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            
            <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                dy={10}
            />
            
            <YAxis 
                allowDecimals={false}
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            
            <Tooltip 
                cursor={{ fill: 'transparent' }} 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            
            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            {/* BAR COMPLETED (HIJAU) */}
            <Bar 
                dataKey="completed" 
                name="Completed" 
                stackId="a" 
                fill="#10b981" 
                barSize={40} 
                radius={[0, 0, 4, 4]} 
            />
            
            {/* BAR PENDING (KUNING) */}
            <Bar 
                dataKey="pending" 
                name="Pending" 
                stackId="a" 
                fill="#fbbf24" 
                barSize={40} 
                radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProductivityChart;