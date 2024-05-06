
# GPT_TRADING_BOILERPLATE

A sipmple boilerplate for trading using GPT API






## Run it yourself

If you have instaled Node on your computer follow next steps


* Clone repository
```bash
  git clone https://github.com/PlonkaKonrad/gpt_trading_boilerplate gpt_trading_boilerplate
```
* Go to repository 
```bash
  cd gpt_trading_boilerplate 
```

* Install nessesery packages
```bash
  yarn 
```
* Go to  config.json and paste your GPT api key
```bash
  {
    "GPT_API_KEY": "yourapikey"
  }
```
* Go to  getData.js and fetch for informations you want to pass to GPT and return an object with it

* Go to /gpt/checkMarket.js and add prompt you want to pass to GPT remember to include data from props

* You want to add your own logic to availableFunctions for managing trading

* Change cron interval in index.js if you want, bot will be invoked every 15 minutes by default
```bash
  cron.schedule('*/15 * * * *' ...
```
* Run trading bot
```bash
  node crawl.js 
```

