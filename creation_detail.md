# Using TypeScript with Node.js: A Comprehensive Guide

## 1. Initial Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Step-by-Step Installation

1. Create a new project directory
```bash
mkdir typescript-node-project
cd typescript-node-project
```

2. Initialize a new npm project
```bash
npm init -y
```

3. Install TypeScript and type definitions
```bash
npm install -D typescript @types/node ts-node
```

4. Create a TypeScript configuration file
```bash
npx tsc --init
```

## 2. Configure tsconfig.json

Modify the `tsconfig.json` with these recommended settings:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 3. Project Structure

```
typescript-node-project/
├── src/
│   └── index.ts
├── package.json
└── tsconfig.json
```

## 4. Sample TypeScript Node.js Application

Create `src/index.ts`:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}

const userService = new UserService();

userService.addUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
});

console.log(userService.getAllUsers());
```

## 5. Package Scripts

Update `package.json` with these scripts:
```json
{
  "scripts": {
    "start": "ts-node src/index.ts",
    "build": "tsc",
    "serve": "node dist/index.js"
  }
}
```

## 6. Running the Application

- Development (with live reloading):
```bash
npm start
```

- Build for production:
```bash
npm run build
npm run serve
```

## 7. Additional Recommended Packages

- Development:
  - `nodemon`: For automatic server restarts
  - `eslint`: For linting
  - `prettier`: For code formatting

- Testing:
  - `jest`: For unit testing
  - `@types/jest`: Type definitions for Jest

## 8. Example with Express.js

```typescript
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, TypeScript with Node.js!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

## Best Practices

1. Use type annotations
2. Leverage interfaces and type definitions
3. Enable strict mode in tsconfig
4. Use type-safe libraries with good TypeScript support
5. Implement error handling
6. Use dependency injection for better testability

## Debugging Tips

- Use `sourceMap: true` in tsconfig for better debugging
- Utilize VS Code for integrated TypeScript debugging
- Use `ts-node-dev` for development with auto-restart
