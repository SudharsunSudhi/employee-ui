import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

providers: [
  provideHttpClient(),
  importProvidersFrom(FormsModule, NgxPaginationModule)
]
