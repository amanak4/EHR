import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import './chart.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { Context } from '../..';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
);

const BloodPressureChart = () => {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
 const navigateTo=useNavigate();
    const [systole, setSystole] = useState([]);
    const [diastole, setDiastole] = useState([]);
    const [heartBeat, setHeartBeat] = useState([]);
    const [date, setDate] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
      if(!isAuthorized){
        toast.error("User not Authorized!");
        navigateTo('/login');
        return;
      }
      
        const fetchData = async () => {
          
            try {
                const response = await axios.get("http://localhost:4000/hearthealth", { withCredentials: true });
                const { Systole, Diastole, Heartbeat, date, name } = response.data.data;
                setSystole(Systole);
                setDiastole(Diastole);
                setHeartBeat(Heartbeat);
                setDate(date);
                setName(name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const data = {
        labels: date,
        datasets: [
            {
                label: 'Systolic Blood Pressure',
                data: systole,
                borderColor: 'red',
                backgroundColor: 'transparent',
                fill: false
            },
            {
                label: 'Diastolic Blood Pressure',
                data: diastole,
                borderColor: 'blue',
                backgroundColor: 'transparent',
                fill: false
            },
            {
                label: 'Heart Rate',
                data: heartBeat,
                borderColor: 'green',
                backgroundColor: 'transparent',
                fill: false
            }
        ]
    };

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Blood Pressure and Heart Rate Over Time'
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM D'
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Measurement'
                }
            }]
        }
    };

    const dataBloodRate = {
      labels: date,
      datasets: [
          {
              label: 'Heart Rate',
              data: heartBeat,
              borderColor: 'green',
              backgroundColor: 'transparent',
              fill: false
          }
      ]
  };

  const optionsBloodRate = {
      responsive: true,
      title: {
          display: true,
          text: 'Blood Pressure and Heart Rate Over Time'
      },
      scales: {
          xAxes: [{
              type: 'time',
              time: {
                  unit: 'day',
                  displayFormats: {
                      day: 'MMM D'
                  }
              },
              scaleLabel: {
                  display: true,
                  labelString: 'Date'
              }
          }],
          yAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: 'Measurement'
              }
          }]
      }
  };
  const dataSystolic = {
    labels: date,
    datasets: [
        {
            label: 'Systolic Blood Pressure',
            data: systole,
            borderColor: 'red',
            backgroundColor: 'transparent',
            fill: false
        }
    ]
};

const optionsSystolic = {
    responsive: true,
    title: {
        display: true,
        text: 'Blood Pressure and Heart Rate Over Time'
    },
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'day',
                displayFormats: {
                    day: 'MMM D'
                }
            },
            scaleLabel: {
                display: true,
                labelString: 'Date'
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Measurement'
            }
        }]
    }
};
const dataDiastolic = {
  labels: date,
  datasets: [
      {
          label: 'Diastolic Blood Pressure',
          data: diastole,
          borderColor: 'blue',
          backgroundColor: 'transparent',
          fill: false
      }
  ]
};

const optionsDiastolic = {
  responsive: true,
  title: {
      display: true,
      text: 'Blood Pressure and Heart Rate Over Time'
  },
  scales: {
      xAxes: [{
          type: 'time',
          time: {
              unit: 'day',
              displayFormats: {
                  day: 'MMM D'
              }
          },
          scaleLabel: {
              display: true,
              labelString: 'Date'
          }
      }],
      yAxes: [{
          scaleLabel: {
              display: true,
              labelString: 'Measurement'
          }
      }]
  }
};
    const detail = [
        {
            title: 'Systolic',
            percentage: systole.length > 0 ? systole[systole.length - 1] : 0
        },
        {
            title: 'Diastolic',
            percentage: diastole.length > 0 ? diastole[diastole.length - 1] : 0
        },
        {
            title: 'HeartBeat',
            percentage: heartBeat.length > 0 ? heartBeat[heartBeat.length - 1] : 0
        },
    ];

    return (
      <div className='chart_container'>
      <div className='chart'> 
      <div style={{width:'500px',height:'280px'}}>
      <h2 className='headfont'>Blood Pressure and Heart Rate Over Time</h2>
      <Line data={data} options={options}  className='chart_content'/>
      </div>
      <div style={{width:'500px',height:'280px'}}>
      <h2 className='headfont'>Systolic Blood Pressure Over Time</h2>
      <Line data={dataSystolic} options={optionsSystolic} className='chart_content' />
      </div>
      <div style={{width:'500px',height:'280px'}}>
      <h2 className='headfont'>Diastolic Blood Pressure Over Time</h2>
      <Line data={dataDiastolic} options={optionsDiastolic} className='chart_content' />
      </div>
      <div style={{width:'500px',height:'280px'}}>
      <h2 className='headfont'>Heart Rate Over Time</h2>
      <Line data={dataBloodRate} options={optionsBloodRate} className='chart_content' />
      </div>
    </div>
    <div className='donutparent'>
    <div className='donuthead'>
    <h3>Blood Pressure Medical Analysis </h3>
    </div>
    <div className='donut'>
        {detail.map(({title,percentage},index)=>{
         return(  <div className='progress__box' key={index}>
          <div className='progress__circle'>
              <CircularProgressbar
               strokeWidth={7.5} 
               text={`${percentage}`} 
               value={percentage} 
               />
          </div>
  
          <h3 className='skill__title headfont' >{title}</h3>
  
           </div>
         ) })
        }
        </div>
      </div>
    </div>
    );
};

export default BloodPressureChart;
