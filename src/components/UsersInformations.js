import { useEffect, useState } from "react"



export default function UsersInformations ({userInfo}){

    const [information, setInformation] = useState(null)

    useEffect(() => {
        setInformation(userInfo)
    }, [userInfo])
    
    return(
        <div>
        {information?
            <div>
                <p>{userInfo.username}</p>
                <p>{userInfo.firstName}</p>
                <p>{userInfo.lastName}</p>
                <p>{userInfo.birthday}</p>
                <p>{userInfo.bio}</p>

            </div>
        :
        <p>loading</p>}
        </div>
    )

}