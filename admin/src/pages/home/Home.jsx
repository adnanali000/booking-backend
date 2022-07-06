import Chart from '../../components/chart/Chart'
import Feature from '../../components/feature/Feature'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/Widget'
import Table from '../../components/table/Table'
import './home.scss'

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <div className="widgets">
          <Widget type ="user"/>
          <Widget type ="order"/>
          <Widget type ="earning"/>
          <Widget type ="balance"/>
        </div>

        <div className="charts">
          <Feature />
          <Chart aspect={2/1} title="Last 7 Months (Revenue)" />
        </div>

        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table /> 
        </div>

      </div>
    </div>
  )
}

export default Home