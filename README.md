# Template Clean Architecture para React Native

Este é um template baseado nos princípios da Clean Architecture para projetos React Native. O objetivo é fornecer uma estrutura organizada e escalável para o desenvolvimento de aplicações móveis.

## 🏗️ Estrutura do Projeto

```
src/
├── core/
│   ├── domain/           # Entidades e regras de negócio
│   ├── application/      # Casos de uso
│   └── infrastructure/   # Implementações de repositórios
├── presentation/         # Componentes de UI e hooks
│   ├── screens/         # Telas da aplicação
│   ├── components/      # Componentes reutilizáveis
│   ├── hooks/          # Hooks personalizados
│   └── utils/          # Utilitários da UI
└── shared/             # Código compartilhado
    ├── constants/      # Constantes
    ├── types/         # Tipos compartilhados
    └── utils/         # Utilitários gerais
```

## 🎯 Princípios da Clean Architecture

1. **Independência de Frameworks**

   - A camada de domínio é independente de qualquer framework
   - Regras de negócio não dependem de detalhes externos

2. **Testabilidade**

   - Cada camada pode ser testada isoladamente
   - Fácil mockar dependências para testes

3. **Independência de UI**

   - Interface do usuário pode mudar sem afetar o resto do sistema
   - UI é uma camada de detalhe

4. **Independência de Banco de Dados**

   - Regras de negócio não dependem do banco de dados
   - Fácil trocar o banco de dados sem afetar a lógica

5. **Independência de Agentes Externos**
   - Regras de negócio não conhecem o mundo exterior
   - Dependências apontam para dentro

## 📦 Como Usar

### 1. Instalação

```bash
# Clone o repositório
git clone [https://github.com/CaioLucasNS/clean-arch-template-rct-native]

# Instale as dependências
npm install
```

### 2. Estrutura de Camadas

#### Camada de Domínio

```typescript
// src/core/domain/entities/Exemplo.ts
export interface Exemplo {
  id: string;
  // propriedades da entidade
}

export interface ExemploRepository {
  // métodos do repositório
}
```

#### Camada de Aplicação

```typescript
// src/core/application/useCases/exemplo/ExemploUseCase.ts
export class ExemploUseCase {
  constructor(private repository: ExemploRepository) {}

  async execute(): Promise<void> {
    // lógica do caso de uso
  }
}
```

#### Camada de Infraestrutura

```typescript
// src/core/infrastructure/repositories/ExemploRepositoryImpl.ts
export class ExemploRepositoryImpl implements ExemploRepository {
  // implementação dos métodos
}
```

#### Camada de Apresentação

```typescript
// src/presentation/screens/ExemploScreen.tsx
export const ExemploScreen: React.FC = () => {
  // implementação da tela
};
```

### 3. Criando um Novo Recurso

1. **Defina a Entidade**

   - Crie a interface da entidade em `domain/entities`
   - Defina a interface do repositório

2. **Implemente os Casos de Uso**

   - Crie os casos de uso em `application/useCases`
   - Implemente a lógica de negócio

3. **Crie o Repositório**

   - Implemente o repositório em `infrastructure/repositories`
   - Conecte com a fonte de dados

4. **Desenvolva a UI**
   - Crie os componentes em `presentation`
   - Implemente os hooks necessários

## 🛠️ Tecnologias Utilizadas

- React Native
- TypeScript
- Expo
- AsyncStorage (para persistência local)

## 📝 Exemplo de Uso

O projeto inclui um exemplo de implementação de uma lista de tarefas (Todo List) que demonstra:

- Gerenciamento de estado
- Persistência local
- Navegação
- Componentes reutilizáveis
- Hooks personalizados

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [ ] Adicionar testes unitários
- [ ] Implementar injeção de dependência
- [ ] Adicionar documentação de API
- [ ] Criar mais exemplos de implementação
- [ ] Adicionar CI/CD

## 📧 Contato

Caio Lucas - [Linkedin - Caio Lucas](https://www.linkedin.com/in/caio-lucas-848653186/) - lcaio1281@gmail.com

Link do Projeto: [clean-arch-template-rct-native](https://github.com/CaioLucasNS/clean-arch-template-rct-native)
