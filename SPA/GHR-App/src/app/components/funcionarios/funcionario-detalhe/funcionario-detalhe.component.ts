import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ValidadorFormularios } from 'src/app/helpers/ValidadorFormularios';

@Component({
  selector: 'app-funcionario-detalhe',
  templateUrl: './funcionario-detalhe.component.html',
  styleUrls: ['./funcionario-detalhe.component.scss']
})
export class FuncionarioDetalheComponent implements OnInit {

  form!: FormGroup;
  locale = 'pt-br';
  funcionario = {} as Funcionario;
  estadoSalvar: string = "post";

  get f(): any
  {
    return this.form.controls;
  }

  get bsConfig(): any
  {
    return {isAnimated: true, adaptivePosition: true, dateInputFormat: 'DD/MM/YYYY h:mm a', containerClass: 'theme-default'};
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private funcionarioService: FuncionarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService)
  {
    this.localeService.use(this.locale);
  }


  ngOnInit(): void
  {
    this.carregarFuncionario();
    this.validation();
  }
  public validation(): void
  {
    this.form = this.fb.group(
      {
        nomeCompleto: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        telefone: ['', Validators.required],
        salario: ['', Validators.required],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
        imagemURL: ['', Validators.required],
      });
  }

  public limparFormulario(): void
  {
    this.form.reset();
  }

  public validarCampo(campoForm: FormControl): any
  {
    return ValidadorFormularios.verificarErroCampo(campoForm);
  }

  public retornarValidacao(nomeCampo: FormControl, nomeElemento: string): any
  {
    return ValidadorFormularios.retornarMensagemErro(nomeCampo, nomeElemento);
  }

  public carregarFuncionario(): void
  {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null)
    {
      this.spinner.show();

      this.estadoSalvar = "put";

      this.funcionarioService.getFuncionarioById(+eventoIdParam).subscribe(
        (funcionario: Funcionario) =>
        {
          this.funcionario = { ...funcionario };
          this.form.patchValue(this.funcionario);
        },
        (error: any) =>
        {
          this.toastr.error("Não foi possível carregar a página de funcionário", "Erro!");
          console.error(error);
        }
      ).add(() => this.spinner.hide());
    }
  }

  public salvarAlteracao(): void
  {
    this.spinner.show();

    if (this.form.valid)
    {
      this.funcionario = (this.estadoSalvar === 'post')
        ? { ...this.form.value }
        : { id: this.funcionario.id, ...this.form.value };

      this.funcionario.funcionarioAtivo = true;
      this.funcionario.loginId = 1;
      this.funcionario.supervisorId = 1;
      this.funcionario.cargoId = 1;
      this.funcionario.departamentoId = 1;
      this.funcionario.dataDemissao = '01/01/0001 00:01 AM';

      this.funcionarioService[this.estadoSalvar](this.funcionario).subscribe(
        () => this.toastr.success("Alterações salvas com sucesso!", "Salvo!"),
        (error: any) => {
          console.error(error);
          this.toastr.error("Erro ao salvar alterações.", "Erro!");
        }
      ).add(() => this.spinner.hide());
    };
  }
}

