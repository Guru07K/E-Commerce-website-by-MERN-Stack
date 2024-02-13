import { Route, Routes } from 'react-router-dom'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import AddProduct  from '../../Components/AddProduct/AddProduct'
import Listproduct  from '../../Components/Listproduct/Listproduct'


const Admin = () => {
  return (
    <div className="admin">
      <Sidebar/>

      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<Listproduct/>}/>
      </Routes>
        
    </div>
  )
}

export default Admin