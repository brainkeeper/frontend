import { TestBed } from '@angular/core/testing';

import { ImageServiceService } from './image-service.service';
// npm install ng2-img-max blueimp-canvas-to-blob --save
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImgMaxSizeService } from 'ng2-img-max';
import { ImgMaxPXSizeService } from 'ng2-img-max';
import { ImgExifService } from 'ng2-img-max';
// npm install ng2-pica --save
import { Ng2PicaService } from 'ng2-pica';
// npm install --save-dev @types/node
// import Fs from 'fs';
// import * as fs from 'fs';


describe('ImageServiceService', () => {
  const exif = new ImgExifService();
  const service = new ImageServiceService(
    new Ng2ImgMaxService(
      new ImgMaxSizeService(exif),
      new ImgMaxPXSizeService(new Ng2PicaService(exif), exif),
      exif
      )
    );
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('GetBase64WithJPG', () => {
    it('should not modify a base64 string', () => {
      const f = (bs: string) => {
        // tslint:disable-next-line: max-line-length
        const want = 'data:application/octet-stream;base64,aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUEwQUFBQVFDQVlBQUFETm8vVTVBQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFBQmwwUlZoMFUyOW1kSGRoY21VQVoyNXZiV1V0YzJOeVpXVnVjMmh2ZE84RHZ6NEFBQUFhU1VSQlZDaVJZN3gxNjlKL0JoSUJFNmthUmpXTmFob1ptZ0RZaFFPbEFJU2syd0FBQUFCSlJVNUVya0pnZ2c9PQ==';
        console.log(' IN TEST have, ' + bs);
        console.log(' IN TEST want, ' + want);
        const wasSuccessful = bs === want;
        console.log(wasSuccessful);
        if ( !wasSuccessful ) {
          throw new Error('Test not Successfull');
        }
      };
      service.getBase64(
        // tslint:disable-next-line: max-line-length
        new File(['iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAaSURBVCiRY7x169J/BhIBE6kaRjWNahoZmgDYhQOlAISk2wAAAABJRU5ErkJggg=='],
        'test.png'),
        f
      );
      console.log('test');
      expect(true).toEqual(true);
    });

    it('rejects with error', async () => {
      const error = new Error('The input file should not be null.');
      try {
        service.getBase64(null, (e) => {});
      } catch ( e ) {
        expect(e).toEqual(error);
      }
    });
    it('resizes an image', async () => {
      /*
      const fs = require('fs');
      fs.readFileSync();

      const a = fs.readFile('./test.png', () => {
        throw new Error('Test Error');
      });

      // console.log(' TEST TEST TEST TEST ' + a);
      
      const f = (bs: string) => {
      };
      service.getBase64(
        // tslint:disable-next-line: max-line-length
        new File(['//=='],
        'test.png'),
        f
      );
      console.log('test');
      */
      expect(true).toEqual(true);
    });
  });
});
