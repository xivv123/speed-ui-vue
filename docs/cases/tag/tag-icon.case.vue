<text>
标签可以添加前置和后置图标。
</text>

<template>
    <sp-space :size="8">
        <sp-tag text="前置图标" prepend-icon="User" />
        <sp-tag text="后置图标" append-icon="ChevronRight" />
        <sp-tag text="两个图标" prepend-icon="Star" append-icon="Check" />
    </sp-space>
</template>
