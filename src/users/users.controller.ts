import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Put,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './role.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ChangeRoleDto } from './dto/change-role.dto';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @SetMetadata('role', ['admin'])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 400 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 401 },
        message: { type: 'string' },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 403 },
        message: { type: 'string' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 500 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // @SetMetadata('role', ['admin'])
  // @UseGuards(RolesGuard)
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 400 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 401 },
        message: { type: 'string' },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 403 },
        message: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 404 },
        message: { type: 'string' },
      },
    },
  })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }
  @SetMetadata('role', ['admin'])
  @UseGuards(RolesGuard)
  @Patch('/changeRole')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 400 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 401 },
        message: { type: 'string' },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 403 },
        message: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 404 },
        message: { type: 'string' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 500 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  changeRole(@Body() body: ChangeRoleDto) {
    return this.usersService.changeRole(body);
  }
  @SetMetadata('role', ['admin', 'realtor', 'user'])
  @UseGuards(RolesGuard)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 400 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 401 },
        message: { type: 'string' },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 403 },
        message: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 404 },
        message: { type: 'string' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 500 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.update(+id, updateUserDto, req.user);
  }
  @SetMetadata('role', ['admin'])
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 400 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 401 },
        message: { type: 'string' },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 403 },
        message: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 404 },
        message: { type: 'string' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', default: 500 },
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
