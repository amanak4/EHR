import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import './chart.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

ChartJS.register(
    LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
);

const LipidLevelChart = () => {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
 const navigateTo=useNavigate();
   
    const [totalCholesterol, setTotalCholesterol] = useState([]);
    const [ldlCholesterol, setLdlCholesterol] = useState([]);
    const [hdlCholesterol, setHdlCholesterol] = useState([]);
    const [triglycerides, setTriglycerides] = useState([]);
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
                const response = await axios.get("http://localhost:4000/lipid", { withCredentials: true });
                const { TotalCholesterol, LdlCholesterol, HdlCholesterol, Tryglycerides, date, name } = response.data.data;
                console.log(response.data.data)
                setTotalCholesterol(TotalCholesterol);
                setLdlCholesterol(LdlCholesterol);
                setHdlCholesterol(HdlCholesterol);
                setTriglycerides(Tryglycerides);
                setDate(date);
                setName(name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const dataLDLCholesterol = {
      labels: date,
      datasets: [
          {
              label: 'LDL Cholesterol',
              data: ldlCholesterol,
              borderColor: 'red',
              backgroundColor: 'transparent',
              fill: false
          }
      ]
  };

  const optionsLDLCholesterol = {
      responsive: true,
      title: {
          display: true,
          text: 'Lipid Profile Over Time'
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

  const dataTriglycerides = {
    labels: date,
    datasets: [
        {
            label: 'Triglycerides',
            data: triglycerides,
            borderColor: 'purple',
            backgroundColor: 'transparent',
            fill: false
        }
    ]
};

const optionsTriglycerides = {
    responsive: true,
    title: {
        display: true,
        text: 'Lipid Profile Over Time'
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

const dataTotalCholesterol = {
  labels: date,
  datasets: [
      {
          label: 'Total Cholesterol',
          data: totalCholesterol,
          borderColor: 'blue',
          backgroundColor: 'transparent',
          fill: false
      }
  ]
};

const optionsTotalCholesterol = {
  responsive: true,
  title: {
      display: true,
      text: 'Lipid Profile Over Time'
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

const dataHDLCholesterol = {
  labels: date,
  datasets: [
     
      {
          label: 'HDL Cholesterol',
          data: hdlCholesterol,
          borderColor: 'green',
          backgroundColor: 'transparent',
          fill: false
      }
  ]
};

const optionsHDLCholesterol = {
  responsive: true,
  title: {
      display: true,
      text: 'Lipid Profile Over Time'
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
            title: 'Total Cholesterol',
            percentage: totalCholesterol.length > 0 ? totalCholesterol[totalCholesterol.length - 1] : 0
        },
        {
            title: 'LDL Cholesterol',
            percentage: ldlCholesterol.length > 0 ? ldlCholesterol[ldlCholesterol.length - 1] : 0
        },
        {
            title: 'HDL Cholesterol',
            percentage: hdlCholesterol.length > 0 ? hdlCholesterol[hdlCholesterol.length - 1] : 0
        },
        {
            title: 'Triglycerides',
            percentage: triglycerides.length > 0 ? triglycerides[triglycerides.length - 1] : 0
        }
    ];

  return (
    <div className='chart_container'>
    <div className='chart'>
      <div style={{ width: '500px', height: '280px' }}>
        <h2 className='headfont'>Total Cholesterol Levels Over Time</h2>
        <Line data={dataTotalCholesterol} options={optionsTotalCholesterol} className='chart_content' />
      </div>
      <div style={{ width: '500px', height: '280px' }}>
        <h2 className='headfont'>LDL Cholesterol Levels Over Time</h2>
        <Line data={dataLDLCholesterol} options={optionsLDLCholesterol} className='chart_content' />
      </div>
      <div style={{ width: '500px', height: '280px' }}>
        <h2 className='headfont'>HDL Cholesterol Levels Over Time</h2>
        <Line data={dataHDLCholesterol} options={optionsHDLCholesterol} className='chart_content' />
      </div>
      <div style={{ width: '500px', height: '280px' }}>
        <h2 className='headfont'>Triglycerides Levels Over Time</h2>
        <Line data={dataTriglycerides} options={optionsTriglycerides} className='chart_content' />
      </div>
      </div>
      <div className='donutparent'>
      <div className='donuthead'>
<h3>Lipid Profile Medical Analysis </h3>
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
      <h3 className='skill__title'>{title}</h3>
       </div>
     ) })
    }
    </div>
  </div>
      </div>
  )
}

export default LipidLevelChart