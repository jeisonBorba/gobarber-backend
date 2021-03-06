import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRespository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRespository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 12, 12).getTime());

    const createNotification = jest.spyOn(
      fakeNotificationsRepository,
      'create',
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 12, 13),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
    expect(createNotification).toHaveBeenCalled();
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 12, 12).getTime());

    const appointmentDate = new Date(2020, 4, 15, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 12, 12).getTime());

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 12, 11),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 12, 12).getTime());

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 12, 13),
        provider_id: 'provider_id',
        user_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 12, 12).getTime());

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 12, 7),
        provider_id: 'user_id',
        user_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 12, 18),
        provider_id: 'user_id',
        user_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
