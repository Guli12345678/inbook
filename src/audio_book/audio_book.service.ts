import { Injectable } from "@nestjs/common";
import { CreateAudioBookDto } from "./dto/create-audio_book.dto";
import { UpdateAudioBookDto } from "./dto/update-audio_book.dto";
import { InjectModel } from "@nestjs/sequelize";
import { AudioBook } from "./entities/audio_book.entity";

@Injectable()
export class AudioBookService {
  constructor(
    @InjectModel(AudioBook) private readonly audio_bookModel: typeof AudioBook
  ) {}
  create(createAudioBookDto: CreateAudioBookDto) {
    return this.audio_bookModel.create(createAudioBookDto);
  }

  findAll() {
    return this.audio_bookModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.audio_bookModel.findByPk(id);
  }

  update(id: number, updateAudioBookDto: UpdateAudioBookDto) {
    return this.audio_bookModel.update(updateAudioBookDto, { where: { id } });
  }

  remove(id: number) {
    return this.audio_bookModel.destroy({ where: { id } });
  }
}
