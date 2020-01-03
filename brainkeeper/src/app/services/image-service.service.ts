import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ImageServiceService {

  constructor() {  }

  async getBase64(
    file: File, width: number = 0, height: number = 0, quality: number = 1.0
    ): Promise<string> {

    if (file == null) {
      throw new Error('The input file should not be null.');
    }
    if (quality < 0 || quality > 1){
      throw new Error('The quality sould be between 0 and 1, but it was: ' + quality);
    }
    if (width < 0) {
      throw new Error('The width should be positive, but it was: ' + width);
    }
    if (height < 0) {
      throw new Error('The height should be positive, but it was: ' + height);
    }

    return new Promise<string>( async (resolve, reject) => {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const img = new Image();
        img.src = reader.result.toString();

        resolve(await this.changeImage(img, file.type, width, height, quality));
      };

      reader.onerror = () => {
        throw new Error('In the image conversion went something wrong.');
      };
    });
  }

  async changeImage(
    img: HTMLImageElement, type: string, width: number, height: number, quality: number
    ): Promise<string> {
    // console.log('type1: ' + type + ',  width: ' + width + ', height: ' + height + ', quality: ' + quality);

    if (width === 0) {
      width = img.width;
    }
    if (height === 0) {
      height = img.height;
    }

    // console.log('type2: ' + type + ',  width: ' + width + ', height: ' + height + ', quality: ' + quality);

    return new Promise<string>((resolve, reject) => {
      img.onload = () => {
        const resizingCanvas: HTMLCanvasElement = document.createElement('canvas');
        const resizingCanvasContext = resizingCanvas.getContext('2d');

        // Start with original image size
        resizingCanvas.width = img.width;
        resizingCanvas.height = img.height;


        // Draw the original image on the (temp) resizing canvas
        resizingCanvasContext.drawImage(img, 0, 0,
          resizingCanvas.width, resizingCanvas.height);

        const curImageDimensions = {
            width: Math.floor(img.width),
            height: Math.floor(img.height)
        };

        const outputCanvas: HTMLCanvasElement = document.createElement('canvas');
        const outputCanvasContext = outputCanvas.getContext('2d');

        outputCanvas.width = width;
        outputCanvas.height = height;

        outputCanvasContext.drawImage(resizingCanvas, 0, 0,
           curImageDimensions.width, curImageDimensions.height,
            0, 0, width, height);

        resolve(outputCanvas.toDataURL('image/jpeg', quality));
    };
  });
  }
}
