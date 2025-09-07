import { AppointmentService } from '../src/appointment/application/appointment.service';
import { Appointment } from '../src/appointment/domain/appointment.entity';

class RepoMock {
  items: Appointment[] = [];
  async save(a: Appointment) { this.items.push(a); }
  async findByInsuredId(_id: string) { return this.items; }
  async updateStatus(_i:number, _s:number, _st:string) {}
}
class PubMock { published: any[] = []; async publish(e:any){ this.published.push(e); } }

test('createAppointment saves and publishes', async () => {
  const repo = new RepoMock();
  const pub = new PubMock();
  const svc = new AppointmentService(repo as any, pub as any);
  const res = await svc.createAppointment('00001', 100, 'PE');
  expect(res.appointment.insuredId).toBe('00001');
  expect(repo.items.length).toBe(1);
  expect(pub.published.length).toBe(1);
});
