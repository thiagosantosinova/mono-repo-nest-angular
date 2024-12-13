import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'lib-form-modal-login',
  templateUrl: './form-modal-login.component.html',
  styleUrls: ['./form-modal-login.component.css'],
  standalone: false
})
export class FormModalLoginComponent implements OnChanges {
  @Input() buttonText: string = 'Entrar';
  @Input() inverted: boolean = false;
  @Input() show: boolean = true;

  @Output() onLogin: EventEmitter<string> = new EventEmitter<string>();

  formGroupModal: UntypedFormGroup = this.formBuilder.group({
    inovaAuthUsernameModal: ['', [Validators.required]],
    inovaAuthPasswordModal: ['', [Validators.required]],
  });

  onLoading: boolean = false;
  passwordVisible: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.show) $('.modal_inova_auth_login').modal('show');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      if (changes['show'].currentValue) {
        $('.modal_inova_auth_login').modal('show');
      } else {
        $('.modal_inova_auth_login').modal('hide');
      }
    }
  }

  async login(): Promise<void> {
    const inovaAuthUsername = this.formGroupModal.get('inovaAuthUsernameModal')?.value;
    const inovaAuthPassword = this.formGroupModal.get('inovaAuthPasswordModal')?.value;

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

    $('.modal_inova_auth_login').modal('hide');
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
