import axios, { type AxiosResponse } from 'axios';
import User from '@/models/user';

class UserApi {
    private static instance: UserApi;

    private constructor() {
        if (UserApi.instance) {
            throw new Error(
                'Use UserApi.getInstance() to get an instance of this class.'
            );
        }
    }

    public static getInstance(): UserApi {
        if (!UserApi.instance) {
            UserApi.instance = new UserApi();
        }
        return UserApi.instance;
    }

    public async getUsers(): Promise<User[]> {
        try {
            const response: AxiosResponse<User[]> = await axios.get(
                'http://localhost:4000/users'
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    public async getUserById(userId: string): Promise<User> {
        try {
            const response: AxiosResponse<User> = await axios.get(
                `http://localhost:4000/users/${userId}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}

export default UserApi;
