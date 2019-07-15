<template>
<v-card class="login_form">
  
  <v-form 
  
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <h3 class="headline mb-0">Register</h3>
    <v-text-field
      v-model.trim="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model.trim="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :counter="10"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="primary"
      @click="resetValidation"
      to="login"
    >
      Log in 
    </v-btn>

    
  </v-form>

  </v-card>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      name:'',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 6 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be less than 6 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    }),
    methods: {
    async validate () {
        try { if (this.$refs.form.validate()) {
            this.snackbar = true
            let user = {
              name: this.name,
              email: this.email,
              password: this.password
            }
            await this.$store.dispatch('authUser', user)
          }
          this.$router.push('/posts/')
        } catch (e) {
          // console.log(e)
        }    
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
    }
  }
</script>
<style lang="scss">
.login_form{
  max-width: 380px;
  min-width: 320px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 290px;
  transform: translateY(-50%)
}

</style>
