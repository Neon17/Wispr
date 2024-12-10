import React, { useEffect } from 'react'
import axios from 'axios';

function uploadProfilePicture(props) {
    const submitForm = async () => {
        var form = document.getElementById("myProfilePictureForm123");
        var fd = new FormData();
        let files = document.getElementById('imageInput').files[0];
        fd.append('userProfile', files);
        const axiosConfig = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        // const response = await fetch("http://localhost:5000/api/v1/users/uploadProfilePicture", {
        //     method: "POST",
        //     body: fd,
        // });
        const response = await axios.post("http://localhost:5000/api/v1/users/uploadProfilePicture",
            fd, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.status != 'success') {
            throw new Error(response.data.message);
        }
        console.log(response);
    }

    const previewUploadedImage = () => {
        let imageInput = document.getElementById("imageInput");
        let imageOutput = document.getElementById("imageOutPut");
        let imageName = document.getElementById("imageName");
        imageInput.onchange = (ev) => {
            imageOutput.alt = "preview";
            imageOutput.src = URL.createObjectURL(ev.target.files[0]);
            imageName.innerHTML = `<b> ${ev.target.files[0].name} </b>`
            imageOutput.onload = () => {
                URL.revokeObjectURL(imageOutput.src);
            }
        }
    }

    setInterval(() => {
        previewUploadedImage();
    }, 2000)

    // useEffect(()=>{
    //     previewUploadedImage();
    // })

    return (
        <div className="form-wrapper  container p-2" style={{ marginTop: '80px' }}>
            <h3>Upload Profile Picture</h3>

            <div className="main">
                <form id='myProfilePictureForm123' method="POST" encType="multipart/form-data">
                    {/* <input type='text' name="token" value={localStorage.getItem('token')}/> */}
                    <input type="file" accept="image/*" id="imageInput" name="userProfile" />
                    <div className="image-preview mt-2">
                        <img id="imageOutPut" style={{ maxHeight: '100px', objectFit: 'contain' }} />
                        <p id="imageName"></p>
                    </div>
                    <button type="button" id="submit" className="btn btn-primary" onClick={submitForm}>Upload</button>
                </form>
            </div>

        </div>
    )
}

export default uploadProfilePicture;
