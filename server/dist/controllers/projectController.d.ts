import type { NextFunction, Request, Response } from 'express';
import Account from '../models/userModel.js';
import type { AuthenticatedRequest } from '../middleware/auth.js';
declare const getProjects: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProjectByName: (req: Request, res: Response, next: NextFunction) => Promise<void>;
interface ProjectUploadRequest extends Request {
    files?: Express.Multer.File[] | Record<string, Express.Multer.File[]>;
}
declare const createProject: (req: AuthenticatedRequest & ProjectUploadRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const resolveUser: (name: string) => Promise<Account | null>;
export { getProjects, getProjectByName, createProject, getCategories, resolveUser, };
