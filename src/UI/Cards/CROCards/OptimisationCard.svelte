<script>

    // =================================================
    // UI variables
    // =================================================

    // svelte material icons UI
    import SecurityIcon from "svelte-material-icons/ShieldOutline.svelte"
    import Cross        from "svelte-material-icons/CloseCircle.svelte"
    import Tick         from "svelte-material-icons/CheckCircle.svelte"
    import Information  from "svelte-material-icons/Information.svelte"
    import Mobile       from "svelte-material-icons/Phone.svelte"
    import Dial         from "svelte-material-icons/Speedometer.svelte"

    // =================================================
    // UI variables
    // =================================================
    
    // allow variables to be set from app.svelte
    export let usingStickyHead
    export let distinctActionButton
    export let actionAlwaysVisible
    export let phoneAndEmailHyperlink

</script>

<style>

    .tg  {
        font-size: 16px;
        margin-top: 10px;
    }
    .tg td {
        padding: 5px 5px;
    }
    .tg .tg-text {
        padding-right: 15px;
    }
    .box {
        position: relative;
        height: 240px;
        width: 400px;
    }
    .info {
        position: absolute;
        width: 200px;
        height: 190px;
        top: 45px;
        right: -150px;
    }

</style>

<div class = "wrapper">
    <!-- card box -->
    <div class = "box">

        <!-- title -->
        <div>

            <h2 class="card-h2">CRO</h2>
            <span>
                <SecurityIcon color={"#00b09b"} height={30} width={30} />
            </span>
            <span>
                <h1 class="card-h1">OPTIMISATIONS</h1>
            </span>

        </div>
        
        <!-- main content -->
        <table class="tg">

            <thead>
                <tr>
                    {#if !usingStickyHead}
                        <th class="red" valign="top">
                            <Cross height={20} width={20}/>
                        </th>
                    {:else} 
                        <th class="green" valign="top">
                            <Tick height={20} width={20}/>
                        </th>
                    {/if}
                    <th class="tg-text">Using Sticky Header</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {#if !distinctActionButton}
                        <td class="red" valign="top">
                            <Cross height={20} width={20}/>
                        </td>
                    {:else}
                        <td class="green" valign="top">
                            <Tick height={20} width={20}/>
                        </td>
                    {/if}
                    <td class="tg-text">Using Distinct Action Button in Header</td>
                </tr>
                <tr>
                    {#if !actionAlwaysVisible}
                        <td class="red" valign="top">
                            <Cross height={20} width={20} />
                        </td>
                    {:else}
                        <td class="green" valign="top">
                            <Tick height={20} width={20} />
                        </td>
                    {/if}
                    <td class="tg-text">Action Button Always Visible</td>
                </tr>
                <tr>
                    {#if !phoneAndEmailHyperlink}
                        <td class="red" valign="top">
                            <Cross height={20} width={20} />
                        </td>
                    {:else}
                        <td class="green" valign="top">
                            <Tick height={20} width={20} />
                        </td>
                    {/if}
                    <td class="tg-text">Phone and Emails Hyperlinked</td>
                </tr>
            </tbody>

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
                More than 90% of people who read your website's header will read your call to action. 
                <br>
                <br>
                Make sure it's optimised!
                </p>
            </div>

        </div>

    </div>
</div>