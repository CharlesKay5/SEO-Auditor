<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import Information from "svelte-material-icons/Information.svelte"
    import Dial        from "svelte-material-icons/Speedometer.svelte"
    import Tick        from "svelte-material-icons/CheckCircle.svelte"
    import Cross       from "svelte-material-icons/CloseCircle.svelte"

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let hasMetaDescription

</script>

<style>

    .box {
        position: relative;
        height: 240px;
        width: 400px;
    }
    .info {
        position: absolute;
        width: 400px;
        height: 100px;
        top: 200px;
        left: 40px;
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
                <h1 class="card-h1">SITE DESCRIPTION</h1>
            </span>
        </div>
        
        <!-- main content -->
        <table class="tg2">
            <thead>
                <tr>
                    {#if !hasMetaDescription}
                        <th class="red" valign="top"><Cross height={20} width={20}/></th>
                        <th class="tg-text">Your page appears <strong>not</strong> to have a meta description tag. A meta description is important for search engines to understand the content of your page, and is often shown as the description text blurb in search results.</th>
                    {:else}
                        <th class="green" valign="top"><Tick height={20} width={20}/></th>
                        <th class="tg-text">Your page appears to have a meta description tag. A meta description is important for search engines to understand the content of your page, and is often shown as the description text blurb in search results.</th>
                    {/if}
                </tr>
            </thead>
        </table>

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
                    Your website's title and description tells Google what your site is about, so they can rank you for relevant searches.
                </p>
            </div>
            
        </div>

    </div>
</div>