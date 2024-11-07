import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityAlreadyInFavoritesException extends HttpException {
  constructor(id: string, entity: string) {
    super(
      `${entity} with ID ${id} is already in the favorites`,
      HttpStatus.CONFLICT,
    );
  }
}
