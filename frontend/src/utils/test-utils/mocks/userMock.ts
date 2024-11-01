import type User from '@/models/user';

const mockUser: User = {
    id: 'test id',
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    image: 'avatar.jpg',
    email: 'test@test.de',
    isAdmin: false,
    job: 'Mediengestalter',
    location: 'Augsburg',
    description: 'Ich bin leidenschaftlicher Mediengestalter Digital und Print',
    fullname: 'John Doe',
    initials: 'JD',
};

export default mockUser;
