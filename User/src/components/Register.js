import React from 'react'
import '../bootstrap.min.css'
import {useState,useEffect} from 'react'
import axios from "../axios/Axios"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'
import {Loading} from './Loading'
import { NavigationBar } from './Navbar'
import { UnAuthorized } from './UnAuthorized'
import {RiFlightTakeoffFill} from 'react-icons/ri'


export const Register=()=>{

    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [mno,setMno]=useState("")
    const [age,setAge]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    

    const signup=(e)=>{
        const data={
            name:name,
            email:email,
            mno:mno,
            age:age,
            password:password,
            confirm_password:confirmpassword
        }
        axios.post("/user/auth/register",data).then((res)=>{
            if(res.data.status){
                toast.success("Account Created Successfully !")
                setTimeout(()=>{
                    navigate("/login")
                },2000)
            }
            else{
                toast.warning(res.data.msg)
            }
        })
        e.preventDefault()
    }

    return(
        
        <div className='container-fluid'>
            <div>
            <NavigationBar/>
            <br></br>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 login"> 
                        <div>  
                            <div>
                                <h1 className="title" style={{textAlign:"center"}}>SignUp</h1>
                                <br></br>
                            </div>
                            <form onSubmit={signup}>
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input type="text" value={name} placeholder="Eg:Vignesh R G" onChange={(e)=>setName(e.target.value)} className="form-control" required></input>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label>Email :</label>
                                    <input type="email" value={email} placeholder="Eg:vigneshrg.20cse@kongu.edu" onChange={(e)=>setEmail(e.target.value)} className="form-control" required></input>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label>Mobile Number :</label>
                                    <input type="number" value={mno} placeholder="Eg:1234567890" onChange={(e)=>setMno(e.target.value)} className="form-control" required></input>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label>Age :</label>
                                    <input type="number" value={age} placeholder="Eg:20" onChange={(e)=>setAge(e.target.value)} className="form-control" required></input>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label>Password :</label>
                                    <input type="password" placeholder="Enter a strong Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>Password :</label>
                                    <input type="password" placeholder="Re-Type Password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="form-control" required></input>
                                </div>
                                <br></br>
                                <div>
                                    <center>
                                        <button className="btn btn-primary" type="submit">Sign Up</button>
                                    </center>
                                </div>
                               
                            </form>
                            </div>
                        </div>
                <div className="col-md-4"> </div>
            </div>
            <ToastContainer/>
            </div>
            </div>
    )
}