<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import SecurityIcon from "svelte-material-icons/Security.svelte"
    import Cross        from "svelte-material-icons/CloseCircle.svelte"
    import Tick         from "svelte-material-icons/CheckCircle.svelte"
    import Information  from "svelte-material-icons/Information.svelte"

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let httpsRedirect
    export let usingHttps
    export let usingHttp2

</script>

<style>

    .httpBox-item {
        position: absolute;
        left: 25px;
        bottom: 12px;
    }
    .box {
        position: relative;
        height: 200px;
        width: 400px;
    }
    .info {
        position: absolute;
        width: 210px;
        height: 190px;
        top: 15px;
        right: -30px;
    }

</style>

<div class="wrapper">
    <!-- card box -->
    <div class="box">
        
        <!-- title -->
        <h2 class="card-h2">code</h2>
        <span>
            <SecurityIcon class="Shield" height={25} width={25} color={'#00b09b'}/>
        </span>
        <span>
            <h1 class="card-h1">security</h1>
        </span>

        <!-- main content -->
        <div id="httpBox">
            <div class="httpBox-item">
                <table class="tg">
                    <thead>
                        <tr>
                            {#if !httpsRedirect}
                                <th class="red">
                                    <Cross height={20} width={20} />
                                </th>
                            {:else}
                                <th class="green">
                                    <Tick height={20} width={20} />
                                </th>
                            {/if}
                            <th class="tg-text">HTTPS Redirect</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {#if !usingHttps}
                                <td class="red">
                                    <Cross height={20} width={20} />
                                </td>
                            {:else}
                                <td class="green">
                                    <Tick height={20} width={20} />
                                </td>
                            {/if}
                            <td class="tg-text">Using HTTPS</td>
                        </tr>
                        <tr>
                            {#if !usingHttp2}
                                <td class="red">
                                    <Cross height={20} width={20} />
                                </td>
                            {:else}
                                <td class="green">
                                    <Tick height={20} width={20} />
                                </td>
                            {/if}
                            <td class="tg-text">Using HTTP/2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
                Any security issues will cause Google to rank your site lower. 
                <br>
                <br>
                It also makes customers less likely to trust you, as they can see your website is not secured.
                </p>
            </div>

        </div>

    </div>
</div>
