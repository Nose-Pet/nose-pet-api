import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { config } from '../config/config.service';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { Pet } from 'nose-pet-entity/dist/pet/pet.entity';
import { PetType } from 'nose-pet-entity/dist/pet-type/pet-type.entity';
import { PetNosePrint } from 'nose-pet-entity/dist/pet-nose-print/pet-nose-print.entity';
import { PetSchedule } from 'nose-pet-entity/dist/pet-schedule/pet-schedule.entity';
import { Schedule } from 'nose-pet-entity/dist/schedule/schedule.entity';
import { SchedulePeriodSetting } from 'nose-pet-entity/dist/schedule-period-setting/schedule-period-setting.entity';
import { ScheduleAlarm } from 'nose-pet-entity/dist/schedule-alarm/schedule-alarm.entity';
import { ScheduleVitamin } from 'nose-pet-entity/dist/schedule-vitamin/schedule-vitamin.entity';
import { ScheduleWalk } from 'nose-pet-entity/dist/schedule-walk/schedule-walk.entity';
import { MissingReport } from 'nose-pet-entity/dist/missing-report/missing-report.entity';
import { MissingReportImage } from 'nose-pet-entity/dist/missing-report-image/missing-report-image.entity';
import { Token } from 'nose-pet-entity/dist/token/token.entity';
import { UserSecret } from 'nose-pet-entity/dist/user-secret/user-secret.entity';

export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: config.mysqlHost,
      port: config.mysqlPort,
      username: config.mysqlUsername,
      password: config.mysqlPassword,
      database: config.mysqlDatabase,
      entities: [
        UserPetGroup,
        User,
        Pet,
        PetType,
        PetNosePrint,
        PetSchedule,
        Schedule,
        SchedulePeriodSetting,
        ScheduleAlarm,
        ScheduleVitamin,
        ScheduleWalk,
        MissingReport,
        MissingReportImage,
        Token,
        UserSecret,
      ],
      timezone: 'Z',
      logging: false,
      synchronize: false,
      keepConnectionAlive: true,
      // autoLoadEntities: true,
    };
  }
}
