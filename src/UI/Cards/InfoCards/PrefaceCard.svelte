<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import InformationVariant from "svelte-material-icons/InformationVariant.svelte"

</script>

<style>

    .wrapper {
        height: 100%;
        justify-content: center;
    }
    .box {
        height: 460px;
        width: 400px;
    }
    .text-box {
        padding: 30px;
        margin: auto;
    }
    .text {
        color: #163450;
    }

</style>

<div class="wrapper">
    <!-- card box -->
    <div class="box">

        <!-- title -->
        <h2 class="card-h2">Preface</h2>
        <span id="icon">
            <InformationVariant height={25} width={25} color={'#00b09b'}/>
        </span>
        <span>
            <h1 class="card-h1">About the Audit</h1>
        </span>

        <!-- main content -->
        <div class="text-box">
            <p class="text">
                Each box represents a part of your website which is evaluated accoriding to our guidelines. 
                <br>
                <br>
                They are evaluated either as correct or incorrect, or a score from 0-100. 
                <br>
                <br>
                This is to highlight which parts of your site are working well, and to show you the parts of your website that are causing you to rank lower and lose customers. 
                <br>
                <br>
                The purpose of the audit is not to grade your website as good or bad, but to give you information on how you could improve your site in order to get more customers.
            </p>
        </div>
        
    </div>
</div>