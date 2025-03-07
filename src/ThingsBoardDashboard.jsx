import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import GaugeChart from 'react-gauge-chart';

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

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen text-white">
            <h1 className="text-3xl font-bold text-center mb-8">ThingsBoard Dashboard (Dummy Data)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.keys(data).map((key) => (
                    <Card key={key} className="rounded-2xl bg-white text-gray-800 shadow-lg">
                        <CardContent className="p-6 flex flex-col items-center">
                            <h2 className="text-2xl font-semibold mb-4 capitalize">{key}</h2>
                            {key === 'temperature' ? (
                                <GaugeChart
                                    id={`gauge-${key}`}
                                    nrOfLevels={20}
                                    percent={parseFloat(data[key][0].value) / 100}
                                    colors={['#00ff00', '#ff0000']}
                                />

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
