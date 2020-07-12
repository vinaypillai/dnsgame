<template>
    <div class="home">
        <div ref="globeViz"></div>
        <div class="currentLoc">
            <span class="currentLocCommon">Current IP:</span>
            <span class="currentLocValue">{{points[currentIndex].ip}}</span>
            <span class="currentLocCommon">Current Location:</span>
            <span class="currentLocValue">{{points[currentIndex].city}}, {{points[currentIndex].country}}</span>
        </div>
        <div class="targetLoc"></div>
        <div class="optionsTitle">Available IPs</div>
        <span class="optionWrapper">
            <div v-if="currentTargets.length>0">
                <button class="optionButton" 
                v-for="(target, index) in currentTargets" 
                :key="target.ip"
                @click="reroute(index)">{{target.ip}}</button>
            </div>
            <div v-else>
                <div class="spinner--cube-jump">
                  <span class="dot" style="--count:0"></span>
                  <span class="dot" style="--count:1"></span>
                  <span class="dot" style="--count:2"></span>
                  <span class="dot" style="--count:3"></span>
                </div>
            </div>
        </span>
    </div>


</template>

<script>
import Globe from "globe.gl";
import axios from "axios";
export default {
  name: 'Home',
  data(){
    return {
        routeColor:"rgba(36, 66, 95, 1)",
        pointColor:'#933838',
        numPoints:100,
        globe:null,
        points:[],
        routes:[],
        currentTargets:[],
        currentIndex:0,
        gameId:null,
        globeReady:null,
        requestPending:false
    }
  },
  methods:{
    addPoint(point){
        point.index = this.points.length - 1;
        this.points.push(point)
        if(point.index>0){
            this.addRoute(point.index, point.index-1);
        }
    },
    reroute(index){
        const activeIP = this.currentTargets[index];
        const currentPoint = this.createPoint(activeIP.ip, activeIP.lng, activeIP.lat, activeIP.city, activeIP.country_code);
        this.addPoint(currentPoint);
        this.currentIndex++;
    },
    createPoint(ip, lng, lat, city, country){
        return {
            lat:parseFloat(lat),
            lng:parseFloat(lng),
            ip,
            city,
            country,
            color:this.pointColor,
        }
    },
    addRoute(pointIdx1, pointIdx2){
        this.routes.push({
            srcLat: this.points[pointIdx1].lat,
            srcLng: this.points[pointIdx1].lng,
            tgtLat: this.points[pointIdx2].lat,
            tgtLng: this.points[pointIdx2].lng
        })
    },
    refocus(){
      const currentPoint =this.points[this.currentIndex];
      this.globe.pointOfView({
        lat: currentPoint.lat, 
        lng: currentPoint.lng, 
        altitude: 2.5
      }, 1500);
      if(!this.requestPending){
          this.currentTargets=[];
          this.requestPending=true;
          axios.get("https://dnsgame.herokuapp.com/api/v1/adjacent-ip/"+currentPoint.ip).then((details)=>{
            this.currentTargets = details.data.output;
            this.requestPending=false;
          })
      }
    },
    resize(){
        this.globe.camera().aspect = window.innerWidth / window.innerHeight;
        this.globe.camera().updateProjectionMatrix();
        this.globe.renderer().setSize(window.innerWidth,window.innerHeight);
    }
  },
  beforeMount(){
    if(!this.$store.state.username){
      this.$router.push({"path":"/"})
    }
    this.globeReady = new Promise((resolve)=>{
        axios.post("https://dnsgame.herokuapp.com/api/v1/start-game/", {
        "username":this.$store.state.username
        }).then((gameDetails)=>{
            this.gameId = gameDetails.data.game_id;
            const startIP = gameDetails.data.start_ip;
            const currentPoint = this.createPoint(startIP.ip, startIP.lng, startIP.lat, startIP.city, startIP.country_code);
            this.addPoint(currentPoint);
            resolve();
        });
        this.globe = Globe()
        .globeImageUrl(require('@/assets/earthmap4k.jpg'))
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        .arcStartLat(d => +d.srcLat)
        .arcStartLng(d => +d.srcLng)
        .arcEndLat(d => +d.tgtLat)
        .arcEndLng(d => +d.tgtLng)
        .arcColor(() => this.routeColor)
        .arcsTransitionDuration(0)
        .pointColor((d) => d.color)
        .pointAltitude(0.01)
        .pointRadius(1)
        .pointsMerge(true)
        .showAtmosphere(true)
        .arcsData(this.routes)
        .arcStroke(0.75)
        .pointsData(this.points);
    })
    
  },
  mounted(){
    this.globeReady.then(()=>{
        this.globe(this.globeContainer);
        this.refocus();
        this.resize();
        window.addEventListener("resize", ()=>{
          this.resize();
        });
    })
  },
  computed:{
    globeContainer(){
        return this.$refs.globeViz;
    } 

  },
  watch:{
    currentIndex:{
        immediate:true,
        handler(){
            this.refocus();
        }
    },
    points:{
        immediate:true,
        deep:true,
        handler(){
            this.globe.pointsData(this.points);
        }
    }
  }


}
</script>
<style type="text/css">
    .home{
        max-width: 100vw;
        max-height: 100vh;
        overflow: hidden;
    }
    .currentLoc{
      position: absolute;
      top: 0;
      left: 0;
      padding: 1%;
      background-color: rgba(0,0,0,0.1);
      display: flex;
      border: 2px solid #fff;
      border-left: none;
      border-top: none;
      box-shadow: 0 0 15px rgba(0,0,0,1);
      align-items: center;
      justify-content: center;
      border-radius: 0 0 50px 0;
      flex-direction: column;
    }
    .currentLocCommon{
      font-weight: 200;
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      font-size: 20px;
      padding: 2%;
      white-space: nowrap;
    }
    .currentLocValue{
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      display: block;
      padding: 2%;
      white-space: nowrap;
    }
    .optionsTitle{
      display: flex;
      position: absolute;
      text-align: center;
      font-family: 'Montserrat', sans-serif;
      font-weight: 200;
      font-size: 40px;
      color: #fff;
      left: calc(50% - 120px);
      text-shadow: 0 0 15px #000;
      bottom: 100px;
    }
    .optionButton{
      background-color: rgba(0,0,0,0.1);
      border: 2px solid #fff;
      border-radius: 2000px;
      width: 150px;
      height: 50px;
      text-shadow: 0 0 15px rgba(0,0,0,1);
      font-family: 'Montserrat', sans-serif;
      font-weight: 200;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color, color, 0.15s ease-in-out;
      cursor: pointer;
    }
    .optionButton:hover{
        background-color: #FFF;
        color: #222;
    }
    .optionWrapper{
      position: absolute;
      bottom: 40px;
      left: 0;
    }
    .optionWrapper,
    .optionWrapper>div{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 50px;
    }
    .spinner--cube-jump {
      position: relative;
      width: 180px;
      height: 50px;
      padding: 10px 0;
      transform: rotateY(180deg);
      opacity: 0.5;
    }

    .spinner--cube-jump .dot {
      position: absolute;
      left: calc(var(--count) * 50px);
      top: 50%;
      --diameter: 30px;
      width: var(--diameter);
      height: var(--diameter);
      border-radius: 7.5px;
      background-color: #fff;
      margin: 0 auto;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      animation-delay: calc(var(--count) * (1s / 2));
      animation-name: spinner--cube-jump-animation;
    }

    @keyframes spinner--cube-jump-animation {
      0% {
        transform: rotate(0deg);
        height: var(--diameter);
        width: var(--diameter);
        top: 50%;
      }

      6.25% {
        height: calc(1.2 * var(--diameter));
        top: calc(10% - 0.2 * var(--diameter));
      }

      12.5% {
        transform: rotate(180deg);
        top: 0px;
        height: var(--diameter);
      }

      16.25% {
        height: calc(1.2 * var(--diameter));
      }

      20% {
        height: var(--diameter);
        width: var(--diameter);
        top: 50%;
      }

      25% {
        left: calc(var(--count) * 50px);
        top: calc(50% + 0.4 * var(--diameter));
        width: calc(1.2 * var(--diameter));
        height: calc(0.6 * var(--diameter));
      }

      30% {
        height: var(--diameter);
        width: var(--diameter);
        top: 50%;
      }

      100% {
        transform: rotate(180deg);
      }
    }
</style>
