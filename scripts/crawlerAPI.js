// =======================================
// import node modules
// =======================================
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

// =======================================
// web crawler
// =======================================

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { text } = require("body-parser");
const { pagesWithoutH1 } = require("../src/Data/InitReqDataTemplates");

var data = {
    clientName: 0,
    pageLimit: 0,
    pagesVisited: 0,
    allRelativeLinks: [],
    h1Headers: 0,
    pagesWithoutH1: 0,
    pagesWithMultiH1: 0,
    schemaCode: 0,
    semantics: 0,
    imgCount: 0,
    imagesWithoutAlt: 0,
    countHTTPS: 0,
    countNonHTTPS: 0,
    using_iframe: false,
    usingStickyHead: true,
    flashArr: [],
    usingFlash: false,
    websiteErrors: false,
    brokenLinks: 0,
    hasMetaDescription: false,
    httpsRedirect: true,
    usingHttp2: 0,
    distinctHeaderButton: false,
    stickyHeaderButton: false,
    phoneAndEmailLinked: false,
    perfScore: 0,
    speedIndex: 0,
    mobileScore: 0,
    keywords: {},
    keywordAccuracy: false,
    keywordDistribution: false,
    enoughContent: false,
}
var continueVar = false;

var pageResults = [];
var finalResults = [];

let responsePacket

function dataStore() {
    responsePacket = {
        data: data,
        pages: pageResults,
        final: finalResults,
    }
    return responsePacket
}

async function puppeteerCrawl(baseURL, data, callback) {
    console.log("Crawling...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(baseURL);

    await page.screenshot({
        path: "./public/images/screencapture.png"
    })

    await page.setRequestInterception(true);
    await page.on('request', (request) => {
        if (['image', 'font', 'script', 'media'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });

    const port = (new URL(browser.wsEndpoint())).port;

    const options = {
        output: 'json',
        port: port
    };

    const resultRun = await lighthouse(baseURL, options);
    const report = await resultRun.lhr;

    data.perfScore = (report.categories.performance.score);
    data.speedIndex = (report.audits['speed-index']['numericValue']);

    data.allRelativeLinks.push(baseURL);


    var firstPageAnalysis = await page.evaluate((baseURL, data) => {
        // Title finder
        var title = document.title;

        // Link finder
        var links = document.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
            if (links[i].href != null) {
                if (links[i].href.indexOf(baseURL) != -1) {
                    if (data.allRelativeLinks.includes(links[i].href) || links[i].href.indexOf("#") != -1 || links[i].href.indexOf(".jpg") != -1 || links[i].href.indexOf(".eps") != -1) {
                    } else {
                        if (data.allRelativeLinks.length < data.pageLimit) {
                            data.allRelativeLinks.push(links[i].href);
                        }
                    }
                }
            }
        }

        // Content counter
        var content = 0;
        var p = document.getElementsByTagName('p');
        for (let i = 0; i < p.length; i++) {
            content += p[i].innerHTML.length;
        }

        // Check whether website contains a meta description
        var desc = document.getElementsByTagName("meta");
        var containsMetaDescription = false;
        for (let i = 0; i < desc.length; i++) {
            if (desc[i].name.indexOf("description") != -1) {
                containsMetaDescription = true;
            }
        }

        // Check if the website is mobile friendly
        // Using viewport makes the site more responsive to scale changes ie viewing on mobile
        var hasViewPort = 0.5;
        var viewPort = document.getElementsByTagName("meta");
        for (let i = 0; i < viewPort.length; i++) {
            if (viewPort[i].getAttribute('name') != null) {
                if (viewPort[i].getAttribute('name').indexOf("viewport") != -1) {
                    hasViewPort = 1;
                }
            }
        }

        // Check if the font is large enough to read on mobile
        var fontLargeEnough = 1;
        var fontSize = window.getComputedStyle(document.body).getPropertyValue('font-size');
        if (fontSize < 12) {
            fontLargeEnough = 0.5;
        }

        // Check if the site loads fast enough - mobile users are impatient
        var fastLoad = 0.5;
        if (data.speedIndex < 4000) {
            fastLoad = 1;
        }

        // Check for input fields - too many is annoying to complete on mobile
        var fewInputFields = 0.5;
        var inputFields = document.getElementsByTagName("input");
        if (inputFields.length < 4) {
            fewInputFields = 1;
        }

        // Check if the buttons are large enough to tap on mobile
        var buttonsLargeEnough = 0;
        var correctButtons = 0;
        var buttons = document.getElementsByTagName('button');
        if (buttons.length > 0) {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].style.height >= 48 && buttons.style.width >= 48) {
                    correctButtons++;
                }
            }
        }
        buttonsLargeEnough = (correctButtons / buttons.length) * 10;

        var mobileRating = (15 * (hasViewPort + fontLargeEnough + fastLoad + fewInputFields + buttonsLargeEnough));

        // Mobile rating can be quite strict, so we create a greater penalty for slow load times
        if (mobileRating > 100) {
            mobileRating = 100 - (data.speedIndex / 500);
        }

        return {
            "Links": data.allRelativeLinks,
            "Content": content,
            "Meta Description": containsMetaDescription,
            "Mobile rating": mobileRating,
            "Title": title,
            "Client": title,
        }
    }, baseURL, data);

    data.allRelativeLinks = firstPageAnalysis["Links"];
    data.hasMetaDescription = firstPageAnalysis["Meta Description"];
    data.mobileScore = firstPageAnalysis["Mobile rating"];
    var titleData = firstPageAnalysis["Title"];
    var clientName = titleData;


    async function checkForHttpsRedirect(baseURL, data) {
        if (baseURL.indexOf('https://') != -1) {
            var httpURL = baseURL.replace('https://', 'http://')
        } else {
            httpURL = baseURL;
        }
        await browser.newPage;
        await page.setDefaultNavigationTimeout(0);
        await page.goto(httpURL);

        var httpsRedirCheck = await page.evaluate((data, baseURL) => {
            if (baseURL.indexOf('https://') != -1) {
                data.httpsRedirect = true;
                return {
                    'redirect': data.httpsRedirect,
                }
            } else {
                if (window.location.href.toString().indexOf('https://') != -1) {
                    data.httpsRedirect = true;
                } else {
                    data.httpsRedirect = false;
                }
                return {
                    "redirect": data.httpsRedirect,
                }
            }
        }, data, baseURL);
        data.httpsRedirect = await httpsRedirCheck['redirect'];
    }
    await checkForHttpsRedirect(baseURL, data);

    // CRAWL SITES
    await console.log("Visiting pages...");

    for (var j = 0; j < data.allRelativeLinks.length; j++) {
        const url = data.allRelativeLinks[j];
        await console.log("Visiting " + url);
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url);

        // Look for website errors or broken links as well as for https redirects
        const redirectStatuses = ['301', '302', '303', '307', '308'];
        page
            .on('console', message => data.websiteErrors = true)
            .on('pageerror', ({ message }) => data.websiteErrors = true)
            .on('requestfailed', request => data.websiteErrors = true)
            .on('response', response => {
                if (response.status() == '404') {
                    data.brokenLinks += 1;
                } else if (redirectStatuses.includes(response.status())/* && url.includes('http:')*/) {
                    data.httpsRedirect = true;
                }
            })
            ;

        var dataPup = await page.evaluate((url, data, j, baseURL) => {

            // Count the number of h1s on the pages crawled
            var h1s = document.getElementsByTagName("h1");
            var withoutH1 = 0;
            var withoutH1Bool = false;
            var tooManyH1 = 0;
            var tooManyH1Bool = false;
            if (h1s.length < 1) {
                withoutH1 += 1;
                withoutH1Bool = true;
            }
            if (h1s.length > 1) {
                tooManyH1 += 1;
                tooManyH1Bool = true;
            }

            // Count the number of imgs found as well as how many of them have an alt attribute
            var imgs = document.getElementsByTagName("img");
            var imgsNoAlt = 0;
            for (let i = 0; i < imgs.length; i++) {
                if (imgs[i].alt == undefined || imgs[0].alt == null || imgs[0].alt.length < 2) {
                    imgsNoAlt++;
                }
            }

            // Find all instances of schema code or sticky headers
            var schemaCount = 0;
            var stickyHeader = false;
            var itemtypes = document.querySelectorAll("*");
            for (let i = 0; i < itemtypes.length; i++) {
                if (itemtypes[i].getAttribute("itemtype") != null) {
                    if (itemtypes[i].getAttribute("itemtype").indexOf("schema.org") != -1) {
                        schemaCount++;
                    }
                }
                if (itemtypes[i].getAttribute("class") != null) {
                    if (itemtypes[i].getAttribute("class").indexOf("sticky") != -1) {
                        stickyHeader = true;
                    }
                }
            }

            // Check if pages are using https
            var pagesUsingHTTPS = 0;
            var pagesNotUsingHTTPS = 0;
            if (url.includes('https://')) {
                pagesUsingHTTPS += 1;
            } else {
                pagesNotUsingHTTPS += 1;
            }

            // Count the headers and footers (semantic code)
            var semanticsCount = document.getElementsByTagName("header" || "footer").length;

            // Determine if social media is correctly embedded
            let iframe = document.getElementsByTagName("iframe");
            if (iframe.length > 0) {
                data.using_iframe = true
            } else if (iframe.length <= 0) {
                data.using_iframe = false;
            }

            // Determine if adobe flash player is being used on the website
            var flash = document.getElementsByTagName("a");
            for (let i = 0; i < flash.length; i++) {
                if (flash[i].href === 'http://get.adobe.com/flashplayer/') {
                    data.usingFlash = true;
                }
            }

            //Check if the website presents any console errors
            window.onerror = function () {
                data.websiteErrors = true;
            }

            // Look for a distinct action button in the header
            if (document.getElementsByTagName("nav").length > 0) {
                var navBarButton = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
                if (navBarButton.length > 1) {
                    data.distinctHeaderButton = true;
                }
            }

            // Chech for sticky header
            var stickies = document.querySelectorAll('*');
            var header = document.getElementsByTagName('header');
            if (header.length > 0) {
                var headerStyle = getComputedStyle(header[0]);
                for (let i = 0; i < stickies.length; i++) {
                    if (stickies[i].getAttribute("class") != null) {
                        if (stickies[i].getAttribute("class").indexOf("sticky") != -1) {
                            stickyHeader = true;
                        }
                    }
                }
                if (headerStyle.position === 'sticky') {
                    stickyHeader = true;
                }
            }

            // Check to see if the nav button is sticky
            var navBar = document.getElementsByTagName("nav");
            if (navBar.length > 0) {
                var navBarStyle = getComputedStyle(navBar[0]);
                if (navBarStyle.position === 'sticky') {
                    data.stickyHeaderButton = true;
                } else if (stickyHeader === true && data.distinctHeaderButton === true) {
                    data.stickyHeaderButton = true;
                }
            }

            // Find all new links on the page
            var linksFound = [];
            var links = document.getElementsByTagName("a");
            for (let i = 0; i < links.length; i++) {
                if (links[i].href != null) {
                    if (links[i].href.indexOf(baseURL) != -1) {
                        if (data.allRelativeLinks.includes(links[i].href) || links[i].href.indexOf("#") != -1 || links[i].href.indexOf(".jpg") != -1 || links[i].href.indexOf(".eps") != -1) {
                        } else {
                            if (data.allRelativeLinks.length < data.pageLimit) {
                                if (linksFound.includes(links[i].href)) {
                                } else {
                                    linksFound.push(links[i].href);
                                }
                            }
                        }
                    }
                }
            }

            // Check for phone number and email
            var phoneLinked = false;
            var emailLinked = false;
            for (let i = 0; i < links.length; i++) {
                if (links[i].href != null) {
                    if (links[i].href.indexOf('tel:') != null) {
                        phoneLinked = true;
                    }
                    if (links[i].href.indexOf('mailto:') != null) {
                        emailLinked = true;
                    }
                }
            }
            if (emailLinked && phoneLinked) {
                data.phoneAndEmailLinked = true;
            }

            // Check if website supports http2
            var supportsHttp2 = 0;
            var protocol = performance.getEntriesByType('navigation')[0].nextHopProtocol;
            if (protocol === 'h2') {
                supportsHttp2++;
            }

            // Get the keywords on the site
            var words = [];
            var removeWords = ["get", "has", "you", "are", "your", "the", "and", "that", "have", "for", "not", "with", "you", "this", "but", "from", "they", "will", "all", "would", "could", "should", "there", "their", "what", "who", "when", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/"];
            var metas = document.getElementsByTagName('meta');
            var metaContent = [];
            for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute('content') != null) {
                    if (metas[i].getAttribute('content').length > 3) {
                        var str = metas[i].getAttribute('content').toLowerCase().split(" ");
                        for (let j = 0; j < str.length; j++) {
                            if (!/\d/.test(str[j])) {
                                metaContent.push(str[j]);
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < metaContent.length; i++) {
                if (metaContent[i].length < 3) {
                    metaContent.splice(metaContent[i], i);
                }
                if (removeWords.includes(metaContent[i])) {
                    metaContent.splice(metaContent[i], i);
                }
            }
            for (let i = 0; i < metaContent.length; i++) {
                if (data.keywords[metaContent[i]]) {
                    data.keywords[metaContent[i]]++;
                } else {
                    data.keywords[metaContent[i]] = 1;
                }
            }
            for (prop in data.keywords) {
                if (prop.length > 2 && prop.length < 15) {
                    words.push({
                        word: prop,
                        count: data.keywords[prop],
                    });
                }
            }
            words.sort(function (a, b) {
                return b.count - a.count;
            });

            // Find the title to cross reference with keywords
            var title = document.title;

            var obj = {
                "Page": url,
                "Title": title,
                "Pages visited": j + 1,
                "H1 count": h1s.length,
                "Page does not contain H1": withoutH1Bool,
                "Page contains multiple H1": tooManyH1Bool,
                "Images found": imgs.length,
                "Images without alt": imgsNoAlt,
                "Page using https": pagesUsingHTTPS,
                "Page NOT using https": pagesNotUsingHTTPS,
                "Instances of schema code": schemaCount,
                "Instances of semantic code": semanticsCount,
                "Social media present and correctly imbedded": !data.using_iframe,
                "Using sticky header": stickyHeader,
                "Using Adobe Flash Player": data.usingFlash,
                "New links found": linksFound,
                "Page supports HTTP/2": supportsHttp2,
                "Distinct header button": data.distinctHeaderButton,
                "Sticky header button": data.stickyHeaderButton,
                "Phone and email linked": data.phoneAndEmailLinked,
                "Keywords": words,
            }
            return obj;

        }, url, data, j, baseURL);
        //console.log(dataPup);
        pageResults.push(dataPup);

        // Update the variables globally with data found in dataPup
        if (data.allRelativeLinks.length < data.pageLimit) {
            data.pagesVisited = data.allRelativeLinks.length;
        } else {
            data.pagesVisited = data.pageLimit;
        }
        data.pagesVisited = dataPup["Pages visited"];
        data.h1Headers += dataPup["H1 count"];
        data.pagesWithoutH1 += dataPup["Page does not contain H1"];
        data.pagesWithMultiH1 += dataPup["Page contains multiple H1"];
        data.imgCount += dataPup["Images found"];
        data.imagesWithoutAlt += dataPup["Images without alt"];
        data.countHTTPS += dataPup["Page using https"];
        data.countNonHTTPS += dataPup["Page NOT using https"];
        data.schemaCode += dataPup["Instances of schema code"];
        data.semantics += dataPup["Instances of semantic code"];
        data.using_iframe = dataPup["Social media present and correctly imbedded"];
        data.usingStickyHead = dataPup["Using sticky header"];
        data.usingFlash = dataPup["Using Adobe Flash Player"];
        if (dataPup["New links found"].length > 0) {
            for (let i = 0; i < dataPup["New links found"].length; i++) {
                if (data.allRelativeLinks.length < data.pageLimit) {
                    data.allRelativeLinks.push(dataPup["New links found"][i]);
                }
            }
        }
        data.usingHttp2 += dataPup["Page supports HTTP/2"];
        data.distinctHeaderButton = dataPup["Distinct header button"];
        data.stickyHeaderButton = dataPup["Sticky header button"];
        data.phoneAndEmailLinked = dataPup["Phone and email linked"];
        //data.keywords = (dataPup["Keywords"]);
    }

    // Organise the key words into a clean array of objects (this is an estimate based on the main page)
    var keywordsTest = [];
    for (let i = 0; i < pageResults.length; i++) {
        keywordsTest.push(pageResults[i]["Keywords"]);
    }

    var keywordsTest2 = [];
    for (let i = 0; i < keywordsTest.length; i++) {
        for (let j = 0; j < keywordsTest[i].length; j++) {
            if (keywordsTest[i][j].count > 1) {
                keywordsTest2.push(keywordsTest[i][j]);
            }
        }
    }

    var unionArray = [];
    var emptyKeywords = {
        word: 'none',
        count: 0,
    }
    if (keywordsTest2.length === 0) {
        data.keywordAccuracy = false;
        data.keywordDistribution = false;
    } else {
        var keywordsSorted = [];
        for (prop in keywordsTest2) {
            keywordsSorted.push({
                word: prop,
                count: keywordsTest2[prop],
            });
        }
        keywordsSorted.sort(function (a, b) {
            return b.count - a.count;
        });

        var keywordsFinal = [];

        for (let i = 0; i < keywordsSorted.length; i++) {
            if (keywordsFinal[0] != undefined) {
                if (!keywordsFinal.includes(keywordsSorted[i]["count"]['word'])) {
                    keywordsFinal.push(keywordsSorted[i]["count"]);
                }
            } else {
                keywordsFinal.push(keywordsSorted[i]["count"]);
            }
        }

        let set = new Set();
        unionArray = keywordsFinal.filter(item => {
            if (!set.has(item.word)) {
                set.add(item.word);
                return true;
            }
            return false;
        }, set);

        for (let i = 0; i < unionArray.length; i++) {
            unionArray[i]["count"] *= data.pagesVisited;
        }

        data.keywords = JSON.stringify(unionArray, undefined, 3);

        if (unionArray[0]["count"] >= data.pagesVisited + 10) {
            data.keywordDistribution = true;
        } else {
            data.keywordDistribution = false;
        }

        // Check if the keywords are accurate (are contained in the title)
        if (titleData.toLowerCase().includes(unionArray[0].word)) {
            data.keywordAccuracy = true;
        } else {
            data.keywordAccuracy = false;
        }
    }

    // Count the amount of content on the page
    var content = firstPageAnalysis["Content"];
    //await console.log(content);
    if (content >= 700) {
        data.enoughContent = true;
    } else {
        data.enoughContent = false;
    }

    //await console.log(titleData);
    //await console.log(JSON.stringify(unionArray, undefined, 3));
    // await console.log(data.pageResults);
    var final = {
        clientName: clientName,
        totalResults: baseURL + " and its relative pages:",
        pagesVisited: data.pagesVisited,
        h1Count: data.h1Headers,
        pagesWithoutH1: data.pagesWithoutH1,
        pagesWithMultiH1: data.pagesWithMultiH1,
        imgs: data.imgCount,
        imgsWithoutAlt: data.imagesWithoutAlt,
        pagesUsingHTTPS: data.countHTTPS,
        pagesNotUsingHTTPS: data.countNonHTTPS,
        schemaCode: data.schemaCode,
        semantics: data.semantics,
        socialMedia: data.using_iframe,
        usingStickyHead: data.usingStickyHead,
        usingFlash: data.usingFlash,
        websiteErrors: data.websiteErrors,
        speedIndex: Math.round(data.speedIndex) + " ms",
        perfScore: Math.round(data.perfScore * 100),
        brokenLinks: data.brokenLinks,
        httpsRedirect: data.httpsRedirect,
        pagesUsingHTTP2: data.usingHttp2,
        headerButton: data.distinctHeaderButton,
        stickyButton: data.stickyHeaderButton,
        contactsLinked: data.phoneAndEmailLinked,
        mobileScore: Math.round((data.mobileScore) + ((500 * data.perfScore) / 10)),
        metaDescription: data.hasMetaDescription,
        keywordAcc: data.keywordAccuracy,
        keywordDist: data.keywordDistribution,
        content: data.enoughContent,
        "Crawl": "Complete",
    };
    finalResults.pop();
    finalResults.push(final);
    await console.log(finalResults);

    callback()

    continueVar = true;

    await browser.close();
    return;
}

// Run the audit - we no longer have to press the call fetch button on localhost, puppeteer will press it for us
// This is because we need puppeteer to call the api and save the pdf from the same page, otherwise variables will all be 0 
// Audit();
// async function Audit() {
//     await console.log("Running Audit");
//     const browser = await puppeteer.launch({ headless: true }); // You can't save pdf's in headless false fyi so don't change this
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1920, height: 1080 });
//     await page.goto("http://localhost:5000/");

//     // Press the call fetch fetch button - I added a name to it in  App.svelte so it could be identified as 'fetch' 
//     // await page.waitForSelector('button[name="fetch"]')
//     // await page.click('button[name="fetch"]');

//     async function SaveAudit() {
//         // Added a continueVar to stop this part of the code from running before the audit had been completed
//         if (continueVar == false) {
//             setTimeout(SaveAudit, 5000); // Setting this to less than 5000 caused the pdf to save before the data could be pushed to App.svelte
//             return;
//         }
//         await console.log("Saving Audit...");
//         const pdf = await page.pdf({ path: 'Audit.pdf', format: 'A4' }); // This single line saves the pdf into the scripts folder, as Audit.pdf
//         await console.log("Audit Saved.")
//         // await browser.close();
//     }
//     SaveAudit();
// }

// =======================================
// express decloration and config
// =======================================

// express app init
const app = express()
app.use(express.static('public'));

// body parser config
app.use(bodyParser.json())
app.use(bodyParser.text())

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// cors config
app.use(cors());


// server listen port config
port = 9778

// =======================================
// express routes
// =======================================

// crawl url post route
app.post("/api/crawl", async (req, res) => {
    console.log("server response: " + res.statusCode)
    let crawlURL = req.body.initURL
    console.log(crawlURL)
    let data = req.body.dataTemplate
    // console.log(data)
    crawlResults = await puppeteerCrawl(crawlURL, data, dataStore)
    JSONresults = await JSON.stringify(responsePacket)
    await res.send(JSONresults)
})

// =======================================
// express monitor
// =======================================

app.listen(port, () => {
    console.log(`Server initiated on port ${port}!`)
})