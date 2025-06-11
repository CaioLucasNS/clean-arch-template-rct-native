# Clean Architecture Template for React Native

Este template foi criado para servir como base para projetos React Native seguindo os princípios da Clean Architecture, oferecendo uma estrutura organizada, escalável e de fácil manutenção.

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS, apenas em macOS)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/clean-arch-template-rct-native.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o projeto:

```bash
npm start
# ou
yarn start
```

## 🏗️ Estrutura do Projeto

```
src/
├── core/                 # Lógica de negócios e regras de domínio
│   ├── domain/          # Entidades e interfaces
│   ├── usecases/        # Casos de uso da aplicação
│   └── repositories/    # Interfaces dos repositórios
├── data/                # Implementação da camada de dados
│   ├── repositories/    # Implementações dos repositórios
│   └── datasources/     # Fontes de dados (local, remoto)
├── presentation/        # Camada de apresentação
│   ├── screens/         # Telas da aplicação
│   ├── components/      # Componentes reutilizáveis
│   └── viewmodels/      # ViewModels para gerenciamento de estado
└── shared/              # Utilitários e configurações compartilhadas
    ├── theme/           # Configurações de tema
    └── utils/           # Funções utilitárias
```

## 🎨 Tema e Estilização

O projeto utiliza um sistema de temas centralizado para manter a consistência visual. O tema é definido em `src/shared/theme/theme.ts` e inclui:

- Cores
- Tipografia
- Espaçamentos
- Bordas
- Sombras

### Exemplo de Uso do Tema

```typescript
import { useTheme } from '@shared/theme/theme';

const MyComponent = () => {
  const { colors, spacing } = useTheme();

  return (
    <View style={{
      backgroundColor: colors.background,
      padding: spacing.medium
    }}>
      <Text style={{ color: colors.text }}>
        Conteúdo do componente
      </Text>
    </View>
  );
};
```

## 📱 Navegação

A navegação é implementada usando React Navigation com um sistema de tabs. A configuração principal está em `src/presentation/navigation/AppNavigator.tsx`.

### Estrutura de Navegação

- Tab Navigator (Navegação principal)
  - Home Tab
  - History Tab
  - Settings Tab

### Exemplo de Navegação

```typescript
import { useNavigation } from '@react-navigation/native';

const MyScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Details', { id: 123 });
  };

  return (
    <Button onPress={handleNavigate} title="Ir para Detalhes" />
  );
};
```

## 💾 Persistência de Dados

O projeto utiliza AsyncStorage para persistência local de dados. A implementação está em `src/data/repositories/AsyncStorageRepository.ts`.

### Exemplo de Uso

```typescript
import { useTaskRepository } from '@core/repositories/TaskRepository';

const MyComponent = () => {
  const taskRepository = useTaskRepository();

  const saveTask = async () => {
    await taskRepository.createTask({
      id: '1',
      title: 'Nova Tarefa',
      completed: false,
      createdAt: new Date()
    });
  };

  return (
    <Button onPress={saveTask} title="Salvar Tarefa" />
  );
};
```

## 🎯 Gerenciamento de Estado

O gerenciamento de estado é implementado utilizando React Hooks e serviços, seguindo os princípios da Clean Architecture. Cada tela utiliza seus próprios estados locais quando necessário, e a lógica de negócios é encapsulada em serviços.

### Exemplo de Implementação

```typescript
// TaskService.ts
class TaskService {
  static async getTasks(): Promise<Task[]> {
    // Implementação da lógica de negócios
  }

  static async completeTask(taskId: string): Promise<void> {
    // Implementação da lógica de negócios
  }
}

// TaskScreen.tsx
const TaskScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { theme } = useTheme();

  const loadTasks = async () => {
    const allTasks = await TaskService.getTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </View>
  );
};
```

## 🛠️ Ferramentas de Qualidade de Código

O projeto utiliza ESLint e Prettier para garantir a qualidade e consistência do código. As configurações estão nos arquivos `.eslintrc.js` e `.prettierrc.js`.

### Scripts Disponíveis

```bash
# Verificar problemas de código
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix

# Formatar código
npm run format
```

### Regras Principais

1. **Performance**

   - Uso obrigatório de `useCallback` para funções passadas como props
   - Uso obrigatório de `useMemo` para valores computados
   - Prevenção de re-renders desnecessários

2. **Clean Code**

   - Organização automática de imports
   - Nomenclatura consistente
   - Prevenção de código morto
   - Uso apropriado de const/let

3. **TypeScript**

   - Tipagem estrita
   - Prevenção de `any`
   - Uso de operadores modernos (nullish coalescing, optional chaining)

4. **React Native**
   - Prevenção de estilos inline
   - Uso apropriado de cores
   - Otimização de textos

### Exemplo de Código Otimizado

```typescript
// ❌ Não recomendado
const MyComponent = ({ data, onPress }) => {
  const processedData = data.map(item => item * 2);

  return (
    <TouchableOpacity onPress={() => onPress(processedData)}>
      <Text>{processedData.join(', ')}</Text>
    </TouchableOpacity>
  );
};

// ✅ Recomendado
const MyComponent = ({ data, onPress }) => {
  const processedData = useMemo(() => data.map(item => item * 2), [data]);
  const handlePress = useCallback(() => onPress(processedData), [onPress, processedData]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{processedData.join(', ')}</Text>
    </TouchableOpacity>
  );
};
```

## 📦 Build e Deploy

### Android

1. Configure o ambiente Android:

   - Instale o Android Studio
   - Configure as variáveis de ambiente ANDROID_HOME e JAVA_HOME
   - Instale o JDK 11 ou superior

2. Gere o APK:

```bash
npm run android
```

### iOS

1. Configure o ambiente iOS:

   - Instale o Xcode
   - Instale o CocoaPods
   - Configure o simulador iOS

2. Execute o projeto:

```bash
npm run ios
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📚 Referências

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
