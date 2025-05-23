import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const doughnutData = {
    labels: ["Dogs", "Cats", "Rabbits", "Birds"],
    datasets: [
      {
        data: [50, 25, 15, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Pets Adopted",
        backgroundColor: "#36A2EB",
        data: [15, 20, 18, 25, 30, 28, 35],
      },
      {
        label: "New Pets Registered",
        backgroundColor: "#FF6384",
        data: [8, 12, 10, 18, 20, 22, 25],
      },
    ],
  };

  return (
    <div className="container-fluid p-4">
      
      {/* Top Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="mb-3 mb-md-0">Pet NGO Dashboard</h2>
        <div className="btn-toolbar gap-2">
          <button type="button" className="btn btn-outline-secondary btn-sm">Share</button>
          <button type="button" className="btn btn-outline-secondary btn-sm">Export</button>
          <button type="button" className="btn btn-primary btn-sm">This Month</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-white bg-primary text-center">
            <div className="card-body">
              <h5 className="card-title mb-2">Adoptions</h5>
              <h3 className="card-text mb-0">120</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-white bg-success text-center">
            <div className="card-body">
              <h5 className="card-title mb-2">New Pets Registered</h5>
              <h3 className="card-text mb-0">58</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-white bg-warning text-center">
            <div className="card-body">
              <h5 className="card-title mb-2">Volunteers</h5>
              <h3 className="card-text mb-0">25</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-white bg-danger text-center">
            <div className="card-body">
              <h5 className="card-title mb-2">Donations</h5>
              <h3 className="card-text mb-0">$5,400</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4 mt-4">
        <div className="col-12 col-md-6">
          <div className="card h-100">
            <div className="card-header">Pet Category Distribution</div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <div style={{ width: "100%", maxWidth: "350px" }}>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100">
            <div className="card-header">Monthly Adoptions Report</div>
            <div className="card-body">
              <div style={{ width: "100%", height: "300px" }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
