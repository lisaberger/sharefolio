import type { AuthRepository } from '@core/auth';
import { ApiAuthRepository } from '@api/auth';

export const authRepository: AuthRepository = ApiAuthRepository.build();
