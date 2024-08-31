import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3003', // Укажите адрес вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Укажите методы, которые будут разрешены
    credentials: true, // Если нужно передавать куки
  });
  

  await app.listen(3002); // Порт вашего бэкенда
}
bootstrap();
