import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClassEntity } from './entity/class.entity';
import { UserEntity } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/generatePDF')
  generatePDF(@Body() user: UserEntity) {
    return this.appService.getpdg(user);
  }
}
