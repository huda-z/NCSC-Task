import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


// import Card from 'react-bootstrap/Card';

const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const { updata, setUPdata } = useContext(updatedata)

    // const history = useHistory("");

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        dob: "",
        country: ""
        // photo: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



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
            console.log("Error");

        } else {
            setINP(data)
            console.log("Get Data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async (e) => {
        e.preventDefault();

        const { name, email, dob, country, photo } = inpval;

        const res2 = await fetch(`/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, dob, country, photo
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert("Please fill with datas");
        } else {
            // history.push("/")
            setUPdata(data2);
        }

    }

    return (

        <div className="container">
            <NavLink to="/">Back to Home Page</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="name" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="email" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <input type="date" value={inpval.dob} onChange={setdata} name="age" class="form-control" id="number" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" value={inpval.country} onChange={setdata} name="country" class="form-control" id="country" />
                    </div>
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="photo" class="form-label">Photo</label>
                        <input type="text" value={inpval.photo} onChange={setdata} name="photo" class="form-control" id="photo" />
                    </div> */}


                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;




