import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Add from '../components/Add'
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import './home.css'
import { fetchPostThunk } from '../redux/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { addLike, addDislike, deletePost,editPost } from '../redux/postSlice';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Home() {

    const [edit, setEdit] = useState({
        id: '', title: '', body: '', reactions: { likes: '', dislikes: '' }
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true);
        setEdit({
            id: data.id, title: data.title, body: data.body, reactions: { likes: data.reactions.likes, dislikes: data.reactions.dislikes }
        })
    }

    const { posts, error, loading } = useSelector((state) => state.postReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostThunk())
        console.log(posts);

    }, [])

    const handleLike = (id) => {
        dispatch(addLike(id))
    }

    const handleDislike = (id) => {
        dispatch(addDislike(id))
    }

    const handleDelete = (id) => {
        dispatch(deletePost(id))
        toast.success("Post deleted Successfully!!")
    }

    const handleEdit = () =>{
        dispatch(editPost(edit))
        toast.success('Post Edited Successfully!!')
        handleClose()
    }

    return (
        <>
            <Header />
            <div className='container-fluid p-5'>
                <Add />
                <div className='mt-5 row'>
                    {
                        loading ?
                            <h3>
                                <Spinner animation='border' role='status'></Spinner>
                                <span>Loading...</span>
                            </h3>
                            :
                            (
                                error ?
                                    <h3>{error}</h3>
                                    :
                                    <>
                                        {
                                            posts.map((item) => (


                                                <div className='col mb-4'>
                                                    <Card style={{ width: '18rem', height: '480px' }}>
                                                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                                        <Card.Body>
                                                            <Card.Title>
                                                                <div className='d-flex justify-content-between'>
                                                                    {item.title}
                                                                    <div>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown">
                                                                                <i className="fa-solid fa-ellipsis-vertical" />
                                                                            </Dropdown.Toggle>

                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item>
                                                                                    <i className="fa-solid fa-pen-nib" style={{ color: "#74C0FC", }} onClick={()=>{handleShow(item)}}/> {' '}
                                                                                        <i className="ms-2 fa-solid fa-trash" style={{ color: "#b52c47", }} onClick={() => { handleDelete(item.id) }} />

                                                                                </Dropdown.Item>
                                                                                {/* <Dropdown.Item>
                                                                                </Dropdown.Item> */}
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>

                                                                    </div>
                                                                </div>
                                                            </Card.Title>
                                                            <Card.Text>
                                                                {item.body}

                                                            </Card.Text>
                                                            <div>
                                                                <i className="fa-solid fa-thumbs-up" style={{ color: "#B197FC", }} onClick={() => { handleLike(item.id) }} />{' '}{item.reactions.likes}{' '}
                                                                <i className="fa-solid fa-thumbs-down ms-3" style={{ color: "#B197FC", }} onClick={() => { handleDislike(item.id) }} />{' '}{item.reactions.dislikes}
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            ))
                                        }
                                    </>
                            )
                    }
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" value={edit.title} className='form-control mb-3' onChange={(e)=>{setEdit({...edit,title:e.target.value})}}/>
                        <textarea type="text" className='form-control' value={edit.body} onChange={(e)=>{setEdit({...edit,body:e.target.value})}}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEdit}>update</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Home