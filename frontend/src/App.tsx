import { useEffect } from "react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useRole } from "./contexts/RoleProvider"
import { GigProvider } from "./hooks/useGigData"

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
    if (url.has("gigId")) {
      const gigId = url.get("gigId")
      window.localStorage.setItem("gigId", gigId as string)
    }
    if (role === "guest") {
      navigate(`/home${url.size > 0 ? `?${url.toString()}` : ""}${location.hash}`)
    }
  }, [])


  return (
    <GigProvider>
      <main className="">
        <div className="px-4 border-b border-gray-200">
          <Navbar />
        </div>

        <Outlet />
      </main>
    </GigProvider>
  )
}


export default App