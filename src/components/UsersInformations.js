import { useEffect, useState } from "react"



export default function UsersInformations ({userInfo}){

    const [information, setInformation] = useState(null)
    const [editInfo, setEditInfo] = useState(false)

    const editUserInformation = async (e, theID) => {
        e.preventDefault();

        try{
            const res = await fetch(`http://localhost:8000/users/${information._id}`,
                {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + window.localStorage.getItem("token")
                    },
                    body: JSON.stringify(information) 
                  
                }
            );
            const editedData = res.json();
            
        } catch (err){
            console.error(err)
        }
    }
    const handleChange = (e) => {
        setInformation({...information, [e.target.name]: e.target.value})
        console.log(information)
    }

    useEffect(() => {
        setInformation(userInfo)
    }, [userInfo])
    
    return(
        <div>
        {information?
            <div>
                <button onClick={() => setEditInfo(!editInfo)}>{editInfo? "Cancel" : "Edit Information"}</button>
                {
                    editInfo? 

                    <form onSubmit={()=> editUserInformation()}>
                        <br />
                        User Name: <input type="text" name="username" onChange={handleChange} value={userInfo.username} /> <br /> <br />
                        First Name: <input type="text" name="firstName" onChange={handleChange} value={userInfo.firstName} /> <br /> <br />
                        Last Name: <input type="text" name="lastName" onChange={handleChange} value={userInfo.lastName} /> <br /> <br />
                        Birthdate: <input type="text" name="birthday" onChange={handleChange} value={userInfo.birthday} /> <br /> <br />
                        About Me: <input type="text" name="bio" onChange={handleChange} value={userInfo.bio} /> <br /> <br />
                        <input type="submit" />
                    </form>
                    :
                    <div>
                        <p>{userInfo.username}</p>
                        <p>{userInfo.firstName}</p>
                        <p>{userInfo.lastName}</p>
                        <p>{userInfo.birthday}</p>
                        <p>{userInfo.bio}</p>
                    </div>
                }

            </div>
        :
        <p>loading</p>}
        </div>
    )

}