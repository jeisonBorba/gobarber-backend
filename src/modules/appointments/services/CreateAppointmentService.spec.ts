import AppError from '@shared/errors/AppError';
import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRespository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '12312312121',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12312312121');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRespository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '12312312121',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '12312312121',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
