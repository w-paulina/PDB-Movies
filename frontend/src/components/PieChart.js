import React from 'react'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const PieChart = () => {
    return (
        <div>
            <Pie
            data={{
                labels: ['Akcja', 'Komedia', 'Dramat', 'Fantasy', 'Sci-Fi', 'Przygodowe'],
                datasets: [
                    {
                        data: [12, 13, 11, 9, 7, 19],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.4)',
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(255, 206, 86, 0.4)',
                            'rgba(75, 192, 192, 0.4)',
                            'rgba(153, 102, 255, 0.4)',
                            'rgba(255, 159, 64, 0.4)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,


                    }
                ]
                
        }}  

        plugins={[ChartDataLabels]}

        options= {{
            maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        color: 'rgba(255,255,255,0.6',
                        formatter: (value, context) => {
                            return context.chart.data.labels[context.dataIndex];
                        },
                        font: {
                            size: 13,
                            family: 'Poppins',
                        },
                        
                    },
                    labels: {

                        
                    }
                },
            }}
        

        height={320}
        width={320}

        >
            
        </Pie>
            
        </div>
    )
}

export default PieChart;