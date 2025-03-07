import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const ThingsBoardDashboard = () => {
    const [data, setData] = useState({
        temperature: [{ ts: Date.now(), value: '22.5' }],
        humidity: [{ ts: Date.now(), value: '60%' }]
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData({
                temperature: [{ ts: Date.now(), value: (20 + Math.random() * 5).toFixed(1) }],
                humidity: [{ ts: Date.now(), value: `${(50 + Math.random() * 10).toFixed(1)}%` }]
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getChartData = (value) => [{
        name: 'value',
        uv: parseFloat(value),
        fill: '#ff7300'
    }];

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen text-white">
            <h1 className="text-3xl font-bold text-center mb-8">ThingsBoard Dashboard (Dummy Data)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.keys(data).map((key) => (
                    <Card key={key} className="rounded-2xl bg-white text-gray-800 shadow-lg">
                        <CardContent className="p-6 flex flex-col items-center">
                            <h2 className="text-2xl font-semibold mb-4 capitalize">{key}</h2>
                            {key === 'temperature' ? (
                                <ResponsiveContainer width="100%" height={200}>
                                    <RadialBarChart
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="10%"
                                        outerRadius="80%"
                                        barSize={20}
                                        data={getChartData(data[key][0].value)}
                                    >
                                        <RadialBar
                                            minAngle={15}
                                            background
                                            clockWise
                                            dataKey="uv"
                                        />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-5xl font-bold">{data[key][0].value}</div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ThingsBoardDashboard;
