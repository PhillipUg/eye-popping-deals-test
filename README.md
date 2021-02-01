# Amazon Promo Codes Scraper
An Amazon Promo Codes Scraping Tool developed with Pupeteer(Node Library).

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)
* [License](#license)

<!-- ABOUT THE PROJECT -->
## About The Project

This is an Amazon Promo Codes Scrapping Tool built with puppeteer. This Tools is built for an interview challenge by Eye Popping Deals.

It makes use of the puppeteer node library to scrape an Infinite scroll Amazon Promo Codes webpage. 

**Process:**
1. opens a headless chromium browser
2. fills in login credentials and clicks signin button
3. scrolls to the bottom after a delay of 1 second and extracts promo code items
4. when the target number of items to scrape is reached, it closes the browser
5. logs scrapped items in the console.

![Product Name Screen Shot][product-screenshot]

<!-- ABOUT THE PROJECT -->
## Installation

To use this scraper this is what you need to:
* Have nodejs installed in your computer
* [Download](https://github.com/PhillipUg/eye-popping-deals-test/archive/master.zip) or clone this repo:
  - Clone with SSH:
  ```
    git@github.com:PhillipUg/eye-popping-deals-test.git
  ```
  - Clone with HTTPS
  ```
    https://github.com/PhillipUg/eye-popping-deals-test.git
  ```
* `cd` into `eye-popping-deals-test` directory and run `npm install`
* Add a `.env` file in your root directory(e.g. `eye-popping-deals-test/.env`). In this file fill out the following variables:
```
EMAIL= your email
PASSWORD= your password
SITE_URL= link to your amazon promo codes page(copy the entire thing)
```
* Finally, run `node index.js` in your terminal.

### Built With
This project was built using these technologies.
* Puppeteer
* JavaScript
* dotenv

## Video Demo
Check out [this video](https://www.loom.com/share/bbe7c89052bb4b9087ec1cdf6893bedf) demonstration of how I built the scraper.

<!-- CONTACT -->
## Contact

👤 **Phillip Musiime**

- LinkedIn: [Phillip Musiime](https://www.linkedin.com/in/phillip-musiime)
- Twitter: [@Phillip_Ug](https://twitter.com/Phillip_Ug)
- E-mail: phillipmusiime@gmail.com

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Amazon Affiliate Program](https://affiliate-program.amazon.com/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: scrn-shot.png


## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

