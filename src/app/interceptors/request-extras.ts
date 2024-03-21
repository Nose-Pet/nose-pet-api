import { JwtUserPayload } from '../app.interface';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';

export class RequestExtras {
  private payload: JwtUserPayload;
  private user: User;
  private userPetGroup: UserPetGroup;

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
}
