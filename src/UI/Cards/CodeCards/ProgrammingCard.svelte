<script>

    // =================================================
    // import UI
    // =================================================

    // svelte material icons UI
    import CodeTags    from "svelte-material-icons/CodeTags.svelte"
    import Information from "svelte-material-icons/Information.svelte"

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from app.svelte
    export let imgsWithoutAlt
    export let pagesWithMultiH1
    export let pagesWithoutH1
    export let linksWith404
    export let amountOfSemantics
    export let schemaCode

</script>

<style>

    .box {
        position: relative;
        height: 260px;
        width: 400px;
    }
    .tg th{
        padding: 3px 5px;
    }
    #cont-box {
        position: absolute;
        left: 25px;
        bottom: 12px;
    }
    .info {
        position: absolute;
        width: 200px;
        height: 210px;
        top: 15px;
        right: -130px;
    }

</style>

<div class="wrapper">

    <!-- card box -->
    <div class="box">

        <!-- title -->
        <h2 class="card-h2">code</h2>
        <span>
        <CodeTags height={25} width={25} color={'#00b09b'}/>
        </span>
        <span>
        <h1 class="card-h1">programming</h1>
        </span>

        <!-- main content -->
        <div id="cont-box">
            <table class="tg">
                <thead>
                    <tr>
                        {#if imgsWithoutAlt < 1}
                            <th class="green">{imgsWithoutAlt}</th>
                        {:else}
                            <th class="red">{imgsWithoutAlt}</th>
                        {/if}
                        <th class="tg-text">images with missing alt text</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {#if pagesWithMultiH1 < 1}
                            <td class="green">{pagesWithMultiH1}</td>
                        {:else}
                            <td class="red">{pagesWithMultiH1}</td>
                        {/if}
                        <td class="tg-text">pages with multiple &lt;h1&gt; tags</td>
                    </tr>
                    <tr>
                        {#if pagesWithoutH1 > 0}
                            <td class="red">{pagesWithoutH1}</td>
                        {:else}
                            <td class="green">{pagesWithoutH1}</td>
                        {/if}
                        <td class="tg-text">pages with missing &lt;h1&gt; tags</td>
                    </tr>
                    <tr>
                        {#if linksWith404 < 1}
                            <td class="green">{linksWith404}</td>
                        {:else}
                            <td class="red">{linksWith404}</td>
                        {/if}
                        <td class="tg-text">links with 404 missing page</td>
                    </tr>
                    <tr>
                        {#if amountOfSemantics > 1}
                            <td class="green">{amountOfSemantics}</td>
                        {:else}
                            <td class="red">{amountOfSemantics}</td>
                        {/if}
                        <td class="tg-text">instances of semantic code</td>
                    </tr>
                    <tr>
                        {#if schemaCode < 1}
                            <td class="red">{schemaCode}</td>
                        {:else}
                            <td class="green">{schemaCode}</td>
                        {/if}
                        <td class="tg-text">schema code snippets found</td>
                    </tr>
                </tbody>
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
                Problems with the code of your website will cause Google to rank your site lower. 
                <br>
                <br>
                This is because if your sites site structure is broken it leads to a poor user experience.
                </p>
            </div>

        </div>
        
    </div>
</div>