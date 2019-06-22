<script>
  export let name;
  export let theme;
  import TitleBar from "./component/TitleBar.svelte";
  import StatusBar from "./component/StatusBar.svelte";
</script>

<style>
  .main {
    width: 100%;
    height: 100%;
    background: var(--background);
    color: var(--color);
  }
</style>

<div
  class="main"
  style="--background: {theme.colors.foreground}; --color: {theme.colors['background']};
  --focus:{theme.colors['focusBorder']}">
  <TitleBar title="Onion" bind:theme />
  <StatusBar bind:theme />
</div>
