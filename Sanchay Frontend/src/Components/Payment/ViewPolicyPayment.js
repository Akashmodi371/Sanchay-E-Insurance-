import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./ViewPolicyPayment.css";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ViewPolicyPayment.css";

const ViewPolicyPayment = ({ policyData, setPolicyFetch }) => {
  console.log(policyData);
  const [installmentsPaid, setInstallmentsPaid] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100); // Initialize with a default page size
  const paymentlist = policyData.payments?.length;
  const [agentcomissionpercentage, setAgentCommissionPercentage] = useState(5);
  const [count, setCount] = useState(0);

  const addcomissiontoagent = async (agentId, agentcommission) => {
    try {
      if (agentId && agentcommission) {
        console.log(agentId);
        console.log(agentcommission);
        // Check if agentid and agentcommission are defined
        await axios.post(
          `http://localhost:8080/agentapp/addcommion/${agentId}/${agentcommission}`
        );
      }
    } catch (error) {
      // Handle any potential errors here
      console.error("Error adding commission to agent:", error);
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handlePayClick = async (premiumData, index) => {
    console.log(premiumData);
    const currentDate = getFormattedDate();

    try {
      const policynumber = policyData.policyNumber;
      console.log(policyData);
      if (policyData.agentId) {
        const agentcommission =
          (agentcomissionpercentage * premiumData.amount) / 100; // Define agentcommission
        console.log(agentcommission, "agentcommison");
        await addcomissiontoagent(policyData.agentId, agentcommission);
      } else {
        console.log("Agent ID is not defined for this policy.");
      }

      await axios.post(
        `http://localhost:8080/paymentapp/addpayment/${policynumber}`,
        {
          premiumdate: currentDate,
          amountpaid: premiumData.amount,
        }
      );

      const updatedInstallmentsPaid = [...installmentsPaid];
      updatedInstallmentsPaid[index] = true;
      setInstallmentsPaid(updatedInstallmentsPaid);
      getpaidornot();
      Swal.fire("", "Payment Done Successfully!", "success");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getpaidornot();
  }, []);

  let temp1 = policyData.numberOfInstallment;
  let temp2 = 0;
  const getpaidornot = () => {
    for (let i = 0; i < installmentsPaid.length; i++) {
      if (installmentsPaid[i] === "Paid") {
        console.log(installmentsPaid[i], "installments ");
        temp2++;
      }
    }
  };

  const renderPaymentRows = () => {
    const rows = [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    console.log(policyData.numberOfInstallment);
    for (
      let i = startIndex + 1;
      i <= endIndex && i <= policyData.numberOfInstallment;
      i++
    ) {
      const premiumDate = new Date(policyData.issueDate);
      premiumDate.setMonth(premiumDate.getMonth() + (i - 1));

      if (
        selectedDate &&
        premiumDate.toDateString() !== selectedDate.toDateString()
      ) {
        continue;
      }

      rows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{policyData.premiumAmount}</td>
          <td>{premiumDate.toDateString()}</td>
          <td>
            {i <= paymentlist ? (
              "Paid"
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  handlePayClick(
                    {
                      installment: i,
                      amount: policyData.premiumAmount,
                      premiumDate: premiumDate.toISOString(),
                    },
                    i - 1
                  );
                  setCount((prev) => prev + 1);
                }}
                disabled={installmentsPaid[i - 1]}
              >
                {installmentsPaid[i - 1] ? "Paid" : "Pay"}

                {/* {installmentsPaid[i-1]==totalinst?temp2++:null} */}
              </Button>
            )}
          </td>
        </tr>
      );
    }

    return rows;
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const pageCount = Math.ceil(policyData.numberofinstallment / pageSize);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const pageSizeOptions = [5, 10, 20];

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  console.log(policyData.numberOfInstallment);
  return (
    <div className="viewPolicyPayment-div">
      <h2>Policy Payment Information</h2>
      
      <div style={{ overflowX: "auto" }}>
        <Table striped bordered hover className="viewPolicyPayment-div-table">
          <thead>
            <tr>
              <th>Installment</th>
              <th>Premium Amount</th>
              <th>Premium Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderPaymentRows()}</tbody>
        </Table>
      </div>
      <div className="pagination">
        {Array.from({ length: pageCount }, (_, i) => (
          <button key={i} onClick={() => changePage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <div>
        <div>
          <div className="text-center">
            {policyData.numberOfInstallment ===
            policyData.payments.length + count ? (
              <button
                onClick={() => {
                  Swal.fire(
                    "",
                    "Congratulations You can accept Claim amount From office with documents",
                    ""
                  );
                }}
              >
                Claim Policy
              </button>
            ) : (
              <button disabled className="mt-4">
                Claim Policy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPolicyPayment;
