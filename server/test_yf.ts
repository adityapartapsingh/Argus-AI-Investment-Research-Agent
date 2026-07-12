import YahooFinance from "yahoo-finance2";
const yf = new (YahooFinance as any)({ suppressNotices: ['yahooSurvey'] });

async function run() {
  try {
    const data = await yf.quoteSummary('RELIANCE.NS', {
      modules: ["price", "summaryProfile", "defaultKeyStatistics", "financialData", "summaryDetail"],
    });
    console.log(Object.keys(data.financialData || {}));
    console.log("Operating Cashflow:", data.financialData?.operatingCashflow);
    console.log("PE Ratio:", data.summaryDetail?.trailingPE);
  } catch (e) {
    console.error(e);
  }
}
run();
