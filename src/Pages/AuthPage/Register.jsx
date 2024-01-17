import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

const Register = () => {
    const { redirectLog } = useSelector(s => s?.auth)

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const [img, setImg] = useState("")
    const [error, setError] = useState({})

    const validation = () => {
        let error = {}

        if (!user.first_name) {
            error.first_name = "First name is required"
        }
        if (!user.last_name) {
            error.last_name = "Last name is required"
        }
        if (!user.email) {
            error.email = "Email is Required";
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                user.email
            )
        )
            if (!user.password) {
                error.password = "Password is required"
            }
    }

    let name, value
    const postUserData = (e) => {
        name = e.target.name;
        value = e.target.value;
        // setUser({...user,[name]:value});
        if (name === "first_name") {
            if (value.length === 0) {
                setError({ ...error, first_name: "First name is Required" })
                setUser({ ...user, first_name: "" })
            }
            else {
                setError({ ...error, first_name: "" })
                setUser({ ...user, first_name: value })
            }
        }

        if (name === "last_name") {
            if (value.length === 0) {
                setError({ ...error, last_name: "Last name is Required" })
                setUser({ ...user, last_name: "" })
            }
            else {
                setError({ ...error, last_name: "" })
                setUser({ ...user, last_name: value })
            }
        }
        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "Email is required" })
                setUser({ ...user, email: "" })
            }
            else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
            }
        }
        if (name === "password") {
            if (value.length === 0) {
                setError({ ...error, password: "Password is required" })
                setUser({ ...user, password: "" })
            }
            else {
                setError({ ...error, password: "" })
                setUser({ ...user, password: value })
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(validation())
        let formdata = new FormData()
        formdata.append("first_name", user.first_name)
        formdata.append("last_name", user.last_name)
        formdata.append("email", user.email)
        formdata.append("password", user.password)
        formdata.append("profile_pic", img)
        dispatch(registerUser(formdata))
    }

    // const nav = useNavigate()

    const RedirectLogin = () => {
        let firstname = localStorage.getItem("name")
        if (firstname !== null && firstname !== undefined && firstname !== "") {
            // nav('/login')
        }
    }

    useEffect(() => {
        RedirectLogin();
    }, [redirectLog])

    return (
        <>
            <Container>
                <h1 className='text-center'>Registration</h1>
                <form>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" value={user.first_name} onChange={postUserData} placeholder="Enter email id" />
                        <span style={{ color: 'red' }}>
                            {error.first_name}{" "}
                        </span>
                    </div>
                    <div className='mb-3'>
                        <label for="exampleFormControlInput2" class="form-label">First Name</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" value={user.last_name} onChange={postUserData} placeholder="Enter email id" />
                        <span style={{ color: 'red' }}>
                            {error.last_name}{" "}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput3" value={user.email} onChange={postUserData} placeholder="Enter email id" />
                        <span style={{ color: 'red' }}>
                            {error.email}{" "}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput4" class="form-label">Password</label>
                        <input type="email" class="form-control" id="exampleFormControlInput4" value={user.password} onChange={postUserData} placeholder="Enter email id" />
                        <span style={{ color: 'red' }}>
                            {error.email}{" "}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputImage" class="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                            name="img"
                            accept="image/*"
                            class="form-control"
                        />
                        {img !== "" && img !== undefined && img !== null ? (
                            <img
                                style={{ height: "180px" }}
                                src={URL.createObjectURL(img)}
                                alt=""
                                className="upload-img"
                            />
                        ) : (
                            <>{img === "" && <p>Drag or drop content here</p>}</>
                        )}
                    </div>
                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Register</button>
                </form>
                <p>Have an account? </p><Link to="/login">Login</Link>

            </Container>
        </>
    )
}

export default Register