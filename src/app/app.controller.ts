import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get() {
    return {
      name: 'Toonflix Backend',
      description: 'A backend service for Toonflix, a SNS platform',
      publishedAt: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
