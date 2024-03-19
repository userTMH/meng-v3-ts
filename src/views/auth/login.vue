<template>
  <div class="loginContent">
    <div style="width: 55%"></div>
    <div class="content">
      <div style="text-align: center">
        <img
          src="http://vue3.mengxuegu.com/assets/login-logo-6c42311e.png"
          alt=""
          style="width: 150px"
        />
      </div>
      <p style="font-size: 20px; color: #000; line-height: 70px; height: 70px">帐号登录</p>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="" prop="username">
          <el-input
            v-model="ruleForm.username"
            size="large"
            prefix-icon="ele-User"
            clearable
            placeholder="请输入账号/手机号"
          />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model="ruleForm.password"
            size="large"
            prefix-icon="ele-Unlock"
            clearable
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-checkbox label="" size="large" style="color: #ccc">记住密码</el-checkbox>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { Message } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const stores = useAuthStore()

interface RuleForm {
  username: string
  password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: ''
})
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入有效帐号/手机号', trigger: 'blur' },
    { min: 6, message: '输入的格式不正确，请重新输入', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入有效密码', trigger: 'blur' },
    { min: 6, message: '密码输入错误，请重新输入', trigger: 'blur' }
  ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await stores.login(ruleForm)
      console.log(res)
      if (res?.data.access_token) {
        router.replace('/')
      } else {
        Message.error('登录失败')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss" scoped>
.loginContent {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/login-bj.png') no-repeat;
  background-size: cover;
  display: flex;
  // justify-content: center;
  align-items: center;

  .content {
    width: 410px;
    height: 460px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>
