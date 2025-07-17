import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/firebasecontext";
import { useNavigate } from "react-router-dom";

const UserLoginPage = () => {
    const firebase = useFirebase();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    useEffect(()=>{
        if(firebase.isLogedIn){
            navigate('/')
        }
    },[firebase, navigate])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const result = await firebase.loginWithEmailAndPassword(email, password);
        console.log(result);
        
    }
    
    return (
        <div className="container py-3">
            <div className="row my-3">
                <div className="col-12">
                    <h3 className="text-center">Sign In</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-8 mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                    <p className="text-center my-4">OR</p>
                    <Button variant="danger" onClick={firebase.signInwithGoogle}>SignIn with Google</Button>
                </div>
            </div>
        </div>
    );
}

export default UserLoginPage;