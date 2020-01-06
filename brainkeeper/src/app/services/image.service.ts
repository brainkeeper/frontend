import { Injectable } from '@angular/core';
import { createOptional } from '@angular/compiler/src/core';


@Injectable({
  providedIn: 'root'
})

export class ImageService {

  constructor() {  }

  async getBase64(
    file: File, width: number = 0, height: number = 0, quality: number = 1
    ): Promise<string> {

    if (file == null) {
      throw new Error('The input file should not be null.');
    }
    if (quality < 0 || quality > 1) {
      throw new Error('The quality sould be between 0 and 1, but it was: ' + quality);
    }
    if (width < 0) {
      throw new Error('The width should be positive, but it was: ' + width);
    }
    if (height < 0) {
      throw new Error('The height should be positive, but it was: ' + height);
    }

    const img = new Image();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return await new Promise<string>( (resolve, reject) => {
      reader.onload = () => {
        const dataURL = reader.result.toString();
        img.src = dataURL;
        resolve(this.changeImage(img, file.type === 'jpg' ? 'jpeg' : 'png', width, height, quality));
      };
    });
  }

  changeImage(
    img: HTMLImageElement, type: string, width: number, height: number, quality: number
    ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      img.onload = () => {
        const resizingCanvas: HTMLCanvasElement = document.createElement('canvas');
        const resizingCanvasContext = resizingCanvas.getContext('2d');

        const newWidth = width === 0 ? img.width : width;
        const newHeight = height === 0 ? img.height : height;
        const dx = Math.floor(0.5 * (img.width -  newWidth));
        const dy = Math.floor(0.5 * (img.height - newHeight));

        resizingCanvas.width = img.width - 2 * dx;
        resizingCanvas.height = img.height - 2 * dy;

        resizingCanvasContext.drawImage(
          img,
          dx, dy,
          img.width - 2 * dx, img.height - 2 * dy,
          0, 0,
          resizingCanvas.width, resizingCanvas.height
          );

        const response = resizingCanvas.toDataURL('image/' + type, quality);
        resolve(response);
      };
    });
  }
}