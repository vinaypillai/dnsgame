<template>
    <div class="wrapper">
        <div class="launch-image" :style="{backgroundImage:`url(${require('@/assets/launchpage2.jpg')})`}">
            <h1 class="title">DNS Dash</h1>
        </div>

        <div class="text-wrapper">
            <p class="explanation">The Internet is beautifully complex. Millions of nodes form a decentralized entity that allows us to access information from all over the world. But that got us thinking, what is life like as a packet of information traversing the internet? Here, at DNS Dash, you can experience what that is like. Race against friends to travel from a randomly generated IP to a specified target IP in the fastest time possible! Check out the leaderboards to see who the fastest packets are! Just enter a name below to start racing!</p>
        </div>
        <input type="text" placeholder="Username" class="username--field" v-model="username">
        <div class="button--slide-left" >
            <button @click="startGame">
                <span>Race!</span>
            </button>
        </div>
       
        
    </div>
</template>
<style>
    .wrapper{
        padding: 0;
        margin: 0;
        height: 100vh;
        width: 100%;
        z-index: -1;
    }
    .launch-image{
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        height: 400px;
        top: 0;
        box-shadow: 0 0 30px rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title{
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 100px;
        top: 15%;
        left: auto;
        text-shadow: 0 0 15px rgba(0,0,0,0.5);
    }
    .text-wrapper{
        position: relative;
        width: 100%;
        left: 0;
        min-height: 400px;
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: 2;
        letter-spacing: 5%;
    }
    .explanation{
        margin-top: 10%;
        width: 80%;
        margin-left: 5%;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 18px;
        margin-bottom: 10%;
    }
    .username--field{
        all: unset;
        border: none;
        border-bottom: 2px solid #222;
        width: 50%;
        height: 50px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 18px;
        letter-spacing: 5%;
        margin-left: 15%;
        margin-bottom: 10%;
    }
    .username--field::placeholder{
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 18px;
        letter-spacing: 5%;
        color: #222;
        margin-bottom: 10%;
    }
    .button--slide-left{
    --bg-color: #fff;
    --color: #fff;
    filter: invert(0.8);
    display: inline-block;
    position: relative;
    cursor: pointer;
    border-radius: 500px;
    z-index: 1;
    margin-left: 2.5%;
    }
    .button--slide-left button{
        all: unset;
        padding: 20px 50px;
        text-transform: uppercase;
        font-family: "Lato", sans-serif;
        font-weight: 300;
        letter-spacing: 2px;
        font-size: 20px;
        border: solid 1px var(--color);
        border-radius: inherit;
        color: var(--color);
        -webkit-text-fill-color: var(--color);
        transition: color, background-color,-webkit-text-fill-color,border-width, 0.15s ease-in-out;
    }
    .button--slide-left span{    
        mix-blend-mode: difference;
    }
    .button--slide-left::after{
        content: "";
        background-color: var(--color);
        color: var(--bg-color);
        -webkit-text-fill-color: var(--bg-color);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: inherit;
        z-index: -1;
        clip-path: circle(0% at -25% 50%); 
        transition: clip-path 0.75s;
    }
    .button--slide-left:hover::after{
        clip-path: circle(100%);
    }
    .leaderboard-title{
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 18px;
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                username: ''
            }
        },
        methods: {
            startGame(){
                if(this.username.length > 0 && this.username.length < 500){
                    this.$store.commit("setUsername", this.username);
                    this.$router.push({"path":"/game"});
                }
            }
        }
    }
</script>
