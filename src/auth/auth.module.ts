import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { AuthController } from './controller/auth.controller';
import { LocalStrategy } from './local.strategy';
import { OrderEntity } from '../order/order.entity';

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Users, OrderEntity]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
