import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAppartmentDto {
  @ApiProperty({
    example: 'Aravali Apartments',
    description: 'Enter the name of your Apartment',
  })
  @IsNotEmpty()
  @Matches(/^[\da-zA-Z\s-]+$/, {
    message: 'Name must contain only Alphabet and Numbers',
  })
  @MaxLength(25)
  name: string;
  @ApiProperty({
    example: 'Constructed in 2020 and much more',
    description: 'About the apartment',
  })
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
  @ApiProperty({
    example: 'https://res.cloudinary.com/xxxxxxxx/image/upload/xxxxxxxx.jpg',
  })
  @Matches(
    /https:\/\/res\.cloudinary\.com\/.+\/image\/upload\/.+\/.+\.(jpg|png|jpeg|jfif)/,
    {
      message: 'Please Enter Valid Photo',
    },
  )
  @IsNotEmpty()
  photoLink: string;
  @ApiProperty({ example: '1250', description: 'Carpet Area of Apartment' })
  @IsNumber()
  @Min(1)
  @Max(4000)
  @IsNotEmpty()
  floorSize: number;

  @ApiProperty({ example: '2500000', description: 'Price in Rupees' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Max(100000)
  price: number;

  @ApiProperty({
    example: '4',
    description: 'Number of Rooms in the Apartment',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(6)
  Rooms: number;

  @ApiProperty({
    example: 'House no. 82 , Aravali Apartments, Dwarka sec-14 , New Delhi',
    description: 'Address of Apartment',
  })
  @IsNotEmpty()
  @Matches(/[\da-zA-Z\s\.(),-]+/)
  Address: string;
}
