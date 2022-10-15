import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { adddata, deldata, updata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'

// const {udata, setUdata} = useContext();

const Home = () => {
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    
    const { udata, setUdata } = useContext(adddata);
    const { updata, setUPdata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    const getdata = async () => {

        const res = await fetch("/getdata", {
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
            setUserdata(data)
            console.log("Get Data");

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
            console.log("Error");
        } else {
            console.log("User Deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }


    return (
        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  Added Succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  Updated Succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  Deleted Succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className='btn btn-primary'><i class="fa-solid fa-plus"></i>Add User</NavLink>
                    </div>
                    <table class="table">
                        <thead>
                            <tr className='table-success'>
                                <th scope="col">id</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email</th>
                                {/* <th scope="col">Country</th> */}
                                <th scope="col">Age</th>
                                {/* <th scope="col">Photo</th> */}
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                {/* <td>{element.country}</td> */}
                                                <td>{element.dob}</td>
                                                {/* <td>{element.photo}</td> */}
                                                <td className='d-flex justify-content-between'>
                                                    <NavLink to={`view/${element._id}`}>
                                                        <button className='btn btn-success'><i class="fa-solid fa-eye"></i></button>
                                                    </NavLink>

                                                    <NavLink to={`edit/${element._id}`}>
                                                        <button className='btn btn-primary'><i class="fa-regular fa-pen-to-square"></i></button>
                                                    </NavLink>

                                                    <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><i class="fa-solid fa-trash"></i></button>
                                                </td>

                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default Home
