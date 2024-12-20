const getUserById = async (userId: string) => {
    // const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;
    // return await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         // Authorization: `Bearer ${token}`
    //     }
    // })

    const user = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/id/${userId}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return await user.json()
}

const getUserByEmail = async (email: string) => {
    // const token = sessionStorage.getItem("loggedInUser")?.token;

    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/email/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`
        }
    })
}

export const UserService = {
    getUserById,
    getUserByEmail
}