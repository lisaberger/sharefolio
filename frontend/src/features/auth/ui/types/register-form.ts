import type { ContactForm } from './contact-form';
import type { LoginForm } from './login-form';

export type RegisterForm = ContactForm & LoginForm;
