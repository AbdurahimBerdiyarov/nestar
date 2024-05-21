import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import { ViewGroup } from '../../enums/view.enum';
import { ObjectId } from 'mongoose';

@ObjectType()
export class View {
	@Field(() => String)
	_id: Object;

	@Field(() => ViewGroup)
	viewGroup: ViewGroup;

	@Field(() => String)
	viewRefid: ObjectId;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
