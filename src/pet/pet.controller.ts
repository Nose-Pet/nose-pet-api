import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiPath } from './pet.constant';
import { IRequestAugmented } from '../app/app.interface';
import { CreatePetBodyDto, GetPetParamDto, ModifyPetBodyDto } from './pet.dto';
import { UserGuard } from '../app/guards/user.guard';
import { PetService } from './pet.service';
import { TokenGuard } from '../app/guards/token.guard';
import { CreatePetBodyPipe, ModifyPetBodyPipe } from './pet.pipe';
import { PetGuard } from '../app/guards/pet.guard';
import { PetDetailResponseDto } from './dto/pet-detail-response.dto';
import { PetStatus } from 'nose-pet-entity/dist/pet/pet.constant';
import { IListCountResponse } from '../app/interfaces/common.interface';
import { ListFilterPipe } from '../app/pipe/common.pipe';
import { ListFilterQueryDto } from '../app/dto/common.dto';
import { PetResponseDto } from './dto/pet-response.dto';

@Controller(ApiPath.Root)
@UseGuards(TokenGuard, UserGuard)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPet(@Req() req: IRequestAugmented, @Body(CreatePetBodyPipe) body: CreatePetBodyDto): Promise<void> {
    const userPetGroup = req.extras.getUserPetGroup();
    const user = req.extras.getUser();
    await this.petService.addPet(userPetGroup, user, body);
  }

  @Get(ApiPath.GetPet)
  @HttpCode(HttpStatus.OK)
  @UseGuards(PetGuard)
  async getPetDetail(@Req() req: IRequestAugmented, @Param() param: GetPetParamDto) {
    const pet = req.extras.getPet();
    return new PetDetailResponseDto(pet);
  }

  @Delete(`${ApiPath.GetPet}`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(PetGuard)
  async deletePet(@Req() req: IRequestAugmented, @Param() param: GetPetParamDto): Promise<void> {
    const pet = req.extras.getPet();
    await this.petService.updatePetStatus(pet, PetStatus.Deleted);
  }

  @Put(ApiPath.GetPet)
  @HttpCode(HttpStatus.OK)
  @UseGuards(PetGuard)
  async modifyPet(@Req() req: IRequestAugmented, @Param() param: GetPetParamDto, @Body(ModifyPetBodyPipe) body: ModifyPetBodyDto): Promise<void> {
    const pet = req.extras.getPet();
    await this.petService.modifyPet(pet, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPets(@Req() req: IRequestAugmented, @Query(ListFilterPipe) query: ListFilterQueryDto): Promise<IListCountResponse<PetResponseDto>> {
    const userPetGroup = req.extras.getUserPetGroup();
    const [pets, count] = await this.petService.getPetList(userPetGroup, query);
    return { list: pets.map((pet) => new PetResponseDto(pet)), count };
  }
}
