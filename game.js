const SERIES=[
{name:'Karting',rounds:8,laps:18,promotePos:7,promoteRep:28,sl:0,teams:[['Combes Academy',46,70],['Velocity Juniors',58,78],['Apex Karting',70,85]],tracks:['Melbourne Kart Circuit','Sydney Kart Raceway','Gold Coast Karting','Adelaide Kart Park','Newcastle Kart Circuit','Phillip Island Kart Track','Perth Kart Arena','National Kart Final']},
{name:'Formula 4',rounds:10,laps:24,promotePos:7,promoteRep:46,sl:12,teams:[['Southern Cross F4',52,72],['Velocity Motorsport',66,80],['Apex Junior Racing',80,87]],tracks:['Phillip Island','Sandown','The Bend','Sydney Motorsport Park','Queensland Raceway','Bathurst Support','Adelaide','Hidden Valley','Taupo','Albert Park']},
{name:'Formula 3',rounds:10,laps:30,promotePos:6,promoteRep:64,sl:18,teams:[['Nova F3',58,74],['Apex GP',74,83],['Titan Motorsport',88,90]],tracks:['Bahrain','Melbourne','Imola','Monaco','Barcelona','Spielberg','Silverstone','Spa','Monza','Yas Marina']},
{name:'Formula 2',rounds:12,laps:34,promotePos:5,promoteRep:80,sl:30,teams:[['Nova F2',64,76],['Velocity GP',80,85],['Titan Formula',94,92]],tracks:['Bahrain','Jeddah','Melbourne','Imola','Monaco','Barcelona','Spielberg','Silverstone','Spa','Monza','Baku','Yas Marina']},
{name:'Formula 1',rounds:16,laps:42,promotePos:1,promoteRep:999,sl:40,teams:[['Phoenix F1',72,79],['Velocity Racing',86,88],['Titan Grand Prix',98,95]],tracks:['Melbourne','Suzuka','Monaco','Barcelona','Spielberg','Silverstone','Spa','Monza','Singapore','Austin','Mexico City','Interlagos','Las Vegas','Qatar','Bahrain','Abu Dhabi']}
];
const FIRST=['Luca','Theo','Mika','Oscar','Hugo','Noah','Felix','Marco','Liam','Jack','Nico','Emil','Leo','Carlos','Pierre','Mateo','Yuki','Daniel','Rafael','Arthur','Oliver','Gabriel','Seb','Maxim','Alexei','James','Callum','Ethan'];
const LAST=['Moretti','Bennett','Keller','Rossi','Dubois','Tanaka','Santos','Muller','Ricci','Lawson','Hart','Vega','Martin','Nakamura','Costa','Bianchi','Novak','Turner','Fischer','Silva','Evans','Reid','Petrov','King','Duran','Mercer','Cole'];
const POINTS=[25,18,15,12,10,8,6,4,2,1];
const TYRES={Soft:{pace:1.9,wear:6.8,life:14,dry:true},Medium:{pace:.8,wear:4.5,life:22,dry:true},Hard:{pace:-.2,wear:3.1,life:32,dry:true},Intermediate:{pace:-.8,wear:5.0,life:20,wet:true},Wet:{pace:-2.0,wear:4.3,life:24,wet:true}};
const TRAIN={
 pace:{name:'Pace',cost:8},
 racecraft:{name:'Racecraft',cost:7},
 consistency:{name:'Consistency',cost:6},
 fitness:{name:'Fitness',cost:5},
 wet:{name:'Wet-weather skill',cost:6},
 feedback:{name:'Technical feedback',cost:5}
};
const WEATHER_PROFILES=[
 {name:'Dry',start:0,peak:0,forecast:'Dry throughout',rainStart:null,rainEnd:null},
 {name:'Late rain',start:0,peak:62,forecast:'Rain expected late',rainStart:.58,rainEnd:.92},
 {name:'Early shower',start:12,peak:50,forecast:'Early shower, then drying',rainStart:0,rainEnd:.32},
 {name:'Mixed',start:8,peak:70,forecast:'Changeable conditions',rainStart:.25,rainEnd:.68},
 {name:'Wet',start:68,peak:86,forecast:'Persistent rain',rainStart:0,rainEnd:1}
];
const $=id=>document.getElementById(id),clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),rnd=(a,b)=>Math.random()*(b-a)+a,ri=(a,b)=>Math.floor(rnd(a,b+1));
const fmt=n=>'$'+Math.round(n)+'k';
function fresh(name='Alex Combes',nat='Australia',type='balanced'){
 const stats={pace:52,racecraft:51,consistency:52,fitness:50,wet:48,feedback:50};if(type==='qualifier')stats.pace+=7;if(type==='racer')stats.racecraft+=7;if(type==='rain')stats.wet+=10;if(type==='steady')stats.consistency+=8;
 return {version:5.4,name,nat,type,series:0,season:1,round:0,points:0,rep:15,cash:30,morale:72,teamTier:0,stats,dev:{aero:0,engine:0,reliability:0,pit:0},practice:3,phase:'practice',qualStage:0,grid:null,field:[],standings:{},results:[],history:[],offers:[],academy:null,academyOffers:[],rival:null,teammate:null,sponsor:null,superLicence:0,market:[],qualHistory:[],lastQual:null,lastAnalysis:null,lastClassification:null,setup:'Balanced',livery:'Crimson',seasonObjectives:null,objectiveProgress:{},teammateBonusPaid:0,career:{starts:0,wins:0,podiums:0,poles:0,points:0,titles:0,dnfs:0,best:99,f1wins:0,fastestLaps:0,teammateWins:0,teammateLosses:0},race:null,weather:'Dry',forecast:'Dry throughout',weatherPlan:null,sprint:false};
}
let S=load()||fresh();
function cur(){return SERIES[S.series]}function team(){return cur().teams[S.teamTier]}function car(){return clamp(team()[1]+S.dev.aero+S.dev.engine,1,99)}function rel(){return clamp(team()[2]+S.dev.reliability,45,99)}
function save(show=false){localStorage.setItem('roadToF1V54',JSON.stringify(S));if(show)notice('Career saved.')} 
function load(){try{let x=JSON.parse(localStorage.getItem('roadToF1V54'));if(x&&x.version===5.3)return x;let old=JSON.parse(localStorage.getItem('roadToF1V53'))||JSON.parse(localStorage.getItem('roadToF1V52'))||JSON.parse(localStorage.getItem('roadToF1V51'))||JSON.parse(localStorage.getItem('roadToF1V50'))||JSON.parse(localStorage.getItem('roadToF1V46'))||JSON.parse(localStorage.getItem('roadToF1V45'))||JSON.parse(localStorage.getItem('roadToF1V44'))||JSON.parse(localStorage.getItem('roadToF1V4'))||JSON.parse(localStorage.getItem('roadToF1V33'));if(old){let n={...fresh(old.name,old.nat,old.type),...old,version:5.4};n.superLicence=old.superLicence||Math.min(39,old.series*8);n.market=old.market||[];n.qualHistory=old.qualHistory||[];n.lastQual=old.lastQual||null;n.lastAnalysis=old.lastAnalysis||null;n.lastClassification=old.lastClassification||null;n.setup=old.setup||'Balanced';n.livery=old.livery||'Crimson';n.seasonObjectives=old.seasonObjectives||null;n.objectiveProgress=old.objectiveProgress||{};n.teammateBonusPaid=old.teammateBonusPaid||0;n.academyOffers=old.academyOffers||[];n.career={...fresh().career,...old.career};n.race=null;n.weatherPlan=null;n.phase=old.grid?'race':(old.phase==='finished'?'practice':old.phase);return n}return null}catch{return null}}
function notice(t){$('notice').textContent=t}function hist(t){S.history.unshift({t,season:S.season,series:cur().name});S.history=S.history.slice(0,180)}
function weather(){let r=Math.random(),idx=r<.50?0:r<.65?1:r<.76?2:r<.91?3:4,p={...WEATHER_PROFILES[idx]};p.variation=rnd(-.08,.08);S.weatherPlan=p;S.forecast=p.forecast;let w=p.start;S.weather=w>=58?'Wet':w>=18?'Mixed':'Dry'}
function weatherAtProgress(progress,plan){plan=plan||S.weatherPlan||WEATHER_PROFILES[0];let wet=plan.start||0;if(plan.rainStart!==null){let rs=clamp((plan.rainStart||0)+(plan.variation||0),0,.9),re=clamp((plan.rainEnd??1)+(plan.variation||0),rs+.08,1);if(progress<rs)wet=Math.max(0,plan.start*(1-progress/Math.max(.01,rs)));else if(progress<=re){let x=(progress-rs)/(re-rs);wet=clamp((plan.start||0)+(plan.peak-(plan.start||0))*Math.sin(Math.PI*Math.min(1,x)*.82),0,100)}else{let dry=(progress-re)/Math.max(.01,1-re);wet=clamp(plan.peak*(1-dry*1.35),0,100)}}return wet}

function weatherState(w){
 if(w<4)return{label:'Dry',icon:'☀️'};
 if(w<14)return{label:'Damp',icon:'🌥️'};
 if(w<30)return{label:'Light Rain',icon:'🌦️'};
 if(w<52)return{label:'Moderate Rain',icon:'🌧️'};
 if(w<76)return{label:'Heavy Rain',icon:'🌧️'};
 return{label:'Extreme Wet',icon:'⛈️'};
}
function realisticTyrePenalty(tyre,w){
 w=clamp(w,0,100);
 if(TYRES[tyre]?.dry){
   if(w<5)return 0;if(w<14)return .35+(w-5)*.09;if(w<30)return 1.5+(w-14)*.20;
   if(w<52)return 4.8+(w-30)*.20;if(w<76)return 9.2+(w-52)*.18;return 13.5+(w-76)*.12;
 }
 if(tyre==='Intermediate'){
   if(w<5)return 2.2;if(w<12)return .9;if(w<42)return 0;if(w<62)return (w-42)*.055;return 1.1+(w-62)*.11;
 }
 if(tyre==='Wet'){
   if(w<12)return 4.2;if(w<28)return 2.4-(w-12)*.09;if(w<55)return .65;if(w<86)return 0;return .3;
 }
 return 0;
}
function wetMistakeRisk(tyre,w){
 if(TYRES[tyre]?.dry&&w>14)return Math.min(.13,(w-14)*.0018);
 if(tyre==='Intermediate'&&w>68)return Math.min(.045,(w-68)*.0014);
 if(tyre==='Wet'&&w<12)return .008;
 return 0;
}

function weatherLabelFromWetness(w){let x=weatherState(w);return x.icon+' '+x.label}

function bestTyreForWetness(w){return w>=68?'Wet':w>=18?'Intermediate':null}
function tyreWeatherPenalty(tyre,w){return -realisticTyrePenalty(tyre,w)}
function makeField(){
 S.field=[];let used=new Set([S.name]),base=49+S.series*8;
 for(let i=0;i<19;i++){
  let n;do n=FIRST[ri(0,FIRST.length-1)]+' '+LAST[ri(0,LAST.length-1)];while(used.has(n));used.add(n);
  let teamTier=ri(0,2),teamPerf=cur().teams[teamTier][1];
  S.field.push({id:'d'+i,name:n,skill:clamp(base+rnd(-14,14),30,98),wet:clamp(base+rnd(-16,16),25,99),cons:clamp(base+rnd(-12,13),30,98),car:clamp(teamPerf+rnd(-2.5,2.5),35,99),points:0,wins:0,teamTier})
 }
 S.spreadV42=true;
 S.rival=[...S.field].sort((a,b)=>b.skill-a.skill)[Math.min(3,S.series)]?.id||'d0';
 S.teammate=[...S.field].sort((a,b)=>Math.abs(b.skill-overall())-Math.abs(a.skill-overall()))[0]?.id||'d0'
}
function ensure(){
 if(!S.field||S.field.length!==19)makeField();
 if(!S.spreadV42&&S.field?.length===19){
  let base=49+S.series*8;
  S.field.forEach(d=>{d.teamTier=clamp(d.teamTier??ri(0,2),0,2);let teamPerf=cur().teams[d.teamTier][1];d.skill=clamp(base+(d.skill-base)*1.45+rnd(-1.5,1.5),30,98);d.wet=clamp(base+(d.wet-base)*1.25,25,99);d.cons=clamp(base+(d.cons-base)*1.3,30,98);d.car=clamp(teamPerf+rnd(-2,2),35,99)});
  S.spreadV42=true
 }
 if(!S.weather||!S.weatherPlan)weather();
 if(S.sprint===undefined)S.sprint=false;
 if(!S.career.fastestLaps)S.career.fastestLaps=0;
 if(!S.market)S.market=[];
 if(!S.academyOffers)S.academyOffers=[]
}
const TRACK_CHARS={
 'Monaco':{downforce:100,power:15,traction:95,desc:'Maximum downforce • low-speed traction'},
 'Singapore':{downforce:92,power:30,traction:92,desc:'Very high downforce • traction and braking'},
 'Hungaroring':{downforce:88,power:28,traction:82,desc:'High downforce • technical'},
 'Monza':{downforce:18,power:100,traction:42,desc:'Minimum downforce • maximum straight-line speed'},
 'Las Vegas':{downforce:28,power:94,traction:55,desc:'Low downforce • long straights • heavy braking'},
 'Baku':{downforce:42,power:92,traction:62,desc:'Long straights but technical castle sector'},
 'Jeddah':{downforce:58,power:85,traction:55,desc:'Fast street circuit • efficient low-drag aero'},
 'Spa':{downforce:55,power:85,traction:48,desc:'High-speed efficiency • long straights'},
 'Silverstone':{downforce:78,power:62,traction:55,desc:'High-speed downforce'},
 'Suzuka':{downforce:82,power:58,traction:58,desc:'High-speed aero balance'},
 'Spielberg':{downforce:40,power:85,traction:60,desc:'Power and traction'},
 'Bahrain':{downforce:55,power:72,traction:78,desc:'Traction, braking and rear tyre management'},
 'Barcelona':{downforce:78,power:55,traction:64,desc:'Aero efficiency and long-corner balance'},
 'Melbourne':{downforce:62,power:70,traction:55,desc:'Medium-high speed, balanced efficiency'},
 'Interlagos':{downforce:60,power:76,traction:72,desc:'Traction plus uphill straight-line speed'},
 'Mexico City':{downforce:88,power:70,traction:65,desc:'Thin air means high wing with low drag'},
 'Qatar':{downforce:76,power:62,traction:52,desc:'Fast flowing corners'},
 'Abu Dhabi':{downforce:58,power:74,traction:72,desc:'Balanced with traction and straights'},
 'Yas Marina':{downforce:58,power:74,traction:72,desc:'Balanced with traction and straights'},
 'Imola':{downforce:70,power:62,traction:68,desc:'Technical, kerbs and medium-high speed'},
 'Adelaide':{downforce:58,power:70,traction:75,desc:'Street traction and braking'},
 'Phillip Island':{downforce:78,power:58,traction:52,desc:'Fast flowing circuit'}
};
function trackCharacteristics(name=cur().tracks[S.round]){
 let direct=TRACK_CHARS[name];if(direct)return direct;
 let t=trackType(name);
 if(t==='Street')return{downforce:78,power:55,traction:82,desc:'Street circuit • traction and downforce'};
 if(t==='Power')return{downforce:35,power:88,traction:62,desc:'Power circuit • straight-line speed'};
 if(t==='High speed')return{downforce:74,power:68,traction:50,desc:'High-speed aero efficiency'};
 return{downforce:60,power:60,traction:60,desc:'Balanced circuit'}
}

function setupEffect(setup=S.setup||'Balanced',name=cur().tracks[S.round]){
 let c=trackCharacteristics(name);
 let target=(c.downforce-c.power)/100;
 let bias=setup==='High Downforce'?1:setup==='Low Downforce'?-1:0;
 let match=1-Math.min(1,Math.abs(target-bias)*.75);
 let base=(match-.5)*2.2;
 if(setup==='Balanced')base+=.15;
 return base;
}
function setupText(){
 let c=trackCharacteristics(),best=c.downforce-c.power>24?'High Downforce':c.power-c.downforce>24?'Low Downforce':'Balanced';
 return `${c.desc} • Recommended: ${best}`;
}

function trackType(name){if(/Monaco|Singapore|Baku|Jeddah|Las Vegas|Adelaide/.test(name))return'Street';if(/Monza|Spielberg|Bahrain/.test(name))return'Power';if(/Suzuka|Silverstone|Spa|Phillip/.test(name))return'High speed';return'Balanced'}
function overall(){let x=S.stats;return Math.round(x.pace*.25+x.racecraft*.22+x.consistency*.18+x.fitness*.12+x.wet*.11+x.feedback*.12)}

const LIVERIES={Crimson:{a:'#d7263d',b:'#171717'},Azure:{a:'#1976d2',b:'#e9eef5'},Emerald:{a:'#168a5b',b:'#101820'},Gold:{a:'#d4a017',b:'#202020'},Violet:{a:'#7541c8',b:'#111318'},Papaya:{a:'#ef7d00',b:'#1c1c1c'},Silver:{a:'#b9c0c8',b:'#24272c'},Arctic:{a:'#f1f5f9',b:'#1e3a5f'}};
function renderLivery(){let sel=$('liverySelect');if(!sel)return;sel.value=S.livery||'Crimson';let l=LIVERIES[S.livery]||LIVERIES.Crimson,car=$('liveryCar');if(car){car.style.setProperty('--car-a',l.a);car.style.setProperty('--car-b',l.b)}}
function setLivery(v){if(!LIVERIES[v])return;S.livery=v;renderLivery();save()}

function render(){if(S.phase==='practice'&&!Number.isFinite(S.practice))S.practice=3;if(!S.seasonObjectives)generateSeasonObjectives();ensure();let c=cur(),track=c.tracks[S.round]||'Season complete';$('hudDriver').textContent=S.name;$('hudSeries').textContent=c.name;$('hudSeason').textContent=S.season;$('hudRound').textContent=(S.round+1)+'/'+c.rounds;$('hudPoints').textContent=S.points;$('hudRep').textContent=Math.round(S.rep);$('hudCash').textContent=fmt(S.cash);$('hudSL').textContent=Math.round(S.superLicence)+'/40';$('trackTitle').textContent=track;$('trackMeta').textContent=trackType(track)+' circuit • '+c.laps+' laps'+(S.sprint?' • Sprint weekend':'');$('weatherLabel').textContent=S.weather==='Dry'?'☀️ Dry':S.weather==='Wet'?'🌧️ Wet':'🌦️ Mixed';$('weatherForecast').textContent=S.forecast;$('practiceLeft').textContent=S.practice+' sessions left';if($('carSetup'))$('carSetup').value=S.setup||'Balanced';if($('setupAdvice'))$('setupAdvice').textContent=setupText();renderObjectives();renderLivery();renderFuelLoad();renderPhases();renderTraining();renderDriver();renderStandings();renderTeam();renderHistory();renderRace();renderQual();}
function renderPhases(){let phases=['Practice',S.series===4?'Q1/Q2/Q3':'Qualifying',S.sprint?'Sprint':'Race','Race'];if(!S.sprint)phases=['Practice',S.series===4?'Q1/Q2/Q3':'Qualifying','Race'];let current=S.phase;let done={practice:['qualifying','sprint','race','finished'].includes(current),qualifying:['sprint','race','finished'].includes(current),sprint:['race','finished'].includes(current),race:current==='finished'};$('phaseStrip').innerHTML=phases.map(p=>{let key=p.startsWith('Q')||p==='Qualifying'?'qualifying':p.toLowerCase();return`<span class="phase ${done[key]?'done':''} ${current===key?'active':''}">${done[key]?'✓ ':''}${p}</span>`}).join('')}
function renderTraining(){let items=[['pace','🏎️ Pace','Raw speed'],['racecraft','⚔️ Racecraft','Overtaking/defence'],['consistency','🎯 Consistency','Fewer mistakes'],['fitness','💪 Fitness','Race endurance'],['wet','🌧️ Wet skill','Rain pace'],['feedback','🧠 Feedback','Setup/development']];$('trainingGrid').innerHTML=items.map(x=>`<button type="button" data-train="${x[0]}" ${S.phase!=='practice'||S.practice<=0?'disabled':''}>${x[1]}<small>${x[2]}</small></button>`).join('')}
function train(k){
 if(S.phase!=='practice')return notice('Driver development is available during practice.');
 if(S.practice<=0)return notice('Practice is complete. Proceed to qualifying.');
 let item=TRAIN[k];if(!item)return;
 let paid=S.cash>=item.cost,gain=paid?rnd(1,2.6):rnd(.25,.75);
 if(paid)S.cash-=item.cost;
 S.stats[k]=clamp(S.stats[k]+gain,35,99);
 S.practice--;
 hist(`${paid?'Training':'Basic practice'}: ${item.name} +${gain.toFixed(1)}`);
 notice(`${item.name} improved by ${gain.toFixed(1)}.${paid?'':' Free basic session used.'}`);
 if(S.practice<=0)S.phase='qualifying';
 render();save()
}
function baseQualLap(){return [52,94,91,90,88][S.series]||90}
function qualAbility(d,isPlayer){let wet=S.weather==='Wet'?.22:S.weather==='Mixed'?.1:0;if(isPlayer)return S.stats.pace*.43+S.stats.consistency*.12+car()*.34+S.stats.wet*wet+S.morale*.02+setupEffect()*2.2;return d.skill*.52+d.cons*.12+d.car*.31+d.wet*wet}
function createQualLap(d,isPlayer){let ability=qualAbility(d,isPlayer),base=baseQualLap()+(S.weather==='Wet'?8:S.weather==='Mixed'?3:0),lap=base+(82-ability)*.095+rnd(-.42,.42);let s1=lap*(.31+rnd(-.004,.004)),s2=lap*(.36+rnd(-.004,.004)),s3=lap-s1-s2;return{player:isPlayer,id:isPlayer?'player':d.id,name:isPlayer?S.name:d.name,lap,s1,s2,s3,ability}}
function qualSession(){if(S.phase!=='qualifying')return;let all=[createQualLap(null,true),...S.field.map(d=>createQualLap(d,false))].sort((a,b)=>a.lap-b.lap);let best=all[0].lap,prev=null;all.forEach((d,i)=>{d.pos=i+1;d.gap=d.lap-best;d.interval=prev?d.lap-prev.lap:0;prev=d});let bestS1=Math.min(...all.map(x=>x.s1)),bestS2=Math.min(...all.map(x=>x.s2)),bestS3=Math.min(...all.map(x=>x.s3));all.forEach(d=>{d.bestS1=Math.abs(d.s1-bestS1)<.0005;d.bestS2=Math.abs(d.s2-bestS2)<.0005;d.bestS3=Math.abs(d.s3-bestS3)<.0005});S.lastQual={session:S.series===4?'Q'+(S.qualStage+1):'Qualifying',all};S.qualHistory.push({track:cur().tracks[S.round],session:S.lastQual.session,all:all.map(x=>({...x}))});if(S.series===4){S.qualStage++;let p=all.findIndex(x=>x.player)+1;if((S.qualStage===1&&p>15)||(S.qualStage===2&&p>10)||S.qualStage===3){S.grid=p;finishQual(all)}else{notice(`Advanced to Q${S.qualStage+1}.`);renderQualTable(all.slice(0,S.qualStage===1?15:10));renderQual();save();return}}else{S.grid=all.findIndex(x=>x.player)+1;finishQual(all)}}
function finishQual(all){if(S.grid===1){S.career.poles++;hist('⏱️ Pole position at '+cur().tracks[S.round])}S.phase=S.sprint?'sprint':'race';renderQualTable(all);notice(`Qualified P${S.grid}. Choose your race strategy.`);render();save()}
function sectorClass(v,best){return best?'sector best':'sector'}
function renderQualTable(all){if(!all)return;$('qualResults').innerHTML='<table><tr><th>Pos</th><th>Driver</th><th>Best lap</th><th>Gap</th><th>Interval</th><th>S1</th><th>S2</th><th>S3</th></tr>'+all.map((d,i)=>`<tr class="${d.player?'you':''}"><td>P${i+1}</td><td>${d.name}</td><td>${lapTimeFmt(d.lap)}</td><td>${i===0?'POLE':'+'+d.gap.toFixed(3)+'s'}</td><td>${i===0?'—':'+'+d.interval.toFixed(3)+'s'}</td><td class="${sectorClass(d.s1,d.bestS1)}">${d.s1.toFixed(3)}</td><td class="${sectorClass(d.s2,d.bestS2)}">${d.s2.toFixed(3)}</td><td class="${sectorClass(d.s3,d.bestS3)}">${d.s3.toFixed(3)}</td></tr>`).join('')+'</table>'}
function renderQual(){$('qualTitle').textContent=S.series===4?`F1 Qualifying ${S.phase==='qualifying'?'- Q'+(S.qualStage+1):''}`:'Qualifying';$('qualBadge').textContent=S.grid?'P'+S.grid:(S.phase==='qualifying'?'Ready':'Not run');$('gridBadge').textContent=S.grid?'Grid P'+S.grid:'No grid';$('qualBtn').disabled=!['practice','qualifying'].includes(S.phase);$('qualBtn').textContent=S.phase==='practice'?'Skip remaining practice → Qualifying':'Run qualifying session';$('raceBtn').disabled=!(S.phase==='race'||S.phase==='sprint')||!!S.race;$('raceBtn').textContent=S.phase==='sprint'?'Start sprint':'Start race';if(S.lastQual&&S.phase!=='qualifying')renderQualTable(S.lastQual.all);renderStrategyAdvice()}
function qualifyingAction(){
 if(S.phase==='practice'){
   S.practice=0;S.phase='qualifying';S.qualStage=0;
   notice('Practice skipped. Running qualifying.');
   qualSession();return;
 }
 if(S.phase==='qualifying'){qualSession();return}
 notice('Qualifying is not available in the current phase.')
}
function renderStrategyAdvice(){let tyre=$('startTyre').value||'Medium',life=TYRES[tyre]?.life||28,laps=cur().laps,wet=weatherAtProgress(0,S.weatherPlan),rain=S.weatherPlan?.rainStart;let window=Math.max(3,Math.min(laps-3,Math.round(life*.72))),forecast=rain===null?'No rain currently expected':`Rain window around lap ${Math.max(1,Math.round(rain*laps))}`;$('strategyAdvice').innerHTML=S.grid?`Predicted ${tyre} life: <strong>${life} laps</strong> • First dry stop window: <strong>L${Math.max(3,window-2)}–L${Math.min(laps-2,window+2)}</strong> • ${forecast} • Pit loss: <strong>${pitLossEstimate().toFixed(1)}s</strong>`:'Qualify to receive tyre-life and pit-window predictions.'}
function pitLossEstimate(){let type=trackType(cur().tracks[S.round]),base=type==='Street'?23.5:type==='High speed'?21:22;return Math.max(13.5,base+S.series*.7-S.dev.pit*.55)}

function selectedFuelLoad(){
 let el=$('fuelLoad');if(!el)return 100;
 return clamp(Number(el.value)||100,70,110);
}
function renderFuelLoad(){
 let el=$('fuelLoad'),out=$('fuelLoadValue'),note=$('fuelLoadNote');if(!el||!out)return;
 let load=selectedFuelLoad(),laps=(S.phase==='sprint'?Math.max(10,Math.round(cur().laps*.32)):cur().laps),nominal=100;
 out.textContent=load.toFixed(0)+'%';
 if(note){
   let delta=load-nominal,pace=Math.abs(delta)*.006;
   note.textContent=delta<0?`Light start: about ${Math.abs(delta).toFixed(0)}% under nominal fuel. Faster initially, but you will need fuel saving.`:
   delta>0?`Heavy start: ${delta.toFixed(0)}% extra fuel. Safer range, but roughly +${pace.toFixed(2)}s/lap initially from fuel mass.`:
   `Nominal race fuel. Enough to finish at roughly Balanced consumption.`;
 }
}

function startRace(){if(!(S.phase==='race'||S.phase==='sprint')||!S.grid)return;let laps=S.phase==='sprint'?Math.max(10,Math.round(cur().laps*.32)):cur().laps;let startWet=weatherAtProgress(0,S.weatherPlan),tyre=$('startTyre').value,bestWet=bestTyreForWetness(startWet);if(bestWet&&TYRES[tyre]?.dry)tyre=bestWet;S.setup=$('carSetup').value||S.setup||'Balanced';let racers=[makePlayerRacer(tyre),...S.field.map((d,i)=>makeAIRacer(d,i,laps,startWet))];let playerFuel=selectedFuelLoad();racers.find(x=>x.player).fuel=playerFuel;racers.sort((a,b)=>a.pos-b.pos);S.race={lap:0,laps,racers,sc:0,red:false,weather:weatherLabelFromWetness(startWet),wetness:startWet,lastWetness:startWet,weatherPlan:{...(S.weatherPlan||WEATHER_PROFILES[0])},feed:[],pending:null,sprint:S.phase==='sprint',baseLap:[55,96,93,92,90][S.series],pitHistory:[],fastest:null,sectorBest:{s1:null,s2:null,s3:null},strategyStart:{grid:S.grid,tyre,risk:$('risk').value,ers:$('ers').value,fuel:$('fuel').value,paceMode:$('paceMode').value,setup:S.setup,fuelLoad:playerFuel}};feed('🏁 '+(S.phase==='sprint'?'Sprint':'Race')+' started from P'+S.grid+' • '+S.setup+' setup.');$('raceBtn').disabled=true;renderRace();save()}
function makePlayerRacer(tyre){return{player:true,id:'player',name:S.name,pos:S.grid,startPos:S.grid,skill:S.stats.pace*.25+S.stats.racecraft*.3+S.stats.consistency*.16+car()*.29,wet:S.stats.wet,cons:S.stats.consistency,car:car(),tyre,wear:0,gap:0,damage:0,pits:0,dnf:false,totalTime:(S.grid-1)*.18,lastLap:null,sectors:null,team:team()[0],lastPit:-99,compoundHistory:[tyre],fuel:100,ers:100,lastMode:'Balanced'}}
function makeAIRacer(d,i,laps,startWet=0){let pos=i+1+(i>=S.grid?1:0),wetTyre=bestTyreForWetness(startWet),tyre;if(wetTyre)tyre=wetTyre;else if(laps<=18)tyre=Math.random()<.55?'Soft':'Medium';else if(laps<=32)tyre=Math.random()<.68?'Medium':'Soft';else tyre=Math.random()<.68?'Medium':'Hard';return{id:d.id,name:d.name,pos,startPos:pos,skill:d.skill*.48+d.cons*.15+d.car*.37,wet:d.wet,cons:d.cons,car:d.car,tyre,wear:0,gap:0,damage:0,pits:0,dnf:false,totalTime:(pos-1)*.18,lastLap:null,sectors:null,team:cur().teams[d.teamTier||0][0],lastPit:-99,compoundHistory:[tyre],fuel:100,ers:rnd(76,100),lastMode:'Balanced'}}
function advance(n=1){if(!S.race)return;for(let i=0;i<n&&S.race&&S.race.lap<S.race.laps;i++){if(S.race.pending)break;simLap()}renderRace();render();save()}

function getPlayerRacer(r=S.race){if(!r||!r.cars)return null;return r.cars.find(x=>x.player)||r.cars.find(x=>x.name===S.name)}
function ensureResources(r=S.race){
  if(!r)return;
  if(!Number.isFinite(r.fuel))r.fuel=100;
  if(!Number.isFinite(r.ers))r.ers=100;
  if(!Number.isFinite(r.fuelUsed))r.fuelUsed=0;
  if(!Number.isFinite(r.ersUsed))r.ersUsed=0;
  if(!Number.isFinite(r.ersHarvested))r.ersHarvested=0;
  if(!Array.isArray(r.resourceLog))r.resourceLog=[];
}
function driveModeProfile(mode){
  return {
    conserve:{pace:.45,wear:.76,fuel:.72,ers:-10,risk:.65,label:'Conserve'},
    balanced:{pace:0,wear:1,fuel:1,ers:1,label:'Balanced'},
    push:{pace:-.55,wear:1.26,fuel:1.22,ers:9,risk:1.18,label:'Push'},
    attack:{pace:-.95,wear:1.52,fuel:1.43,ers:16,risk:1.42,label:'Attack'}
  }[mode]||{pace:0,wear:1,fuel:1,ers:1,risk:1,label:'Balanced'}
}
function resourcePenalty(r){
  ensureResources(r);
  let p=0;
  if(r.fuel<12)p+=(12-r.fuel)*.075;
  if(r.ers<8)p+=(8-r.ers)*.055;
  return p;
}
function consumeResources(r,mode){
  ensureResources(r);
  let p=driveModeProfile(mode),fuelBurn=.95*p.fuel;
  // Small lap-to-lap variation and later-race mass reduction.
  fuelBurn*=rnd(.94,1.06);
  r.fuel=clamp(r.fuel-fuelBurn,0,100); r.fuelUsed+=fuelBurn;

  let ersDelta=p.ers;
  if(mode==='conserve'){
    let gain=rnd(7,12);
    r.ers=clamp(r.ers+gain,0,100); r.ersHarvested+=gain;
  }else{
    let spend=Math.max(0,ersDelta*rnd(.9,1.08));
    r.ers=clamp(r.ers-spend,0,100); r.ersUsed+=spend;
    // Natural harvest each lap, less when attacking.
    let harvest=mode==='balanced'?rnd(4,7):mode==='push'?rnd(2,4):rnd(1,2.5);
    r.ers=clamp(r.ers+harvest,0,100); r.ersHarvested+=harvest;
  }
  r.resourceLog.push({lap:r.lap||0,fuel:r.fuel,ers:r.ers,mode});
  if(r.resourceLog.length>12)r.resourceLog.shift();
}
function fuelStatus(r){ensureResources(r);if(r.fuel>55)return'Healthy';if(r.fuel>25)return'Manage';if(r.fuel>10)return'Low';return'Critical'}
function ersStatus(r){ensureResources(r);if(r.ers>60)return'Charged';if(r.ers>30)return'Usable';if(r.ers>12)return'Low';return'Depleted'}

function simLap(){
 let r=S.race;if(!r)return;r.lap++;if(r.sc>0)r.sc--;
 let progress=r.lap/r.laps;r.lastWetness=r.wetness;r.wetness=weatherAtProgress(progress,r.weatherPlan);r.weather=weatherLabelFromWetness(r.wetness);
 let deltaWet=r.wetness-r.lastWetness;if(Math.abs(deltaWet)>5){feed(deltaWet>0?'🌧️ Rain increasing • track wetness '+Math.round(r.wetness)+'%.':'🌤️ Track drying • wetness '+Math.round(r.wetness)+'%.')}
 let cross=bestTyreForWetness(r.wetness),prevCross=bestTyreForWetness(r.lastWetness);if(cross!==prevCross&&!r.pending){if(cross)radio('Tyre crossover',`${cross}s are now estimated faster. Track wetness ${Math.round(r.wetness)}%.`,[['Box for '+cross,'pit:'+cross],['Stay out','stay']]);else radio('Slick crossover','The track is drying. Slicks are now estimated faster.',[['Box for Mediums','pit:Medium'],['Stay out','stay']])}
 let riskVal={Low:-.35,Medium:0,High:.45}[$('risk').value]||0;
 let paceName=$('paceMode').value,ersMode=$('ers').value,fuelMode=$('fuel').value;
 let paceCfg={Conserve:{bonus:-.45,wear:.70,mistake:.68,fuel:.90,ersUse:-5},Balanced:{bonus:0,wear:1,mistake:1,fuel:1,ersUse:1},Push:{bonus:.48,wear:1.32,mistake:1.22,fuel:1.12,ersUse:7},Attack:{bonus:.78,wear:1.58,mistake:1.45,fuel:1.24,ersUse:12}}[paceName]||{bonus:0,wear:1,mistake:1,fuel:1,ersUse:1};
 let setupBonus=setupEffect(S.setup||'Balanced');
 r.racers.forEach(d=>{
   if(d.dnf)return;
   if(!Number.isFinite(d.totalTime))d.totalTime=(d.pos-1)*.18;
   if(!Number.isFinite(d.fuel))d.fuel=100;if(!Number.isFinite(d.ers))d.ers=100;
   let isP=d.player;
   let aiMode='Balanced';
   if(!isP){let rem=r.laps-r.lap,gap=d.interval||3;if(d.fuel<13||d.wear>78)aiMode='Conserve';else if(d.ers>58&&rem<8)aiMode='Push';else if(d.ers>72&&gap<1.4&&Math.random()<.35)aiMode='Push';else if(d.ers<25)aiMode='Conserve'}
   let cfg=isP?paceCfg:({Conserve:{bonus:-.35,wear:.78,mistake:.75,fuel:.91,ersUse:-5},Balanced:{bonus:0,wear:1,mistake:1,fuel:1,ersUse:1},Push:{bonus:.42,wear:1.25,mistake:1.18,fuel:1.10,ersUse:7}}[aiMode]);
   d.lastMode=isP?paceName:aiMode;

   let fuelBias=isP?(fuelMode==='Push'?1.09:fuelMode==='Conserve'?.92:1):(aiMode==='Push'?1.06:aiMode==='Conserve'?.94:1);
   let targetBurn=(100/r.laps)*cfg.fuel*fuelBias*(r.sc?.72:1);
   d.fuel=clamp(d.fuel-targetBurn,0,100);

   let ersDelta;
   if(isP){ersDelta=ersMode==='Save'?+7:ersMode==='Attack'?-10:-2;ersDelta-=Math.max(0,cfg.ersUse)}
   else ersDelta=aiMode==='Conserve'?+6:aiMode==='Push'?-8:-1;
   if(r.sc)ersDelta+=4;
   d.ers=clamp(d.ers+ersDelta,0,100);

   let availableERS=d.ers>12;
   let requestedAttack=isP&&(ersMode==='Attack'||paceName==='Attack');
   let resourceBonus=0;
   if(isP){
     if(ersMode==='Attack'&&availableERS)resourceBonus+=.42;
     if(ersMode==='Save')resourceBonus-=.22;
     if(fuelMode==='Push'&&d.fuel>8)resourceBonus+=.18;
     if(fuelMode==='Conserve')resourceBonus-=.16;
   }else if(aiMode==='Push'&&availableERS)resourceBonus+=.30;

   let fuelMassPenalty=0;
   if(isP){
     let nominalRemaining=Math.max(0,100*(1-r.lap/r.laps));
     let excess=d.fuel-nominalRemaining;
     fuelMassPenalty=Math.max(-.18,Math.min(.22,excess*.006));
   }
   let resourcePenalty=0;
   if(d.ers<8&&requestedAttack)resourcePenalty+=(8-d.ers)*.08+.35;
   if(d.fuel<10)resourcePenalty+=(10-d.fuel)*.11;
   if(d.fuel<=0)resourcePenalty+=2.8;

   let t=TYRES[d.tyre]||TYRES.Medium,dryFactor=(r.wetness<12?1:r.wetness<28?.82:r.wetness<55?.55:.35),wetFactor=(r.wetness>60?1:r.wetness>30?.8:.55),surfaceWear=TYRES[d.tyre]?.dry?dryFactor:wetFactor;
   d.wear+=t.wear*surfaceWear*(r.sc?.35:1)*(isP?cfg.wear:rnd(.92,1.10));
   let tyrePenalty=Math.max(0,d.wear-52)*.06+Math.max(0,d.wear-78)*.095,wetBonus=(d.wet-50)*(r.wetness/100)*.05,weatherPenalty=tyreWeatherPenalty(d.tyre,r.wetness);
   let perf=d.skill+t.pace-tyrePenalty+weatherPenalty+wetBonus+rnd(-1.25,1.25)-d.damage*.12;
   if(isP)perf+=riskVal+cfg.bonus+resourceBonus+setupBonus-resourcePenalty-fuelMassPenalty;
   else perf+=resourceBonus-resourcePenalty;
   let lapTime=r.baseLap+(82-perf)*.082+rnd(-.28,.28)+(r.wetness*.095);
   if(r.sc)lapTime=r.baseLap+17+rnd(-.15,.15);

   let wrongTyreRisk=wetMistakeRisk(d.tyre,r.wetness),errBase=.003+(65-d.cons)*.00045+(isP&&$('risk').value==='High'?.007:0)+wrongTyreRisk,err=clamp(errBase*(isP?cfg.mistake:1),.001,.08);
   if(Math.random()<err){if(Math.random()<.28){d.dnf=true;d.lastLap=null;feed('💥 '+d.name+' crashed and retired.');if(Math.random()<.45){r.sc=ri(2,4);feed('🚨 Safety Car deployed.')}}else{let lost=rnd(2.5,9);d.damage=clamp(d.damage+rnd(4,18),0,60);lapTime+=lost;feed('⚠️ '+d.name+' made a mistake and lost '+lost.toFixed(1)+'s.')}}
   let mech=(100-(isP?rel():Math.min(96,d.car+8)))*.00035;if(Math.random()<mech){d.dnf=true;d.lastLap=null;feed('🔧 '+d.name+' retired with a mechanical failure.')}
   if(!d.dnf){d.lastLap=Math.max(1,lapTime);d.totalTime+=d.lastLap;updateFastest(d)}
 });
 normalizeTiming(r);aiPitLogic();
 let alive=r.racers.filter(x=>!x.dnf).sort((a,b)=>a.totalTime-b.totalTime);if(r.sc&&alive.length){let lead=alive[0].totalTime;alive.forEach((d,i)=>d.totalTime=lead+i*rnd(.18,.42))}
 let dead=r.racers.filter(x=>x.dnf).sort((a,b)=>(a.pos||99)-(b.pos||99));r.racers=[...alive,...dead];normalizeTiming(r);
 let p=r.racers.find(x=>x.player);
 if(p&&p.wear>74&&!r.pending)radio('Tyres fading',`${p.tyre} wear is ${Math.round(p.wear)}%. The tyre cliff is approaching.`,[['Pit','pit:auto'],['Stay out','stay']]);
 if(p&&p.fuel<8&&!r.pending)radio('Fuel critical',`Fuel remaining ${p.fuel.toFixed(1)}%. You need to save fuel or risk severe pace loss.`,[['Switch to Conserve','fuel:Conserve'],['Keep mode','stay']]);
 if(p&&p.ers<10&&!r.pending)radio('ERS depleted',`Battery ${Math.round(p.ers)}%. Harvesting will be required before another sustained attack.`,[['Harvest ERS','ers:Save'],['Keep mode','stay']]);
 if(r.lap>=r.laps)finishRace()
}
function updateSectorBests(d){}
function updateFastest(d){let r=S.race;if(!d.lastLap||r.sc)return;if(!r.fastest||d.lastLap<r.fastest.time)r.fastest={id:d.id,name:d.name,time:d.lastLap,lap:r.lap}}
function desiredDryCompound(d,r){let rem=r.laps-r.lap;if(rem<=TYRES.Soft.life*.8&&d.wear<70)return'Soft';if(rem<=TYRES.Medium.life*.9)return'Medium';return'Hard'}
function chooseAITyre(d,r){let wet=bestTyreForWetness(r.wetness);if(wet)return wet;return desiredDryCompound(d,r)}
function aiPitLogic(){let r=S.race;normalizeTiming(r);r.racers.forEach(d=>{if(d.player||d.dnf)return;let target=chooseAITyre(d,r),wrong=(bestTyreForWetness(r.wetness)&&d.tyre!==target)||(!bestTyreForWetness(r.wetness)&&!TYRES[d.tyre]?.dry),remaining=r.laps-r.lap,cliff=d.wear>72,critical=d.wear>86,canStop=remaining>2&&r.lap-d.lastPit>2,scCheap=r.sc>0&&remaining>4,carAhead=r.racers.find(x=>!x.dnf&&x.pos===d.pos-1),gapAhead=carAhead?d.totalTime-carAhead.totalTime:99,undercut=canStop&&remaining>7&&d.wear>55&&gapAhead>0.4&&gapAhead<2.4&&Math.random()<.16,forecastRainSoon=r.weatherPlan?.rainStart!==null&&r.weatherPlan.rainStart>r.lap/r.laps&&r.weatherPlan.rainStart-r.lap/r.laps<.09;if(!canStop)return;if(wrong||(critical)||(cliff&&remaining>4&&!forecastRainSoon)||(scCheap&&d.wear>38)||undercut){performPit(d,false,target)}})}
function radio(title,text,choices){if(S.race.pending)return;S.race.pending={title,text,choices}}
function performPit(d,isPlayer=true,requested='auto'){let r=S.race;d.pits++;let old=d.tyre,newTyre=requested&&requested!=='auto'?requested:(bestTyreForWetness(r.wetness)||desiredDryCompound(d,r));if(!TYRES[newTyre])newTyre='Medium';d.wear=0;d.tyre=newTyre;d.lastPit=r.lap;d.compoundHistory=d.compoundHistory||[old];d.compoundHistory.push(newTyre);let baseLoss=trackType(cur().tracks[S.round])==='Street'?23.5:trackType(cur().tracks[S.round])==='High speed'?21:22;let pitLoss=Math.max(13.5,baseLoss+S.series*.7-(isPlayer?S.dev.pit:ri(0,6))*.55+rnd(-.7,.8));if(r.sc)pitLoss*=.58;d.totalTime+=pitLoss;r.pitHistory.push({lap:r.lap,driver:d.name,from:old,to:d.tyre,loss:pitLoss,sc:!!r.sc});if(isPlayer)feed('🔧 Pit stop: '+old+' → '+d.tyre+' • '+pitLoss.toFixed(1)+'s effective loss'+(r.sc?' under Safety Car':'')+'.');return pitLoss}
function chooseRadio(action){let r=S.race,p=r.racers.find(x=>x.player);if(action.startsWith('pit')){let tyre=action.includes(':')?action.split(':')[1]:'auto';performPit(p,true,tyre)}else if(action.startsWith('fuel:')){$('fuel').value=action.split(':')[1];feed('📻 Fuel mode set to '+$('fuel').value+'.')}else if(action.startsWith('ers:')){$('ers').value=action.split(':')[1];feed('📻 ERS mode set to '+$('ers').value+'.')}else feed('📻 You stayed out and extended the stint.');r.pending=null;normalizeTiming(r);renderRace();save()}
function finishRace(){
 let r=S.race;normalizeTiming(r);let p=r.racers.find(x=>x.player),finish=p.pos,dnf=p.dnf,pts=dnf?0:(r.sprint?[8,7,6,5,4,3,2,1][finish-1]||0:POINTS[finish-1]||0);
 let leader=r.racers.find(x=>!x.dnf),leaderTime=leader?.totalTime||0;
 S.lastClassification={track:cur().tracks[S.round],season:S.season,sprint:r.sprint,fastest:r.fastest,rows:r.racers.map(d=>({pos:d.pos,name:d.name,player:!!d.player,startPos:d.startPos||d.pos,status:d.dnf?'DNF':'Finished',time:d.totalTime,gap:d.dnf?null:Math.max(0,d.totalTime-leaderTime),lastLap:d.lastLap,fastest:d.id===r.fastest?.id,pits:d.pits||0,strategy:(d.compoundHistory||[d.tyre]).join(' → '),fuel:Number.isFinite(d.fuel)?d.fuel:null,ers:Number.isFinite(d.ers)?d.ers:null}))};
 S.points+=pts;S.career.points+=pts;
 if(!r.sprint){S.career.starts++;if(dnf)S.career.dnfs++;if(finish===1){S.career.wins++;if(S.series===4)S.career.f1wins++}if(finish<=3&&!dnf)S.career.podiums++;S.career.best=Math.min(S.career.best,finish)}
 if(r.fastest?.id==='player'&&!dnf){S.career.fastestLaps++;if(!r.sprint&&finish<=10){S.points++;S.career.points++;pts++}}
 S.standings.player=(S.standings.player||0)+pts;
 r.racers.forEach((d,i)=>{if(d.player)return;let q=d.dnf?0:(r.sprint?([8,7,6,5,4,3,2,1][i]||0):(POINTS[i]||0));S.standings[d.id]=(S.standings[d.id]||0)+q});
 let mate=r.racers.find(x=>x.id===S.teammate);if(mate&&!r.sprint){if(!dnf&&finish<mate.pos){S.career.teammateWins++;let tb=2+S.series*2;S.cash+=tb;S.teammateBonusPaid=(S.teammateBonusPaid||0)+tb;feed('💰 Teammate bonus: '+fmt(tb)+' for finishing ahead of '+mate.name+'.')}else S.career.teammateLosses++}
 S.rep=clamp(S.rep+(dnf?-1:Math.max(-.5,6-finish*.28)),0,100);S.cash+=3+S.series*6+(finish<=10?11-finish:0);if(!r.sprint)awardSuperLicence(finish);
 S.results.unshift({season:S.season,track:cur().tracks[S.round],kind:r.sprint?'Sprint':'Race',finish:dnf?'DNF':'P'+finish,points:pts});S.lastAnalysis=buildRaceAnalysis(r,p,finish,dnf);hist(`${r.sprint?'Sprint':'Race'} ${dnf?'DNF':'P'+finish} at ${cur().tracks[S.round]}`);feed(`🏁 Finished ${dnf?'DNF':'P'+finish} • ${pts} points.`);
 if(r.sprint){S.race=null;S.phase='race';notice('Sprint complete. Main race ready. Final sprint classification shown below.');render();save();return}
 S.race=null;S.round++;S.grid=null;S.qualStage=0;S.practice=3;S.phase='practice';
 if(S.round>=cur().rounds)endSeason();else{weather();S.sprint=S.series===4&&Math.random()<.25;maybeOffer();maybeAcademyOffer();notice('Race complete. Final classification shown below • next weekend ready.')}
 render();save()
}
function awardSuperLicence(finish){if(S.series===0)return;let gain=Math.max(0,(12-finish))*[0,0.18,.28,.45,.8][S.series];S.superLicence=clamp(S.superLicence+gain,0,40)}
function buildRaceAnalysis(r,p,finish,dnf){let start=r.strategyStart?.grid||S.grid||finish,places=start-finish;let pitText=r.pitHistory.filter(x=>x.driver===S.name).map(x=>`L${x.lap}: ${x.from}→${x.to} (${x.loss.toFixed(1)}s)`).join(', ')||'No stops';let tyreScore=p.wear<85?'Tyre management was controlled.':'Tyres were heavily degraded at the finish.';let delta=places>0?`Gained ${places} positions`:(places<0?`Lost ${Math.abs(places)} positions`:'Finished where you started');let strategy=r.strategyStart?`${r.strategyStart.tyre}, ${r.strategyStart.paceMode||'Balanced'} pace, ${r.strategyStart.risk} risk, ${r.strategyStart.ers} ERS`:'—';return{summary:`${dnf?'DNF':`P${finish}`} from P${start}. ${delta}.`,strategy,pits:pitText,tyres:tyreScore,fastest:r.fastest?`${r.fastest.name} ${lapTimeFmt(r.fastest.time)} on lap ${r.fastest.lap}`:'—'}}

function generateSeasonObjectives(){
 let tier=team()[1]||2,rounds=cur().rounds,finishTarget=tier===0?3:tier===1?6:tier===2?10:14;
 let pointsTarget=Math.max(4,Math.round(rounds*(tier===0?12:tier===1?7:tier===2?3:1)));
 S.seasonObjectives=[
  {id:'mate',label:'Beat your teammate over the season',target:1,reward:18+S.series*8},
  {id:'points',label:`Score ${pointsTarget}+ championship points`,target:pointsTarget,reward:14+S.series*7},
  {id:'finish',label:`Achieve a best finish of P${finishTarget} or better`,target:finishTarget,reward:12+S.series*6}
 ];S.objectiveProgress={mate:0,points:S.points||0,finish:99}
}
function updateObjectives(){if(!S.seasonObjectives)generateSeasonObjectives();S.objectiveProgress.points=S.points||0;S.objectiveProgress.finish=Math.min(S.objectiveProgress.finish||99,S.career.best||99);S.objectiveProgress.mate=(S.career.teammateWins||0)>(S.career.teammateLosses||0)?1:0}
function objectiveMet(o){updateObjectives();return o.id==='finish'?S.objectiveProgress.finish<=o.target:(S.objectiveProgress[o.id]||0)>=o.target}
function renderObjectives(){let el=$('objectives');if(!el)return;if(!S.seasonObjectives)generateSeasonObjectives();updateObjectives();el.innerHTML=S.seasonObjectives.map(o=>`<div class="objective ${objectiveMet(o)?'done':''}"><span>${objectiveMet(o)?'✅':'◻️'} ${o.label}</span><strong>${fmt(o.reward)}</strong></div>`).join('')}

function endSeason(){if(!S.seasonObjectives)generateSeasonObjectives();updateObjectives();let objectiveBonus=0;S.seasonObjectives.forEach(o=>{if(objectiveMet(o))objectiveBonus+=o.reward});if(objectiveBonus){S.cash+=objectiveBonus;notice('Season objectives bonus: '+fmt(objectiveBonus)+'.')}S.seasonObjectives=null;S.objectiveProgress={};let rows=standingRows(),pos=rows.findIndex(x=>x.player)+1;if(pos===1){S.career.titles++;hist('🏆 '+cur().name+' champion');S.superLicence=clamp(S.superLicence+[0,12,18,30,0][S.series],0,40)}if(S.series<4&&pos<=cur().promotePos&&S.rep>=cur().promoteRep){if(S.series===3&&S.superLicence<40){hist('⚠️ F1 promotion blocked: Super Licence incomplete')}else{S.series++;S.teamTier=0;hist('⬆️ Promoted to '+cur().name)}}else if(pos<=8&&S.teamTier<2){S.teamTier++;hist('📄 Signed by '+team()[0])}driverMarket();S.season++;S.round=0;S.points=0;S.standings={};S.dev.aero=Math.max(0,S.dev.aero-1);S.dev.engine=Math.max(0,S.dev.engine-1);makeField();weather();S.sprint=S.series===4&&Math.random()<.25;S.practice=3;S.phase='practice';S.grid=null;notice('New season begins.');save()}
function driverMarket(){let moves=[];let sample=[...S.field].sort(()=>Math.random()-.5).slice(0,ri(3,6));sample.forEach(d=>{let old=d.teamTier||0,newTier=clamp(old+(Math.random()<.55?1:-1),0,2);if(newTier!==old){moves.push(`${d.name}: ${cur().teams[old][0]} → ${cur().teams[newTier][0]}`);d.teamTier=newTier}});S.market=moves.slice(0,8);if(moves.length)hist('🔄 Driver market reshuffle: '+moves.length+' moves')}
function lapTimeFmt(sec){if(!Number.isFinite(sec))return'—';let m=Math.floor(sec/60),ss=sec-m*60;return m+':'+ss.toFixed(3).padStart(6,'0')}function raceClockFmt(sec){if(!Number.isFinite(sec))return'—';let h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),ss=Math.floor(sec%60);return(h?h+':':'')+String(m).padStart(h?2:1,'0')+':'+String(ss).padStart(2,'0')}
function normalizeTiming(r){if(!r||!Array.isArray(r.racers))return;let alive=r.racers.filter(d=>!d.dnf);alive.forEach((d,i)=>{if(!Number.isFinite(d.totalTime))d.totalTime=(d.pos||i+1-1)*.18});alive.sort((a,b)=>a.totalTime-b.totalTime);let dead=r.racers.filter(d=>d.dnf);r.racers=[...alive,...dead];let leader=alive[0],prev=null;r.racers.forEach((d,i)=>{d.pos=i+1;if(d.dnf){d.gap=null;d.interval=null;return}d.gap=leader?Math.max(0,d.totalTime-leader.totalTime):0;d.interval=prev?Math.max(0,d.totalTime-prev.totalTime):0;prev=d});r.leaderTime=leader?leader.totalTime:0}
function gapFmt(d,r){if(d.dnf)return'OUT';if(d.pos===1)return'LEADER';let gap=Number.isFinite(d.gap)?d.gap:0,base=r.baseLap||90;if(gap>=base*.92){let laps=Math.max(1,Math.floor(gap/base));return'+'+laps+' Lap'+(laps>1?'s':'')}return'+'+gap.toFixed(3)+'s'}
function intervalFmt(d,r){if(d.dnf||d.pos===1)return'—';let gap=Number.isFinite(d.interval)?d.interval:0,base=r.baseLap||90;if(gap>=base*.92)return'+1 Lap';return'+'+gap.toFixed(3)+'s'}
function pitTable(){let r=S.race;normalizeTiming(r);return'<table><tr><th>Pos</th><th>Driver</th><th>Gap</th><th>Interval</th><th>Recent lap</th><th>Tyre</th><th>Wear</th><th>Status</th></tr>'+r.racers.slice(0,20).map(d=>`<tr class="${d.player?'you timing-you':''}"><td>P${d.pos}</td><td>${d.name}</td><td><strong>${gapFmt(d,r)}</strong></td><td>${intervalFmt(d,r)}</td><td class="${r.fastest?.id===d.id?'fastest':''}">${lapTimeFmt(d.lastLap)}</td><td>${d.tyre}</td><td>${Math.round(d.wear)}%</td><td>${d.dnf?'OUT':d.damage>15?'Damage':'Running'}</td></tr>`).join('')+'</table>'}

function renderClassification(){
 let c=S.lastClassification,box=$('classification');if(!box)return;
 if(!c){box.innerHTML='<div class="muted">Complete a race to see the final classification.</div>';return}
 let lead=c.rows.find(x=>x.status!=='DNF');
 box.innerHTML=`<p><strong>${c.track}</strong> • ${c.sprint?'Sprint':'Race'} final classification</p><div class="tablebox"><table><tr><th>Pos</th><th>Driver</th><th>Time / Gap</th><th>Change</th><th>Strategy</th><th>Stops</th><th>Fastest</th><th>Status</th></tr>${c.rows.map(d=>{let change=(d.startPos||d.pos)-d.pos,gap=d.status==='DNF'?'—':d.pos===1?raceClockFmt(d.time):'+'+(d.gap||0).toFixed(3)+'s';return`<tr class="${d.player?'you':''}"><td>P${d.pos}</td><td>${d.name}</td><td>${gap}</td><td>${change>0?'+'+change:change}</td><td>${d.strategy}</td><td>${d.pits}</td><td>${d.fastest?'⚡ '+lapTimeFmt(d.lastLap):'—'}</td><td>${d.status}</td></tr>`}).join('')}</table></div>`
}


function circuitPath(name){let seed=[...name].reduce((a,c)=>a+c.charCodeAt(0),0),pts=[],n=38;for(let i=0;i<n;i++){let a=i/n*Math.PI*2,r=1+.18*Math.sin(a*3+(seed%7))+.10*Math.sin(a*5+(seed%11));pts.push([50+39*r*Math.cos(a),50+31*r*Math.sin(a)])}return pts}
function pathPoint(pts,t){let n=pts.length,p=t*n,i=Math.floor(p)%n,f=p-Math.floor(p),a=pts[i],b=pts[(i+1)%n];return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]}
function renderCircuitTracker(){let el=$('circuitTracker');if(!el||!S.race)return;let r=S.race,pts=circuitPath(cur().tracks[S.round]),path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')+' Z';let markers=r.racers.filter(x=>!x.dnf).map(d=>{let lapFrac=clamp(1-(d.gap||0)/Math.max(18,r.baseLap),0,1),p=pathPoint(pts,lapFrac),col=d.player?(LIVERIES[S.livery]||LIVERIES.Crimson).a:'#9aa4b2';return`<g><circle cx="${p[0]}" cy="${p[1]}" r="${d.player?2.6:1.55}" fill="${col}" stroke="${d.player?'white':'none'}" stroke-width=".7"/><text x="${p[0]+2.1}" y="${p[1]-1.7}" font-size="${d.player?3.2:2.3}">${d.pos}</text></g>`}).join('');el.innerHTML=`<div class="trackerHead"><strong>${cur().tracks[S.round]}</strong><span>Lap ${r.lap}/${r.laps}</span></div><svg viewBox="0 0 100 100"><path d="${path}" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="4.5"/><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.2"/>${markers}</svg><small>Schematic live tracker • your car uses your selected livery colour</small>`}

function renderRace(){
 let r=S.race;renderClassification();if(r)renderCircuitTracker();
 if(!r){$('raceStatus').textContent='Race not started';$('lapBadge').textContent='Lap —';$('timing').innerHTML='Start the race to see live timing.';$('lapBtn').disabled=$('fiveBtn').disabled=$('autoBtn').disabled=true;$('radioBox').classList.add('hidden');$('raceIntel').innerHTML='No active race. The latest final classification is shown below.';return}
 normalizeTiming(r);$('raceStatus').textContent=(r.sc?'Safety Car • ':'')+r.weather+' • Track '+Math.round(r.wetness||0)+'% wet • Leader '+raceClockFmt(r.leaderTime);$('lapBadge').textContent=`Lap ${r.lap}/${r.laps}`;$('timing').innerHTML=pitTable();$('lapBtn').disabled=$('fiveBtn').disabled=$('autoBtn').disabled=!!r.pending;
 if(r.pending){$('radioBox').classList.remove('hidden');$('radioBox').innerHTML=`<strong>📻 ${r.pending.title}</strong><div>${r.pending.text}</div><div class="choices">${r.pending.choices.map(c=>`<button data-radio="${c[1]}">${c[0]}</button>`).join('')}</div>`;document.querySelectorAll('[data-radio]').forEach(b=>b.onclick=()=>chooseRadio(b.dataset.radio))}else $('radioBox').classList.add('hidden');
 let p=r.racers.find(x=>x.player),life=TYRES[p.tyre]?.life||28,mode=$('paceMode').value,modeMult={Conserve:.70,Balanced:1,Push:1.32,Attack:1.58}[mode]||1,est=Math.max(1,Math.round((100-p.wear)/((100/life)*modeMult))),cross=bestTyreForWetness(r.wetness),nextRain=r.weatherPlan?.rainStart===null?null:Math.round(r.weatherPlan.rainStart*r.laps),pitStart=Math.min(r.laps-1,r.lap+Math.max(1,est-3)),pitEnd=Math.min(r.laps-1,r.lap+Math.max(2,est));
 let recommendation=cross&&p.tyre!==cross?`Box for ${cross} now`:(!cross&&!TYRES[p.tyre]?.dry?'Slick crossover approaching / box soon':(nextRain&&nextRain>r.lap&&nextRain-r.lap<6?'Consider extending to the rain window':`Dry pit window L${pitStart}–L${pitEnd}`));
 let lapsLeft=Math.max(0,r.laps-r.lap),baseBurn=100/r.laps,fuelModeNow=$('fuel').value,
 fuelMult=fuelModeNow==='Push'?1.09:fuelModeNow==='Conserve'?.92:1,
 projectedBurn=baseBurn*fuelMult,fuelNeed=lapsLeft*projectedBurn,fuelMargin=p.fuel-fuelNeed,
 makeFinish=fuelMargin>-2,projectedFuelLaps=projectedBurn>0?p.fuel/projectedBurn:99;
 $('raceIntel').innerHTML=`<div class="resourceGrid"><div><strong>Fuel remaining</strong><span>${p.fuel.toFixed(1)}%</span><div class="resourceMeter"><i style="width:${clamp(p.fuel,0,100)}%"></i></div><small>${makeFinish?'Projected to finish':'SAVE FUEL'} • ~${projectedFuelLaps.toFixed(1)} laps of fuel • finish margin ${fuelMargin>=0?'+':''}${fuelMargin.toFixed(1)}%</small></div><div><strong>ERS</strong><span>${Math.round(p.ers)}%</span><div class="resourceMeter"><i style="width:${clamp(p.ers,0,100)}%"></i></div><small>${p.ers<12?'Harvest required':p.ers>60?'Attack available':'Manage deployment'}</small></div></div><strong>Driving mode:</strong> ${mode} • ${$('fuel').value} fuel • ${$('ers').value} ERS<br><strong>Setup:</strong> ${S.setup||'Balanced'} • ${setupText()}<br><strong>Track wetness:</strong> ${Math.round(r.wetness||0)}% • ${r.weatherPlan?.forecast||S.forecast}<br><strong>Fastest:</strong> ${r.fastest?`${r.fastest.name} ${lapTimeFmt(r.fastest.time)} (L${r.fastest.lap})`:'—'}<br><strong>Your tyre estimate:</strong> ~${est} laps remaining<br><strong>Strategy call:</strong> ${recommendation}<br><strong>Pit loss now:</strong> ~${(r.sc?pitLossEstimate()*.58:pitLossEstimate()).toFixed(1)}s${r.sc?' (Safety Car)':''}<br><strong>Pit history:</strong> ${r.pitHistory.length?r.pitHistory.slice(-5).map(x=>`${x.driver} L${x.lap} ${x.from}→${x.to}`).join(' • '):'No stops yet'}`
}
function feed(t){let box=$('feed'),d=document.createElement('div');d.className='feeditem';d.textContent=t;box.prepend(d);while(box.children.length>30)box.removeChild(box.lastChild)}
function standingRows(){let rows=[{player:true,name:S.name,points:S.standings.player||S.points},...S.field.map(d=>({id:d.id,name:d.name,points:S.standings[d.id]||0}))];return rows.sort((a,b)=>b.points-a.points)}
function renderStandings(){let rows=standingRows();$('standingsTable').innerHTML='<table><tr><th>Pos</th><th>Driver</th><th>Points</th></tr>'+rows.map((d,i)=>`<tr class="${d.player?'you':''}"><td>${i+1}</td><td>${d.name}</td><td>${d.points}</td></tr>`).join('')+'</table>';$('seasonResults').innerHTML='<table><tr><th>Round</th><th>Session</th><th>Result</th><th>Pts</th></tr>'+S.results.filter(x=>x.season===S.season).map(x=>`<tr><td>${x.track}</td><td>${x.kind}</td><td>${x.finish}</td><td>${x.points}</td></tr>`).join('')+'</table>'}
function renderDriver(){let labels={pace:'Pace',racecraft:'Racecraft',consistency:'Consistency',fitness:'Fitness',wet:'Wet skill',feedback:'Feedback'};$('driverStats').innerHTML=`<p><strong>Overall ${overall()}</strong> • Morale ${Math.round(S.morale)}%</p>`+Object.entries(S.stats).map(([k,v])=>`<div class="statrow"><div class="statline"><span>${labels[k]}</span><strong>${Math.round(v)}</strong></div><div class="bar"><span style="width:${v}%"></span></div></div>`).join('');$('superLicenceBox').innerHTML=`<p><strong>${Math.round(S.superLicence)}/40 points</strong>${S.superLicence>=40?' • Eligible for F1':' • 40 required for F1'}</p><div class="slbar"><span style="width:${S.superLicence/40*100}%"></span></div>`;$('ladder').innerHTML=SERIES.map((x,i)=>`<div class="ladderRow ${i===S.series?'current':''}">${i<S.series?'✓':i===S.series?'🏁':'○'} ${x.name}</div>`).join('');$('academyBox').innerHTML=S.academy?`<div class="contract">🎓 ${S.academy}<br><span class="muted">Reputation bonus and better contract access.</span></div>`:'<div class="muted">No academy contract yet.</div>';let rv=S.field.find(x=>x.id===S.rival),tm=S.field.find(x=>x.id===S.teammate);$('rivalBox').innerHTML=rv?`<div class="contract">⚔️ ${rv.name}<br><span class="muted">Your benchmark this season.</span></div>`:'—';$('teammateBox').innerHTML=tm?`<div class="comparison"><span>${S.name}</span><strong>${S.career.teammateWins}-${S.career.teammateLosses}</strong><span>${tm.name}</span></div><p class="muted">Season benchmark skill: ${Math.round(tm.skill)}</p>`:'—'}
function upgrade(k){let cost=12+S.series*8+S.dev[k]*4;if(S.cash<cost)return notice('Not enough cash for upgrade.');S.cash-=cost;S.dev[k]=clamp(S.dev[k]+2,0,14);notice(k+' upgrade completed.');hist('🔧 Team upgraded '+k);render();save()}
function maybeOffer(){if(Math.random()>.45)return;S.offers=[];if(S.teamTier<2&&S.rep>25+S.series*11){let t=S.teamTier+1;S.offers.push({team:cur().teams[t][0],tier:t,series:S.series,salary:8+S.series*8+t*5,repReq:Math.round(S.rep-5)})}if(S.series<4&&S.rep>cur().promoteRep+8&&Math.random()<.4)S.offers.push({team:SERIES[S.series+1].teams[0][0],tier:0,series:S.series+1,salary:12+(S.series+1)*10,repReq:Math.round(S.rep)})}
function negotiateOffer(i,style){let o=S.offers[i];if(!o)return;let chance=style==='aggressive'?.45:style==='balanced'?.72:.9;let bonus=style==='aggressive'?1.35:style==='balanced'?1.15:1;if(Math.random()<chance){o.salary=Math.round(o.salary*bonus);acceptOffer(i,true)}else{notice('Negotiation failed. The team withdrew the offer.');S.offers.splice(i,1);render();save()}}
function acceptOffer(i,negotiated=false){let o=S.offers[i];if(!o)return;if(o.series>S.series){if(o.series===4&&S.superLicence<40)return notice('You need 40 Super Licence points for F1.');S.series=o.series;S.round=0;S.points=0;S.standings={};makeField();weather()}S.teamTier=o.tier;S.cash+=o.salary||0;S.offers=[];hist('📄 Contract signed: '+o.team+(negotiated?' after negotiation':''));notice('Signed with '+o.team);render();save()}
function maybeAcademyOffer(){if(S.academy||S.series<1||Math.random()>.35)return;S.academyOffers=[['Velocity Academy',3],['Titan Junior Programme',4],['Apex Driver Academy',2]].sort(()=>Math.random()-.5).slice(0,1).map(x=>({name:x[0],bonus:x[1]}))}
function acceptAcademy(i){let a=S.academyOffers[i];if(!a)return;S.academy=a.name;S.rep=clamp(S.rep+a.bonus,0,100);S.academyOffers=[];hist('🎓 Joined '+S.academy);render();save()}
function sponsor(){if(S.sponsor)return;S.sponsor={name:['Velocity Energy','Apex Data','Titan Performance'][ri(0,2)],rounds:6,bonus:4+S.series*3};hist('💼 Sponsor signed: '+S.sponsor.name);render();save()}
function renderTeam(){$('teamName').textContent=team()[0];$('teamInfo').innerHTML=`<p>Car performance <strong>${Math.round(car())}</strong>/100 • Reliability <strong>${Math.round(rel())}</strong>/100</p><p>Aero +${S.dev.aero} • Power +${S.dev.engine} • Reliability +${S.dev.reliability} • Pit crew +${S.dev.pit}</p>`;document.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>upgrade(b.dataset.up));$('contracts').innerHTML=S.offers.length?S.offers.map((o,i)=>`<div class="contract"><strong>${o.team}</strong><br><span class="muted">${SERIES[o.series].name} • signing bonus ${fmt(o.salary)}</span><div class="negotiation"><button data-neg="safe:${i}">Accept safely</button><button data-neg="balanced:${i}">Negotiate</button><button data-neg="aggressive:${i}">Push hard</button></div></div>`).join(''):'<div class="muted">No active offers.</div>';document.querySelectorAll('[data-neg]').forEach(b=>b.onclick=()=>{let [style,i]=b.dataset.neg.split(':');if(style==='safe')acceptOffer(+i);else negotiateOffer(+i,style)});$('academyOffers').innerHTML=S.academy?`<div class="contract">Currently signed to ${S.academy}</div>`:(S.academyOffers.length?S.academyOffers.map((a,i)=>`<div class="contract"><strong>${a.name}</strong><br><span class="muted">Reputation bonus +${a.bonus}</span><br><button data-academy="${i}">Join academy</button></div>`).join(''):'<div class="muted">No academy offer currently.</div>');document.querySelectorAll('[data-academy]').forEach(b=>b.onclick=()=>acceptAcademy(+b.dataset.academy));$('sponsorBox').innerHTML=S.sponsor?`<div class="sponsor">💼 ${S.sponsor.name} • ${S.sponsor.rounds} rounds remaining</div>`:'<button id="sponsorBtn">Find sponsor</button>';if($('sponsorBtn'))$('sponsorBtn').onclick=sponsor;$('marketBox').innerHTML=S.market.length?S.market.map(m=>`<div class="marketMove">🔄 ${m}</div>`).join(''):'<div class="muted">Driver market updates appear between seasons.</div>'}
function renderHistory(){let c=S.career;$('careerStats').innerHTML=`<table><tr><th>Starts</th><td>${c.starts}</td></tr><tr><th>Wins</th><td>${c.wins}</td></tr><tr><th>Podiums</th><td>${c.podiums}</td></tr><tr><th>Poles</th><td>${c.poles}</td></tr><tr><th>Fastest laps</th><td>${c.fastestLaps}</td></tr><tr><th>Titles</th><td>${c.titles}</td></tr><tr><th>F1 wins</th><td>${c.f1wins}</td></tr><tr><th>Career points</th><td>${c.points}</td></tr><tr><th>DNFs</th><td>${c.dnfs}</td></tr></table>`;$('historyList').innerHTML=S.history.length?S.history.map(h=>`<div><strong>S${h.season} • ${h.series}</strong><br>${h.t}</div>`).join(''):'<div class="muted">No history yet.</div>';$('raceAnalysis').innerHTML=S.lastAnalysis?`<strong>${S.lastAnalysis.summary}</strong><br><span class="muted">Start strategy:</span> ${S.lastAnalysis.strategy}<br><span class="muted">Pit stops:</span> ${S.lastAnalysis.pits}<br><span class="muted">Tyres:</span> ${S.lastAnalysis.tyres}<br><span class="muted">Fastest lap:</span> ${S.lastAnalysis.fastest}`:'Complete a race to see strategy analysis.'}
function bind(){
 if($('trainingGrid'))$('trainingGrid').addEventListener('click',e=>{let b=e.target.closest('[data-train]');if(b&&!b.disabled)train(b.dataset.train)});
 if($('qualBtn'))$('qualBtn').onclick=qualifyingAction;
if($('fuelLoad'))$('fuelLoad').oninput=renderFuelLoad;if($('liverySelect'))$('liverySelect').onchange=e=>setLivery(e.target.value);document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab-panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});$('qualBtn').onclick=qualifyingAction;$('raceBtn').onclick=startRace;$('lapBtn').onclick=()=>advance(1);$('fiveBtn').onclick=()=>advance(5);$('autoBtn').onclick=()=>{for(let i=0;i<10&&S.race&&!S.race.pending;i++)simLap();renderRace();render();save()};$('saveBtn').onclick=()=>save(true);$('newBtn').onclick=()=>{if(confirm('Start a new career and replace your save?'))$('newDialog').showModal()};['startTyre','risk','ers','fuel','paceMode','carSetup'].forEach(id=>$(id).onchange=()=>{S.setup=$('carSetup').value||S.setup;renderStrategyAdvice();$('setupAdvice').textContent=setupText();if(S.race){feed('📻 Controls updated • pace '+$('paceMode').value+' • fuel '+$('fuel').value+' • ERS '+$('ers').value+'.');renderRace();save()}});$('newForm').onsubmit=e=>{e.preventDefault();S=fresh($('driverName').value.trim()||'Alex Combes',$('nationality').value,$('archetype').value);makeField();weather();hist('🏁 Career started in Karting');$('newDialog').close();notice('Career started. Begin practice.');render();save()}}
ensure();bind();if(!localStorage.getItem('roadToF1V54')&&!localStorage.getItem('roadToF1V53')&&!localStorage.getItem('roadToF1V52')&&!localStorage.getItem('roadToF1V51')&&!localStorage.getItem('roadToF1V50')&&!localStorage.getItem('roadToF1V46')&&!localStorage.getItem('roadToF1V44')&&!localStorage.getItem('roadToF1V4')&&!localStorage.getItem('roadToF1V33'))$('newDialog').showModal();render();
