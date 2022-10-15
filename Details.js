import React, { useEffect, useState } from 'react'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import { NavLink, useParams } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    // const history = useHistory();

    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            // history.push("/");
        }

    }

    return (

        <div className="container mt-3">
        <NavLink to="/">Back to Home Page</NavLink>
            <div class="card">
                <div class="container">
                    <div className="add_btn">
                        <ul>
                        <button className='btn btn-primary' onClick={() => updatedata(getuserdata._id)}><i class="fa-regular fa-pen-to-square"></i></button>
                        <button className='btn btn-danger' onClick={() => deleteuser(getuserdata._id)}><i class="fa-solid fa-trash"></i></button>

                        </ul>
                    </div>
                    </div>

                    <ul>
                        <h3 style={{ fontWeight: 400 }}><img src="https://cdn4.vectorstock.com/i/1000x1000/08/33/profile-icon-male-user-person-avatar-symbol-vector-20910833.jpg" width="45" height="55"></img>
                            {getuserdata.name} </h3>
                    </ul>

                    <div class="container">
                </div>
                <div className="row">
                    <div className="left_view col-lg-6 col-md-6 col-12">
                        <ul>  <h6 className="mt-3">Name: <span >{getuserdata.name}</span></h6>
                            <h6 className="mt-3">Age: <span >{getuserdata.dob}</span></h6>
                            <p className="mt-3"> Email: <span>{getuserdata.email}</span></p>
                        </ul>

                    </div>
                </div>
                <div className="right_view  col-lg-6 col-md-6 col-12">
                    <ul>
                        <p className="mt-3">Country: <span>{getuserdata.country}</span></p>
                        <p className="mt-3">Photo: <span>{getuserdata.photo}</span></p>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Details
