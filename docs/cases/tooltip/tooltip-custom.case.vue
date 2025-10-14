<text>
使用默认插槽自定义提示框内容，支持 HTML 和复杂布局。
</text>

<template>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <sp-tooltip>
            <template #activator="{ props }">
                <sp-btn v-bind="props">富文本内容</sp-btn>
            </template>
            <div style="padding: 12px;">
                <h4 style="margin: 0 0 8px 0; color: #fff;">🎉 恭喜！</h4>
                <p style="margin: 0 0 8px 0; font-size: 14px;">这是一个自定义的提示内容</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px;">
                    <li>支持 HTML 标签</li>
                    <li>可以添加图标</li>
                    <li>支持复杂布局</li>
                </ul>
            </div>
        </sp-tooltip>

        <sp-tooltip>
            <template #activator="{ props }">
                <sp-btn v-bind="props">用户信息卡片</sp-btn>
            </template>
            <div style="display: flex; gap: 12px; padding: 12px; min-width: 200px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px;">
                    👤
                </div>
                <div>
                    <h4 style="margin: 0 0 4px 0; color: #fff; font-size: 16px;">张三</h4>
                    <p style="margin: 0 0 8px 0; font-size: 13px; opacity: 0.8;">前端开发工程师</p>
                    <div style="display: flex; gap: 4px;">
                        <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 11px;">Vue.js</span>
                        <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 11px;">TypeScript</span>
                    </div>
                </div>
            </div>
        </sp-tooltip>

        <sp-tooltip>
            <template #activator="{ props }">
                <sp-btn v-bind="props">操作菜单</sp-btn>
            </template>
            <div style="padding: 8px 0; min-width: 120px;">
                <div style="padding: 8px 16px; cursor: pointer; font-size: 14px;">📝 编辑</div>
                <div style="padding: 8px 16px; cursor: pointer; font-size: 14px;">📋 复制</div>
                <div style="padding: 8px 16px; cursor: pointer; font-size: 14px;">🗑️ 删除</div>
            </div>
        </sp-tooltip>
    </div>
</template>
