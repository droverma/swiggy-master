import axios from "axios";

class AuthService {
    
    register(data) {
        return axios.post('http://localhost:8000/register',data)
    }

    login() {
        return axios.get('http://localhost:8000/register')
    }

}
export default new AuthService();