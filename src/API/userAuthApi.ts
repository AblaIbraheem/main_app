import { API } from 'aws-amplify';

const UserAuthApi = () => {
    const apiName = 'auth';
    const header = { "Content-Type": "application/json" }
    return {
        checkIsUserExist: async (email, phone) => {
            const isUser = await API.get(apiName, "/api/auth/userExists", {
                headers: header,
                queryStringParameters: { email: email, phone: phone },
            });
            return isUser
        },
        registerNewUser: async (firstName, lastName, phone, email, bio, userName) => {
            const newUser = await API.post(apiName, `/api/users`, {
                headers: {},
                body: {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone.trim().startsWith("+") ? phone.trim().toLowerCase() : "+" + phone.trim().toLowerCase(),
                    email: email,
                    bio: bio,
                    username: userName,
                },
            })
            return newUser
        },
        loginUser: async (userName) => {
            const userData = await API.get(apiName, "/api/auth/", {
                headers: header,
                queryStringParameters: { username: userName },
            });
            return userData
        }

    }
}
export default UserAuthApi