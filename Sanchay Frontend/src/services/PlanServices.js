import { Error } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
// ... (other imports)
import ViewSelectedScheme from './../sharedComponents/ViewSelectedScheme';
import { getSchemeBySchemeid, getSchemesByPlanid } from './SchemesService';
import ViewSchemeTable from './../sharedComponents/ViewSchemeTable';
import Swal from 'sweetalert2';

const PlanServices = ({ selectedPlan, accessid, closeAllModal }) => {
  // State variables
  const [planSchemes, setPlanSchemes] = useState([]);
  const [isError, setIsError] = useState(false);
  const[temp,setTemp]=useState()
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [schemeData, setSchemeData] = useState({});
  const [showSchemesTable, setShowSchemesTable] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // Function to handle a selected scheme
  const handleSelectedScheme = async (schemeId) => {
    // closeAllModal();
    // setShowSchemesTable(false);
    // setIsLoading(false); // Set loading state to true

    try {
      const response = await getSchemeBySchemeid(schemeId);
      console.log(response.data);
      setTemp(schemeId)
      setSchemeData(response.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data);
    } finally {
      // setIsLoading(false); // Set loading state to false when done
    }
  };


  

  // Function to fetch plan schemes
  const fetchSchemes = async () => {
    try {
      const response = await getSchemesByPlanid(selectedPlan);
      setPlanSchemes(response.data);
      setShowSchemesTable(true);
      setErrorMessage(null);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data);
      Swal.fire('',error.response.data,'error')
    }
  };

  // Define scheme columns
  const schemeColumns = [
    'SchemeId',
    'SchemeName',
    'MinAge',
    'MaxAge',
    'MinAmount',
    'MaxAmount',
    'MinInvestTime',
    'MaxInvestTime',
    'RegistrationCommission',
    'ViewScheme',
  ];

  // Fetch plan schemes when selectedPlan changes
  useEffect(() => {
    fetchSchemes();
  }, [selectedPlan]);

  return (
    <div className="downpage">
      <div>
        {showSchemesTable && (
          <ViewSchemeTable
            data={planSchemes}
            columns={schemeColumns}
            handleSelectedScheme={handleSelectedScheme}
          />
        )}
      </div>
      {temp && <ViewSelectedScheme data={schemeData} selectedPlan={selectedPlan} />}
      {/* <div>
        {isLoading ? ( // Check loading state
          <p>Loading...</p>
        ) : (
          <>
            
            {isError && <Error msg={errorMessage} />}
          </>
        )}
      </div> */}
    </div>
  );
};

export default PlanServices;
