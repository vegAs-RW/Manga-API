import { beforeAll, afterAll } from '@jest/globals';
import { db, pool } from '../infrastructure/data';
import bcrypt from 'bcrypt';

import { sql } from 'drizzle-orm';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { users } from '../infrastructure/data/schema';

export let createdUser: {id: string, username: string, password: string} = { id: '', username: '', password: '' }

// beforeAll
// fonction qui sera exécutée avant tout les tests, et on va en profiter pour setup notre environnement (db)
beforeAll(async () => {
    try {
        console.log('Setting up test environment...');
        
        await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);

        // On dit à notre DB de travailler dans le schéma test
        await db.execute(sql`SET search_path TO test`);
    
        // On va appliquer nos migrations dans le schéma test, c'est à dire insérer nos tables à l'intérieur
        await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle', migrationsSchema: 'test' });
        console.log('Migrations is done.');
    
        // On va créer notre utilisateur de test, qui s'occupera d'écrire des articles, commenter, etc...
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const result = await db.insert(users)
          .values({ username: 'testuser', password: hashedPassword })
          .returning()
          .execute();
    
        // createdUser, qui est exporté dans ce fichier. Nous le mettons à jour avec l'utilisateur que nous venons de créer
        createdUser = { id: result[0].id, username: 'testuser', password: hashedPassword };
        console.log('Test user created:', createdUser);
    } catch (error) {
        console.error('Error during beforeAll:', error);
    }
});

// afterAll
// fonction qui sera exécutée après tout les tests, et on va en profiter pour nettoyer notre environnement (db)
afterAll(async () => {
    try {
        await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
        await pool.end();
    } catch (error) {
        console.error('Error during afterAll:', error);
    }
});