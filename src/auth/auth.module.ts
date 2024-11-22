import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, DatabaseModule, JwtModule],
  providers: [AuthService],
})
export class AuthModule {}
