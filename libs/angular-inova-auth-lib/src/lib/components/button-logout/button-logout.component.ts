import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'lib-button-logout',
  templateUrl: './button-logout.component.html',
  styleUrls: ['./button-logout.component.css'],
  standalone: false
})
export class ButtonLogoutComponent {
  @Input() text: string = 'Sair';
  @Input() color: string = 'grey';
  @Input() disabled: boolean = false;

  @Output() onLogout: EventEmitter<boolean> = new EventEmitter<boolean>();

  onLoading: boolean = false;
  constructor(private authService: AuthService) { }

  async logout(): Promise<void> {
    const token: string = sessionStorage.getItem('lib-inova-auth-token')?.toString() || '';

    if (!token) {
      this.showToast('Token inválido', 'Não foi possivel encontrar o token.', 'error');
      return;
    }

    this.onLoading = true;
    this.authService.logout(token).subscribe(response => {
      if (response) {
        this.onLoading = false;
        sessionStorage.removeItem('lib-inova-auth-token');
        this.showToast('Logout', 'Sessão encerrada com sucesso.', 'success');
        this.onLogout.emit(true);
      } else {
        this.showToast('Credenciais inválidas', 'Não foi possível deslogar o usuário.', 'error');
        return;
      }
    });
  }

  showToast(title: string, message: string, classToast: string) {
    $('body').toast({
      title: title,
      message: message,
      showProgress: 'bottom',
      progressUp: true,
      class: classToast
    });
  }
}
