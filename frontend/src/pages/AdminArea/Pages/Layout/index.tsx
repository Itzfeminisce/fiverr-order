import { NavLink, Outlet } from "react-router-dom"

const AdminPanel = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-4 p-4">
        <NavLink className={({ isActive }) => `${isActive ? "font-semibold" : ""} text-gray-300 text-sm mx-4`} to={"."}>Dashboard</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? "font-semibold" : ""} text-gray-300 text-sm mx-4`} to={"gigs"}>Gigs</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? "font-semibold" : ""} text-gray-300 text-sm mx-4`} to={"cards"}>Cards</NavLink>
      </div>
      <Outlet />
    </>
  )
}

export default AdminPanel