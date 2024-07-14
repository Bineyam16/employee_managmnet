import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeUx0RXxbf1x0ZFdMYVRbQHNPIiBoS35RckVkWHxfdHVdQmVVUEF1')
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
