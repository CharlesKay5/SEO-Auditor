// =================================================
// on-request data templates
// =================================================

// initial data on request to the server api after being packaged
var requestDataTemplate = {
    clientName: 0,
    pagesVisited: 0,
    allRelativeLinks: [],
    pageLimit: 50,
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
    httpsRedirect: false,
    usingHttp2: 0,
    distinctHeaderButton: false,
    stickyHeaderButton: false,
    phoneAndEmailLinked: false,
    speedIndex: 0,
    perfScore: 0,
    mobileScore: 0,
    keywords: [],
    keywordDist: false,
    keyowrdAcc: false,
    content: false,
}

module.exports = requestDataTemplate