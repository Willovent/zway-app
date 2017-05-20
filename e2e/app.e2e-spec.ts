import { ZwayAppPage } from './app.po';

describe('zway-app App', () => {
  let page: ZwayAppPage;

  beforeEach(() => {
    page = new ZwayAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
