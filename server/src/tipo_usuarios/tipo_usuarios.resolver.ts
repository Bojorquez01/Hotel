import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TipoUsuariosService } from './tipo_usuarios.service';
import { TipoUsuario } from './entities/tipo_usuario.entity';
import { CreateTipoUsuarioInput } from './dto/create-tipo_usuario.input';
import { UpdateTipoUsuarioInput } from './dto/update-tipo_usuario.input';

@Resolver(() => TipoUsuario)
export class TipoUsuariosResolver {
  constructor(private readonly tipoUsuariosServicio: TipoUsuariosService) {}

  //  CREATE en CRUD

   @Mutation((returns)=> TipoUsuario, {name: 'crearTipoUsuario'})
   create(@Args('tipoUsuarioInput') tipoUsuarioInput: CreateTipoUsuarioInput){
     return this.tipoUsuariosServicio.create(tipoUsuarioInput);
   }
 

    // READ en CRUD
   @Query((returns)=> [TipoUsuario], {name: 'tipoUsuarios'})
   usuarios(){
     return this.tipoUsuariosServicio.findAll();
   }
 
   @Query((returns)=> TipoUsuario, {name: 'tipoUsuario'})
   usuario(@Args('id') id: number){
     return this.tipoUsuariosServicio.findOne(id);
   }
 
   //Fin de 
 
   //UPDATE en CRUD
   @Mutation(()=> TipoUsuario, {name: 'actualizarTipoUsuario'})
   update(@Args('updateTipoUsuarioInput') updateTipoUsuarioInput: UpdateTipoUsuarioInput){
     return this.tipoUsuariosServicio.update(updateTipoUsuarioInput.id, updateTipoUsuarioInput);
   }
 
   //DELETE en CRUD
   @Mutation((returns)=> String, {name: 'borrarTipoUsuario'})
   remove(@Args('id') id: number): Promise<Boolean>{
     return this.tipoUsuariosServicio.remove(id);
   }
}
