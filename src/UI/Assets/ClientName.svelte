<script>

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let clientName

</script>

<style>

    h1 {
        font-size: 40px;
        margin: 4px 0 16px 0;
        color: #163450;
    }
    h3 {
        font-size: 24px;
        margin: 0 0;
        color: #00b09b;
    }

</style>

<!-- render title -->
<h3>FREE SEO & WEBSITE AUDIT</h3>
<!-- render variable client name -->
<h1>{clientName}</h1>
