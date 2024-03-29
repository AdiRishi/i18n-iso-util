import fs from 'fs';
import path from 'path';
import playwright, { Page } from 'playwright';

const ISO_HOME_PAGE = 'https://www.iso.org/obp/ui/#home';
const ISO_SEARCH_PAGE = 'https://www.iso.org/obp/ui/#search';
const NEXT_BUTTON_LOCATOR = ':nth-match(div[role="button"]:has-text("Next"), 1)';
const DATA_NAVLINK_LOCATOR = ':nth-match(table, 2) >> tr[role=row] >> :nth-match(td, 1) >> button';
const OFFICIAL_CODES_LABEL_LOCATOR = 'div[role="button"]:has-text("Officially assigned codes")';

const finalData: unknown[] = [];

const main = async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();

  await navigateToIso3166CountryCodes(page);

  // Outer loop on the main country codes page
  // the goal is to iterate over all the data pages present (1,2,3...)
  let nextPageButtonCount = 1; // The number of "Next" buttons visible on the page
  const getFirstRowData = async () => await page.locator(DATA_NAVLINK_LOCATOR).nth(0).innerText();

  while (nextPageButtonCount === 1) {
    await iterateOverCountryTable(page);
    nextPageButtonCount = await page.locator(NEXT_BUTTON_LOCATOR).count();
    if (nextPageButtonCount === 1) {
      const firstRowData = await getFirstRowData();
      await page.locator(NEXT_BUTTON_LOCATOR).click();
      // Wait until page data changes
      // This polling approach is necessary as the page transitions do not push to window.History
      let newFirstRowData: string;
      do {
        newFirstRowData = await getFirstRowData();
      } while (newFirstRowData === firstRowData || newFirstRowData.trim() === '');
    }
  }

  browser.close();

  await saveFinalData();
};

const navigateToIso3166CountryCodes = async (page: Page) => {
  await page.goto(ISO_HOME_PAGE, {
    waitUntil: 'networkidle',
  });

  await page.click('text=Country codes');
  await Promise.all([
    page.waitForNavigation({ url: ISO_SEARCH_PAGE, waitUntil: 'networkidle' }),
    page.click('div[role="button"]:has-text("Search")'),
  ]);

  await page.locator(NEXT_BUTTON_LOCATOR).waitFor(); // wait for the table data to load
};

const iterateOverCountryTable = async (page: Page) => {
  const countryNavlinkLocator = page.locator(DATA_NAVLINK_LOCATOR);
  const navlinkCount = await countryNavlinkLocator.count();
  for (let i = 0; i < navlinkCount; i++) {
    await countryNavlinkLocator.nth(i).click();
    await page.locator('.core-view-header').waitFor();
    const countryInfo = await extractCountryInfo(page);
    finalData.push(countryInfo);
    console.log(`Processed country ${countryInfo.shortNameLowerCase}`);
    await page.locator('[class="v-caption v-caption-closable"]').nth(1).locator('span').click();
    await page.locator(OFFICIAL_CODES_LABEL_LOCATOR).waitFor();
  }
};

const extractCountryInfo = async (page: Page) => {
  const countryInfo: { [key: string]: unknown } = {};
  const htmlTableKeyMappings: { [key: string]: string } = {
    'Alpha-2 code': 'alpha2',
    'Short name': 'shortName',
    'Short name lower case': 'shortNameLowerCase',
    'Full name': 'fullName',
    'Alpha-3 code': 'alpha3',
    'Numeric code': 'numericCode',
  };

  const tableLineLocator = page.locator('.core-view-line');
  const tableLineLength = await tableLineLocator.count();
  for (let i = 0; i < tableLineLength; i++) {
    const lineLocator = tableLineLocator.nth(i);
    const nameLocator = lineLocator.locator('.core-view-field-name');
    const valueLocator = lineLocator.locator('.core-view-field-value');

    const name = await nameLocator.innerText();
    const value = await valueLocator.innerText();

    if (name in htmlTableKeyMappings) {
      countryInfo[htmlTableKeyMappings[name]] = value.trim();
    }
  }
  return countryInfo;
};

const saveFinalData = async () => {
  const jsonString = JSON.stringify(finalData);
  const fileStarter = `
  export type RawCountryData = {
    alpha2: string;
    alpha3: string;
    shortName: string;
    shortNameLowerCase: string;
    fullName: string;
    numericCode: string;
  };
  const data: RawCountryData[] = ${jsonString};
  export default data;
  `.trim();
  fs.writeFileSync(path.resolve(__dirname, '../src/iso-3166-1.data.ts'), fileStarter);
};

main();
