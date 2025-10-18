<text>
> 带有图标的单行文本框 - 展示所有变体的图标配置
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
        <sp-text-field label="填充变体" variant="filled" placeholder="填充样式" :prepend-icon="Location"
          :prepend-inner-icon="Person" :append-inner-icon="Notifications" :append-icon="Settings" />

        <sp-text-field label="轮廓变体" variant="outlined" placeholder="轮廓样式" :prepend-icon="Heart"
          :prepend-inner-icon="IosAdd" :append-inner-icon="IosBicycle" :append-icon="Play" />

        <sp-text-field label="简洁变体" variant="plain" placeholder="简洁样式" :prepend-icon="Search"
          :prepend-inner-icon="Filter" :append-inner-icon="Close" :append-icon="Menu" />

        <sp-text-field label="Solo变体" variant="solo" placeholder="Solo样式" :prepend-icon="Home"
          :prepend-inner-icon="User" :append-inner-icon="Bell" :append-icon="More" />
    </sp-col>

    <sp-col>
        <sp-text-field label="下划线变体" variant="underlined" placeholder="下划线样式" :prepend-icon="Mail"
          :prepend-inner-icon="Lock" :append-inner-icon="Eye" :append-icon="Send" />

        <sp-text-field label="Solo反转变体" variant="solo-inverted" placeholder="Solo反转样式" :prepend-icon="Calendar"
          :prepend-inner-icon="Clock" :append-inner-icon="Check" :append-icon="Arrow" />

        <sp-text-field label="Solo填充变体" variant="solo-filled" placeholder="Solo填充样式" :prepend-icon="Phone"
          :prepend-inner-icon="Contact" :append-inner-icon="Call" :append-icon="Add" />

        <sp-text-field label="综合示例" variant="outlined" placeholder="所有图标位置" :prepend-icon="Globe"
          :prepend-inner-icon="Shield" :append-inner-icon="Download" :append-icon="Share" />
    </sp-col>
  </sp-row>
</template>

<script setup>
// 导入 ionicons5 图标
import {
  Search,
  Notifications,
  Heart,
  Person,
  Play,
  Mail,
  Location,
  Settings,
  Filter,
  Close,
  Menu,
  LockClosed as Lock,
  Eye,
  Send,
  Calendar,
  Time as Clock,
  Checkmark as Check,
  ArrowForward as Arrow,
  Call as Phone,
  People as Contact,
  Call,
  Add,
  Globe,
  Shield,
  Download,
  Share,
  Home,
  PersonCircle as User,
  NotificationsOutline as Bell,
  EllipsisHorizontal as More
} from '@vicons/ionicons5'

// 导入 ionicons4 图标
import {
  IosAdd,
  IosBicycle
} from '@vicons/ionicons4'
</script>
