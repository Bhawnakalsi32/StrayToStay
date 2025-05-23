import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Badge, ProgressBar } from "react-bootstrap";
import ApiServices from "../../../services/ApiServices";
import { BsPeopleFill, BsBuilding, BsBookmarkStarFill, BsHeartFill } from "react-icons/bs";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDash = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const res = await ApiServices.adminDash({});
      if (res.data.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Dashboard load error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const StatCard = ({ title, icon, total, active, inactive, color }) => {
    const pieData = {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          data: [active, inactive],
          backgroundColor: [color, "#d1d5db"], // color + gray for inactive
          borderWidth: 1,
        },
      ],
    };

    const pieOptions = {
      plugins: { legend: { display: false } },
      maintainAspectRatio: false,
    };

    const activePercent = total > 0 ? Math.round((active / total) * 100) : 0;

    return (
      <Card
        className="mb-4 shadow"
        style={{
          borderRadius: "12px",
          backgroundColor: "#fff",
          minHeight: "170px",
          padding: "20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center" style={{ flex: 1 }}>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-4"
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: `${color}30`,
                boxShadow: `0 0 8px ${color}80`,
              }}
            >
              {React.cloneElement(icon, { size: 28, color })}
            </div>
            <div>
              <h5 className="mb-1 fw-bold">{title}</h5>
              <h3 className="mb-2" style={{ color }}>
                {total}
              </h3>
              <div>
                <Badge bg="success" className="me-2" style={{ fontSize: "0.8rem" }}>
                  Active: {active}
                </Badge>
                <Badge bg="secondary" style={{ fontSize: "0.8rem" }}>
                  Inactive: {inactive}
                </Badge>
              </div>
              <ProgressBar
                now={activePercent}
                label={`${activePercent}% Active`}
                variant="success"
                style={{
                  height: "16px",
                  marginTop: "12px",
                  width: "100%",
                  maxWidth: "280px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>
          <div style={{ width: "70px", height: "70px", marginLeft: "20px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </Card>
    );
  };

  const { users, ngos, breeds, pets } = stats;

  return (
    <Container fluid className="py-4 px-4 bg-light min-vh-100">
       <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>DashBoard</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col md={6}>
          <StatCard
            title="Total Users"
            icon={<BsPeopleFill />}
            total={users.total}
            active={users.active}
            inactive={users.inactive}
            color="#6366F1"
          />
        </Col>
        <Col md={6}>
          <StatCard
            title="Total NGOs"
            icon={<BsBuilding />}
            total={ngos.total}
            active={ngos.active}
            inactive={ngos.inactive}
            color="#8B5CF6"
          />
        </Col>
        <Col md={6}>
          <StatCard
            title="Total Breeds"
            icon={<BsBookmarkStarFill />}
            total={breeds.total}
            active={breeds.active}
            inactive={breeds.inactive}
            color="#EC4899"
          />
        </Col>
        <Col md={6}>
          <StatCard
            title="Total Pets"
            icon={<BsHeartFill />}
            total={pets.total}
            active={pets.active}
            inactive={pets.inactive}
            color="#14B8A6"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDash;
