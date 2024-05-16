module.exports = {
  preset: 'ts-jest', // On dit à jest de préparer les tests pour TypeScript
  testEnvironment: 'node', // On dit à jest de simuler un environnement node

  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'], // <rootDir> est le chemin absolu vers la racine du projet, donc le dossier server
  moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1' // On dit à jest de transformer les imports de la forme "@/..." en "src/..."
    },
    transform: {
      '^.+\\.ts?$': 'ts-jest' // On dit à jest de transformer les fichiers .ts en .js pour les exécuter
    },
    testMatch: [
      '**/?(*.)+(spec|test).[tj]s?(x)' // On dit à jest de chercher les fichiers de test qui se terminent par .spec.ts ou .test.ts
    ]    
};