import React from 'react';
import { Card, Badge, Button, Container } from 'react-bootstrap';

const dummyUsers = [
  { name: "Anny", status: "Active", role: "Admin", email: "anny@example.com", joinedDate: "2021-01-10" },
  { name: "bhawna", status: "Inactive", role: "User", email: "bwna@example.com", joinedDate: "2021-02-15" },
  { name: "Chahat", status: "Active", role: "Moderator", email: "chahat@example.com", joinedDate: "2021-03-20" },
  { name: "sunidhi", status: "Active", role: "User", email: "sunidhi@example.com", joinedDate: "2021-04-25" }
];

function Users() {
  const users = dummyUsers;
  return (
    <Container fluid className="py-4 px-4 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>View User</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Listings */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="fw-bold mb-4">User Listings</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr className="bg-light">
                  <th className="ps-3">Name</th>
                  <th>Status</th>
                  
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td className="ps-3 fw-semibold">{user.name}</td>
                      <td>
                        <Badge bg={user.status === "Active" ? "success" : "secondary"} pill className="px-3 py-2">
                          {user.status}
                        </Badge>
                      </td>
                      
                      <td>{user.email}</td>
                      <td>{user.joinedDate}</td>
                      <td className="text-end pe-3">
                        <Button variant="light" size="sm" className="me-2 px-3">
                          <i className="bi bi-pencil me-1"></i> Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" className="px-3">
                          <i className="bi bi-trash me-1"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Users;
