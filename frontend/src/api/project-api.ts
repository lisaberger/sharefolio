import axios, { AxiosResponse } from 'axios';
import Project from '@/models/project';

class ProjectApi {
    private static instance: ProjectApi;

    private constructor() {}

    public static getInstance(): ProjectApi {
        if (!ProjectApi.instance) {
            ProjectApi.instance = new ProjectApi();
        }
        return ProjectApi.instance;
    }

    public async getProjects(): Promise<Project[]> {
        try {
            const response: AxiosResponse<Project[]> = await axios.get(
                'http://localhost:4000/projects'
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Axios error fetching projects:',
                    error.response?.data || error.message
                );
            } else {
                console.error('Unexpected error fetching projects:', error);
            }
            throw error;
        }
    }
    public async getProjectByName(name: string): Promise<Project> {
        console.log(name);
        try {
            const response: AxiosResponse<Project> = await axios.get(
                `http://localhost:4000/projects/${name}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Axios error fetching project:',
                    error.response?.data || error.message
                );
            } else {
                console.error('Unexpected error fetching project:', error);
            }
            throw error;
        }
    }
}

export default ProjectApi;
