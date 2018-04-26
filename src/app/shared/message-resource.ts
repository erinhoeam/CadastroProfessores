export class MessageResource{
    public messages: { [key: string]: { [key: string]: string } };
    public routes: { [key: string]: { [key: string]: string } };
    public titles: { [key: string]: { [key: string]: string } };
    
    constructor(){

        this.messages = { 
            SHARED: {
                MSG_SAVE_SUCCESS: 'Salvo com sucesso!' ,
                MSG_FAIL_OPERATION: 'Falha ao realizar operação!',
                MSG_SAVING: 'Salvando...',
                MSG_LOADING: 'Carregando...',
                MSG_LISTING: 'Listando...',
                MSG_SENDING: 'Enviando...',
                MSG_CONFIRMING: 'Confirmando...',
                LOGIN: 'Efetuando Login...' 
            },
            PROFESSOR: {
                NOME_REQUIRED: 'Nome requerido.',
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.',
                CPF_REQUIRED: 'CPF requerido.',
                CPF_MIN_LENGTH: 'O CPF precisa ter 11 caracteres.',
                CPF_MAX_LENGTH: 'O CPF precisa ter 11 caracteres.',
                CPF_INVALID: 'CPF inválido.',
                DATA_NASCIMENTO_REQUIRED: 'Data nascimento requerida.',
                MATRICULA_REQUIRED: 'Matrícula requerida.',
                CLASSE_REQUIRED: 'Classe requerida.',
                NIVEL_REQUIRED: 'Nível requerido.',
                DATA_ADMISSAO_REQUIRED: 'Data admissão requerida.',
                SEXO_REQUIRED: 'Sexo requerido.',
                NACIONALIDADE_REQUIRED: 'Nacionalidade requerido.',
                CARGO_REQUIRED: 'Cargo requerido.',
                RG_REQUIRED: 'RG requerido.',
                LOTACAO_REQUIRED: 'Lotação requerida.',
                AREA_ATUACAO_REQUIRED: 'Área atuação requerida.',
                ENSINO_FUNDAMENTAL_ANOS_FINAIS_REQUIRED: 'Ensino Fundamental anos finais requerido.',
                ENSINO_MEDIO_REQUIRED: 'Ensino Médio requerido.',
                GRADUACAO_REQUIRED: 'Graduação requerida.',
                NATURALIDADE_REQUIRED: 'Naturalidade requerida.',

            },
            RECUPERAR_SENHA: {
                EMAIL_REQUIRED: 'Informe o e-mail.',
                EMAIL_INVALID: 'Email inválido.'
            },
            ALTERAR_SENHA: {
                SENHA_ATUAL_REQUIRED: 'Informe a senha atual.',
                SENHA_ATUAL_MIN_LENGTH: 'A senha atual deve possuir no mínimo 6 caracteres.',
                SENHA_NOVA_REQUIRED: 'Informe a senha.',
                SENHA_NOVA_MIN_LENGTH: 'A senha deve possuir no mínimo 6 caracteres.',
                SENHA_CONFIRME_REQUIRED: 'Informe a senha novamente.',
                SENHA_CONFIRME_MIN_LENGTH: 'A senha deve possuir no mínimo 6 caracteres.',
                SENHA_CONFIRME_EQUAL_TO: 'As senhas não conferem.'
            },
            CONFIRM_EMAIL: {
                EMAIL_CONFIRMED_SUCCESS: 'E-mail confirmado com sucesso.'
            },
            USUARIO: {
                NOME_REQUIRED: 'Nome requerido.' ,
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.',
                CPF_CNPJ_REQUIRED: 'CPF/CNPJ requerido.',
                CPF_INVALID: 'CPF inválido.',
                CNPJ_INVALID: 'CNPJ inválido.',
                TIPO_USUARIO_REQUIRED: 'Tipo usuário requerido.',
                TIPO_PESSOA_REQUIRED: 'Tipo pessoa requerido.',
                EMAIL_REQUIRED: 'Informe o e-mail.',
                EMAIL_INVALID: 'Email invalido.' 
            }
        };

        this.routes = { 
            PROFESSOR: {
                LISTAR: '/professor/listar' },
            LOGIN: {
                ENTRAR: '/login/entrar' 
            },
            HOME: {
                INICIAL: '/home/inicial'
            }
        };

        this.titles = { 
            SISTEMA: {
                TITLE: 'Cadastro Professores'
            },
            PROFESSOR: {
                TITLE_UPDATE: 'Atualizar Professor',
                TITLE_NEW: 'Novo Professor',
                TITLE_LIST: 'Professores',
                TITLE_CRACHA: 'QR CODE CRACHÁ' 
            },
            ALTERAR_SENHA: {
                TITLE: 'Alterar Senha'
            },
            USUARIO: {
                TITLE: 'Cadastrar Usuário'
            },
            LOG: {
                TITLE: 'Log Sistema'
            },
            ICON:{
                NEW:'fa-plus-circle',
                EDIT: 'fa-edit'
            }
        };
    }
 }