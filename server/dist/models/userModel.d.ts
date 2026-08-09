import { Model } from 'sequelize';
declare class Account extends Model {
    id: string;
    lastname: string;
    firstname: string | null;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    job: string | null;
    location: string | null;
    description: string | null;
    image: string;
}
export default Account;
