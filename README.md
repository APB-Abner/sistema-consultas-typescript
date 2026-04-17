# Sistema de Consultas Mobile

Aplicativo mobile desenvolvido com Expo e React Native para demonstrar o fluxo básico de uma consulta médica. A tela principal exibe os dados da consulta, do médico e do paciente, além de permitir alterar o status entre `agendada`, `confirmada` e `cancelada`.

## Tecnologias

- Expo
- React Native
- React
- TypeScript

## Funcionalidades

- Exibição de uma consulta médica em card
- Visualização dos dados do médico e da especialidade
- Visualização dos dados do paciente
- Formatação de data no padrão `pt-BR`
- Formatação de valor em real brasileiro (`BRL`)
- Alteração de status da consulta com feedback visual

## Estrutura do projeto

```text
.
├── App.tsx
├── src
│   ├── components
│   │   └── ConsultaCard.tsx
│   ├── interfaces
│   │   ├── consulta.ts
│   │   └── medico.ts
│   ├── screens
│   │   └── Home.tsx
│   ├── styles
│   │   ├── app.styles.ts
│   │   └── consultaCard.styles.ts
│   └── types
│       ├── especialidade.ts
│       ├── paciente.ts
│       └── statusConsulta.ts
├── assets
└── package.json
```

## Como executar

### Pré-requisitos

- Node.js instalado
- npm instalado
- Expo Go no celular ou emulador Android/iOS configurado

### Instalação

```bash
npm install
```

### Executando o projeto

```bash
npx expo start
```

Com o servidor do Expo aberto, você pode:

- pressionar `a` para abrir no Android
- pressionar `i` para abrir no iOS, quando estiver em macOS
- pressionar `w` para abrir na web
- escanear o QR Code com o Expo Go no celular

Também é possível usar os atalhos:

```bash
npm run android
npm run ios
npm run web
```

## Modelo de dados

O projeto trabalha com as seguintes entidades:

- `Especialidade`: representa a área médica
- `Medico`: contém dados do profissional e sua especialidade
- `Paciente`: contém dados cadastrais do paciente
- `Consulta`: reúne médico, paciente, data, valor, observações e status
- `StatusConsulta`: define os estados possíveis da consulta

## Tela principal

A tela `Home` cria dados de exemplo em memória e renderiza o componente `ConsultaCard`, responsável por:

- mostrar o status atual da consulta
- listar médico, paciente, data, valor e observações
- exibir ações para confirmar ou cancelar enquanto a consulta estiver `agendada`
- trocar a interface para mensagens de sucesso ou cancelamento após a ação

## Scripts disponíveis

```bash
npm start
npm run android
npm run ios
npm run web
```

## Observações

- O projeto utiliza dados mockados diretamente na tela inicial
- Ainda não há integração com API ou persistência de dados
- Ainda não há testes automatizados configurados
