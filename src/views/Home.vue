<template>
    <div class="home">
        <div ref="globeViz"></div>
        <div class="currentLoc">
            <span class="currentLocCommon">Current IP:</span>
            <span class="currentLocValue">{{points[currentIndex].ip}}</span>
        </div>
        <div class="targetLoc"></div>
        <div class="nextPoint" @click="nextPoint()">Next Point</div>
        <div class="optionsTitle">Available IPs</div>
        <span class="optionWrapper">
          <div class="optionButton"></div>
          <div class="optionButton"></div>
          <div class="optionButton"></div>
        </span>
    </div>


</template>

<script>
import Globe from "globe.gl";
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
        currentIndex:0,
    }
  },
  methods:{
    addPoint(lat,lng,ip){
        this.points.push({
            lat,
            lng,
            ip,
            color:this.pointColor,
            index: this.points.length - 1,
        })
    },
    addRoute(pointIdx1, pointIdx2){
        this.routes.push({
            srcLat: this.points[pointIdx1].lat,
            srcLng: this.points[pointIdx1].lng,
            tgtLat: this.points[pointIdx2].lat,
            tgtLng: this.points[pointIdx2].lng
        })
    },
    nextPoint(){
        // For testing
        if(this.currentIndex<this.points.length-1){
            this.currentIndex++;
        }else{
            this.currentIndex=0;
        }
    },
    refocus(){
      this.globe.pointOfView({
        lat: this.points[this.currentIndex].lat, 
        lng: this.points[this.currentIndex].lng, 
        altitude: 2.5
      }, 1500);
    }
  },
  beforeMount(){
    if(!this.$store.state.username){
      this.$router.push({"path":"/"})
    }
    for(let i=0;i<this.numPoints;i++){
        const lat = (Math.random() - 0.5) * 180;
        const lng = (Math.random() - 0.5) * 360;
        const ip = Array(4).fill().map(() => Math.round(Math.random() * 255)).join(".");
        this.addPoint(lat,lng, ip)
    }
    for(let i=0;i<this.numPoints-1;i++){
        this.addRoute(i, i+1);
    }
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
    .pointsData(this.points)
  },
  mounted(){
    console.log(this.points)
    this.globe(this.globeContainer);
    this.refocus();
    window.addEventListener("resize", ()=>{
      this.globe.camera().aspect = window.innerWidth / window.innerHeight;
      this.globe.camera().updateProjectionMatrix();
      this.globe.renderer().setSize(window.innerWidth,window.innerHeight);
    });
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
    }
  }


}
</script>
<style type="text/css">
    .currentLoc{
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 75px;
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
    }
    .currentLocValue{
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      display: block;
    }
    .optionsTitle{
      display: flex;
      position: absolute;
      text-align: center;
      font-family: 'Montserrat', sans-serif;
      font-weight: 200;
      font-size: 40px;
      color: #fff;
      width: 300px;
      height: 75px;
      left: calc(50% - 100px);
      text-shadow: 0 0 15px #000;
      bottom: 50px;
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
      margin: 0 20px;
    }
    .optionWrapper{
      position: absolute;
      width: 100%;
      height: 50px;
      bottom: 20px;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /*Just for testing*/
    .nextPoint{
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 75px;
      background-color: rgba(0,0,0,0.1);
      display: flex;
      font-size: 20px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      color: #fff;
      border: 2px solid #fff;
      border-right: none;
      border-top: none;
      box-shadow: 0 0 15px rgba(0,0,0,1);
      align-items: center;
      justify-content: center;
      border-radius: 0 0 0 50px;
      flex-direction: column;
      cursor: pointer;
    }
</style>
