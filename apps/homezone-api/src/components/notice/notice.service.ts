import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Notice } from '../../libs/dto/notice/notice';
import { NoticeInput } from '../../libs/dto/notice/notice.input';
import { Message } from '../../libs/enums/common.enum';
import { NoticeStatus } from '../../libs/enums/notice.enum';

@Injectable()
export class NoticeService {
	@InjectModel('Notice') private readonly noticeModel: Model<Notice>;

	public async noticeCreate(input: NoticeInput): Promise<Notice> {
		try {
			return await this.noticeModel.create(input);
		} catch (err) {
			console.log('Error. Service.model', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	public async deleteNotice(id: ObjectId): Promise<Notice> {
		const deletedNotice = await this.noticeModel.findByIdAndDelete(id);
		if (!deletedNotice) {
			throw new NotFoundException(`Notice with ID ${id} not found`);
		}
		return deletedNotice;
	}

	// public async getNotice(): Promise<Notice[]> {
	// 	return await this.noticeModel.find();
	// }

	public async getNotice(): Promise<Notice[]> {
		try {
			// Ma'lumotlarni 'createdAt' field bo'yicha teskari tartibda olish
			return await this.noticeModel.find().sort({ createdAt: -1 });
		} catch (err) {
			console.log('Error in getNotice:', err.message);
			throw new BadRequestException('Failed to retrieve notices');
		}
	}
}
