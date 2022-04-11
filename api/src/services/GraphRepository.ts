import { Knex } from "knex";
import pg from "../db/connect"

export interface Entry {
    'text': string,
    'name': string,
    'img': string,
    'outputUpdated': boolean
}

// Export class so it can be easily used in tests
// In Repository all method that are related with one table should be in same class
export class GraphRepository {
    constructor(protected db: Knex) { }

    // Don't premature optimize, one fetching function is ok if it doesn't impact performance a lot
    async findByName(name: string): Promise<Entry> {
        return this.db('graphs')
            .where({ name: name })
            .first()
        // .catch((err: Error) => { don't throw error, just return rejected promise
        //     throw err
        // })

    }

    // Usually ORMs implement it out of the box (like sequelize or typORM), here we have to implement it by ourselves
    async update(entry: Entry) {
        return this.db('graphs')
          .where({ name: entry.name })
          .update({ text: entry.text })
    }

    async save(entry: Entry){
        return this.db('graphs').insert(entry)
    }
}

// Export default object for convenience of use in other places. WARN: I think it is a little hack here.
export default new GraphRepository(pg);
