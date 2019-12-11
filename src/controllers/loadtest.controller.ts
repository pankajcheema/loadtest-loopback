import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Loadtest} from '../models';
import {LoadtestRepository} from '../repositories';

export class LoadtestController {
  constructor(
    @repository(LoadtestRepository)
    public loadtestRepository: LoadtestRepository,
  ) {}

  @post('/loadtests', {
    responses: {
      '200': {
        description: 'Loadtest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Loadtest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loadtest, {
            title: 'NewLoadtest',
            exclude: ['id'],
          }),
        },
      },
    })
    loadtest: Omit<Loadtest, 'id'>,
  ): Promise<Loadtest> {
    const sample = {max_connection: 7000, name: 'string', desription: 'string'};
    const result = this.loadtestRepository.create(loadtest);
    const dfg = [];
    for (let i = 0; i < 10000; i++) {
      //   console.log('i value >>>>' + i);
      dfg[i] = this.loadtestRepository.create(sample);
    }
    console.log('STart Time:--' + new Date().toISOString());
    const results = await Promise.all(dfg);
    console.log('END TIME:--' + new Date().toISOString());

    return result;
  }

  @get('/loadtests/count', {
    responses: {
      '200': {
        description: 'Loadtest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Loadtest))
    where?: Where<Loadtest>,
  ): Promise<Count> {
    return this.loadtestRepository.count(where);
  }

  @get('/loadtests', {
    responses: {
      '200': {
        description: 'Array of Loadtest model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Loadtest)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Loadtest))
    filter?: Filter<Loadtest>,
  ): Promise<Loadtest[]> {
    return this.loadtestRepository.find(filter);
  }

  @patch('/loadtests', {
    responses: {
      '200': {
        description: 'Loadtest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loadtest, {partial: true}),
        },
      },
    })
    loadtest: Loadtest,
    @param.query.object('where', getWhereSchemaFor(Loadtest))
    where?: Where<Loadtest>,
  ): Promise<Count> {
    return this.loadtestRepository.updateAll(loadtest, where);
  }

  @get('/loadtests/{id}', {
    responses: {
      '200': {
        description: 'Loadtest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Loadtest)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Loadtest> {
    return this.loadtestRepository.findById(id);
  }

  @patch('/loadtests/{id}', {
    responses: {
      '204': {
        description: 'Loadtest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loadtest, {partial: true}),
        },
      },
    })
    loadtest: Loadtest,
  ): Promise<void> {
    await this.loadtestRepository.updateById(id, loadtest);
  }

  @put('/loadtests/{id}', {
    responses: {
      '204': {
        description: 'Loadtest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() loadtest: Loadtest,
  ): Promise<void> {
    await this.loadtestRepository.replaceById(id, loadtest);
  }

  @del('/loadtests/{id}', {
    responses: {
      '204': {
        description: 'Loadtest DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.loadtestRepository.deleteById(id);
  }
}
