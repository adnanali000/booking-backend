import './newHotel.scss'
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useNavigate } from 'react-router-dom';
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewHotel = () => {
  const [files,setFiles] = useState("");
  const [info,setInfo] = useState({});
  const [rooms,setRooms] = useState([]);
  const navigate = useNavigate();

  const {data,loading,error} = useFetch("/rooms")
  

  const handleChange = e=>{
      setInfo((prev)=>({...prev, [e.target.id]: e.target.value}))
  }
  
  const handleSelect = e=>{
     const value = Array.from(e.target.selectedOptions, (option) => option.value)
     setRooms(value)
  }

  const handleClick = async (e)=>{
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map( async (file)=>{
          const data = new FormData();
          data.append("file",file);
          data.append("upload_preset","upload");
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/aa-tech/image/upload",data)

          const {url} = uploadRes.data;
          return url 
        })
      )

      const newHotel = {
        ...info,
        rooms,
        photos: list
      }
      
      //sending data to db
      axios.post("/hotels",newHotel)
      navigate("/hotels")
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
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">

          <div className="left">
            <img src={files ? URL.createObjectURL(files[0]) : "https://i.pinimg.com/originals/f9/58/18/f95818f914844d2b1cf7a45b232061d1.jpg"} alt="" />
          </div>

          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
              </div>
              <input type="file" id='file' multiple onChange={e => setFiles(e.target.files)} style={{ display: 'none' }} />
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
               <div className="formInput">
                  <label>Featured</label>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className="selectRooms">
                  <label>Rooms</label>
                  <select id="rooms" onChange={handleSelect} multiple>
                   {loading ? "loading" : data && data.map(room=>(
                    <option key={room._id} value={room._id}>{room.title}</option>
                   ))}
                  </select>
                </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewHotel