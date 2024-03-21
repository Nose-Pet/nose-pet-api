import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiPath } from './pet.constant';
import { IRequestAugmented } from '../app/app.interface';
import { CreatePetBodyDto, GetPetParamDto } from './pet.dto';
import { UserGuard } from '../app/guards/user.guard';
import { PetService } from './pet.service';
import { TokenGuard } from '../app/guards/token.guard';
import { CreatePetBodyPipe } from './pet.pipe';
import { PetGuard } from '../app/guards/pet.guard';
import { PetDetailResponseDto } from './dto/pet-detail-response.dto';

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

  @Get(ApiPath.GetPet)
  @HttpCode(HttpStatus.OK)
  @UseGuards(TokenGuard, UserGuard, PetGuard)
  async getPetDetail(@Req() req: IRequestAugmented, @Param() param: GetPetParamDto) {
    const pet = req.extras.getPet();
    return new PetDetailResponseDto(pet);
  }
}
