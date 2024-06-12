<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import Cross       from "svelte-material-icons/CloseCircle.svelte"
    import Tick        from "svelte-material-icons/CheckCircle.svelte"
    import Information from "svelte-material-icons/Information.svelte"
    import Dial        from "svelte-material-icons/Speedometer.svelte"

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let keywordConsistancy
    export let keywordAccuracy

</script>

<style>

    .box {
        position: relative;
        height: 240px;
        width: 400px;
        margin: 160px auto 30px auto;
    }
    .info {
        position: absolute;
        width: 400px;
        height: 120px;
        top: 390px;
        right: 160px;
        font-size: 15px;
    }

</style>

<div class="wrapper">
    <!-- card box -->
    <div class = "box">

        <!-- title -->
        <div>

            <h2 class="card-h2">SEO</h2>
            <span>
                <Dial color={"#00b09b"} height={30} width={30} />
            </span>
            <span>
                <h1 class="card-h1">KEYWORDS</h1>
            </span>

        </div>
        
        <!-- main content -->
        <table class="tg2">

            <thead>
                <tr>
                    {#if !keywordConsistancy}
                        <th class="red" valign="top"><Cross height={20} width={20}/></th>
                        <th class="tg-text">Keyword Consistency - Poor distribution.</th>
                    {:else}
                        <th class="green" valign="top"><Tick height={20} width={20}/></th>
                        <th class="tg-text">Keyword Consistency - Fair distribution.</th>
                    {/if}
                </tr>
                <tr>
                    {#if !keywordAccuracy}
                        <th class="red" valign="top"><Cross height={20} width={20}/></th>
                        <th class="tg-text">Keyword Accuracy - Not targeting best search terms</th>
                    {:else}
                        <th class="green" valign="top"><Tick height={20} width={20}/></th>
                        <th class="tg-text">Keyword Accuracy - Targeting fair search terms</th>
                    {/if}
                </tr>
            </thead>

        </table>
    </div>

    <!-- info box -->
    <div class="info">

        <!-- info icon -->
        <div class="infocont" >
            <Information color={'#003B71'} height={15} width={15} />
        </div>

        <!-- info main content -->
        <div class="infocont">
            <p id="infotitle">Did you know?</p>
            <p id="infomain">
                Your website's keywords need to be optimised to what people are searching for, so that you attract the most amount of clients searching for your service/product.
            </p>
        </div>

    </div>

</div>