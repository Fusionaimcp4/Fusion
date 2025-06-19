import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

interface MiniSparklineProps {
  data: number[];
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({ data }) => {
  if (!data || data.length === 0) return <span className="text-gray-400">-</span>;
  return (
    <div style={{ width: 80, height: 28 }}>
      <Line
        data={{
          labels: data.map((_, i) => i),
          datasets: [
            {
              data,
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37,99,235,0.1)',
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: {
            x: { display: false },
            y: { display: false },
          },
        }}
      />
    </div>
  );
};

export default MiniSparkline; 