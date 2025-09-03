import { createHandler } from '../lambda';
import { UsersModule } from './users.module';

export const handler = createHandler(UsersModule);