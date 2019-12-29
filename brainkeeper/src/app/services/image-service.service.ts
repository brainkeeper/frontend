import { Injectable } from '@angular/core';

// npm install ng2-img-max blueimp-canvas-to-blob --save
import { Ng2ImgMaxService } from 'ng2-img-max';


@Injectable({
  providedIn: 'root'
})

export class ImageServiceService {

  constructor(private ng2ImgMax: Ng2ImgMaxService) {  }

  getBase64(file: File, setter: (base64String: string) => void): void {
    if (file == null) {
      throw new Error('The input file should not be null.');
    }
    if (file.type === 'img/png' || file.type === 'img/jpg') {
      // let resizedImage: File;
      console.log(' IN SERVICE BEFORE REZISE, ' + file.size);
      this.ResizeImage(file/*, ( rI ) => { resizedImage = rI; }*/);
      console.log(' IN SERVICE AFTER REZISE, ' + file.size);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result.toString();
      setter(result);
    };

    reader.onerror = () => {
      throw new Error('In the image conversion went something wrong.');
    };
  }

  ResizeImage(file: File/*, setter: (resizedImage: File) => void*/): void {
    /*
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const MAX_WIDTH = 400;
    const MAX_HEIGHT = 400;
    const width = img.width;
    const height = img.height;

    canvas.width = width > MAX_WIDTH ? MAX_WIDTH : width;
    canvas.height = height > MAX_HEIGHT ? MAX_HEIGHT : height;

    ctx.drawImage(img, 0, 0, width, height);

    console.log('**CANVAS**: ' + canvas.toDataURL());

    return canvas.toDataURL(file.type);
    */
    console.log('**IMAGE RESIZER**: was called');
    const WIDTH = 400;
    const HEIGHT = 400;
    this.ng2ImgMax.resizeImage(file, WIDTH, HEIGHT).subscribe((result) => {
        console.log(result);
      }, error => {
        console.error(error);
      }
    );
    /*
    .subscribe(
      result => {
        console.log('**IMAGE RESIZER**: ' + result);
        setter(result);
      },
      () => {
        throw new Error('In the image rsize progress went something wrong.');
      }
    );*/
  }

  c(file: File/*, setter: (resizedImage: File) => void*/): void {

    console.log('**IMAGE RESIZER**: was called');
    const WIDTH = 400;
    const HEIGHT = 400;
    this.ng2ImgMax.compress([file], (file.size * 100) / 75).subscribe((result) => {
        console.log(result);
      }, error => {
        console.error(error);
      }
    );
  }

}
