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
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 8, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 9, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 10, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 11, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 12, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 13, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 14, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 15, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 16, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day, 17, 0, 0),
    });

    await fakeAppointmentsRespository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(year, month, day + 2, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider_id',
      year,
      month: month + 1,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: day - 1, available: false },
        { day, available: false },
        { day: day + 2, available: true },
      ]),
    );
  });
});
