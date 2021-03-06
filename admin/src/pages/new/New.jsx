import './new.scss'
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const New = ({ inputs, title }) => {
  const [file,setFile] = useState("");
  const [info,setInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = e=>{
      setInfo((prev)=>({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async (e) =>{
    e.preventDefault();
    const data = new FormData();
    data.append("file",file)
    data.append("upload_preset","upload")

    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/aa-tech/image/upload",data)

      //image url
      const {url} = uploadRes.data;

      //user info api request
      const newUser = {
        ...info,
        img: url
      }

      await axios.post("/auth/register",newUser);
      
      navigate("/users")

      
    } catch (err) {
        console.log(err)
    }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://i.pinimg.com/originals/f9/58/18/f95818f914844d2b1cf7a45b232061d1.jpg"} alt="" />
          </div>

          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
              </div>
              <input type="file" id='file' onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} id={input.id} placeholder={input.placeholder} />
                </div>
              ))}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default New