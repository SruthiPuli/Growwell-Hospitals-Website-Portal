import {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider({children}){
    const [current_user, SetCurrentUser] = useState(null);
    const [current_doctor, SetCurrentDoctor] = useState(null);
    const [current_page, SetCurrentPage] = useState(null);
    const [selected, SetSelected] = useState(0);

    return(
        <UserContext.Provider value = {{current_user, SetCurrentUser, current_doctor, SetCurrentDoctor, current_page, SetCurrentPage, selected , SetSelected}}>
            {children}
        </UserContext.Provider>
    );
}