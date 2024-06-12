<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import Speedometer     from "svelte-material-icons/Speedometer.svelte"
    import Information     from "svelte-material-icons/Information.svelte"
    import CloseCircle     from "svelte-material-icons/CloseCircle.svelte"
    import Tick            from "svelte-material-icons/CheckCircle.svelte"
    // custom UI
    import PercentProgress from "../CardAssets/PercentProgress.svelte"

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let percentage
    export let loadingTime
    // dynamic variables
    $: loadingTimeSec = ((loadingTime.split(" "))[0])/1000
    $: loadingTimeStr = String(((loadingTime.split(" "))[0])/1000) + " s"

</script>

<style>

    .box {
        position: relative;
        height: 280px;
        width: 400px;
    }
    .info {
        width: 340px;
        height: 80px;
    }
    #performance-rating {
        display: flex;
        justify-content: flex-start;
    }
    #scale {
        padding-left: 10px;
        font-size: 16px;
        width: 255px;
        display: grid;
        grid-template-areas: 
        "loading-time speed"
        "bar bar";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        font-weight: bold;
    }
    #loading-time {
        grid-area: loading-time;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .loading-time-red {
        color: #ee5050;
    }
    .loading-time-yellow {
        color: #ffcf52;
    }
    .loading-time-green {
        color: #29e276;
    }
    #loading-txt {
        padding: 0 15px;
    }
    #speed {
        grid-area: speed;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    #bar {
        grid-area: bar;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .measure-bar {
        width: 80px;
        height: 30px;
        background: #003b71;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #green {
        background-color: #57d69d;
    }
    #yellow {
        background-color: #ffcf52;
    }
    #red {
        background-color: #ee5050;
    }

</style>

<div class="wrapper">
    <!-- card box -->
    <div class="box">

        <!-- title -->
        <h2 class="card-h2">code</h2>
        <span>
            <Speedometer height={25} width={25} color={'#00b09b'} />
        </span>
        <span>
            <h1 class="card-h1">performance</h1>
        </span>

        <!-- info box -->
        <div class="info">

            <!-- info icon -->
            <div class="infocont">
                <Information color={'#003B71'} />
            </div>

            <!-- info main content -->
            <div class="infocont">
                <p id="infotitle">Did you know?</p>
                <p id="infomain">
                Amazon found that every 0.1s of loading time cost them 1% in sales
                </p>
            </div>

        </div>

        <!-- performance UI -->
        <div id="performance-rating">
        
            <PercentProgress {percentage} radius={35} strokeWidth={5} />

            <div id="scale">

                <div id="loading-time">

                    <!-- loading time color and icon -->
                    {#if loadingTimeSec >= 4}
                    
                        <CloseCircle color={"#ee5050"} height={20} width={20} />
                        <span class="line-height loading-time-red" id="loading-txt">{loadingTimeStr}</span>
                    
                    {:else if loadingTimeSec >= 2}

                        <CloseCircle color={"#ffcf52"} height={20} width={20} />
                        <span class="line-height loading-time-yellow" id="loading-txt">{loadingTimeStr}</span>

                    {:else}

                        <Tick color={"#57d69d"} height={20} width={20} />
                        <span class="line-height loading-time-green" id="loading-txt">{loadingTimeStr}</span>

                    {/if}
                </div>

                <!-- loading time indicator -->
                <div id="speed">
                    <span class="line-height">Loading Time</span>
                </div>

                <!-- relative measurement bar -->
                <div id="bar">
                    <div class="measure-bar" id="green">Good</div>
                    <div class="measure-bar" id="yellow">Slow</div>
                    <div class="measure-bar" id="red">Poor</div>
                </div>

            </div>

        </div>

    </div>
</div>