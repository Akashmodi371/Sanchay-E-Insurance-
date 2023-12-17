import React from 'react';
import './ViewSchemesTables.css'
const ViewSchemeTable = ({ data, columns, handleSelectedScheme }) => {

  return (
    <div className="view-scheme-div-customer">
      <h2 className="text-dark fw-bold mb-4" style={{fontSize:'34px',fontFamily:'monospace'}}>Schemes </h2>
      <table className="table view-scheme-table">
        <thead>
          <tr>
            {columns.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {data.map((scheme, index) => (
            <tr
              key={index}
            >
              <td>{scheme.schemeId}</td>
              <td>{scheme.schemeName}</td>
              <td>{scheme.minAge}</td>
              <td>{scheme.maxAge}</td>
              <td><del>&#2352;</del> {scheme.minAmount}</td>
              <td><del>&#2352;</del> {scheme.maxAmount}</td>
              <td>{scheme.minInvestTime} Months</td>
              <td>{scheme.maxInvestTime} Months</td>
              <td>{scheme.registrationCommission}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectedScheme(scheme.schemeId)}
                >
                  View Scheme
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSchemeTable;
