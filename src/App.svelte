<script>
    // =================================================
    // import components for UI
    // =================================================

    // Assets
    import Style_1 from "../src/UI/Assets/PageStyles/Style_1.svelte";
    import Style_2 from "../src/UI/Assets/PageStyles/Style_2.svelte";
    import Logo from "../src/UI/Assets/Logo.svelte";
    import Loading from "../src/UI/Assets/PageStyles/Loading.svelte";
    // Cards
    import PrefaceCard from "../src/UI/Cards/InfoCards/PrefaceCard.svelte";

    import PerformanceCard from "../src/UI/Cards/CodeCards/PerformanceCard.svelte";
    import ProgrammingCard from "../src/UI/Cards/CodeCards/ProgrammingCard.svelte";
    import SecurityCard from "../src/UI/Cards/CodeCards/SecurityCard.svelte";
    import MobileCard from "../src/UI/Cards/CodeCards/MobileCard.svelte";

    import OptimisationCard from "../src/UI/Cards/CROCards/OptimisationCard.svelte";
    import ContentCard from "../src/UI/Cards/CROCards/ContentCard.svelte";

    import KeywordCard from "../src/UI/Cards/SEOCards/KeywordCard.svelte";
    import SiteDescriptionCard from "../src/UI/Cards/SEOCards/SiteDescriptionCard.svelte";
    // Custom UI
    import ClientName from "../src/UI/Assets/ClientName.svelte";

    import Window from "../src/UI/Assets/Window.svelte";
    import IncludesSection from "../src/UI/Assets/IncludesSection.svelte";

    // =================================================
    // data templates
    // =================================================

    // Server API request data template
    import requestDataTemplate from "./Data/InitReqDataTemplates.js";

    let isLoading = false;
    // Initial UI data for on-mount DOM paint
    let clientName = "",
        clientLandingPage = "./images/screencapture.png",
        percentage = 0,
        mobilePercentage = 0,
        loadingTime = "0 s",
        initURL = "",
        pagesWithoutH1 = 0,
        pagesWithMultiH1 = 0,
        imgsWithoutAlt = 0,
        linksWith404 = 0,
        amountOfSemantics = 0,
        schemaCode = 0,
        httpsRedirect = true,
        usingHttp2 = false,
        usingHttps = false,
        usingStickyHead = true,
        distinctActionButton = false,
        actionAlwaysVisible = false,
        phoneAndEmailHyperlink = true,
        enoughContentVolume = true,
        keywordConsistancy = false,
        keywordAccuracy = true,
        hasMetaDescription = false;

    // =================================================
    // packet data and server API request
    // =================================================

    function formatURL(url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        if (!url.includes("://www.")) {
            url = url.replace("://", "://www.");
        }
        return url;
    }

    // data packeting
    $: dataPacket = {
        initURL: formatURL(initURL),
        dataTemplate: requestDataTemplate,
    };
    // fetch request to API
    function fetchData(dataPacket) {
        fetch("http://localhost:9778/api/crawl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPacket),
        })
            .then((res) => {
                if (res.ok) {
                    console.log("STATUS 200 OK!");
                } else {
                    console.log("SERVER RESPONSE 399+");
                }
                return res.json();
            })

            .then((data) => {
                // clientName = data.final[0].clientName
                percentage = data.final[0].perfScore;
                loadingTime = data.final[0].speedIndex;
                imgsWithoutAlt = data.final[0].imgsWithoutAlt;
                pagesWithoutH1 = data.final[0].pagesWithoutH1;
                pagesWithMultiH1 = data.final[0].pagesWithMultiH1;
                linksWith404 = data.final[0].brokenLinks;
                amountOfSemantics = data.final[0].semantics;
                schemaCode = data.final[0].schemaCode;
                httpsRedirect = data.final[0].httpsRedirect;
                usingHttp2 = data.final[0].pagesUsingHTTP2;
                usingHttps = data.final[0].pagesUsingHTTPS;
                usingStickyHead = data.final[0].usingStickyHead;
                distinctActionButton = data.final[0].headerButton;
                actionAlwaysVisible = data.final[0].stickyButton;
                phoneAndEmailHyperlink = data.final[0].contactsLinked;
                (enoughContentVolume = true), // Currently not crawled for (tried crawling for this and had some problems)
                    (mobilePercentage = data.final[0].mobileScore),
                    (hasMetaDescription = data.final[0].metaDescription);
                keywordAccuracy = data.final[0].keywordAcc;
                keywordConsistancy = data.final[0].keywordDist;
                enoughContentVolume = data.final[0].content;

                isLoading = !isLoading;
            })

            .catch((err) => console.log(err));
    }
    // connect fetch call to UI
    async function callFetch() {
        fetchData(dataPacket);
    }
</script>

<div class="wrapper-main">
    <!-- Auditor input area -->
    <div class="editor no-print">
        <input type="text" bind:value={clientName} placeholder="Client Name" />
        <input type="text" bind:value={initURL} placeholder="Website URL" />

        <button
            id="AuditButton"
            on:click={() => {
                isLoading = !isLoading;
                callFetch();
            }}
            name="fetch">Audit</button>
    </div>
    
    {#if isLoading}
        <Loading />
    {/if}
    <!-- pdf rendered pages -->
    <div class="pages">
        <!-- Home page -->
        <div class="page">
            <Style_1 />
            <div id="home-main">
                <ClientName {clientName} />
                <div id="clientStyle" />
                <Window {clientLandingPage} />
            </div>
            <Logo />
            <Style_2 />
            <IncludesSection />
        </div>

        <!-- Preface page -->
        <div class="page">
            <Style_1 />
            <div class="card">
                <PrefaceCard />
            </div>
            <Logo />
            <Style_2 />
            <div class="clientBR">
                <ClientName {clientName} />
            </div>
        </div>

        <!-- Code page -->
        <div class="page">
            <Style_1 />
            <div class="cards">
                <div class="card">
                    <PerformanceCard {percentage} {loadingTime} />
                </div>
                <div class="card">
                    <ProgrammingCard
                        {imgsWithoutAlt}
                        {pagesWithoutH1}
                        {pagesWithMultiH1}
                        {linksWith404}
                        {amountOfSemantics}
                        {schemaCode}
                    />
                </div>
                <div class="card">
                    <SecurityCard {httpsRedirect} {usingHttps} {usingHttp2} />
                </div>
            </div>
            <Logo />
            <Style_2 />
            <div class="clientBR">
                <ClientName {clientName} />
            </div>
        </div>

        <!-- CRO and code page -->
        <div class="page">
            <Style_1 />
            <div class="cards">
                <div class="card">
                    <MobileCard {mobilePercentage} />
                </div>
                <div class="card">
                    <OptimisationCard
                        {usingStickyHead}
                        {distinctActionButton}
                        {actionAlwaysVisible}
                        {phoneAndEmailHyperlink}
                    />
                </div>
                <div class="card">
                    <ContentCard {enoughContentVolume} />
                </div>
            </div>
            <Logo />
            <Style_2 />
            <div class="clientBR">
                <ClientName {clientName} />
            </div>
        </div>

        <!-- SEO page -->
        <div class="page">
            <Style_1 />
            <div class="cards">
                <div class="card">
                    <KeywordCard {keywordConsistancy} {keywordAccuracy} />
                </div>
                <div class="card">
                    <SiteDescriptionCard {hasMetaDescription} />
                </div>
            </div>
            <Logo />
            <Style_2 />
            <div class="clientBR">
                <ClientName {clientName} />
            </div>
        </div>
    </div>
</div>

<style>
    .wrapper-main {
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-content: center;
    }
    .editor {
        position: absolute;
        left: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 500px;
        width: 50vw;
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }
    input {
        font: 1.6rem;
        border: none;
        border-bottom: 2px solid #ccc;
        border-radius: 3px 3px 0 0;
        background: white;
        padding: 0.15rem 0.25rem;
        transition: border-color 0.1s ease-out;
    }
    input:focus {
        border-color: #e40763;
        outline: none;
    }
    .pages {
        display: grid;
        grid-template-columns: 1fr;
    }
    .page {
        width: 21cm;
        height: calc(29.7cm - 1px);
        background-color: white;
        position: relative;
        background-image: url("../Images/PageStyles/main.png");
    }
    .cards {
        margin: 0 auto;
        padding: 75px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .clientBR {
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 25px;
    }
    #home-main {
        position: absolute;
        left: 120px;
        top: 220px;
    }
    #clientStyle {
        width: 120px;
        border-bottom: 6px solid #00b09b;
        margin-bottom: 32px;
    }
    .card {
        height: 100%;
    }

    #AuditButton {
        padding: 5px;
        float: right;
    }

    @media screen {
        .wrapper-main {
            padding: 20px;
            grid-gap: 20px;
            align-items: start;
            grid-template-columns: max-content max-content;
        }
        .pages {
            zoom: 0.8;
            grid-gap: 40px;
        }
        .page {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
    }
    @media print {
        @page {
            margin: 0;
            size: auto;
        }
        .no-print {
            display: none;
        }

        .pages {
            zoom: 1; /* Reset zoom for printing */
            width: 100%; /* Ensure it takes full width */
            height: 100%;
        }
        .page {
            box-shadow: none; /* Remove box-shadow for printing */
            page-break-after: always; /* Ensure each .page starts on a new printed page */
        }
    }
</style>
