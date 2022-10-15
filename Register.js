import React, { useContext, useState, useHistory } from 'react'
import { NavLink } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    // const history = useHistory();

    const [inpval, setINP] = useState({
        photo: "",
        name: "",
        email: "",
        dob: "",
        country: "",
        image: ""
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


    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, photo, add, dob, country } = inpval;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, photo, add, dob, country
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            // history.push("/")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <NavLink to="/">Back to Home Page</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <input type="date" value={inpval.dob} onChange={setdata} name="dob" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" value={inpval.country} onChange={setdata} name="country" class="form-control" id="exampleInputPassword1" />
                    </div>
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="photo" class="form-label">Photo</label>
                        <input type="text" value={inpval.photo} onChange={setdata} name="photo" class="form-control" id="exampleInputPassword1" />
                    </div> */}

                    <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="custom-file">
                                <input type="file" name="photo" class="custom-file-input" value={inpval.photo} onChange={setdata} />
                                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                            </div>
                        </div>
                    </div>
                    </div>



                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;