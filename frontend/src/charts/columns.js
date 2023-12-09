import React from 'react';
import { Chart } from 'react-google-charts';

export const options = {
  title: 'IMDb Score and Budget Comparison',
  fontSize: 20,
  legend: { position: 'right' },
  backgroundColor: '#cee0f2',
};

export default function MovieVisualization(props) {
  const { movie } = props;

  const data = [
    ['Category', 'Value'],
    ['Revenue', movie.revenue],
    ['Budget', movie.budget],
  ];

  return (
    <Chart
      chartType="Bar"
      data={data}
      options={options}
      width={'100%'}
      height={'450px'}
    />
  );
}
