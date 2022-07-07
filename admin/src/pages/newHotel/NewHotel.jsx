import './newHotel.scss'
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

const NewHotel = ({ inputs, title }) => {
  const [file,setFile] = useState("");
  
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
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}

              <button>Send</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewHotel