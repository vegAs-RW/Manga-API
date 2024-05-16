import { beforeAll, afterAll } from '@jest/globals';
import { db, pool } from '../infrastructure/data';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// beforeAll
// fonction qui sera exécutée avant tout les tests, et on va en profiter pour setup notre environnement (db)
beforeAll(async () => {
    try {
        console.log('Setting up test environment...');
        await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);
        await db.execute(sql`SET search_path TO test`);
        await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle', migrationsSchema: 'test' });
        console.log('Migrations is done.');
    } catch (error) {
        console.error('Error during beforeAll:', error);
    }
});

// afterAll
// fonction qui sera exécutée après tout les tests, et on va en profiter pour nettoyer notre environnement (db)
afterAll(async () => {
    try {
        //await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
        await pool.end();
    } catch (error) {
        console.error('Error during afterAll:', error);
    }
});