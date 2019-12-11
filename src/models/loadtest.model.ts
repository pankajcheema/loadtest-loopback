import {Entity, model, property} from '@loopback/repository';

@model()
export class Loadtest extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  max_connection: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  desription?: string;


  constructor(data?: Partial<Loadtest>) {
    super(data);
  }
}

export interface LoadtestRelations {
  // describe navigational properties here
}

export type LoadtestWithRelations = Loadtest & LoadtestRelations;
