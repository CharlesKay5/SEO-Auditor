<script>

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let clientLandingPage

</script>

<style>

    .wrapper2 {
        background: #eee;
        border: 1px solid #eee;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 500px;
        height: 350px;
        overflow: hidden;
    }
    .top-bar {
        display: flex;
        padding: 8px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: linear-gradient(180deg, #f3f3f3 0%, #e1e1e1 100%);
    }
    .control {
        padding: 6px;
        border-radius: 10px;
        display: flex;
        margin-right: 6px;
    }
    .exit {
        background: #d44;
    }
    .minimise {
        background: #fc2;
    }
    .maximise {
        background: #4d4;
    }
    .screenshot {
        display: block;
        background: #ddd;
        width: 100%;
        height: auto;
    }

</style>

<div class="wrapper2">
    <!-- mac window design -->
    <div class="top-bar">
        <div class="control exit" />
        <div class="control minimise" />
        <div class="control maximise" />
    </div>
    <!-- website screenshot -->
    <img class="screenshot" src={clientLandingPage} alt="Landing Page" />
</div>