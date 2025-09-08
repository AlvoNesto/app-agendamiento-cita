import { AppointmentService } from '../src/appointment/application/appointment.service';
import { Appointment } from '../src/appointment/domain/appointment.entity';

class RepoMock {
  items: Appointment[] = [];
  async save(a: Appointment) {
    this.items.push(a);
  }
  async findByInsuredId(id: string) {
    return this.items.filter(a => a.insuredId === id);
  }
  async updateStatus(insuredId: string, scheduleId: number) {
    const item = this.items.find(
      a => a.scheduleId === scheduleId && a.insuredId === insuredId,
    );
    if (item) {
      item.status = "completed";
    }
  }
}

class PubMock {
  published: any[] = [];
  async publish(e: any) {
    this.published.push(e);
  }
}

describe('AppointmentService', () => {
  let repo: RepoMock;
  let pub: PubMock;
  let svc: AppointmentService;

  beforeEach(() => {
    repo = new RepoMock();
    pub = new PubMock();
    svc = new AppointmentService(repo as any, pub as any);
  });

  test('createAppointment save and publish', async () => {
    const res = await svc.createAppointment('00001', 100, 'PE');

    expect(res.appointment.insuredId).toBe('00001');
    expect(repo.items.length).toBe(1);
    expect(pub.published.length).toBe(1);
  });

  test('listAppointments findByInsuredId', async () => {
    await svc.createAppointment('00001', 100, 'PE');
    await svc.createAppointment('00002', 200, 'PE');
    await svc.createAppointment('00003', 300, 'PE');
    const result = await svc.listAppointments('00001');

    expect(result.length).toBe(1);
    expect(result.every(a => a.insuredId === '00001')).toBe(true);
  });

  test('completeAppointment updateStatus', async () => {
    await svc.createAppointment('00001', 100, 'PE');
    await svc.completeAppointment('00001', 100);
    const appointment = repo.items[0];

    expect(appointment.status).toBe('completed');
  });
});
