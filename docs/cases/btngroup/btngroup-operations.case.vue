<text>
操作按钮组场景,常用于表单操作和数据操作。
</text>

<template>
    <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">表单操作</h4>
            <sp-btn-group divided>
                <sp-btn variant="elevated" color="primary" prepend-icon="Save">保存</sp-btn>
                <sp-btn variant="outlined" color="secondary">取消</sp-btn>
                <sp-btn variant="text" color="error" prepend-icon="Trash">删除</sp-btn>
            </sp-btn-group>
        </div>

        <div>
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">数据操作</h4>
            <sp-btn-group divided variant="outlined" color="warning">
                <sp-btn prepend-icon="Edit">编辑</sp-btn>
                <sp-btn prepend-icon="Copy">复制</sp-btn>
                <sp-btn prepend-icon="Trash">删除</sp-btn>
            </sp-btn-group>
        </div>

        <div>
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">社交互动</h4>
            <sp-btn-group>
                <sp-btn color="primary" prepend-icon="Share">分享</sp-btn>
                <sp-btn color="success" prepend-icon="Like">点赞</sp-btn>
                <sp-btn color="warning" prepend-icon="Star">收藏</sp-btn>
                <sp-btn color="info" prepend-icon="Comment">评论</sp-btn>
            </sp-btn-group>
        </div>
    </div>
</template>
