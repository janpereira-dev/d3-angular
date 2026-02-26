import { AppModule } from './app.module';
import { AppRoutingModule } from './app-routing.module';

describe('AppModule', () => {
  it('should create the root modules', () => {
    expect(new AppModule()).toBeTruthy();
    expect(new AppRoutingModule()).toBeTruthy();
  });
});
