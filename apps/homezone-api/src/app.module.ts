import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { T } from './libs/types/common';
import { response } from 'express';
import { SocketModule } from './socket/socket.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			playground: false, // process.env.NODE_ENV !== 'production',
			uploads: false,
			autoSchemaFile: true,
			introspection: true,
			formatError: (error: T) => {
				console.log('ERROR:::', error);

				const GraphQLFormattedError = {
					code: error?.extensions.code,
					message:
						error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message,
				};
				console.log('GRAPHQL GLOBAL ERR:', GraphQLFormattedError);
				return GraphQLFormattedError;
			},
		}),
		ComponentsModule,
		DatabaseModule,
		SocketModule,
	],

	controllers: [AppController],
	providers: [AppService, AppResolver],
})
export class AppModule {}
