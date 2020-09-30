const request = require('supertest')
const { createApp } = require('../src/server')
const { state } = require('../src/state')

describe('testing participation endpoints', () => {
  let app

  beforeEach(async () => {
    app = await createApp()
    // delete all db data from previous tests
    await state.sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await state.sequelize.close()
  })

  it('should have no data by default', async () => {
    const res = await request(app).get('/participation')
    expect(res.body).toEqual([])
  })

  it('should not be able to insert empty items', async () => {
    expect(
      await request(app)
        .post('/participation')
        .send({})
    ).toMatchObject({ status: 400 })

    expect(
      await request(app)
        .post('/participation')
        .send({ firstName: '', lastName: '', participation: 0 })
    ).toMatchObject({ status: 400 })

    expect(
      await request(app)
        .post('/participation')
        .send({ firstName: 'hey', lastName: '', participation: 10 })
    ).toMatchObject({ status: 400 })

    expect(
      await request(app)
        .post('/participation')
        .send({ firstName: '', lastName: 'hey', participation: 0 })
    ).toMatchObject({ status: 400 })

    expect(await request(app).get('/participation'))
      .toMatchObject({ body: [], status: 200 })
  })

  it('should not be able to insert more than 100% of participation', async () => {
    const majorShareholder = {
      firstName: 'some',
      lastName: 'rich guy',
      participation: 90
    }

    const majorRes = await request(app)
      .post('/participation')
      .send(majorShareholder)

    expect(majorRes.status).toBe(200)

    const invalidParticipation = {
      firstName: 'some',
      lastName: 'smart one',
      participation: 25
    }

    const invalidRes = await request(app)
      .post('/participation')
      .send(invalidParticipation)

    expect(invalidRes.status).toBe(400)

    const itemsRes = await request(app).get('/participation')
    expect(itemsRes.body).toEqual([{ ...majorShareholder, id: majorRes.body.id }])
  })

  it('should be able to insert records', async () => {
    const participation = {
      firstName: 'patrick2',
      lastName: 'stival',
      participation: 10
    }
    const postRes = await request(app)
      .post('/participation')
      .send(participation)

    expect(postRes.status).toBe(200)

    const getRes = await request(app).get('/participation')
    expect(Array.isArray(getRes.body)).toBe(true)
    expect(getRes.body.length).toBe(1)

    expect(getRes.body).toEqual([{ ...participation, id: postRes.body.id }])
  })
})
