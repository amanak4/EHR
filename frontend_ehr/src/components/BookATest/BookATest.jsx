import React, { useState } from "react";
import Card from '../Layout/Card';
import "./BookATest.css"

function BookATest() {
    const [name, setName] = useState("");
    const [selectedServiceProvider, setSelectedServiceProvider] = useState("DrLalPathlabs");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleServiceProviderChange = (e) => {
        setSelectedServiceProvider(e.target.value);
    };

    console.log("Name:", name);
    console.log("Selected Service Provider:", selectedServiceProvider);

    return (
        <div className="book_container">
            <div className="entry_details">
                <label htmlFor="name">Enter the name of the patient:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
            </div>
            <div>
                <label htmlFor="ServiceProvider">Choose your Service Provider:</label>
                <select className="select_disease" name="ServiceProvider" id="ServiceProvider" value={selectedServiceProvider} onChange={handleServiceProviderChange}>
                    <option value="DrLalPathlabs">Dr. Lal Pathlab's</option>
                    <option value="RedCliffeLabs">RedCliffe Labs</option>
                    <option value="MetropolisPathologyLab">Metropolis Pathology Lab</option>
                    <option value="ThyrocareAarogyam">Thyrocare Aarogyam</option>
                    <option value="ApolloDiagnostics">Apollo Diagnostics</option>
                </select>
            </div><div className="flexbox" >
            <Card title="Blood Sugar Test" price="Rs.149" description="A healthy blood glucose range on a fasting test is between 70 and 100 milligrams per deciliter (mg/dL). A healthy blood glucose level on a non-fasting blood glucose test is under 125 mg/dL." imglink="https://domf5oio6qrcr.cloudfront.net/medialibrary/8884/Blood-tests-results.jpg"/>
            <Card title="Blood Pressure Test" price="Rs.49" description="Blood pressure levels can vary between individuals, but the American Heart Association (AHA) recommends a target blood pressure below 120 mm Hg systolic and 80 mm Hg diastolic" imglink="https://www.cnet.com/a/img/resize/bd2cf2c9040dcce64b3e19a0c1c8bd57263d7699/hub/2019/08/02/14e15472-8f58-4d0d-8e45-7dbbfb4fe590/2.png?auto=webp&fit=crop&height=675&width=1200"/>
            <Card title="Lipid Profile Test" price="Rs.399" description="Total cholesterol: Below 200 mg/dL.
High-density lipoprotein (HDL) cholesterol: Above 60 mg/dL.
Low-density lipoprotein (LDL) cholesterol: Below 100 mg/dL.
Triglycerides: Below 150 mg/dL." imglink="https://www.netmeds.com/images/cms/wysiwyg/blog/2021/02/1613636799_Lipid_big_450.jpg" />
            <Card title="Urine Test" price="Rs.249" description="The urinalysis normal range is 4.6 to 8.0. Higher levels suggest kidney stones or urinary tract infections. Protein: High levels might suggest kidney issues. Glucose: Presence could indicate high blood sugar." imglink="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2016/6/Urine_analysis_shutterstock_146356910.jpg"/>
            <Card title="Liver Function Test" price="Rs.499" description="Normal levels of SGPT ranges from about 7-56 units/liter of serum, Normal levels of SGOT is about 5-40 units/liter of serum. Elevated levels of AST and ALT may signify the level of liver damage in a person." imglink="https://www.queensgynecology.in/queens-health/wp-content/uploads/2023/10/Liver-Function-Test-in-Pregnancy_-What-It-Is-Types-Purpose-Results.jpg"/>
            <Card title="Pregnancy Test" price="Rs.199" description="Since there may not be appropriate trimester-specific reference intervals for individual populations, it is stated that the default TSH values should be 0.1–2.5 mIU/L , 0.2–3.0 mIU/L, and 0.3–3.5 mIU/L ." imglink="https://as1.ftcdn.net/v2/jpg/01/39/64/58/1000_F_139645881_A4LXvi7OGfzfsgJcOcnOemGo7ORAJl8J.jpg"/>
            </div>
        </div>
    );
}

export default BookATest;
