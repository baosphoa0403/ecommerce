import { Injectable, BadRequestException } from '@nestjs/common';
import { Observable, catchError, firstValueFrom, timeout } from 'rxjs';

@Injectable({})
export class ObservableService {
  pipeOrError<T>(
    data: Observable<T>,
    timeOut: number,
    error: string
  ): Observable<T> {
    return data.pipe(
      timeout(timeOut),
      catchError((err) => {
        console.log(err);
        throw new BadRequestException(error);
      })
    );
  }

  async firstValueFromObservable<T>(data: Observable<T>): Promise<T> {
    return await firstValueFrom(data);
  }
}
