import * as chr from 'cheerio';
import fetch from 'node-fetch';
import * as df from 'excel4node';

function createDatasheet(productNameSet, dataset) {
   console.log('Creating Datasheet...')
   var wb = new df.Workbook();
   var ws = wb.addWorksheet(productNameSet);

   dataset.map((i, elem) => {
      // console.log(dataset[elem].productName);
      ws.cell(elem+1,1).string(dataset[elem].productName);
      ws.cell(elem+1,2).number(parseFloat(dataset[elem].priceFull));
      ws.cell(elem+1,3).string(dataset[elem].url);
   })

   wb.write('Resultado.xlsx')
}

async function getProduct() {
   try{
      const dataSource = 'https://lista.mercadolivre.com.br/microfone-de-mesa';

      const response = await fetch(dataSource);
      const body = await response.text();
      const $ = chr.load(body);

      const items = []

      await $('.ui-search-layout > .ui-search-layout__item').map((i, elem) => {
         const productName = $(elem).find('.ui-search-item__title').text();
         const priceMain = $(elem).find('.ui-search-item__group--price.shops__items-group > div > div > div > span.price-tag.ui-search-price__part.shops__price-part > span.price-tag-amount > span.price-tag-fraction').text();
         const priceCents = $(elem).find('div > div > div > span.price-tag.ui-search-price__part.shops__price-part > span.price-tag-amount > span.price-tag-cents').text();
         const url = $(elem).find('div.ui-search-result__image > a.ui-search-link').attr('href')

         let priceFull = `${Number(priceMain)}.${Number(priceCents)}`;

         items.push({
            productName,
            priceFull,
            url
         })
      });
      await createDatasheet('Microphone', items)

      console.log('Web scraping finished!')
   } catch (error) {
      console.error(error)
   }

}

getProduct()