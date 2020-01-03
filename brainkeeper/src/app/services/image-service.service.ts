import { Injectable } from '@angular/core';
import { ImgExifService } from 'ng2-img-max';


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

      reader.onload = async () => {
        let result = reader.result.toString();
        if ((file.type === 'png' || file.type === 'jpg') && modify) {
          const img = new Image();
          img.src = result;
          result = await this.changeImage(img);
          console.log(' ### RES2 ###' + result);
        }
        resolve(result);
      };

      reader.onerror = () => {
        throw new Error('In the image conversion went something wrong.');
      };
    });
  }

  async changeImage(img: HTMLImageElement): Promise<string> {
    /*
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const oc = document.createElement('canvas');
    const octx = oc.getContext('2d');

    

    img.width = width;
    img.height = height;
    console.log('*** IMG SRC ***' + img.src.length);

    canvas.width = width;
    canvas.height = height;

    oc.width = width;
    oc.height = height;
    octx.drawImage(oc, 0, 0, width, height);

    ctx.drawImage(img, 0, 0, width, height);
    console.log(oc.toDataURL());
    return canvas.toDataURL('image/png', 0.5).toString(); // get the data from canvas as 50% PNG (can be also jpg, etc.)
    */
    const width = 400;
    const height = 400;
    return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      if ( img.height <= height && img.width <= width) {
        return img.src;

        // TODO: Call method to do something with the resize image
      } else {

          const resizingCanvas: HTMLCanvasElement = document.createElement('canvas');
          const resizingCanvasContext = resizingCanvas.getContext('2d');

          // Start with original image size
          resizingCanvas.width = img.width;
          resizingCanvas.height = img.height;


          // Draw the original image on the (temp) resizing canvas
          resizingCanvasContext.drawImage(img, 0, 0, resizingCanvas.width, resizingCanvas.height);

          const curImageDimensions = {
              width: Math.floor(img.width),
              height: Math.floor(img.height)
          };

          const outputCanvas: HTMLCanvasElement = document.createElement('canvas');
          const outputCanvasContext = outputCanvas.getContext('2d');

          outputCanvas.width = width;
          outputCanvas.height = height;

          outputCanvasContext.drawImage(resizingCanvas, 0, 0, curImageDimensions.width, curImageDimensions.height,
              0, 0, width, height);

          resolve(outputCanvas.toDataURL('image/jpeg', 0.75));
      }
    };
  });
  }
}
