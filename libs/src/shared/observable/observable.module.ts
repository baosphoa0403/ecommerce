import { Global, Module } from '@nestjs/common';
import { ObservableService } from 'libs/src/shared/observable/observable.service';

@Global()
@Module({ providers: [ObservableService], exports: [ObservableService] })
export class ObservableModule {}
