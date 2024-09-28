import { Body, Controller, Delete, Get, Header, Headers, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuarios.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { LoginUsuarioDto } from './dto/login.usuarios.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from './auth/decorators/auth.decorator';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuarioService: UsuariosService){}

    
    @Post('/auth/register')
    async register(@Body() usuario:UsuarioDto, @Res() response: Response){
        const result = await this.usuarioService.registerUser(usuario);
        response
            .status(HttpStatus.CREATED)
            .json({ok:true,result,msg: 'creado con exito'})
    }

    @Post('/auth/login')
    login(@Body() loginusuarioDto: LoginUsuarioDto ){
        return this.usuarioService.loginUser(loginusuarioDto)
    }

    @Get('/all')
    allUsuarios(@Query() paginationDto: PaginationDto){
        return this.usuarioService.getAllUsuarios(paginationDto)
    }


    @Get(':id')
    // @Auth(RoleStatusList.ADMIN)
    async usuarioById(
        @Param('id', ParseIntPipe) id: string,
        @Headers('Authorization') Authorization : string,
    ){
        try {
            // const splitString = token.split('Bearer ');
            const result = await this.usuarioService.getUsuarioById(+id, Authorization);
            return result;
        } catch (error) {
            return null;
        }
    }

    @Delete(':id')
    deleteUsuario(@Param('id', ParseIntPipe) id:string){
        return this.usuarioService.removeUsuario(id)

    }

    @Patch(':id')
    @UseInterceptors(FilesInterceptor('files'))
    async update(
        @Param('id') id:number,
        @Body() user: Partial<UsuarioDto>,
        @UploadedFiles() files: Express.Multer.File[],
        @Res() res: Response
    ){
        const result = await this.usuarioService.updateUser(id, user, files);
        res.status(HttpStatus.OK).json({ok: true,result, msg: 'approved'})
    }



}