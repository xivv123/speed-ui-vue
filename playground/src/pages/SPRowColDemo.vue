<template>
  <div class="row-col-demo">
    <h1>🎯 SPRow & SPCol Grid 布局组件演示</h1>

    <!-- 基础网格 -->
    <section class="demo-section">
      <h2>1. 基础网格布局</h2>
      <p>默认12列网格系统</p>

      <div class="demo-container">
        <SPRow gap="16">
          <SPCol cols="12">
            <div class="grid-item">cols=12</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16">
          <SPCol cols="6">
            <div class="grid-item">cols=6</div>
          </SPCol>
          <SPCol cols="6">
            <div class="grid-item">cols=6</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16">
          <SPCol cols="4">
            <div class="grid-item">cols=4</div>
          </SPCol>
          <SPCol cols="4">
            <div class="grid-item">cols=4</div>
          </SPCol>
          <SPCol cols="4">
            <div class="grid-item">cols=4</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16">
          <SPCol cols="3">
            <div class="grid-item">cols=3</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">cols=3</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">cols=3</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">cols=3</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- 间距控制 -->
    <section class="demo-section">
      <h2>2. 间距控制</h2>

      <h3>统一间距 (gap)</h3>
      <div class="demo-container">
        <SPRow gap="8">
          <SPCol cols="3" v-for="i in 4" :key="i">
            <div class="grid-item">gap=8</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16">
          <SPCol cols="3" v-for="i in 4" :key="i">
            <div class="grid-item">gap=16</div>
          </SPCol>
        </SPRow>

        <SPRow gap="24">
          <SPCol cols="3" v-for="i in 4" :key="i">
            <div class="grid-item">gap=24</div>
          </SPCol>
        </SPRow>
      </div>

      <h3>分别控制行列间距</h3>
      <div class="demo-container">
        <SPRow column-gap="32" row-gap="8">
          <SPCol cols="3" v-for="i in 8" :key="i">
            <div class="grid-item">column-gap=32<br>row-gap=8</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- 列跨度和位置 -->
    <section class="demo-section">
      <h2>3. 列跨度和位置控制</h2>

      <h3>不同跨度</h3>
      <div class="demo-container">
        <SPRow gap="16">
          <SPCol cols="8">
            <div class="grid-item">cols=8</div>
          </SPCol>
          <SPCol cols="4">
            <div class="grid-item">cols=4</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16">
          <SPCol cols="2">
            <div class="grid-item">cols=2</div>
          </SPCol>
          <SPCol cols="8">
            <div class="grid-item">cols=8</div>
          </SPCol>
          <SPCol cols="2">
            <div class="grid-item">cols=2</div>
          </SPCol>
        </SPRow>
      </div>

      <h3>使用 colStart 和 colEnd</h3>
      <div class="demo-container">
        <SPRow gap="16">
          <SPCol col-start="1" col-end="4">
            <div class="grid-item">列 1-3</div>
          </SPCol>
          <SPCol col-start="4" col-end="13">
            <div class="grid-item">列 4-12</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16">
          <SPCol col-start="3" col-end="11">
            <div class="grid-item">列 3-10 (居中)</div>
          </SPCol>
        </SPRow>
      </div>

      <h3>使用 offset 偏移</h3>
      <div class="demo-container">
        <SPRow gap="16">
          <SPCol cols="4" offset="4">
            <div class="grid-item">offset=4</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16">
          <SPCol cols="3" offset="3">
            <div class="grid-item">offset=3</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">no offset</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- 对齐方式 -->
    <section class="demo-section">
      <h2>4. 对齐方式</h2>

      <h3>水平对齐 (justify)</h3>
      <div class="demo-container">
        <SPRow gap="16" justify="start">
          <SPCol cols="2" v-for="i in 3" :key="i">
            <div class="grid-item">start</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16" justify="center">
          <SPCol cols="2" v-for="i in 3" :key="i">
            <div class="grid-item">center</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16" justify="end">
          <SPCol cols="2" v-for="i in 3" :key="i">
            <div class="grid-item">end</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16" justify="space-between">
          <SPCol cols="2" v-for="i in 3" :key="i">
            <div class="grid-item">space-between</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16" justify="space-around">
          <SPCol cols="2" v-for="i in 3" :key="i">
            <div class="grid-item">space-around</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16" justify="space-evenly">
          <SPCol cols="2" v-for="i in 3" :key="i">
            <div class="grid-item">space-evenly</div>
          </SPCol>
        </SPRow>
      </div>

      <h3>垂直对齐 (align)</h3>
      <div class="demo-container">
        <SPRow gap="16" align="start" style="min-height: 120px; background: #f5f5f5;">
          <SPCol cols="3" v-for="i in 4" :key="i">
            <div class="grid-item">align-start</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16" align="center" style="min-height: 120px; background: #f5f5f5;">
          <SPCol cols="3" v-for="i in 4" :key="i">
            <div class="grid-item">align-center</div>
          </SPCol>
        </SPRow>

        <SPRow gap="16" align="end" style="min-height: 120px; background: #f5f5f5;">
          <SPCol cols="3" v-for="i in 4" :key="i">
            <div class="grid-item">align-end</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- 自动填充 -->
    <section class="demo-section">
      <h2>5. 自动填充布局</h2>

      <h3>Auto Fill (尽可能多的列)</h3>
      <div class="demo-container">
        <SPRow gap="16" auto-fill min-col-width="200px">
          <SPCol v-for="i in 12" :key="i">
            <div class="grid-item">Item {{ i }}</div>
          </SPCol>
        </SPRow>
      </div>

      <h3>Auto Fit (拉伸填充)</h3>
      <div class="demo-container">
        <SPRow gap="16" auto-fit min-col-width="200px">
          <SPCol v-for="i in 5" :key="i">
            <div class="grid-item">Item {{ i }}</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- 多行布局 -->
    <section class="demo-section">
      <h2>6. 多行布局</h2>

      <div class="demo-container">
        <SPRow gap="16">
          <SPCol cols="6" rows="2">
            <div class="grid-item" style="height: 100%; min-height: 150px;">
              rows=2<br>跨越2行
            </div>
          </SPCol>
          <SPCol cols="6">
            <div class="grid-item">普通单元格</div>
          </SPCol>
          <SPCol cols="6">
            <div class="grid-item">普通单元格</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- 密集模式 -->
    <section class="demo-section">
      <h2>7. 密集模式 (Dense)</h2>
      <p>启用 dense 后，较小的项目会填充较大项目留下的空隙</p>

      <h3>普通模式</h3>
      <div class="demo-container">
        <SPRow gap="16">
          <SPCol cols="6" rows="2">
            <div class="grid-item" style="height: 100%; min-height: 150px;">大项目</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">小项目 1</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">小项目 2</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">小项目 3</div>
          </SPCol>
        </SPRow>
      </div>

      <h3>Dense 模式</h3>
      <div class="demo-container">
        <SPRow gap="16" dense>
          <SPCol cols="6" rows="2">
            <div class="grid-item" style="height: 100%; min-height: 150px;">大项目</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">小项目 1</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">小项目 2</div>
          </SPCol>
          <SPCol cols="3">
            <div class="grid-item">小项目 3 (自动填充空隙)</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- 复杂布局示例 -->
    <section class="demo-section">
      <h2>8. 复杂布局示例</h2>

      <div class="demo-container">
        <SPRow gap="16">
          <SPCol cols="12">
            <div class="grid-item header">Header</div>
          </SPCol>

          <SPCol cols="3">
            <div class="grid-item sidebar">Sidebar</div>
          </SPCol>

          <SPCol cols="9">
            <SPRow gap="16">
              <SPCol cols="12">
                <div class="grid-item">Main Content</div>
              </SPCol>

              <SPCol cols="4" v-for="i in 6" :key="i">
                <div class="grid-item">Card {{ i }}</div>
              </SPCol>
            </SPRow>
          </SPCol>

          <SPCol cols="12">
            <div class="grid-item footer">Footer</div>
          </SPCol>
        </SPRow>
      </div>
    </section>

    <!-- API 说明 -->
    <section class="demo-section">
      <h2>📚 API 说明</h2>

      <div class="api-container">
        <h3>SPRow Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>cols</code></td>
              <td>网格列数</td>
              <td>String | Number</td>
              <td>12</td>
            </tr>
            <tr>
              <td><code>gap</code></td>
              <td>统一间距</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>columnGap</code></td>
              <td>列间距</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>rowGap</code></td>
              <td>行间距</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>align</code></td>
              <td>垂直对齐</td>
              <td>'start' | 'center' | 'end' | 'stretch' | 'baseline'</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>justify</code></td>
              <td>水平对齐</td>
              <td>'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>dense</code></td>
              <td>密集模式</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td><code>autoFill</code></td>
              <td>自动填充</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td><code>autoFit</code></td>
              <td>自动适应</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td><code>minColWidth</code></td>
              <td>最小列宽（用于auto-fill/fit）</td>
              <td>String | Number</td>
              <td>'250px'</td>
            </tr>
          </tbody>
        </table>

        <h3>SPCol Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>cols</code></td>
              <td>占用列数</td>
              <td>String | Number</td>
              <td>'auto'</td>
            </tr>
            <tr>
              <td><code>colStart</code></td>
              <td>起始列</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>colEnd</code></td>
              <td>结束列</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>rows</code></td>
              <td>占用行数</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>rowStart</code></td>
              <td>起始行</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>rowEnd</code></td>
              <td>结束行</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td>偏移量</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>order</code></td>
              <td>显示顺序</td>
              <td>String | Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>alignSelf</code></td>
              <td>自对齐</td>
              <td>'auto' | 'start' | 'center' | 'end' | 'stretch'</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>justifySelf</code></td>
              <td>自对齐(水平)</td>
              <td>'auto' | 'start' | 'center' | 'end' | 'stretch'</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { SPRow, SPCol } from '@speed-ui/ui'
</script>

<style scoped>
.row-col-demo {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 3px solid #4caf50;
}

.demo-section {
  margin-bottom: 48px;
}

.demo-section h2 {
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e8e8e8;
}

.demo-section h3 {
  color: #666;
  margin: 24px 0 12px;
  font-size: 18px;
}

.demo-section p {
  color: #666;
  margin-bottom: 16px;
}

.demo-container {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-item.header {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.grid-item.sidebar {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  min-height: 100%;
}

.grid-item.footer {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.api-container {
  background: #f8f9fa;
  padding: 24px;
  border-radius: 8px;
  margin-top: 24px;
}

.api-container h3 {
  color: #333;
  margin-bottom: 16px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.api-table th,
.api-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

.api-table th {
  background: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.api-table code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #e91e63;
}

.api-table tbody tr:hover {
  background: #f8f9fa;
}
</style>
