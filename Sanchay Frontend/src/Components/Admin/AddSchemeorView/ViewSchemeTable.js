import React from 'react';
import './ViewSchemeTable.css';

const ViewSchemeTable = ({ schemeData }) => {
  // Log the scheme data for debugging
  console.log(schemeData,"view table schemedata");

  // Define the columns to display
  const columnsToDisplay = [
    'schemeId',
    'schemeName',
    'maxAmount',
    'minAmount',
    'maxAge',
    'minAge',
    'maxInvestTime',
    'minInvestTime',
    'registrationCommission',
    'planname',
    'documentsRequire'
  ];

  function capitalizeFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
 

  return (
    <div className="view-scheme-admin-container">
      <h2>Scheme Table</h2>

      <div className="table-responsive">
        <table className="table mt-4">
          <thead className='text-center'> {/* Use thead for column headers */}
            <tr>
              {columnsToDisplay.map((column) => (
                <th key={column}>{capitalizeFirstCharacter(column)}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{fontWeight:'400'}} className='text-center'>
            {/* Map through schemeData to create rows for each scheme */}
            {schemeData.map((scheme, index) => (
              <tr key={index}>
                {/* Map through columnsToDisplay to create columns for each property */}
                {columnsToDisplay.map((column) => (
                  <td key={column}>{scheme[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSchemeTable;
