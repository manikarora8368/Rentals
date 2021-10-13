import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    },
  );
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Rentals API')
    .setDescription('This is a Rentals API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
  // app1.listen();
}
bootstrap();
