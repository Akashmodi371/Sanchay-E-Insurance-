import React from "react";
import Calculator from "../Components/SchemeData/Calculator";
import './ViewSelectedScheme.css'
const ViewSelectedScheme = ({ data, selectedPlan }) => {
  console.log(data, "viewselect scheme");
  if (!data) {
    return <div>No scheme data available.</div>;
  }

  return (
    <>
      <div className=" view-selected-scheme-div">
        <h2 className="text-dark">Selected Scheme</h2>
        <table className="table text-dark view-selected-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody className="view-selected-tbody">
            {Object.entries(data).map(([attribute, value]) => (
              <tr key={attribute}>
                <td>{attribute}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        <Calculator
          minamount={data.minamount}
          maxamount={data.maxamount}
          minyear={data.minyear}
          maxyear={data.maxyear}
          profitratio={data.profitratio}
          data={data}
          selectedPlan={selectedPlan}
        />
      }
    </>
  );
};

export default ViewSelectedScheme;
