import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebasecontext';

const ListingPage = ()=>{
    const firebase = useFirebase()
    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await firebase.createNewListing(name, isbnNumber, price, coverPic)
    }
    return(
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
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" placeholder="Book Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>ISBN Number</Form.Label>
                            <Form.Control type="text" placeholder="ISBN Number" onChange={(e)=>setIsbnNumber(e.target.value)} value={isbnNumber} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="price" onChange={(e)=>setPrice(e.target.value)} value={price} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control type="file" onChange={(e)=>setCoverPic(e.target.files[0])} />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                    
                </div>
            </div>
        </div>
    );
}


export default ListingPage;