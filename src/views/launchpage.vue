<template>
    <div class="wrapper">
        <div class="launch-image1" :style="{backgroundImage:`url(${require('@/assets/launchpage2.jpg')})`}">
            <h1 class="title">DNS Dash</h1>
        </div>
        <div id="particles-js">
            <div class="text-wrapper">
                <p class="explanation">The Internet is beautifully complex. Millions of nodes form a decentralized entity that allows us to access information from all over the world. But that got us thinking, what is life like as a packet of information traversing the internet? Here, at DNS Dash, you can experience what that is like. Race against friends to travel from a randomly generated IP to a specified target IP in the fastest time possible! Check out the leaderboards to see who the fastest packets are! Enter a name below and get to racing! If this is your first time playing, scroll down for instructions.</p>
            </div>
            <div class="input-wrapper">
                <input type="text" placeholder="Username" class="username--field" v-model="username">
                <div class="button--slide-left" >
                    <button @click="startGame">
                        <span>Race!</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="launch-image1" :style="{backgroundImage:`url(${require('@/assets/launchpage3.jpg')})`}">
            <h1 class="title">How to Play</h1>
        </div>
        <div id="particles-js">
            <div class="text-wrapper">
                <p class="explanation">When you start the game, you will be placed at a random IP address, shown in the top left corner. Your goal is to travel through the nameserver network to get to the target IP in the top right corner. At the bottom are different buttons showing the options you have to travel to. Be careful though, one wrong decision could send you on a path that doesn't connect to the target IP! The faster you arrive at your destination, the lower your points are, and the goal is to get as few points as possible. You can always return to the starting IP, but it will cost you some points and some precious time. Have fun!</p>
            </div>
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
    .launch-image1{
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
        margin-left: 10%;
        margin-right: 10%;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 18px;
        margin-bottom: 10%;
    }
    .input-wrapper{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .username--field{
        all: unset;
        border: none;
        border-bottom: 2px solid #222;
        width: 40%;
        height: 50px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 18px;
        letter-spacing: 10%;
        margin-bottom: 15%;
        margin-right: 5%;
    }
    .username--field::placeholder{
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 18px;
        letter-spacing: 10%;
        color: #222;
        margin-bottom: 10%;
    }
    .button--slide-left{
    --bg-color: #fff;
    --color: #fff;
    filter: invert(0.8);
    display: flex;
    position: relative;
    cursor: pointer;
    border-radius: 500px;
    z-index: 1;
    margin-bottom: 15%;
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
    .instruction-title{
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 100px;
        top: 15%;
        left: auto;
        text-shadow: 0 0 15px rgba(0,0,0,0.5);
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
        },
    }
</script>
