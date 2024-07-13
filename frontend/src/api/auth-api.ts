import axios from 'axios';

class AuthApi {
    private static instance: AuthApi;

    private constructor() {
        if (AuthApi.instance) {
            throw new Error(
                'Use AuthApi.getInstance() to get an instance of this class.'
            );
        }
    }

    public static getInstance(): AuthApi {
        if (!AuthApi.instance) {
            AuthApi.instance = new AuthApi();
        }
        return AuthApi.instance;
    }

    public async logout(): Promise<void> {
        try {
            const response = await axios.get(
                'http://localhost:4000/auth/logout'
            );
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}

export default AuthApi;
