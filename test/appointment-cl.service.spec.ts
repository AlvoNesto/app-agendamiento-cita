import { AppointmentClService } from '../src/appointment-cl/application/appointment-cl.service';

class RepoMock {
  saved: any[] = [];
  async save(data: any) {
    this.saved.push(data);
  }
}

class PubMock {
  published: any[] = [];
  async publish(data: any) {
    this.published.push(data);
  }
}

describe('AppointmentClService', () => {
  let repo: RepoMock;
  let pub: PubMock;
  let svc: AppointmentClService;

  beforeEach(() => {
    repo = new RepoMock();
    pub = new PubMock();
    svc = new AppointmentClService(repo as any, pub as any);
  });

  test('processAppointment save and publish', async () => {
    const mockData = { insuredId: '00001', scheduleId: 123, countryISO: 'CL' };
    await svc.processAppointment(mockData);

    expect(repo.saved.length).toBe(1);
    expect(repo.saved[0]).toEqual(mockData);
    expect(pub.published.length).toBe(1);
    expect(pub.published[0]).toEqual(mockData);
  });
});
