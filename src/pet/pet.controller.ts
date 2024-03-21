import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiPath } from './pet.constant';
import { IRequestAugmented } from '../app/app.interface';
import { CreatePetBodyDto } from './pet.dto';
import { UserGuard } from '../app/guards/user.guard';
import { PetService } from './pet.service';
import { TokenGuard } from '../app/guards/token.guard';
import { CreatePetBodyPipe } from './pet.pipe';

@Controller(ApiPath.Root)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(TokenGuard, UserGuard)
  async createPet(@Req() req: IRequestAugmented, @Body(CreatePetBodyPipe) body: CreatePetBodyDto): Promise<void> {
    const userPetGroup = req.extras.getUserPetGroup();
    const user = req.extras.getUser();
    await this.petService.addPet(userPetGroup, user, body);
  }
}
