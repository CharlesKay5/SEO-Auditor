<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import Mobile          from "svelte-material-icons/Phone.svelte"
    import Cross           from "svelte-material-icons/CloseCircle.svelte"
    import Information     from "svelte-material-icons/Information.svelte"

    // custom UI
    import PercentProgressMobile from "../CardAssets/PercentProgressMobile.svelte"

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let mobilePercentage

</script>

<style> 

    .tg2  {
        margin-top: 10px;
    }
    .tg2 .tg-text2{
        font-size: 1.4rem;
    }
    .box {
        position: relative;
        height: 260px;
        width: 400px;
    }
    .info {
        position: absolute;
        width: 175px;
        height: 150px;
        top: 45px;
        right: -170px;
    }

    #infomain {
        margin-bottom: 10px;
    }

</style>

<div class="wrapper">
    <!-- card box -->
    <div class = "box">

        <!-- main card -->
        <div>

            <!-- title -->
            <h2 class="card-h2">CODE</h2>
            <span>
                <Mobile color={"#00b09b"} height={30} width={30} />
            </span>
            <span>
                <h1 class="card-h1">MOBILE FRIENDLY</h1>
            </span>
        
            <!-- main content -->
            <table class="tg2">
                <thead>
                    <tr>
                        <th class="red" valign="top"><PercentProgressMobile {mobilePercentage} radius={65} strokeWidth={7} /></th>
                        <th class="tg-text2">Your page could be more usable across devices. Usability is important to maximise your available audience and minimize user bounce rates (which can indirectly affect your search engine rankings).</th>
                    </tr>
                </thead>
            </table>

        </div>

        <!-- info card -->
        <div class="info">

            <!-- info icon -->
            <div class="infocont" >
                <Information color={'#003B71'} height={15} width={15} />
            </div>

            <!-- info main content -->
            <div class="infocont">
                <p id="infotitle">Did you know?</p>
                <p id="infomain">
                In 2019, 53% of worldwide web searches were done using a mobile device?
                </p>
            </div>

        </div>
        
    </div>
</div>