import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { REFRESH_TOKEN_URL } from '../helpers/constant';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(REFRESH_TOKEN_URL,
            JSON.stringify({ refreshToken: auth.refreshToken }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    };

    return refresh;
}

export default useRefreshToken;