<script>
  export let name;
  export let theme;
  import TitleBar from "./component/TitleBar.svelte";
  import StatusBar from "./component/StatusBar.svelte";
  import ActivityBar from "./component/ActivityBar.svelte";
  import SplitBar from "./component/SplitBar.svelte";
  import SideBar from "./component/SideBar.svelte";
  let msg = "hello";
  const toggleConsole = () => {
    msg = msg + "Onion ";
  };
  const toggleTerminal = () => {
    msg = msg + "Onion ==";
  };
</script>

<style>
  .main {
    width: 100%;
    height: 100%;
    background: var(--background);
    color: var(--color);
  }

  .main > .content {
    --width: calc(100% - 50px);
    width: var(--width);
    top: 30px;
    bottom: 22px;
    left: 50px;
    position: absolute;
  }

  :focus {
    outline: var(--focus-border) auto 5px;
  }
</style>

<div
  class="main"
  style="--background: {theme.colors.foreground}; --color: {theme.colors['background']};
  --focus:{theme.colors['focus']}; --focus-border: {theme.colors['focusBorder']}">
  <TitleBar title="Onion" bind:theme bind:msg />
  <ActivityBar title="Onion" bind:theme bind:msg />
  <div class="content">
    <SplitBar>
      <div slot="left" style="width: 100%;height: 100%;">
        <SideBar bind:theme bind:msg />
      </div>
    </SplitBar>
  </div>
  <StatusBar
    bind:theme
    bind:msg
    on:toggleConsole={toggleConsole}
    on:toggleTerminal={toggleTerminal} />
</div>
