import AppError from '@shared/errors/AppError';

import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRespository: FakeAppointmentsRespository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRespository = new FakeAppointmentsRespository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRespository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 8, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 9, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 10, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 11, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 12, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 13, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 14, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 15, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 16, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 17, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 12, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 10, available: true },
        { day: 11, available: false },
        { day: 12, available: true },
        { day: 13, available: true },
      ]),
    );
  });
});
