import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addPost } from '../redux/postSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Add() {

    const [show, setShow] = useState(false);
    const [add,setAdd] = useState({
      id:'' , title:'' , body:'', reactions:{likes:0,dislikes:0}
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    const handleAdd=(data)=>{

      const {id,title,body} = add
      if(!id || !title || !body){
        toast.warning('enter valid input')
      }
      else{
        dispatch(addPost(data))

      setAdd({
        id:'' , title:'' , body:'',  reactions:{likes:0,dislikes:0}
      })

      handleClose()
      toast.success("Post Added Successfully!!")
      }
      
    }

  return (
    <>
        <div className='container-fluid '>
            <div className='d-grid'>
                <button className='btn btn-secondary' onClick={handleShow}>Add New Posts...</button>
            </div>

            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className='form-control mb-3' placeholder='Enter Id Here...' onChange={(e)=>{setAdd({...add,id:e.target.value})}}/>
          <input type="text" className='form-control mb-3' placeholder='Enter Title Here...' onChange={(e)=>{setAdd({...add,title:e.target.value})}}/>
          <textarea type="text" className='form-control mb-3' placeholder='Enter Content Here...' onChange={(e)=>{setAdd({...add,body:e.target.value})}}/>
          {/* <input type="text" className='form-control mb-3' placeholder='Enter Tags Here...'/> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleAdd(add)}}>Upload</Button>
        </Modal.Footer>
      </Modal>

        </div>
    </>
  )
}

export default Add