<script>
  export let theme, msg;
  console.log(theme);
  let show = false,
    toolFocus = false,
    expanded = false,
    active = "";
</script>

<style>
  .sidebar {
    width: 100%;
    height: 100%;
  }

  .sidebar > .title {
    display: none;
    height: 35px;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 35px;
  }

  .sidebar > .title > .title-label h2 {
    text-transform: uppercase;
    font-size: 11px;
    cursor: default;
    font-weight: 400;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .panel {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .panel > .panel-header {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    padding-left: 20px;
    overflow: hidden;
    display: flex;
    cursor: pointer;
    background-position: 2px;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23646465' d='M6 4v8l4-4-4-4zm1 2.414L8.586 8 7 9.586V6.414z'/%3E%3C/svg%3E");
  }

  .panel > .panel-header.dark {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23e8e8e8' d='M6 4v8l4-4-4-4zm1 2.414L8.586 8 7 9.586V6.414z'/%3E%3C/svg%3E");
  }

  .panel > .panel-header.expanded {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23646465' d='M11 10.07H5.344L11 4.414v5.656z'/%3E%3C/svg%3E");
  }

  .panel > .panel-header.dark.expanded {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23e8e8e8' d='M11 10.07H5.344L11 4.414v5.656z'/%3E%3C/svg%3E");
  }

  .panel > .panel-header h3.title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 11px;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
  }

  .monaco-action-bar {
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
  }

  .monaco-action-bar .actions-container {
    display: flex;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    justify-content: flex-end;
  }

  .monaco-action-bar .action-item {
    cursor: pointer;
    display: inline-block;
    transition: transform 50ms ease;
    position: relative;
  }

  .monaco-action-bar .action-item.active {
    transform: scale(1.27);
  }

  .panel > .panel-header > .actions .action-label.icon {
    width: 24px;
    height: 22px;
    background-size: 16px;
    background-position: 50%;
    background-repeat: no-repeat;
    margin-right: 0;
    padding-right: 12px;
    padding-left: 12px;
  }

  .panel
    > .panel-header
    > .actions
    .action-label.icon.explorer-action.new-file {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23F6F6F6' d='M13 2H6V0H2v2H0v4h2v2h2v8h12V5z'/%3E%3Cpath fill='%23424242' d='M12 3H8v1h3v3h3v7H6V8H5v7h10V6z'/%3E%3Cpath d='M7 3.018H5V1H3.019v2.018H1V5h2.019v2H5V5h2V3.018z' fill='%23388A34'/%3E%3Cpath fill='%23F0EFF1' d='M11 7V4H8v2H6v8h8V7z'/%3E%3C/svg%3E")
      50% no-repeat;
  }

  .panel
    > .panel-header.dark
    > .actions
    .action-label.icon.explorer-action.new-file {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23C5C5C5' d='M12 3H8v1h3v3h3v7H6V8H5v7h10V6z'/%3E%3Cpath fill='%2389D185' d='M7 3.018H5V1H3.019v2.018H1V5h2.019v2H5V5h2V3.018z'/%3E%3C/svg%3E")
      50% no-repeat;
  }

  .panel
    > .panel-header
    > .actions
    .action-label.icon.explorer-action.new-folder {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23F6F6F6' d='M9 3L8 5V2H6V0H2v2H0v4h2v9h14V3z'/%3E%3Cpath d='M14 4H9.618l-1 2H6v2H3v6h12V4h-1zm0 2h-3.882l.5-1H14v1z' fill='%23656565'/%3E%3Cpath fill='%23388A34' d='M7 3.018H5V1H3.019v2.018H1V5h2.019v2H5V5h2z'/%3E%3Cpath fill='%23F0EFF1' d='M14 5v1h-3.882l.5-1z'/%3E%3C/svg%3E")
      50% no-repeat;
  }

  .panel
    > .panel-header.dark
    > .actions
    .action-label.icon.explorer-action.new-folder {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23C5C5C5' d='M14 4H9.618l-1 2H6v2H3v6h12V4h-1zm0 2h-3.882l.5-1H14v1z'/%3E%3Cpath fill='%2389D185' d='M7 3.018H5V1H3.019v2.018H1V5h2.019v2H5V5h2z'/%3E%3C/svg%3E")
      50% no-repeat;
  }

  .panel
    > .panel-header
    > .actions
    .action-label.icon.explorer-action.refresh-explorer {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M13.451 5.609l-.579-.939-1.068.812-.076.094c-.335.415-.927 1.341-1.124 2.876l-.021.165.033.163.071.345c0 1.654-1.346 3-3 3a2.98 2.98 0 0 1-2.107-.868 2.98 2.98 0 0 1-.873-2.111 3.004 3.004 0 0 1 2.351-2.929v2.926s2.528-2.087 2.984-2.461h.012L13.115 4.1 8.196 0H7.059v2.404A6.759 6.759 0 0 0 .938 9.125c0 1.809.707 3.508 1.986 4.782a6.707 6.707 0 0 0 4.784 1.988 6.758 6.758 0 0 0 6.75-6.75 6.741 6.741 0 0 0-1.007-3.536z' fill='%23F6F6F6'/%3E%3Cpath d='M12.6 6.134l-.094.071c-.269.333-.746 1.096-.91 2.375.057.277.092.495.092.545 0 2.206-1.794 4-4 4a3.986 3.986 0 0 1-2.817-1.164 3.987 3.987 0 0 1-1.163-2.815c0-2.206 1.794-4 4-4l.351.025v1.85S9.685 5.679 9.69 5.682l1.869-1.577-3.5-2.917v2.218l-.371-.03a5.75 5.75 0 0 0-4.055 9.826 5.75 5.75 0 0 0 9.826-4.056 5.725 5.725 0 0 0-.859-3.012z' fill='%23424242'/%3E%3C/svg%3E")
      50% no-repeat;
  }

  .panel
    > .panel-header.dark
    > .actions
    .action-label.icon.explorer-action.refresh-explorer {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M13.451 5.609l-.579-.939-1.068.812-.076.094c-.335.415-.927 1.341-1.124 2.876l-.021.165.033.163.071.345c0 1.654-1.346 3-3 3a2.98 2.98 0 0 1-2.107-.868 2.98 2.98 0 0 1-.873-2.111 3.004 3.004 0 0 1 2.351-2.929v2.926s2.528-2.087 2.984-2.461h.012L13.115 4.1 8.196 0H7.059v2.404A6.759 6.759 0 0 0 .938 9.125c0 1.809.707 3.508 1.986 4.782a6.707 6.707 0 0 0 4.784 1.988 6.758 6.758 0 0 0 6.75-6.75 6.741 6.741 0 0 0-1.007-3.536z' fill='%232D2D30'/%3E%3Cpath d='M12.6 6.134l-.094.071c-.269.333-.746 1.096-.91 2.375.057.277.092.495.092.545 0 2.206-1.794 4-4 4a3.986 3.986 0 0 1-2.817-1.164 3.987 3.987 0 0 1-1.163-2.815c0-2.206 1.794-4 4-4l.351.025v1.85S9.685 5.679 9.69 5.682l1.869-1.577-3.5-2.917v2.218l-.371-.03a5.75 5.75 0 0 0-4.055 9.826 5.75 5.75 0 0 0 9.826-4.056 5.725 5.725 0 0 0-.859-3.012z' fill='%23C5C5C5'/%3E%3C/svg%3E")
      50% no-repeat;
  }

  .panel
    > .panel-header
    > .actions
    .action-label.icon.explorer-action.collapse-explorer {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='-1 0 16 16'%3E%3Cpath fill='%23424242' d='M14 1v9h-1V2H5V1h9zM3 3v1h8v8h1V3H3zm7 2v9H1V5h9zM8 7H3v5h5V7z'/%3E%3Cpath fill='%2300539C' d='M4 9h3v1H4z'/%3E%3C/svg%3E")
      50% no-repeat;
  }

  .panel
    > .panel-header.dark
    > .actions
    .action-label.icon.explorer-action.collapse-explorer {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='-1 0 16 16'%3E%3Cpath fill='%23C5C5C5' d='M14 1v9h-1V2H5V1h9zM3 3v1h8v8h1V3H3zm7 2v9H1V5h9zM8 7H3v5h5V7z'/%3E%3Cpath fill='%2375BEFF' d='M4 9h3v1H4z'/%3E%3C/svg%3E")
      50% no-repeat;
  }
</style>

<div
  class="sidebar"
  style="background: {theme.colors['sideBar.background']}; color: {theme.colors['sideBar.foreground']};">
  <div class="composite title">
    <div class="title-label">
      <h2 title="模板管理器">模板管理器</h2>
    </div>
  </div>
  <div class="content">
    <div class="panel">
      <div
        class="panel-header expanded"
        class:dark={theme['theme'] == 'vs-dark'}
        class:expanded
        tabindex="0"
        role="toolbar"
        aria-label="文件资源管理器部分"
        aria-expanded="true"
        draggable="true"
        style="background-color: {theme.colors['panel.background']};height:
        22px; line-height: 22px;"
        on:click={() => {
          if (!toolFocus) {
            expanded = !expanded;
          }
        }}
        on:mouseover={() => (show = true)}
        on:mouseout={() => (show = false)}>
        <h3 class="title" title="demo">mrtcloud基础生成模板</h3>
        <div class="actions" style="flex: 1;display: {show ? 'block' : 'none'}">
          <div class="monaco-toolbar">
            <div class="monaco-action-bar animated">
              <ul
                class="actions-container"
                role="toolbar"
                aria-label="demo操作">
                <li
                  on:mouseout={() => (toolFocus = false)}
                  on:mouseover={() => (toolFocus = true)}
                  class="action-item"
                  role="presentation"
                  class:active={active == 'new-file'}>
                  <i
                    on:mouseup={() => (active = '')}
                    on:mousedown={() => (active = 'new-file')}
                    class="action-label icon explorer-action new-file"
                    role="button"
                    title="新建模板" />
                </li>
                <li
                  on:mouseout={() => (toolFocus = false)}
                  on:mouseover={() => (toolFocus = true)}
                  class="action-item"
                  role="presentation"
                  class:active={active == 'new-folder'}>
                  <i
                    on:mouseup={() => (active = '')}
                    on:mousedown={() => (active = 'new-folder')}
                    class="action-label icon explorer-action new-folder"
                    role="button"
                    title="新建模板文件夹" />
                </li>
                <li
                  on:mouseout={() => (toolFocus = false)}
                  on:mouseover={() => (toolFocus = true)}
                  class="action-item"
                  role="presentation"
                  class:active={active == 'refresh-explorer'}>
                  <i
                    on:mouseup={() => (active = '')}
                    on:mousedown={() => (active = 'refresh-explorer')}
                    class="action-label icon explorer-action refresh-explorer"
                    role="button"
                    title="刷新模板" />
                </li>
                <li
                  on:mouseout={() => (toolFocus = false)}
                  on:mouseover={() => (toolFocus = true)}
                  class="action-item"
                  role="presentation"
                  class:active={active == 'collapse-explorer'}>
                  <i
                    on:mouseup={() => (active = '')}
                    on:mousedown={() => (active = 'collapse-explorer')}
                    class="action-label icon explorer-action collapse-explorer"
                    role="button"
                    title="折叠模板文件夹" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
