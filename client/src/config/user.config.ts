import type { UserRepository } from '@core/user';
import { ApiUserRepository } from '@api/user';

export const userRepository: UserRepository = ApiUserRepository.build();
