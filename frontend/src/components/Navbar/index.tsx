import {Link, useLocation} from "react-router-dom"
import Image from '../Image'
import Search from '../../assets/search.svg'
import Fiverr from '../../assets/fiverr.svg'
import React, { useEffect } from "react"
import { useRole } from "../../contexts/RoleProvider"


const Navbar = () => {
  const location = useLocation()
  const role = useRole()

  const [showNavbar, setShowNavbar] = React.useState(true)

  useEffect(() => {
    if(location.hash === "#payment") 
      {
        setShowNavbar(false)
      }

      return () => {
        setShowNavbar(true)
      }
  }, [location])

  if(!showNavbar) return null

  
  return (
    <>
    <nav className='flex items-center justify-between'>
        <a href="http://fiverr.com" target="_blank" rel="noopener noreferrer"> <Image src={Fiverr} alt="logo" className='w-16'/></a>

        
        {/* <Button className='bg-black p-2 rounded-md'>
            <Image src={Search} alt="logo" className='w-5'  />
        </Button> */}
        <div className="flex items-center justify-end gap-x-4">
        <a href="http://fiverr.com" target="_blank" rel="noopener noreferrer" className='bg-black p-2 rounded-md'><Image src={Search} alt="logo" className='w-5'  /></a>
        {role.role === "admin" && <Link to={"/create-qr"}>Generate Qr</Link>}
        </div>
    </nav>
    </>
  )
}

export default Navbar