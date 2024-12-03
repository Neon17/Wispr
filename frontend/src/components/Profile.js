import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
    
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
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    return (
        <div>
            Profile Page
        </div>
    )
}
