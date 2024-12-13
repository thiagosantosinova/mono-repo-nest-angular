import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserLoginDto } from '../shared/models';
import { SSOApiService } from '../shared/services/sso-api.service';
import { ICustomResponseService, ILibLoginResponse, ILibMeResponse } from '@libs-rast/interfaces';

@Injectable()
export class LibInovaAuthService {

  constructor(private SSOApiService: SSOApiService) { }

  async login(userLoginDto: UserLoginDto): Promise<ICustomResponseService<ILibLoginResponse>> {
    const { username, password } = userLoginDto;
    try {
      const availableLogin = await this.SSOApiService.login(username, password);

      if (!availableLogin) {
        throw new InternalServerErrorException('Usuário ou senha inválidos.');
      }

      return {
        data: {
          token: availableLogin.data.Token,
          expiresIn: availableLogin.data.ExpiresIn,
          user:
          {
            id: availableLogin.data.User.ID,
            name: availableLogin.data.User.FirstName,
            lastLogin: availableLogin.data.User.LastLogin,
            username: availableLogin.data.User.Username,
            dateJoined: availableLogin.data.User.DateJoined,
            isEmployee: availableLogin.data.User.IsEmployee,
            email: availableLogin.data.User.Email
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async logout(token: string): Promise<ICustomResponseService<string>> {
    try {
      const response = await this.SSOApiService.logout(token);

      if (response.status != HttpStatus.OK) {
        throw new InternalServerErrorException('Erro ao tentar desconectar o usuário.')
      }

      return { data: "Usuário desconectado." }
    } catch (error) {
      throw error;
    }
  }

  async me(token: string): Promise<ICustomResponseService<ILibMeResponse>> {
    try {
      const getCurrentUser = await this.SSOApiService.getCurrentUser(token);
      if (!getCurrentUser) throw new InternalServerErrorException('Usuário não encontrado.')

      const getCurrentUserGrants = await this.SSOApiService.getCurrentUserGrants(token);
      if (!getCurrentUserGrants) throw new InternalServerErrorException('Permissões do usuário não encontradas.')

      const getCurrentDepartment = await this.SSOApiService.getCurrentDepartment(token);

      if (!getCurrentDepartment) throw new InternalServerErrorException('Departamento do usuário não encontrado.')

      return {
        data: {
          userInfo: {
            id: getCurrentUser.data.ID,
            username: getCurrentUser.data.Username,
            firstname: getCurrentUser.data.FirstName,
            lastname: getCurrentUser.data.LastName,
            email: getCurrentUser.data.Email,
            active: getCurrentUser.data.Active,
            dateJoined: getCurrentUser.data.DateJoined,
            lastLogin: getCurrentUser.data.LastLogin,
            isEmployee: getCurrentUser.data.IsEmployee,
            isSuperuser: getCurrentUser.data.IsSuperuser,
            companies: getCurrentUser.data.Companies.map(company => { return { id: company.ID, name: company.Name } }),
            enterprises: getCurrentUser.data.Enterprises.map(enterprise => { return { id: enterprise.ID, name: enterprise.Name } }),
            employee: {
              id: getCurrentUser.data.Employee.ID,
              uid: getCurrentUser.data.Employee.Uid,
              departmentId: getCurrentUser.data.Employee.DepartmentID,
              function: getCurrentUser.data.Employee.Function,
              sector: getCurrentUser.data.Employee.Sector
            },
            group: { id: getCurrentUser.data.Group.ID, name: getCurrentUser.data.Group.Name },
          },
          userDepartment: {
            id: getCurrentDepartment.data.ID,
            description: getCurrentDepartment.data.Description,
            group: getCurrentDepartment.data.Group,
            sector: getCurrentDepartment.data.Sector,
          },
          userPermissions: getCurrentUserGrants.data.map(grant => {
            return {
              id: grant.ID,
              name: grant.Name,
              permissions: grant.Permissions.map(permission => { return { id: permission.ID, name: permission.Name } })
            }
          })
        }
      }
    } catch (error) {
      throw error;
    }
  }

}
