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

const SugarLevelChart = () => {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
  const navigateTo=useNavigate();
    
    const [fastingSugar, setFastingSugar] = useState([]);
    const [randomSugar, setRandomSugar] = useState([]);
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
                const response = await axios.get("http://localhost:4000/sugar", { withCredentials: true });
                console.log("data",response.data.data);
                const { FastingSugar, RandomSugar, date, name } = response.data.data;
                setFastingSugar(FastingSugar);
                setRandomSugar(RandomSugar);
                setDate(date);
                setName(name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
  
    const dataFasting = {
      labels: date,
      datasets: [
          {
              label: 'Fasting Sugar Level',
              data: fastingSugar,
              borderColor: 'orange',
              backgroundColor: 'transparent',
              fill: false
          }
      ]
  };

  const optionsFasting = {
      responsive: true,
      title: {
          display: true,
          text: 'Sugar Levels Over Time'
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

  const dataRandom = {
    labels: date,
    datasets: [
       
        {
            label: 'Random Sugar Level',
            data: randomSugar,
            borderColor: 'purple',
            backgroundColor: 'transparent',
            fill: false
        }
    ]
};

const optionsRandom = {
    responsive: true,
    title: {
        display: true,
        text: 'Sugar Levels Over Time'
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
            title: 'Fasting Sugar Level',
            percentage: fastingSugar.length > 0 ? fastingSugar[fastingSugar.length - 1] : 0
        },
        {
            title: 'Random Sugar Level',
            percentage: randomSugar.length > 0 ? randomSugar[randomSugar.length - 1] : 0
        }
    ];

  return (
    <div className='chart_container'>
       <div className='chart'> 
    <div style={{width:'500px',height:'280px'}}>
    <h2 className='headfont'>Fasting Sugar Levels Over Time</h2>
    <Line data={dataFasting} options={optionsFasting} className='chart_content' />
    </div>
    <div style={{width:'500px',height:'280px'}}>
    <h2 className='headfont'>Random Sugar Levels Over Time</h2>
    <Line data={dataRandom} options={optionsRandom} className='chart_content' />
    </div>
  </div><div className='donutparent'>
  <div className='donuthead'>
  <h3>Sugar Medical Analysis </h3>
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
        <h3 className='skill__title headfont'>{title}</h3>
         </div>
       ) })
      }
      </div>
    </div>
    </div>
  );
};

export default SugarLevelChart;
