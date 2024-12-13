import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('login')
  login(@Body() { username, password }): Promise<string> {
    return this.appService.login(username, password);
  }

  @Get('me/:token')
  me(@Param('token') token: string): Promise<string> {
    return this.appService.me(token);
  }

  @Delete('logout/:token')
  logout(@Param('token') token: string): Promise<string> {
    return this.appService.logout(token);
  }

}
