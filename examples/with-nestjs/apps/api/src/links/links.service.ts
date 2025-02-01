import { Injectable } from '@nestjs/common';

import { Link } from '@repo/api/links/entities/link.entity';

import { CreateLinkDto } from '@repo/api/links/dto/create-link.dto';
import { UpdateLinkDto } from '@repo/api/links/dto/update-link.dto';

@Injectable()
export class LinksService {
  private readonly _links: Link[] = [
    {
      id: 0,
      title: 'Docs',
      url: 'https://nrz.build/repo/docs',
      description:
        'Find in-depth information about Nrz features and API.',
    },
    {
      id: 1,
      title: 'Learn',
      url: 'https://nrz.build/repo/docs/handbook',
      description: 'Learn more about monorepos with our handbook.',
    },
    {
      id: 2,
      title: 'Templates',
      url: 'https://nrz.build/repo/docs/getting-started/from-example',
      description:
        'Choose from over 15 examples and deploy with a single click.',
    },
    {
      id: 3,
      title: 'Deploy',
      url: 'https://khulnasoft.com/new',
      description:
        'Instantly deploy your Nrz to a shareable URL with Khulnasoft.',
    },
  ];

  create(createLinkDto: CreateLinkDto) {
    return `This action adds a new link ${createLinkDto}`;
  }

  findAll() {
    return this._links;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link ${updateLinkDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
