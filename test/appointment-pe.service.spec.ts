import { AppointmentPeService } from '../src/appointment-pe/application/appointment-pe.service';

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

describe('AppointmentPeService', () => {
  let repo: RepoMock;
  let pub: PubMock;
  let svc: AppointmentPeService;

  beforeEach(() => {
    repo = new RepoMock();
    pub = new PubMock();
    svc = new AppointmentPeService(repo as any, pub as any);
  });

  test('processAppointment save and publish', async () => {
    const mockData = { insuredId: '00001', scheduleId: 123, countryISO: 'PE' };
    await svc.processAppointment(mockData);

    expect(repo.saved.length).toBe(1);
    expect(repo.saved[0]).toEqual(mockData);
    expect(pub.published.length).toBe(1);
    expect(pub.published[0]).toEqual(mockData);
  });
});
