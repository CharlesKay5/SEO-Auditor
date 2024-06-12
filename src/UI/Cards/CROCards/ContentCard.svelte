<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import Information  from "svelte-material-icons/Information.svelte"
    import Cross        from "svelte-material-icons/CloseCircle.svelte"
    import Tick         from "svelte-material-icons/CheckCircle.svelte"
    import SecurityIcon from "svelte-material-icons/ShieldOutline.svelte"

    // =================================================
    // UI variables
    // =================================================
    
    // allow variables to be set from app.svelte
    export let enoughContentVolume

</script>

<style>

    .box {
        position: relative;
        height: 260px;
        width: 400px;
    }
    .info {
        position: absolute;
        height: 120px;
        width: 380px;
        bottom: -40px;
        left: 40px;
    }

</style>

<div class="wrapper">
    <!-- card box -->
    <div class="box">

        <!-- title -->
        <div>

            <h2 class="card-h2">CRO</h2>
            <span>
                <SecurityIcon color={"#00b09b"} height={30} width={30} />
            </span>
            <span>
                <h1 class="card-h1">CONTENT</h1>
            </span>
            
        </div>
    
        <!-- main content -->
        <table class="tg2">

            <thead>
                <tr>
                    {#if !enoughContentVolume}
                        <th class="red" valign="top"><Cross height={20} width={20}/></th>
                        <th class="tg-text">Your page has a low volume of text content which search engines can interpret as 'thin content'.</th>
                    {:else}
                        <th class="green" valign="top"><Tick height={20} width={20}/></th>
                        <th class="tg-text">There is a good volume of text content which search engines see as abundant information, as long as it is relevant.</th>
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
                Content with high quality information that educates your potential clients is one of the most important aspects of a website that converts prospects to clients.
                </p>
            </div>

        </div>

    </div>
</div>