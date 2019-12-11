import {DefaultCrudRepository} from '@loopback/repository';
import {Loadtest, LoadtestRelations} from '../models';
import {PostgressDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LoadtestRepository extends DefaultCrudRepository<
  Loadtest,
  typeof Loadtest.prototype.id,
  LoadtestRelations
> {
  constructor(
    @inject('datasources.postgress') dataSource: PostgressDataSource,
  ) {
    super(Loadtest, dataSource);
  }
}
