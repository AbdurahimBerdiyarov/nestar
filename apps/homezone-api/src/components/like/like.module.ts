import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like } from '../../libs/dto/like/like';
import LikeSchema from '../../schemas/Like.model';
import { NotificationModule } from '../notification/notification.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Like',
				schema: LikeSchema,
			},
		]),
		NotificationModule,
	],
	providers: [LikeService],
	exports: [LikeService],
})
export class LikeModule {}
