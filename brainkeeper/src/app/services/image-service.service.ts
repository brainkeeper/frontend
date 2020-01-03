import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ImageServiceService {

  constructor() {  }

  async getBase64(file: File, modify = true): Promise<string> {
    if (file == null) {
      throw new Error('The input file should not be null.');
    }
    return new Promise<string>( async (resolve, reject) => {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        let result = reader.result.toString();
        if ((file.type === 'png' || file.type === 'jpg') && modify) {
          const img = new Image();
          img.src = result;
          result = this.changeImage(img);
          // console.log(' ### RES2 ### , ' + result + ', ' + result.length + ', old file: ' + file.size);
        }
        resolve(result);
      };

      reader.onerror = () => {
        throw new Error('In the image conversion went something wrong.');
      };
    });
  }

  changeImage(img: any): string {
    const canvas = document.createElement('canvas');

    const width = 400;
    const height = 400;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL('image/jpeg', 0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)
  }
}
