using System;
using System.Collections.Generic;
using GHR.Domain.DataBase.Cargos;
using GHR.Domain.DataBase.Contas;
using GHR.Domain.DataBase.Departamentos;

namespace  GHR.Domain.DataBase.Funcionarios

{
    public class Funcionario
    {
        public int Id { get; set; }
        public float Salario { get; set; }
        public string DataAdmissao { get; set; }
        public string DataDemissao { get; set; }
        public Boolean FuncionarioAtivo { get; set; }
        public int? SupervisorId { get; set; }
        public int? GerenteAdministrativoId { get; set; }
        public int? GerenteOperacionalId { get; set; }
        public int? DiretorId { get; set; }
        public int CargoId { get; set; }
        public Cargo Cargos { get; set; }
        public int DepartamentoId { get; set; }
        public Departamento Departamentos { get; set; }
        public int UserId { get; set; }
        public Conta Contas { get; set; }
        public int EnderecoId { get; set; }
        public Endereco Enderecos { get; set; }
        public int DadosPessoaisId { get; set; }
        public DadoPessoal DadosPessoais { get; set; }
        public IEnumerable<FuncionarioMeta> FuncionariosMetas { get; set; }
        public string ImagemURL { get; set; }
    }
}