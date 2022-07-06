import './single.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="https://avatars.githubusercontent.com/u/46294668?s=400&u=251710adecdc1f44d2e65fd19ffc3862cd80038a&v=4" alt="" className='itemImage' />
              <div className="details">
                <h1 className="itemTitle">Adnan</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">test@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+92 123456809</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">street 123 house 22 test country</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">PAK</span>
                </div>
              </div>
            </div>

          </div>
          <div className="right">
              <Chart  aspect={3/1} title="User spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <div className="title">Last Transactions</div>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Single