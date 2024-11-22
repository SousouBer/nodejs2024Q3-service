import { HttpException, HttpStatus } from '@nestjs/common';

export class NotInFavoritesException extends HttpException {
  constructor(id: string, entity: string) {
    super(
      `Cannot add ${entity} with ID ${id} to favorites as it does not exist in favs.`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
