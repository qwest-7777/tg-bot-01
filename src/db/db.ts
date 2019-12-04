 
import {IInitOptions, IDatabase, IMain, TConfig} from 'pg-promise';
import {IExtensions, UsersRepository} from './repos';
const pgPromise = require('pg-promise');

export type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

export function createDBApp(config?: TConfig){
    const initOptions: IInitOptions<IExtensions> = {

        extend(obj: ExtendedProtocol, dc: any) {
            obj.users = new UsersRepository(obj, pgp);
        }
    };
    
    config = {
        host: 'localhost',
        port: 5432,
        database: 'tg-bot-test',
        user: 'otabek',
        password: 'admin'
    }
    
    const pgp: IMain = pgPromise(initOptions);
    
    const db: ExtendedProtocol = pgp(config);
    
    return db
}

export async function initializeDBApp(db: ExtendedProtocol) {
    await db.users.create();
}



