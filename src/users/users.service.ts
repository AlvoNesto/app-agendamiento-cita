import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  }
}