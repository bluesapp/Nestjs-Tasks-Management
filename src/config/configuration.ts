export const config = ()  => ({
  port: parseInt(process.env.PORT, 10) || 3002,
  origin: 'http://nestjs-task-management-frontend.s3-website-eu-west-1.amazonaws.com',
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Colombia20+',
    database: 'taskmanagement',
    entities:  [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true,
  }
}); 