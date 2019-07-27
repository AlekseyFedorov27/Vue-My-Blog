<template>
<v-card class="login_form">

  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <h3 class="headline mb-0">Log in</h3>

    <v-text-field
      v-model.trim="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model.trim="password"
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
      to="register"
    >
      Sign in 
    </v-btn>
    
  </v-form>


  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
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
              email: this.email,
              password: this.password
            }
            await this.$store.dispatch('loginUser', user);
            await this.$store.dispatch('getUser');
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
    },
    created() {
      this.$store.dispatch('initAuth');
      
    }
  }
</script>
<style lang="scss">
.login_form{
  max-width: 380px;
  min-width: 320px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 40px;
  margin-top: 260px;
  transform: translateY(-50%)
}

</style>
