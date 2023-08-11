import { createContext} from "react";
import { useState } from "react";
export const UserContext=createContext({});

const UserContextProvider=({children})=>{
    const [info,setInfo]=useState({});
    return(
        <UserContext.Provider value={{info,setInfo}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;