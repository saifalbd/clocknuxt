<template>

  <div class="layout" id="layout">

<FrameAudio v-if="audio.show"/>

      <div id="drawing"></div>

      </div> 

</template>

<script>

import SVG from 'svg.js'
//import {Howl, Howler} from 'howler';

import FrameAudio from '@/components/smallCom/iFrameAudio'


/**
 * @method 
 * validation
 * Line : *
* @method 
 * config
 * Line :*
 * @method
 * addZeor
 * @method
 * getSvg()
 * 
 */

  export default {
  components:{
  FrameAudio
  },
  data(){
    return {
clocksize:250,
nowSec:'',
nowMin:'',
nowHour:'',
borderGap :'',
svgid:'drawing',

audio:{
show:false,
iframeData:'',
mute:true,
url:'http://soundbible.com/mp3/Tick-DeepFrozenApps-397275646.mp3',
url2:'./assets/audio/Tick.mp3',
},
companyData:{
clockName:'',
clockNameFont:'Srisakdi',
webSiteName:'',
webSiteFont:'Srisakdi',
madeIn:'',
madeInFont:'Noto Serif',
},
digitalClockData:{
textDom:{},
hour:'',
min:'',
sec:'',
ampm:''
},
body:{
inbg:'#fbf9e4',
outbg:'#000080',
}
,
color:{
body:{
borderColor:'#00008B',
innerColor:'#FFF0F5',
innerBorderColor:'rgba(65, 105, 225,0.70)',
innarSmallColor:'#FFF0F5',
innarSmallBorderColor:'white'
},
roundLine:{
minColor:'rgba(121, 81, 150,0.50)',
hourColor:'#4B0082',
hourFillColor:'#F0E68C'
},
dialLine:{
hourColor:'#4169E1',
minColor:'#9400D3',
fillColor:'#00008B',
cyrcleFillColor:'#9400D3',
cyrcleBorderColor:'#4169E1'
},
digitalColor:{
borderColor:'rgba(65, 105, 225,0.70)',
fillColor:'#FFF0F5',
textColor:'#191970'
},
downBody:{
topCyrcleColor:'#00FF00',
topCyrclBorderColor:'red',
halfCyrcleColor:'#191970',
halfCyrcleBorderColor:'#9400D3',
longLineColor:'#9400D3',
runnerCyrcleColor:'#000080',
runnerCyrcleBorderColor:'#4B0082'
}

}

    }
  },
methods:{

validation(){
 return 25;
},
config(){ 

if(this.timeConfiger()){
this.borderGap = this.clocksize/40;
this.digitalClockData.ampm = (this.nowHour>=12)?'PM':'AM';
this.nowHour = this.nowHour>12 ? this.nowHour-12 :this.nowHour;
this.nowMin = this.nowMin+(this.nowSec/60);
this.nowHour = this.nowHour+(this.nowMin/60);


return true;

}else{
return false;
}
},
addZeor(t){
let x = Math.floor(t)
return (x<10)?'0'+x:x.toString();
},
getSvg(){
return SVG(this.svgid).size(this.clocksize,this.clocksize*2);
},
topMove(d){
return 0+d;
},

primaryBody(draw){
var {inbg,outbg} =this.body
const {
borderColor,
innerColor,
innerBorderColor,
innarSmallColor,
innarSmallBorderColor,
}=this.color.body;


var t = this.topMove;
var c= this.clocksize;
var g = this.borderGap;
var mh = c/2;
var dhm = (c+mh)-(g*10);
var dc = c/2;
const rectInnerTop=c/ 2.76;
draw.circle(c).fill(borderColor).move(0, 0)
draw.rect((c/4)+(g*2), mh).fill(borderColor).move((c/2)-(((c/4)+(g*2))/2),t(c-g))
draw.circle(dc).fill(borderColor).move((c/2)-(dc/2),dhm )
draw.circle(dc-(g*2)).fill(innerColor).move(((c/2)-(dc/2)+g), t(dhm+g))

draw.rect((c/4), rectInnerTop).fill(innerColor).move((c/2)-(c/8),t(c-(g*2)))


return draw;
},
bottomBody(draw){
const {topCyrcleColor,
topCyrclBorderColor,
halfCyrcleColor,
halfCyrcleBorderColor,
longLineColor,
runnerCyrcleColor,
runnerCyrcleBorderColor} = this.color.downBody;
const {innerColor,innerBorderColor} = this.color.body;

this.primaryBody(draw)
let c = this.clocksize;
var dhm = (c*1.5)-(this.borderGap*10);


var {inbg,outbg} =this.body
//ddial move part 
let halfCyrcleSize = c/3.7;
draw.circle(halfCyrcleSize).fill(halfCyrcleColor).move((c/2)-(halfCyrcleSize/2), c-(halfCyrcleSize/2)) // halfCyrcle
.stroke({ color: halfCyrcleBorderColor, width: this.borderGap/4, linecap: 'round', linejoin: 'round' })
draw.circle(c-(this.borderGap*2)).fill(innerColor).move(this.borderGap, this.borderGap)
.stroke({ color: innerBorderColor, width: this.borderGap/3, linecap: 'round', linejoin: 'round' })


var hiddenCircleSize = c/5;
var hiddenCircleleft = (c/2)-(hiddenCircleSize/2);
var prentSize =  (this.clocksize/2)-(this.borderGap*2);  //collect from primarybody

var hiddenCircle =  draw.circle(hiddenCircleSize).fill(runnerCyrcleColor).move(hiddenCircleleft,c*1.40) // bottom aminate
.stroke({ color:runnerCyrcleBorderColor, width: this.borderGap/3, linecap: 'round', linejoin: 'round' })
var runDial = {id:hiddenCircle,hiddenCircleleft,top:c*1.40,prentSize:prentSize,size:hiddenCircleSize}


var diallongLine =  draw.line().plot([
     [c/2, c],  //right ,top
     [c/2, dhm+(c/3.60)] //left / top
     ]).stroke( 
       { color:longLineColor, width: this.borderGap, linecap: 'round' }
       ); // bottom aminate
var dialLine = { id:diallongLine,left:c/2,top:c }
this.bottomAmintate({runDial,dialLine})

draw.circle((c/8)).fill(topCyrcleColor).move((c/2)-(c/16), c-(c/70)).stroke({ color:topCyrclBorderColor, width: this.borderGap/5, linecap: 'round', linejoin: 'round' });

return draw;
},
setDialLine(draw){

this.bottomBody(draw);

const {
minColor,
hourColor,
hourFillColor
} = this.color.roundLine;
const {innarSmallColor} =this.color.body; 
const c = this.clocksize;
var {inbg} = this.body
var stoke;

  var counts = 0
  for (let index = 0; index < 60; index++) {
  
  if (index % 5 == 0){
stoke = { color: hourColor, width: this.borderGap/2.2, linecap: 'round' };
   
  }else{
stoke = { color: minColor, width: this.borderGap/10, linecap: 'round' };
 
  }
   draw.line().plot([
     [c/2, c/2],  //right ,top
     [c/2, this.borderGap*2] //left / top
     ]).stroke(stoke).rotate(counts,c/2,c/2);
    counts+=6     
  }

draw.circle(c-(this.borderGap*8)).fill(innarSmallColor).move(this.borderGap*4, this.borderGap*4)

return draw;
},
secMinHourLine(draw){
this.setDialLine(draw);
const {
hourColor,
minColor,
fillColor,
cyrcleFillColor,
cyrcleBorderColor
}=this.color.dialLine;

let c = this.clocksize;
let chalf = c/2;
let bgap = this.borderGap;
let centerCyrcle = bgap*3;


/*digital clock function start*/
this.companySign(draw);
this.digitalClock(draw);

/*digital clock function end*/

let hour =  draw.polygon([
     [chalf-(chalf/25), chalf],  //right ,top
      [chalf, bgap*6],  //right ,top
     [chalf+(chalf/25), chalf] //left / top
     ]).fill(fillColor).stroke(
       { color: hourColor, width: this.borderGap/4, linecap: 'round'}
       ).rotate(this.nowHour*30,chalf,chalf);

let min =  draw.polygon([
     [chalf-(chalf/35), chalf],  //right ,top
      [chalf, bgap*4],  //right ,top
     [chalf+(chalf/35), chalf] //left / top
     ]).fill(fillColor).stroke(
       { color:minColor, width: this.borderGap/5, linecap: 'round'}
     ).rotate(this.nowMin*6,chalf,chalf);


let sec =  draw.polygon([
     [chalf-(chalf/75), chalf],  //right ,top
      [chalf, bgap*3],  //right ,top
     [chalf+(chalf/75), chalf] //left / top
       ]).fill(fillColor).stroke(
         { color:fillColor, width: this.borderGap/5, linecap: 'round'}
       ).rotate(this.nowSec*6,chalf,chalf);


draw.circle(centerCyrcle).fill(cyrcleFillColor).move(chalf-(centerCyrcle/2),chalf-(centerCyrcle/2))
.stroke({ color:cyrcleBorderColor, width: this.borderGap/5, linecap: 'round', linejoin: 'round' })



return {
hour,min,sec
}

},
timeConverter(sec){

let conMin = sec/60;
let conHour = conMin/60;
return {

  conMin,
  conHour
}
},

secMinHourLineAnimate(data){

const {hour,min,sec}=data;
let center = this.clocksize/2
var setH = this.nowHour
var setM = this.nowMin
var setS = this.nowSec
var promise= this.SecoundSound();
var aCount=false;



setInterval(()=>{
let {conMin,conHour} = this.timeConverter(1);

setS+=1;
setM+=conMin;
setH+=conHour;
if(setS >=60){setS =0;}
if(setM >=60){setM =0;}
this.digitalClockData.hour = setH;
this.digitalClockData.min = setM;
this.digitalClockData.sec = setS;
if(setH>=13){
  this.digitalClockData.ampm = this.digitalClockData.ampm.toLowerCase() == 'am' ? 'pm' :'am';
  setH =0;}

this.digitalClockAnimation();


sec.rotate(setS*6,center,center)
min.rotate(setM*6,center,center)
hour.rotate(setH*30,center,center)

},1000)

},
companySign(draw){
const c =this.clocksize;
const top = c/4.5;
const {
  clockName,
  clockNameFont,
webSiteName,
webSiteFont,
madeIn,
madeInFont
}=this.companyData;

draw.text(clockName).move(c/2,top)
.font({
  family:   clockNameFont
, size:     c/17.64
, anchor:   'middle'
, leading:  '1em'
});



draw.text(webSiteName).move(c/2,(top+c/14))
.font({
  family:   webSiteFont
, size:     c/20
, anchor:   'middle'
, leading:  '1em'
})

draw.text(madeIn).move(c/2,(top+c/6.4))
.font({
  family:   madeInFont
, size:     c/23
, anchor:   'middle'
, leading:  '1em'
}).fill('	#000080	')

},
digitalClock(draw){
const {
borderColor,
fillColor,
textColor
}=this.color.digitalColor;
var c = this.clocksize;
var center = c/2;
var rh =c /10;
var rw =c/8;
var top =(c- c/4)-rh;

var mleft =center-rw;
var sleft =center;
var hleft = sleft-rw-rw;
var pleft = sleft+rw;
const stock = { width: c/200,color:borderColor,linecap: 'round'}
draw.rect(rw, rh).fill(fillColor).move(hleft,top).stroke(stock);
draw.rect(rw, rh).fill(fillColor).move(mleft,top).stroke(stock);
draw.rect(rw, rh).fill(fillColor).move(sleft,top).stroke(stock);
draw.rect(rw, rh).fill(fillColor).move(pleft,top).stroke(stock);

var fontsize =c/16;
var fontLeft = fontsize/1.25;

var textHL =hleft+(rw/2)-fontLeft;
var textTop= (top+(rh/2))-(fontsize/1.7);

var textH = draw.text( this.addZeor(this.nowHour) ).fill(textColor).font({ size: fontsize, family: 'Orbitron' }).move(textHL,textTop);
var textML =mleft+(rw/2)-fontLeft;
var textM = draw.text(this.addZeor(this.nowMin)).fill(textColor).font({ size: fontsize, family: 'Orbitron' }).move(textML,textTop);
var textSL =sleft+(rw/2)-fontLeft;
var textS = draw.text(this.addZeor(this.nowSec)).fill(textColor).font({ size: fontsize, family: 'Orbitron' }).move(textSL,textTop);
var textPL =pleft+(rw/2)-fontLeft;
var textP = draw.text(this.digitalClockData.ampm).fill(textColor).font({ size: fontsize, family: 'Orbitron', }).move(textPL-1,textTop);
this.digitalClockData.textDom ={
  textH,textM,textS,textP
}
return this.digitalClockData.textDom;

},
digitalClockAnimation(){
const {textDom,hour,min,sec,ampm} = this.digitalClockData;
textDom.textH.text(this.addZeor(hour))
textDom.textM.text(this.addZeor(min))
textDom.textS.text(this.addZeor(sec));

textDom.textP.text(ampm.toUpperCase());
},

bottomAmintate(data){
const {runDial,dialLine} =data;
const c= this.clocksize;
const r =runDial;
const left = c/2-(r.prentSize/2)
const right = c/2+(r.prentSize/2)-r.size;

var size = Math.round(right-left);

var sizeHalf = size/2;
var execultetime = 1000/sizeHalf;
var x = 0;
var dx =14;
var rule = true;
var top = 0;
setInterval(()=>{
if(rule){
x++;

if(x < (sizeHalf/2)){
top++;
}else{
top--;
}

if(x>sizeHalf){
  top=0;
  rule=false}
}

if(!rule){
x--;
if(x < (sizeHalf/2)){
top--;
}else{
top++;
}
if(x<=0){ x=1; 
top=0;
rule =true}
}



dialLine.id.rotate(dx-(x/(c/218.75)),dialLine.left,dialLine.top)
runDial.id.move(left+(x*2),r.top+(top/5))
},execultetime)

//fontShow.id.rotate(x2,fontShow.left+10,fontShow.top+10) //white


},
timeConfiger(){



var hour,min,sec;
const d = new this.$helper.DateTime.Today().nowDate();
if(Number.isInteger(this.nowHour)){
hour = this.nowHour;
}else{
hour = d.getHours();
}
if(Number.isInteger(this.nowMin)){
min = this.nowMin;
}else{
min =d.getMinutes();
}
if(Number.isInteger(this.nowSec)){
sec = this.nowSec;
}else{
sec = d.getSeconds();
}
this.nowHour =hour;
this.nowMin =min;
this.nowSec = sec;

return {
userTime:{hour,min,sec},
CurrentTime:{hour:d.getHours(),min:d.getMinutes(),sec:d.getSeconds()}
}


},

SecoundSound(){
if(this.audio.show){
    
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const audio = new Audio(this.audio.url);
const interVal = (source)=>{
setInterval(()=>{
source.play(6)
},1000)
}

const CromeTunes = ()=>{
setInterval(()=>{
if(this.audio.show){
this.audio.show = false
}else if(!this.audio.show){
this.audio.show = true
}
},500)
}

if(!isChrome){
interVal(audio)
}else{
if(sessionStorage.getItem("audioCrome")){
interVal(audio);
sessionStorage.removeItem("audioCrome");
}else{
sessionStorage.setItem("audioCrome",'true');
location.reload()
CromeTunes()
}

}
}


},
//end SecoundSound()
  svgClock(){
  
var draw = this.getSvg();

this.secMinHourLineAnimate(this.secMinHourLine(draw))

},


},

mounted(){

//this.dialMove()
if(this.config()){
this.svgClock()
}



}
    }
</script>

<style lang="scss">
.layout{
    padding-top: 30px;
   
    display:flex;
    justify-content: center;
    align-items: center; 
}
#drawing{

}
</style>

