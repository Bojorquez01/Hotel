import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHabitacionModule } from './tipo_habitacion/tipo_habitacion.module';
import { HabitacionModule } from './habitacion/habitacion.module';
import { ReservacionModule } from './reservacion/reservacion.module';
import { AuthModule } from './auth/auth.module';
import { ReporteModule } from './reporte/reporte.module';
import { GastosModule } from './gastos/gastos.module';






@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'sgh_VM',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'liceedu12',
    autoLoadEntities: true,
    synchronize: false,
    timezone: 'America/Mexico_City',
  }),
  UsuariosModule,
  TipoHabitacionModule,
  HabitacionModule,
  ReservacionModule,
  AuthModule,
  ReporteModule,
  GastosModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
