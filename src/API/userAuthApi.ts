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
            console.log(isUser , 'isUser isUser')
            return isUser
        },
        registerNewUser: async (firstName , lastName , phone , email , bio, userName) => {
            const newUser =  await API.post(apiName, `/api/users`, {
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
        }

    }
}
export default  UserAuthApi