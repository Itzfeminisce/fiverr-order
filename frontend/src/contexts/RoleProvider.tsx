import { createContext, Dispatch, FC, PropsWithChildren, useContext, useState } from 'react'

type Role = {
    role: "guest" | "admin"
    setRole: Dispatch<React.SetStateAction<Role['role']>>

}

const defaultRole: Role['role'] = "guest"


const RoleContext = createContext<Role | undefined>(undefined)

export const useRole = () => {
    const ctx = useContext(RoleContext)
    if (!ctx) {
        throw new Error("useRole not callable outsde RoleContext Provider")
    }
    return ctx
}

const RoleProvider: FC<PropsWithChildren> = ({ children }) => {
    const [role, setRole] = useState<Role['role']>(defaultRole)

    return (
        <RoleContext.Provider value={{role, setRole}}>
            {children}
        </RoleContext.Provider>
    )
}

export default RoleProvider