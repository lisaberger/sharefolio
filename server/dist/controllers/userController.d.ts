import type { NextFunction, Request, Response } from 'express';
declare const getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getUsersProjects: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const createUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { getUsers, getUser, getUsersProjects, createUser };
