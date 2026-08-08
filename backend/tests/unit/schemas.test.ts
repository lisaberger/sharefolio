import { describe, expect, it } from 'vitest';
import { loginSchema } from '../../src/schemas/authSchema.js';
import { userDataSchema } from '../../src/schemas/userSchema.js';
import { projectDataSchema } from '../../src/schemas/projectSchema.js';

describe('authSchema', () => {
    it('accepts valid credentials', () => {
        const result = loginSchema.safeParse({
            username: 'thauser',
            password: 'secret',
        });
        expect(result.success).toBe(true);
    });

    it('rejects missing username', () => {
        const result = loginSchema.safeParse({ password: 'secret' });
        expect(result.success).toBe(false);
    });

    it('rejects empty password', () => {
        const result = loginSchema.safeParse({ username: 'thauser', password: '' });
        expect(result.success).toBe(false);
    });
});

describe('userDataSchema', () => {
    it('accepts a complete valid user', () => {
        const result = userDataSchema.safeParse({
            lastname: 'Doe',
            username: 'john.doe',
            email: 'john.doe@example.com',
            password: 'secret123',
            firstname: 'John',
        });
        expect(result.success).toBe(true);
    });

    it('rejects an invalid email', () => {
        const result = userDataSchema.safeParse({
            lastname: 'Doe',
            username: 'john.doe',
            email: 'not-an-email',
            password: 'secret123',
        });
        expect(result.success).toBe(false);
    });

    it('rejects unknown properties (strict mode)', () => {
        const result = userDataSchema.safeParse({
            lastname: 'Doe',
            username: 'john.doe',
            email: 'john@example.com',
            password: 'secret123',
            isAdmin: true,
        });
        expect(result.success).toBe(false);
    });
});

describe('projectDataSchema', () => {
    it('accepts valid project data', () => {
        const result = projectDataSchema.safeParse({
            title: 'My Project',
            art: 'Web',
            tools: 'Vue',
            descr: 'A description',
            category: 1,
            link: 'https://example.com',
            collabs: 'Team',
        });
        expect(result.success).toBe(true);
    });

    it('accepts a string category (coerced to number)', () => {
        const result = projectDataSchema.safeParse({
            title: 'My Project',
            art: 'Web',
            category: '2',
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.category).toBe(2);
        }
    });

    it('rejects a project without title', () => {
        const result = projectDataSchema.safeParse({ art: 'Web' });
        expect(result.success).toBe(false);
    });

    it('rejects a project without kind', () => {
        const result = projectDataSchema.safeParse({ title: 'X' });
        expect(result.success).toBe(false);
    });
});
