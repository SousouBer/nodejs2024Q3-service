import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const port = process.env.PORT || 4000;

  app.useLogger(app.get(LoggingService));
  await app.listen(port);
}
bootstrap();
