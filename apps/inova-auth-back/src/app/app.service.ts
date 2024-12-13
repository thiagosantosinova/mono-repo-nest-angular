import { Injectable } from '@nestjs/common';
import { LibInovaAuthService } from '@libs-rast/nest-inova-auth-lib';

@Injectable()
export class AppService {
  constructor(private libInovaAuth: LibInovaAuthService) { }

  async login(username: string, password: string): Promise<any> {
    const userLogin = await this.libInovaAuth.login({ username, password });
    console.log('userLogin: ', userLogin);

    return userLogin;
  }

  async me(token: string): Promise<any> {
    const userInfo = await this.libInovaAuth.me(token);
    console.log('userInfo: ', userInfo);
    return userInfo;
  }

  async logout(token: string): Promise<any> {
    const userLogout = await this.libInovaAuth.logout(token);
    console.log('userLogout: ', userLogout);

    return userLogout;
  }

}
