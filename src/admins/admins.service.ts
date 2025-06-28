import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./entities/admin.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parol mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      password: hashed_password,
    });
    return newAdmin;
  }

  findAll() {
    return this.adminModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  findAdminByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.update(updateAdminDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.adminModel.destroy({ where: { id } });
  }
}
