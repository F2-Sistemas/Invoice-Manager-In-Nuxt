import bcrypt from 'bcrypt';
import { z } from 'zod';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { username, password } = loginSchema.parse(body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw createError({
                statusCode: 401,
                message: 'Invalid credentials',
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw createError({
                statusCode: 401,
                message: 'Invalid credentials',
            });
        }

        // Set user session
        await setUserSession(event, {
            user: {
                id: user.id,
                username: user.username,
            },
            loggedInAt: new Date(),
        });

        return {
            success: true,
            user: {
                id: user.id,
                username: user.username,
            },
        };
    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 400,
            message: error.message || 'Invalid request',
        });
    }
});
