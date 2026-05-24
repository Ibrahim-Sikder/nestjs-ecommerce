/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth.response.dto';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { GetUser } from 'src/common/decorators/get-user-decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() RegisterDto): Promise<AuthResponseDto> {
        return await this.authService.register(RegisterDto);
    }
    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    async refresh(@GetUser('id') userId: string): Promise<AuthResponseDto> {
        return await this.authService.refreshTokens(userId)
    }
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@GetUser('id') userId: string): Promise<{ message: string }> {
        await this.authService.logout(userId);
        return { message: 'Successfully logged out' }
    }

    async login(@Body() LoginDto): Promise<AuthResponseDto> {
        return await this.authService.login(LoginDto)
    }




}
