import { useEffect } from "react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useRole } from "./contexts/RoleProvider"

function App() {

  const navigate = useNavigate()
  const location = useLocation()
  const { role, setRole } = useRole()

  useEffect(() => {
    const url = new URLSearchParams(location.search)
    const isAdmin = url.get("src") == "admin"
    url.delete("src")
    if (isAdmin) {
      setRole("admin")
    }
    if (url.has("orderid")) {
      const orderid = url.get("orderid")
      window.localStorage.setItem("orderid", orderid as string)
    }
    if (role === "guest") {
      navigate(`/home${url.size > 0 ? `?${url.toString()}` : ""}${location.hash}`)
    }
  }, [])


  return (
    <main className="">
      <div className="px-4 border-b border-gray-200">
        <Navbar />
      </div>
      <Outlet />
    </main>
  )
}


export default App