import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'lib-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  standalone: false
})
export class FormLoginComponent implements OnInit {
  @Input() buttonText: string = 'Entrar';
  passwordVisible = false;

  @Output() onLogin: EventEmitter<string> = new EventEmitter<string>();
  formGroup: UntypedFormGroup = this.formBuilder.group({
    inovaAuthUsername: ['', [Validators.required]],
    inovaAuthPassword: ['', [Validators.required]],
  });

  onLoading: boolean = false;
  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService) { }

  ngOnInit(): void { }

  async login(): Promise<void> {
    const inovaAuthUsername = this.formGroup.get('inovaAuthUsername')?.value;
    const inovaAuthPassword = this.formGroup.get('inovaAuthPassword')?.value;

    if (!inovaAuthUsername && !inovaAuthPassword) {
      this.showToast('Credenciais inválidas', 'Voce precisa informar todos os campos', 'error');
      return;
    }

    this.onLoading = true;
    this.authService.login(inovaAuthUsername, inovaAuthPassword).subscribe(response => {
      this.onLoading = false;
      if (response?.data) {
        this.showToast('Autenticado', `Login efetuado com sucesso, bem vindo ${response.data.user.name}.`, 'success');
        sessionStorage.setItem('lib-inova-auth-token', response.data.token);
        this.onLogin.emit(response.data.token);
      } else {
        this.showToast('Credenciais inválidas', 'Não foi possível realizar o login', 'error');
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

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
