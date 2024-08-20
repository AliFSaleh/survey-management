import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
      forwardRef(() => UserModule),
      TypeOrmModule.forFeature([User]),
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            global: true,
            secret: configService.get<string>("app.jwtAccessSecret", {
              infer: true
            }),
            signOptions: {
              expiresIn: configService.get<string>("app.accessTokenExpiresIn", {
                infer: true
              })
            },
          };
        }
      })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports:[]
})
export class AuthModule {}
