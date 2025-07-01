import { Injectable } from "@nestjs/common";
import { CreateAudioPartDto } from "./dto/create-audio_part.dto";
import { UpdateAudioPartDto } from "./dto/update-audio_part.dto";
import { InjectModel } from "@nestjs/sequelize";
import { AudioPart } from "./entities/audio_part.entity";

@Injectable()
export class AudioPartsService {
  constructor(
    @InjectModel(AudioPart) private readonly audioPartModel: typeof AudioPart
  ) {}
  create(createAudioPartDto: CreateAudioPartDto) {
    return this.audioPartModel.create(createAudioPartDto);
  }

  findAll() {
    return this.audioPartModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.audioPartModel.findByPk(id);
  }

  update(id: number, updateAudioPartDto: UpdateAudioPartDto) {
    return this.audioPartModel.update(updateAudioPartDto, { where: { id } });
  }

  remove(id: number) {
    return this.audioPartModel.destroy({ where: { id } });
  }
}
