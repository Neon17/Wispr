import axios from "axios";
import { useEffect } from "react";
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
    const [show, setShow] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [profile, setProfile] = useState({
      name: 'Kushal Baral',
      username: '@kushal1o1',
      dob: '2003-01-01',
      bio: 'Never Change',
      image: 'sthlink'
    });
  
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
    };
    useEffect(()=>{
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        console.log(localStorage.getItem('token'));
        axios.get('http://localhost:5000/api/v1/users/profile', axiosConfig)
        .then((res)=>{
            // TO DO: api update involve dob,bio,and profile image
            // setProfile(res.data.data);
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    return (
        <div className="container mt-5">
        <div className="card p-4">
          <div className="row">
            <div className="col-md-3">
              <img src={profile.image} alt="Profile" className="img-fluid rounded-circle" />
            </div>
            <div className="col-md-7">
              <h2>{profile.name}</h2>
              <p className="text-muted">{profile.username}</p>
              <p><i className="bi bi-calendar"></i> {profile.dob}</p>
              <p><i className="bi bi-person"></i> {profile.bio}</p>
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-primary" onClick={() => setShow(true)}>
                <i className="bi bi-pencil"></i> Edit
              </button>
            </div>
          </div>
        </div>
  
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <div className="position-relative d-inline-block">
                  <img 
                    src={imagePreview || profile.image} 
                    alt="Preview" 
                    className="rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <label className="btn btn-primary btn-sm position-absolute bottom-0 end-0">
                    <i className="bi bi-upload"></i>
                    <input type="file" className="d-none" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
              </div>
  
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" defaultValue={profile.name} />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" defaultValue={profile.username} />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" defaultValue={profile.dob} />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea className="form-control" rows="4" defaultValue={profile.bio}></textarea>
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
