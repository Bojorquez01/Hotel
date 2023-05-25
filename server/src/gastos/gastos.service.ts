import { ConflictException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';
import { QueryBuilder, Repository, getRepository } from 'typeorm';
import { Gasto } from './entities/gasto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Context } from '@nestjs/graphql';
import { TrabajadorGuard } from 'src/roles/trabajador.guard';
import { TrabajadorAdminGuard } from 'src/roles/trabajador-admin.guard';


@Injectable()
export class GastosService {
   
  constructor(

    @InjectRepository(Gasto)
    private gastosRepository: Repository<Gasto>,
    private jwtService: JwtService,
  ){
    
  }


  @UseGuards(TrabajadorGuard)
  async create(createGastoInput: CreateGastoInput, @Context() context) {
    const existGasto = await this.gastosRepository.findOneBy({nombre: createGastoInput.nombre});

    if (existGasto){

      throw new ConflictException('Este gasto ya ha sido registrado');

    }else{

      
      const token = context.req.headers.authorization.replace('Bearer ', '');
      const payload: any = this.jwtService.decode(token);
      const usuarioId = payload.id;
      const nombreUser = payload.nombre;
      const apPaterno = payload.apPaterno;
      const apMaterno = payload.apMaterno;


      const pre_gasto = this.gastosRepository.create(createGastoInput);

      const fecha_hoy = new Date();
      fecha_hoy.setHours(0,0,0,0);


      const gasto = new Gasto()
      gasto.empleado_id = usuarioId;
      gasto.nombre_empleado = nombreUser + " " + apPaterno + " " + apMaterno
      gasto.id = pre_gasto.id;
      gasto.monto = pre_gasto.monto;
      gasto.fecha = fecha_hoy;
      gasto.nombre = pre_gasto.nombre
      
      const gasto_hecho = await this.gastosRepository.save(gasto);
      return gasto_hecho;
    }

  }

  @UseGuards(TrabajadorAdminGuard)
  async findAll() {
    return this.gastosRepository.find();
  }

  @UseGuards(TrabajadorAdminGuard)
  async totalGastos(): Promise<number> {
    const gastos = await this.gastosRepository.find();
    const total = gastos.reduce((accumulator, gasto) => accumulator + gasto.monto, 0);
    return total;
  }
  
  @UseGuards(TrabajadorAdminGuard)
  async findOne(nombre: string) {
    const gasto = await this.gastosRepository.findOneBy({nombre: nombre});

    if (gasto){
      return gasto;
    }else{
      throw new NotFoundException('No existe este gasto o no coinciden los nombres')
    }
  }

  @UseGuards(TrabajadorAdminGuard)
  async findOneById(id: number) {
    const gasto = await this.gastosRepository.findOneBy({id: id});

    if (gasto){
      return gasto;
    }else{
      throw new NotFoundException('No existe este gasto o no el id no existe');
    }
  }

  @UseGuards(TrabajadorAdminGuard)
  async update(id: number, updateGastoInput: UpdateGastoInput) {
    const gasto = await this.findOneById(id);

    if (gasto){

      return this.gastosRepository.update(id, updateGastoInput);

    }else{

      throw new NotFoundException('No existe este gasto o su id es incorrecto')
    }
  }

  //Pendiente
  @UseGuards(TrabajadorAdminGuard)
  async remove(id: number): Promise<Boolean> {
    const gasto = await this.gastosRepository.findOne({
      where: {id}
    })

    if (gasto){
      const resultado = await this.gastosRepository.delete(id);
      
      if (resultado.affected !==0){
        return true;
      }
    } else {
      throw new NotFoundException(`El gasto con el ID ${id} no fue econtrado o no existe`);
    }

  }

}
