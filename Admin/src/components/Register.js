import React from 'react'
import '../bootstrap.min.css'
import {useState,useEffect} from 'react'
import axios from "../axios/Axios";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'
import {Loading} from './Loading'
import { NavigationBar } from './Navbar'
import { UnAuthorized } from './UnAuthorized'

export const Register=()=>{

    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [mno,setMno]=useState("")
    const [age,setAge]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        if(!localStorage.getItem("airlines_token")){
            setLoading(false)
            setTimeout(()=>{
                navigate("/login")
            },3000)
        }
        else{
            setTimeout(()=>{
                setLoading(false)
            },1000)
        }
    },[])


    const signup=(e)=>{
        const data={
            name:name,
            email:email,
            mno:mno,
            age:age,
            password:password,
            confirm_password:confirmpassword
        }
        axios.post("/admin/auth/register",data).then((res)=>{
            if(res.data.status){
                toast.success("Admin Added Successfully !")
                setTimeout(()=>{
                    navigate("/")
                },2000)
            }
            else{
                toast.error(res.data.msg)
            }
        }).catch((err)=>{
            toast.error('Internal Server Error')
        })

        e.preventDefault()
    }

    return(
        
        <div className='container-fluid'>
            <div>
            <NavigationBar/>
            {localStorage.getItem("airlines_token")?<div>
            <br></br>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 login"> 
                        <div>  
                            <div>
                                <h1 className="title" style={{textAlign:"center"}}>Add Admin</h1>
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
                                <br></br>
                                <div className="form-group">
                                    <label>Confirm Password :</label>
                                    <input type="password" placeholder="Re-Type Password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="form-control" required></input>
                                </div>
                                <br></br>
                                <div>
                                    <center>
                                        <button className="btn btn-primary" type="submit">Add Admin</button>
                                    </center>
                                </div>
                                <br></br>
                                
                            </form>
                            </div>
                        </div>
                <div className="col-md-4"> </div>
            </div>
            <ToastContainer/>
            </div>:<UnAuthorized/>}
            </div>
            </div>
    )
}