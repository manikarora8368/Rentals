import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  SetMetadata,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/users/role.guard';
import { AppartmentsService } from './appartments.service';
import { CreateAppartmentDto } from './dto/create-appartment.dto';
import { UpdateAppartmentDto } from './dto/update-appartment.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Appartment } from './entities/appartment.entity';
import { AuthorGuard } from 'src/auth/authorize.guard';
import { PaginationParams } from './dto/PaginationParams.dto';
@ApiTags('Apartments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseGuards(AuthorGuard)
@Controller('apartments')
export class AppartmentsController {
  constructor(private readonly appartmentsService: AppartmentsService) {}
  @SetMetadata('role', ['admin', 'realtor'])
  @UseGuards(RolesGuard)
  @Post()
  @ApiCreatedResponse({ type: Appartment })
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
  create(@Body() createAppartmentDto: CreateAppartmentDto, @Request() req) {
    return this.appartmentsService.create(createAppartmentDto, req.user);
  }

  @Get()
  @ApiQuery({
    name: 'sizeMin',
    required: false,
    type: 'number',
    description: '',
  })
  @ApiQuery({
    name: 'sizeMax',
    required: false,
    type: 'number',
    description: '',
  })
  @ApiQuery({
    name: 'PriceMin',
    required: false,
    type: 'number',
    description: '',
  })
  @ApiQuery({
    name: 'PriceMax',
    required: false,
    type: 'number',
    description: '',
  })
  @ApiQuery({
    name: 'RoomsMin',
    required: false,
    type: 'number',
    description: '',
  })
  @ApiQuery({
    name: 'RoomsMax',
    required: false,
    type: 'number',
    description: '',
  })
  @ApiOkResponse({ type: Appartment, isArray: true })
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
  @UseGuards(AuthorGuard)
  findAll(
    @Query() { offset, limit }: PaginationParams,
    @Query('sizeMin') sizeMin: Number,
    @Query('sizeMax') sizeMax: number,
    @Query('PriceMin') PriceMin: number,
    @Query('PriceMax') PriceMax: number,
    @Query('RoomsMin') RoomsMin: number,
    @Query('RoomsMax') RoomsMax: number,
    @Request() req,
  ) {
    return this.appartmentsService.findAll(
      sizeMin,
      sizeMax,
      PriceMin,
      PriceMax,
      RoomsMin,
      RoomsMax,
      req,
      offset,
      limit,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string ) {
  //   return this.appartmentsService.findOne(+id);
  // }
  @SetMetadata('role', ['admin', 'realtor'])
  @UseGuards(RolesGuard)
  @Put(':id')
  @ApiOkResponse({ type: Appartment })
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
    @Body() updateAppartmentDto: UpdateAppartmentDto,
  ) {
    return this.appartmentsService.update(+id, updateAppartmentDto);
  }
  @SetMetadata('role', ['admin', 'realtor'])
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOkResponse({ type: Appartment })
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
  remove(@Param('id') id: string) {
    return this.appartmentsService.remove(+id);
  }
}
