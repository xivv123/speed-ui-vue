<text>
> 按钮组合演示，展示按钮的分组和组合使用方式
</text>

<template>
  <sp-space direction="vertical" :size="24">
    <!-- 基础按钮组 -->
    <div>
      <h4 style="margin-bottom: 12px;">基础按钮组</h4>
      <sp-space direction="horizontal" :size="0">
        <sp-btn variant="outlined" style="border-radius: 6px 0 0 6px; border-right: none;">左侧</sp-btn>
        <sp-btn variant="outlined" style="border-radius: 0; border-right: none;">中间</sp-btn>
        <sp-btn variant="outlined" style="border-radius: 0 6px 6px 0;">右侧</sp-btn>
      </sp-space>
    </div>
    
    <!-- 操作按钮组 -->
    <div>
      <h4 style="margin-bottom: 12px;">操作按钮组</h4>
      <sp-space direction="horizontal" :size="8" wrap>
        <sp-btn color="primary">保存</sp-btn>
        <sp-btn variant="outlined">取消</sp-btn>
        <sp-btn variant="text" color="error">删除</sp-btn>
      </sp-space>
    </div>
    
    <!-- 工具栏按钮组 -->
    <div>
      <h4 style="margin-bottom: 12px;">工具栏按钮组</h4>
      <sp-space direction="horizontal" :size="4" wrap>
        <sp-btn icon="Bold" variant="text" size="small"></sp-btn>
        <sp-btn icon="Italic" variant="text" size="small"></sp-btn>
        <sp-btn icon="Underline" variant="text" size="small"></sp-btn>
        <sp-btn icon="Link" variant="text" size="small"></sp-btn>
        <sp-btn icon="Image" variant="text" size="small"></sp-btn>
      </sp-space>
    </div>
    
    <!-- 分页按钮组 -->
    <div>
      <h4 style="margin-bottom: 12px;">分页按钮组</h4>
      <sp-space direction="horizontal" :size="8" wrap>
        <sp-btn icon="ArrowLeft" variant="outlined" disabled></sp-btn>
        <sp-btn variant="outlined">1</sp-btn>
        <sp-btn color="primary">2</sp-btn>
        <sp-btn variant="outlined">3</sp-btn>
        <sp-btn variant="outlined">4</sp-btn>
        <sp-btn variant="outlined">5</sp-btn>
        <sp-btn icon="ArrowRight" variant="outlined"></sp-btn>
      </sp-space>
    </div>
    
    <!-- 浮动操作按钮组 -->
    <div>
      <h4 style="margin-bottom: 12px;">浮动操作按钮</h4>
      <sp-space direction="horizontal" :size="12" wrap>
        <sp-btn icon="Add" rounded="circle" color="primary" size="large"></sp-btn>
        <sp-btn icon="Message" rounded="circle" color="success" size="default"></sp-btn>
        <sp-btn icon="Phone" rounded="circle" color="info" size="small"></sp-btn>
      </sp-space>
    </div>
    
    <!-- 垂直按钮组 -->
    <div>
      <h4 style="margin-bottom: 12px;">垂直按钮组</h4>
      <sp-space direction="vertical" :size="0" style="width: fit-content;">
        <sp-btn variant="outlined" style="border-radius: 6px 6px 0 0; border-bottom: none; width: 120px;">选项一</sp-btn>
        <sp-btn variant="outlined" style="border-radius: 0; border-bottom: none; width: 120px;">选项二</sp-btn>
        <sp-btn variant="outlined" style="border-radius: 0 0 6px 6px; width: 120px;">选项三</sp-btn>
      </sp-space>
    </div>
  </sp-space>
</template>