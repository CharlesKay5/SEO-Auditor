<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import CodeTags from "svelte-material-icons/CodeTags.svelte"
    import ShieldLock  from "svelte-material-icons/ShieldLock.svelte"
    import Search   from "svelte-material-icons/Magnify.svelte"

    // =================================================
    // UI variables
    // =================================================

    // UI constants config
    let width = "40px",
        height = "40px",
        color = "#fff"

</script>

<style>

    .icon {
        width: 150px;
        margin: 0 35px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .icon-title {
        font-size: 18px;
        font-weight: 900;
        color: #163450;
        margin: 7px 0;
    }
    .icon-des {
        color: #163450;
        text-align: center;
        white-space: nowrap;
        margin: 7px 0;
    }
    .icon-box {
        width: 60px;
        height: 60px;
        border-radius: 1000px;
        background: linear-gradient(180deg, #00b09b 0%, #007bb0 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 7px 0;
    }
    .inner-txt {
        font-size: 14px;
    }
    #includes-inbox {
        display: flex;
        justify-content: flex-start;
        margin: 30px 0 0 0;
    }
    #includes-outbox {
        position: absolute;
        bottom: 125px;
        right: 80px;
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #includes-txt {
        font-size: 24px;
        color: #163450;
        letter-spacing: 0.1em;
    }

</style>

<div id="includes-outbox">

    <!-- section title -->
    <p id="includes-txt">INCLUDES</p>
    <!-- content box -->
    <div id="includes-inbox">

        <!-- iconography and content -->
        <div class="icon">
            <div class="icon-box">
                <CodeTags {width} {height} {color} />
            </div>
            <p class="icon-title">Code Audit</p>
            <p class="icon-des">
                <span class="inner-txt">Website programming &</span>
                <br />
                <span class="inner-txt">performance audit</span>
            </p>
        </div>

        <!-- iconography and content -->
        <div class="icon">
            <div class="icon-box">
                <ShieldLock {width} {height} {color} />
            </div>
            <p class="icon-title">Security Audit</p>
            <p class="icon-des">
                <span class="inner-txt">Website security</span>
                <br />
                <span class="inner-txt">and safety audit</span>
            </p>
        </div>
        
        <!-- iconography and content -->
        <div class="icon">
            <div class="icon-box">
                <Search {width} {height} {color} />
            </div>
            <p class="icon-title">SEO Audit</p>
            <p class="icon-des">
                <span class="inner-txt">Free search engine</span>
                <br />
                <span class="inner-txt">optimization audit</span>
            </p>
        </div>

    </div>
</div>