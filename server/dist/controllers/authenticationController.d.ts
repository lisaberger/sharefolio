import type { NextFunction, Request, Response } from 'express';
declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const logoutUser: (req: Request, res: Response) => void;
export { loginUser, logoutUser };
