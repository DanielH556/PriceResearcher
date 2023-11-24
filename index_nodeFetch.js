import * as chr from 'cheerio';
import fetch from 'node-fetch';
import * as df from 'excel4node';

function setDatasheet() {
   var workbook = new df.Workbook();
   var worksheet = workbook.addWorksheet('DataPushed');

   worksheet.cell(1,1).string('Hi');
   worksheet.cell(1,2).number(420);

   workbook.write('Result.xlsx');
}

async function getProduct() {
   try {
      const response = await fetch('https://www.formula1.com/en/drivers.html');
      const body = await response.text()
      const $ = chr.load(body);

      const items = [];
      
      $('.listing-items--wrapper > .row > .col-12').map((i, el) => {
         const rank = $(el).find('.rank').text();
         const points = $(el).find('.points > .f1-wide--s').text();
         const firstName = $(el).find('.listing-item--name span:first').text();
         const lastName = $(el).find('.listing-item--name span:last').text();
         const team = $(el).find('.listing-item--team').text();
         const photo = $(el).find('.listing-item--photo img').attr('data-src');
         
         items.push({
            rank,
            points,
            firstName,
            lastName,
            team,
            photo
         });

         console.log(items)
      });
   } catch (error) {
      console.error(error);
   }
}

getProduct()