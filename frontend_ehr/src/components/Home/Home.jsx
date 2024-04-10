import React from 'react';
import './Home.css';
import { FaBook, FaBookMedical, FaBookmark, FaNotesMedical, FaReceipt, FaRecordVinyl } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="App">

  
      <div className="top-section">
         
        <div className="background-image">
            </div>
        <div className="description">
          <h1 id="heading">Electronic Health Report</h1>
          <p id="content">Electronic Health Records (EHRs) have emerged as a crucial tool in modern healthcare management, streamlining patient information, improving accessibility, and enhancing overall healthcare delivery. Our proposal aims to develop a web-based EHR application that not only securely stores vital medical information but also connects with leading diagnostic labs to seamlessly integrate test reports. Additionally, the application will feature a user-friendly dashboard presenting health vitals through progress circles and graphs, facilitating better understanding and tracking of health metrics.Our App will serve as an important health buddy which can be used to track your health , vitals , prevent ailments , and finally live a healthy life.
          </p>
        </div>
      </div>
      <div className="bottom-section">
        <div className="appointment">
          {/* Add appointment content here */}
         <Link to={'/ManualEntry'}> <h1>Manual Entry       
            <FaNotesMedical />
          </h1>
          </Link>
          <p>If the online EHR report access is not supported by the diagnostic lab , then the patient can manually upload the vitals which will be then processed to update the online medical profile of the patient.
          </p>
        </div>
        <div className="book-test">
        
          {/* Add book a test content here */}
          <Link to={'/book-a-test'}> <h1>Book A Test <FaBook /></h1></Link>
          <p>The App also provides a feature to book an test appointment to your designated medical service provider (diagnostic labs) and seamlessly links the results of the latest profile.
          </p>
        </div>
        <div className="lab-reports">
         <Link to={'/blood-pressure-stats'}> <h1>View Reports<FaReceipt /></h1></Link>
          <p>Medical Vitals Tracking: Allows users to input and track essential medical vitals such as blood pressure, blood sugar levels, weight, etc.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
