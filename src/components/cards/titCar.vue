<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <slot name="title"></slot>

        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <slot name="content"></slot>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>