import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IGetCurrentUser, IGetCurrentUserDeparment, IGetCurrentUserGrants, ISSOLoginResponse } from '@libs-rast/interfaces';

function handleAxiosError(error: AxiosError): any {
  throw new InternalServerErrorException(`SSO: ${error.response?.data}`)
}

@Injectable()
export class SSOApiService {
  constructor(@Inject('ENV_CONFIG') private readonly envConfig: Record<string, any>){
  }
  private timeout: number = 30000;

  async login(user: string, password: string): Promise<AxiosResponse<ISSOLoginResponse>> {
    return await axios
      .post(this.envConfig['SSO_API_URL'] + `/auth/login`, { user, password }, { timeout: this.timeout })
      .then(res => {
        return res
      }).catch((error: AxiosError) => {
        return Promise.reject(handleAxiosError(error));
      })
  }

  async logout(token: string): Promise<AxiosResponse<any>> {
    return await axios
      .delete(this.envConfig['SSO_API_URL'] + `/auth/token`, { headers: { Authorization: `Bearer ${token}` }, timeout: this.timeout })
      .then(res => {
        return res;
      })
      .catch((error: AxiosError) => {
        return Promise.reject(handleAxiosError(error));
      })
  }

  async getCurrentUser(token: string): Promise<AxiosResponse<IGetCurrentUser>> {
    return await axios
      .get(this.envConfig['SSO_API_URL'] + `/user/me`, { headers: { Authorization: `Bearer ${token}` }, timeout: this.timeout })
      .then(res => {
        return res;
      })
      .catch((error: AxiosError) => {
        return Promise.reject(handleAxiosError(error));
      })
  }

  async getCurrentUserGrants(token: string): Promise<AxiosResponse<IGetCurrentUserGrants[]>> {
    return await axios
      .get(this.envConfig['SSO_API_URL'] + `/user/grants`, { headers: { Authorization: `Bearer ${token}` }, timeout: this.timeout })
      .then(res => {
        return res;
      })
      .catch((error: AxiosError) => {
        return Promise.reject(handleAxiosError(error));
      })
  }

  async getCurrentDepartment(token: string): Promise<AxiosResponse<IGetCurrentUserDeparment>> {
    return await axios
      .get(this.envConfig['SSO_API_URL'] + `/user/department`, { headers: { Authorization: `Bearer ${token}` }, timeout: this.timeout })
      .then(res => {
        return res;
      })
      .catch((error: AxiosError) => {
        return Promise.reject(handleAxiosError(error));
      })
  }
}
