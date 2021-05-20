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
        <div className="m-5 border-black border-2 p-2 rounded">
        {information ?
            <div>
                <div className="flex justtify-between w-full">
                    <button className="w-20 bg-gray-500 border-2 border-black rounded mr-28" onClick={() => setEditInfo(!editInfo)}>{editInfo? "Cancel" : "Edit"}</button>
                    {editInfo ? <button className="w-20 bg-gray-500 border-2 border-black rounded flex-inline justify-end" onClick={deleteUser}>Delete Account</button> : ""} 
                </div>
                {
                    editInfo? 
                    <div>
                        <form onSubmit={editUserInformation}>
                            User Name: <input type="text" name="username" onChange={handleChange} defaultValue={userInfo.username} className="border-blue border-2 p-1 rounded" /> <br /> <br />
                            First Name: <input type="text" name="firstName" onChange={handleChange} defaultValue={userInfo.firstName} className="border-blue border-2 p-1 rounded" /> <br /> <br />
                            Last Name: <input type="text" name="lastName" onChange={handleChange} defaultValue={userInfo.lastName} className="border-blue border-2 p-1 rounded" /> <br /> <br />
                            Birthdate: <input type="text" name="birthday" onChange={handleChange} defaultValue={userInfo.birthday} className="border-blue border-2 p-1 rounded" /> <br /> <br />
                            <p>About Me:</p><textarea name="bio" onChange={handleChange} defaultValue={userInfo.bio} className="border-blue border-2 p-1 rounded w-2/5 h-40"/> <br /> <br />
                            
                            <input className="w-20 bg-gray-500 border-2 border-black rounded" type="submit" />
                        </form>
                    </div>
                    :
                    <div>
                        <p>User Name: {userInfo.username}</p>
                        <p>First Name: {userInfo.firstName}</p>
                        <p>Last Name: {userInfo.lastName}</p>
                        <p>Birthdate: {userInfo.birthday}</p>
                        <p className="border-black border-2 p-2 rounded">About Me: {userInfo.bio}</p>
                    </div>
                }

            </div>
        :
        <p>loading</p>}
        </div>
    )

}