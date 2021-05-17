import { useEffect, useState } from "react"



export default function UsersInformations ({userInfo}){

    const [information, setInformation] = useState(null)
    const [editInfo, setEditInfo] = useState(false)

    const deleteUser = async (e) => {
        try {
            const response = await fetch(
            `http://localhost:8000/users/${information._id}`,
            {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
            );
            const data = await response.json();
            console.log(data)
        } catch(err) {
            console.log(err)
        }
    }



    const editUserInformation = async (e) => {
        // e.preventDefault();

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
            console.log(information)
            setInformation(information)
            
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
        {information ?
            <div>
                <button onClick={() => setEditInfo(!editInfo)}>{editInfo? "Cancel" : "Edit Information"}</button>
                {
                    editInfo? 
                    <div>
                        <form onSubmit={editUserInformation}>
                            User Name: <input type="text" name="username" onChange={handleChange} defaultValue={userInfo.username} /> <br /> <br />
                            First Name: <input type="text" name="firstName" onChange={handleChange} defaultValue={userInfo.firstName} /> <br /> <br />
                            Last Name: <input type="text" name="lastName" onChange={handleChange} defaultValue={userInfo.lastName} /> <br /> <br />
                            Birthdate: <input type="text" name="birthday" onChange={handleChange} defaultValue={userInfo.birthday} /> <br /> <br />
                            About Me: <input type="text" name="bio" onChange={handleChange} defaultValue={userInfo.bio} /> <br /> <br />
                            <input type="submit" />
                        </form>
                        <button onClick={deleteUser}>Delete Account</button>
                    </div>
                    :
                    <div>
                        <p>User Name: {userInfo.username}</p>
                        <p>First Name: {userInfo.firstName}</p>
                        <p>Last Name: {userInfo.lastName}</p>
                        <p>Birthdate: {userInfo.birthday}</p>
                        <p>About Me: {userInfo.bio}</p>
                    </div>
                }

            </div>
        :
        <p>loading</p>}
        </div>
    )

}