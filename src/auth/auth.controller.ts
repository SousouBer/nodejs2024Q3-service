import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/models/create-user.dto';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) loginUserDto: CreateUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh')
  refresh(
    @Body(ValidationPipe)
    createRefreshTokenDto: CreateRefreshTokenDto,
  ) {
    return this.authService.refresh(createRefreshTokenDto);
  }
}
