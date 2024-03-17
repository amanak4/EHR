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

const UrineReportChart = () => {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
  const navigateTo=useNavigate();
    
    const [color, setColor] = useState([]);
    const [pH, setPH] = useState([]);
    const [ketone, setKetone] = useState([]);
    const [glucose, setGlucose] = useState([]);
    const [bilirubin, setBilirubin] = useState([]);
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
                const response = await axios.get("http://localhost:4000/urine", { withCredentials: true });
                const { Colour, PH, Ketone, Glucose, Bilirubin, date, name } = response.data.data;

                const convertedKetone = Ketone.map(val => val === "Positive" ? 1 : val === "Negative" ? -1 : 0);
                const convertedGlucose = Glucose.map(val => val === "Positive" ? 1 : val === "Negative" ? -1 : 0);
                const convertedBilirubin = Bilirubin.map(val => val === "Positive" ? 1 : val === "Negative" ? -1 : 0);

                setColor(Colour);
                setPH(PH);
                setKetone(convertedKetone);
                setGlucose(convertedGlucose);
                setBilirubin(convertedBilirubin);
                setDate(date);
                setName(name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const dataPH = {
        labels: date,
        datasets: [
            {
                label: 'pH',
                data: pH,
                borderColor: 'purple',
                backgroundColor: 'transparent',
                fill: false
            }
        ]
    };

    const optionsPH = {
        responsive: true,
        title: {
            display: true,
            text: 'Urine Analysis Over Time'
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

    const dataGlucose = {
      labels: date,
      datasets: [
          {
              label: 'Glucose',
              data: glucose,
              borderColor: 'brown',
              backgroundColor: 'transparent',
              fill: false
          }
      ]
  };

  const optionsGlucose = {
      responsive: true,
      title: {
          display: true,
          text: 'Urine Analysis Over Time'
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

  const dataKetone = {
    labels: date,
    datasets: [
       
        {
            label: 'Ketone',
            data: ketone,
            borderColor: 'yellow',
            backgroundColor: 'transparent',
            fill: false
        }
    ]
};

const optionsKetone = {
    responsive: true,
    title: {
        display: true,
        text: 'Urine Analysis Over Time'
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

const dataBilirubin= {
  labels: date,
  datasets: [
      {
          label: 'Bilirubin',
          data: bilirubin,
          borderColor: 'grey',
          backgroundColor: 'transparent',
          fill: false
      }
  ]
};

const optionsBilirubin = {
  responsive: true,
  title: {
      display: true,
      text: 'Urine Analysis Over Time'
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
            title: 'Color',
            percentage: color.length > 0 ? color[color.length - 1] : 0
        },
        {
            title: 'pH',
            percentage: pH.length > 0 ? pH[pH.length - 1] : 0
        },
        {
            title: 'Ketone',
            percentage: ketone.length > 0 ? ketone[ketone.length - 1] : 0
        },
        {
            title: 'Glucose',
            percentage: glucose.length > 0 ? glucose[glucose.length - 1] : 0
        },
        {
            title: 'Bilirubin',
            percentage: bilirubin.length > 0 ? bilirubin[bilirubin.length - 1] : 0
        },
    ];


  return (
    <div className='chart_container'>
      <div className='chart'>
        <div style={{ width: '500px', height: '280px' }}>
          <h2 className='headfont'>Urine Color Over Time</h2>
          <Line data={dataGlucose} options={optionsGlucose} className='chart_content' />
        </div>
        <div style={{ width: '500px', height: '280px' }}>
          <h2 className='headfont'>Urine pH Level Over Time</h2>
          <Line data={dataPH} options={optionsPH} className='chart_content' />
        </div>
        <div style={{ width: '500px', height: '280px' }}>
          <h2 className='headfont'>Ketone Level Over Time</h2>
          <Line data={dataKetone} options={optionsKetone} className='chart_content' />
        </div>
        <div style={{ width: '500px', height: '280px' }}>
          <h2 className='headfont'>Bilirubin Level Over Time</h2>
          <Line data={dataBilirubin} options={optionsBilirubin} className='chart_content' />
        </div>
            </div><div className='donutparent'>
            <div className='donuthead'>
  <h3>Urine Medical Analysis </h3>
  </div>
      <div className='donut'>
        {detail.map(({ title, percentage }, index) => {
          return (
            <div className='progress__box' key={index}>
              <div className='progress__circle'>
                <CircularProgressbar
                  strokeWidth={7.5}
                  text={`${percentage}`}
                  value={percentage}
                />
              </div>
              <h3 className='skill__title headfont'>{title}</h3>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default UrineReportChart;
