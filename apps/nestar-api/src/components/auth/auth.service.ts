// import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcryptjs';

// @Injectable()
// export class AuthService {
// 	public async hashpassword(memberPassword: string): Promise<string> {
// 		const salt = await bcrypt.getSalt(10);
// 		return await bcrypt.hash(memberPassword, salt);
// 	}

// 	public async comparePasswords(password: string, hashedpassword: string): Promise<boolean> {
// 		return await bcrypt.compare(password, hashedpassword);
// 	}
// }
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	public async hashpassword(memberPassword: string): Promise<string> {
		const salt = await bcrypt.genSalt(); // rounds sifatida 10 berilgan
		return await bcrypt.hash(memberPassword, salt);
	}

	public async comparePasswords(password: string, hashedpassword: string): Promise<boolean> {
		return await bcrypt.compare(password, hashedpassword);
	}
}
