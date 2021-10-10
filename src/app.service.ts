import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { fromPath } from 'pdf2pic';
import * as PdfPrinter from 'pdfmake';
import { v4 as uuid } from 'uuid';
import { ClassEntity } from './entity/class.entity';
import { UserEntity } from './entity/user.entity';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getpdg(user: UserEntity) {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'Heading', fontSize: 25 },
        // {
        //   image: 'images/a.jpg',
        //   width: 150,
        //   height: 150,
        // },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              [user.name, 'a.jpg', 'Third', 'The last one'],
              ['Val', 'Value 2', 'Value 3', 'Value 4'],
              ['Val 1', 'Val 2', 'Val 3', 'Val 4'],
            ],
          },
        },
        {
          text: 'google',
          link: 'https://i.pinimg.com/736x/dc/a0/1a/dca01a9c483abacc1a6652787780f8e0.jpg',
          pageBreak: 'before',
        },
        { qr: 'text in QR', foreground: 'green', background: 'white' },
      ],

      defaultStyle: {
        font: 'Helvetica',
      },
    };

    const options = {};

    const file_name = 'PDF' + uuid() + '.pdf';
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);

    pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();
    return { file_name: file_name };
  }
}
