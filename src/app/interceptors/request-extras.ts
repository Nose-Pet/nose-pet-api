import { JwtUserPayload } from '../app.interface';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';

export class RequestExtras {
  private payload: JwtUserPayload;
  private user: User;
  private userPetGroup: UserPetGroup;
  private pet: Pet;

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setUserPetGroup(userPetGroup: UserPetGroup): void {
    this.userPetGroup = userPetGroup;
  }

  getUserPetGroup(): UserPetGroup {
    return this.userPetGroup;
  }

  setPayload(payload: JwtUserPayload): void {
    this.payload = payload;
  }

  getPayload(): JwtUserPayload {
    return this.payload;
  }

  setPet(pet: Pet): void {
    this.pet = pet;
  }

  getPet(): Pet {
    return this.pet;
  }
}
