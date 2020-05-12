import AppError from '@shared/errors/AppError';

import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRespository: FakeAppointmentsRespository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRespository = new FakeAppointmentsRespository();

    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRespository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 11, 14, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 11, 15, 0, 0),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 11, 11).getTime());

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      day: 11,
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
