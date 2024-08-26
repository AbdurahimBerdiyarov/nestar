import { NestFactory } from '@nestjs/core';
import { HomeZoneBatchModule } from './batch.module';

async function bootstrap() {
	const app = await NestFactory.create(HomeZoneBatchModule);
	await app.listen(process.env.PORT_BATCH ?? 4000);
}
bootstrap();
