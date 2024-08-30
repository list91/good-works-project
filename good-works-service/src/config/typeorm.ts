import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { Friends } from "src/entities/friends.entity";
import { Tasks } from "src/entities/tasks.entity";
import { Users } from "src/entities/users.entity";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 5432,
      username: process.env.DATABASE_USER || 'admin', 
      password: process.env.DATABASE_PASSWORD || 'admin',
      database: process.env.DATABASE_NAME || 'gwdb',
      entities: [Friends, Users, Tasks],
      migrations: ["dist/migrations/*{.ts,.js}"],
      synchronize: true,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
