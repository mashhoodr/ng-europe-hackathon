import { DeviceMonitorPage } from './app.po';

describe('device-monitor App', function() {
  let page: DeviceMonitorPage;

  beforeEach(() => {
    page = new DeviceMonitorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
