import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import defaultimg from './default.jpg';
export default function Profile() {
    const [show, setShow] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [profile, setProfile] = useState({});
  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(false);
        // Logic to handle profile update (e.g., API call)
        console.log("Profile updated!");
    };

    useEffect(() => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        };

        axios.get('http://localhost:5000/api/v1/users/profile', axiosConfig)
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching profile:", err.message);
            });
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.reload();
        }
    }, []);

    return (
      <div className="container pt-3" style={{ marginTop: '76px' }}>
        <h1 className="text-center mb-4" style={{ fontWeight: 'bold', animation: 'fadeIn 1s' }}>Profile</h1>
        <div className="card p-4 shadow-lg" style={{ animation: 'slideInUp 0.5s' }}>
          <div className="row">
            <div className="col-md-3">
              <img
                src={profile.image || imagePreview || defaultimg}
                alt="Profile"
                className="img-fluid rounded-circle  item-center shadow"
                style={{ width: '250px', height: '250px', objectFit: 'cover' ,animation: 'zoomIn 0.5s'}}
              />
            </div>
            <div className="col-md-7 d-flex align-items-center justify-content-between flex-column p-0">
              <h2 style={{ animation: 'fadeIn 1s' }}>{`${profile.firstName} ${profile.middleName ? profile.middleName + " " : ""}${profile.lastName}`}</h2>
              <p className="text-muted" style={{ animation: 'fadeIn 1s' }}>{profile.username}</p>
              <p style={{ animation: 'fadeIn 1s' }}><i className="fs-5 bi bi-calendar"></i> {profile.dob}</p>
              <p style={{ animation: 'fadeIn 1s' }}><i className="fs-5 bi bi-person"></i> {profile.bio}</p>
              <p style={{ animation: 'fadeIn 1s' }}><i className="fs-5 bi bi-envelope"></i> {profile.email}</p>
            </div>
            <div className="col-md-2 d-flex align-items-center justify-content-center">
              <button className="btn btn-outline-primary" onClick={() => setShow(true)} style={{ animation: 'fadeIn 1s' }}>
                <i className="fs-4 bi bi-pencil"></i> Edit
              </button>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {/* Profile Image Upload */}
              <div className="text-center mb-3">
                <div className="position-relative d-inline-block rounded-circle bg-light border"style={{ width: '100px', height: '100px', objectFit: 'cover' }}>
                  <img
                    src={imagePreview || profile.image || defaultimg}
                    alt="Preview"
                    className="rounded-circle "
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <label className="btn btn-primary btn-sm position-absolute bottom-0 end-0">
                    <i className=" fa fa-upload"></i>
                    <input
                      type="file"
                      className="d-none"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              {/* Name Fields */}
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={profile.firstName}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={profile.middleName}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={profile.lastName}
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={profile.username}
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={profile.dob}
                />
              </div>

              {/* Bio */}
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  rows="4"
                  defaultValue={profile.bio}
                />
              </div>

              <div className="text-end">
                <button type="button" className="btn btn-secondary me-2" onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
}
