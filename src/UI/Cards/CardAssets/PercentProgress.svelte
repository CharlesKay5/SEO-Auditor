<script>

    // =================================================
    // UI variables
    // =================================================

    // allow variables to be set from cards
    export let radius = 50
    export let strokeWidth = 8
    export let percentage = 0
    // dynamic variables
    $: diameter = radius * 2
    $: circumferance = diameter * Math.PI
    $: color = percentage <= 30 ? "#ee5050" : percentage <= 50 ? "#ffcf52" : "#57d69d"

</script>

<style>

    svg {
        transform: rotate(-90deg);
        display: flex;
    }
    .text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        font-size: 25px;
        font-weight: 800;
        align-items: center;
    }
    .progressCircle {
        position: relative;
        display: inline-flex;
    }

</style>

<!-- progress circle card asset -->
<div class="progressCircle">

    <svg width={diameter} height={diameter}>
        <circle
            cy={radius}
            cx={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke-linecap="round"
            stroke-dasharray="{(percentage * circumferance) / 100} {circumferance}"
            stroke={color}
            stroke-width={strokeWidth} />
        <circle cy={radius} cx={radius} r={radius} fill={color} opacity="0.2" />
    </svg>
    <span class="text" style="color: {color};">{percentage}</span>
    
</div>