import {Datacontext} from "../App"
import {useState, useContext} from "react"

export default function UsersPage () {
    const {isLoggedIn, setIsLoggedIn, token, setToken} = useContext(Datacontext)



    
    return (
        <div>
            {
                isLoggedIn?
                    <div>
                        UsersPage
                    </div>
                :
                    <div>
                        Login
                    </div>
            }
        </div>
    )

}