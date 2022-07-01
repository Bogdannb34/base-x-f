import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth, setAuth } = useAuth();

    const logout = async () => {
        try {
            const response = await axios.post('/logout',
                JSON.stringify({ logoutResponse: Number(auth?.userId) }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            // setAuth({});
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    return logout;
}

export default useLogout;