import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { Typography, Card, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SystemWatcherComponent = () => {
  const [stats, setStats] = useState({ reads: 0, writes: 0 });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Получение коллекции 'clients'
        const clientsCollectionRef = collection(db, 'clients');
        const clientsSnapshot = await getDocs(clientsCollectionRef);
        const clientsList = clientsSnapshot.docs.map(doc => doc.id);

        // Получение данных из коллекции 'ClientDB' для каждого документа в 'clients'
        let totalReads = 0;
        let totalWrites = 0;
        
        for (const clientId of clientsList) {
          const clientDbRef = collection(db, 'clients', clientId, 'ClientDB');
          const clientDbSnapshot = await getDocs(clientDbRef);
          totalReads += clientDbSnapshot.size;
        }

        // Примерное значение для writes, можно заменить на реальное значение
        const writes = 5;

        setStats({
          reads: totalReads,
          writes: writes
        });

        setChartData({
          labels: ['Reads', 'Writes'],
          datasets: [
            {
              label: 'Operations',
              data: [totalReads, writes],
              backgroundColor: ['#3f51b5', '#f50057'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">System Stats</Typography>
        <Typography>Reads: {stats.reads}/10</Typography>
        <Typography>Writes: {stats.writes}/10</Typography>
        <div style={{ height: 300 }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += context.parsed.y;
                      }
                      return label;
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemWatcherComponent;
