const SERIES=[
{name:'Karting',rounds:8,laps:18,promotePos:7,promoteRep:28,sl:0,teams:[['Combes Academy',46,70],['Velocity Juniors',58,78],['Apex Karting',70,85],['Pacific Kart Sport',49,72],['Orion Karts',52,74],['Falcon Karting',55,76],['Summit Juniors',61,79],['Northstar Karting',64,81],['Vertex Karts',67,83],['Eclipse Kart Team',57,77]],tracks:['Melbourne Kart Circuit','Sydney Kart Raceway','Gold Coast Karting','Adelaide Kart Park','Newcastle Kart Circuit','Phillip Island Kart Track','Perth Kart Arena','National Kart Final']},
{name:'Formula 4',rounds:10,laps:24,promotePos:7,promoteRep:46,sl:12,teams:[['Southern Cross F4',52,72],['Velocity Motorsport',66,80],['Apex Junior Racing',80,87],['Pacific Competition',55,74],['Orion Motorsport',60,77],['Falcon Junior Team',69,81],['Summit Racing',73,83],['Northstar F4',76,84],['Vertex Motorsport',63,79],['Eclipse Racing',58,76]],tracks:['Phillip Island','Sandown','The Bend','Sydney Motorsport Park','Queensland Raceway','Bathurst Support','Adelaide','Hidden Valley','Taupo','Albert Park']},
{name:'Formula 3',rounds:10,laps:30,promotePos:6,promoteRep:64,sl:18,teams:[['Nova F3',58,74],['Apex GP',74,83],['Titan Motorsport',88,90],['Orion F3',62,76],['Falcon GP',67,79],['Summit Formula',71,81],['Northstar Racing',78,85],['Vertex F3',81,87],['Eclipse Motorsport',65,78],['Pacific GP',75,84]],tracks:['Bahrain','Melbourne','Imola','Monaco','Barcelona','Spielberg','Silverstone','Spa','Monza','Yas Marina']},
{name:'Formula 2',rounds:12,laps:34,promotePos:5,promoteRep:80,sl:30,teams:[['Nova F2',64,76],['Velocity GP',80,85],['Titan Formula',94,92],['Orion F2',69,79],['Falcon Formula',73,81],['Summit GP',77,83],['Northstar F2',84,87],['Vertex Racing',87,89],['Eclipse F2',72,80],['Pacific Formula',82,86]],tracks:['Bahrain','Jeddah','Melbourne','Imola','Monaco','Barcelona','Spielberg','Silverstone','Spa','Monza','Baku','Yas Marina']},
{name:'Formula 1',rounds:16,laps:42,promotePos:1,promoteRep:999,sl:40,teams:[['Phoenix F1',72,79],['Velocity Racing',86,88],['Titan Grand Prix',98,95],['Orion Racing',76,82],['Falcon F1',80,84],['Summit Grand Prix',84,86],['Northstar Racing',90,91],['Vertex Formula One',93,93],['Eclipse Racing',78,83],['Pacific Motorsport',88,89]],tracks:['Melbourne','Suzuka','Monaco','Barcelona','Spielberg','Silverstone','Spa','Monza','Singapore','Austin','Mexico City','Interlagos','Las Vegas','Qatar','Bahrain','Abu Dhabi']}
];
const FIRST=['Luca','Theo','Mika','Oscar','Hugo','Noah','Felix','Marco','Liam','Jack','Nico','Emil','Leo','Carlos','Pierre','Mateo','Yuki','Daniel','Rafael','Arthur','Oliver','Gabriel','Seb','Maxim','Alexei','James','Callum','Ethan'];
const LAST=['Moretti','Bennett','Keller','Rossi','Dubois','Tanaka','Santos','Muller','Ricci','Lawson','Hart','Vega','Martin','Nakamura','Costa','Bianchi','Novak','Turner','Fischer','Silva','Evans','Reid','Petrov','King','Duran','Mercer','Cole'];
const POINTS=[25,18,15,12,10,8,6,4,2,1];
const TYRES={Soft:{pace:1.9,wear:6.8,life:14,dry:true},Medium:{pace:.8,wear:4.5,life:22,dry:true},Hard:{pace:-.2,wear:3.1,life:32,dry:true},Intermediate:{pace:-.8,wear:5.0,life:20,wet:true},Wet:{pace:-2.0,wear:4.3,life:24,wet:true}};
const TRAIN={
 pace:{name:'Pace',cost:3},
 racecraft:{name:'Racecraft',cost:3},
 consistency:{name:'Consistency',cost:2},
 fitness:{name:'Fitness',cost:2},
 wet:{name:'Wet-weather skill',cost:2},
 feedback:{name:'Technical feedback',cost:2}
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
 return {version:10.2,name,nat,type,series:0,season:1,round:0,points:0,rep:15,cash:100,morale:72,teamTier:0,stats,dev:{frontWing:0,rearWing:0,floor:0,sidepods:0,suspension:0,brakes:0,engine:0,gearbox:0,cooling:0,reliability:0,pit:0},practice:3,phase:'practice',qualStage:0,grid:null,field:[],standings:{},results:[],history:[],offers:[],academy:null,academyOffers:[],rival:null,teammate:null,sponsor:null,sponsorObjectives:[],worldSeries:null,superLicence:0,market:[],qualHistory:[],lastQual:null,lastAnalysis:null,lastClassification:null,setup:'Balanced',livery:'Crimson',teamLivery:'Crimson GP',factoryFunds:100,teamFinance:{budget:100,sponsorIncome:0,prizeIncome:0,driverSalary:0,operatingCosts:0,maintenance:0,devSpend:0,seasonStartBudget:100,lastSeason:null},staff:null,projects:[],inventory:{},componentWear:{engine:5,gearbox:5,ers:5},driverTraits:[],form:[],teammateRelationship:60,boardConfidence:70,boardTarget:null,contractStatus:null,reputationProfile:null,practiceProgramme:'Setup work',setupConfidence:35,nextCarAllocation:20,nextCarDev:{aero:0,power:0,reliability:0},regulation:null,mediaHistory:[],pendingMedia:null,lastRaceRating:null,raceRatings:[],constructorExpansionV101:false,seasonObjectives:null,objectiveProgress:{},teammateBonusPaid:0,academyStanding:70,reserveRole:null,fp1Runs:0,poachOffers:[],academyEvents:[],preseason:null,preseasonHistory:[],career:{starts:0,wins:0,podiums:0,poles:0,points:0,titles:0,dnfs:0,best:99,f1wins:0,fastestLaps:0,teammateWins:0,teammateLosses:0},race:null,weather:'Dry',forecast:'Dry throughout',weatherPlan:null,sprint:false};
}
let S=load()||fresh();
function cur(){return SERIES[S.series]}function team(){return cur().teams[S.teamTier]}function devVal(k){return Number(S.dev?.[k]||0)}function aeroDev(){return devVal('frontWing')*.18+devVal('rearWing')*.16+devVal('floor')*.28+devVal('sidepods')*.18+devVal('suspension')*.10+devVal('brakes')*.05}function powerDev(){return devVal('engine')*.55+devVal('gearbox')*.20+devVal('cooling')*.10}function car(){return clamp(team()[1]+aeroDev()+powerDev(),1,99)}function rel(){return clamp(team()[2]+devVal('reliability')+devVal('cooling')*.25+devVal('gearbox')*.12,45,99)}
function save(show=false){localStorage.setItem('roadToF1V102',JSON.stringify(S));if(show)notice('Career saved.')} 
function load(){try{let x=JSON.parse(localStorage.getItem('roadToF1V102'));if(x&&x.version===10.2)return x;let old=JSON.parse(localStorage.getItem('roadToF1V101'))||JSON.parse(localStorage.getItem('roadToF1V100'))||JSON.parse(localStorage.getItem('roadToF1V93'))||JSON.parse(localStorage.getItem('roadToF1V92'))||JSON.parse(localStorage.getItem('roadToF1V91'))||JSON.parse(localStorage.getItem('roadToF1V90'))||JSON.parse(localStorage.getItem('roadToF1V85'))||JSON.parse(localStorage.getItem('roadToF1V84'))||JSON.parse(localStorage.getItem('roadToF1V83'))||JSON.parse(localStorage.getItem('roadToF1V82'))||JSON.parse(localStorage.getItem('roadToF1V81'))||JSON.parse(localStorage.getItem('roadToF1V80'))||JSON.parse(localStorage.getItem('roadToF1V73'))||JSON.parse(localStorage.getItem('roadToF1V72'))||JSON.parse(localStorage.getItem('roadToF1V71'))||JSON.parse(localStorage.getItem('roadToF1V70'))||JSON.parse(localStorage.getItem('roadToF1V69'))||JSON.parse(localStorage.getItem('roadToF1V68'))||JSON.parse(localStorage.getItem('roadToF1V67'))||JSON.parse(localStorage.getItem('roadToF1V66'))||JSON.parse(localStorage.getItem('roadToF1V65'))||JSON.parse(localStorage.getItem('roadToF1V64'))||JSON.parse(localStorage.getItem('roadToF1V63'))||JSON.parse(localStorage.getItem('roadToF1V62'))||JSON.parse(localStorage.getItem('roadToF1V61'))||JSON.parse(localStorage.getItem('roadToF1V60'))||JSON.parse(localStorage.getItem('roadToF1V55'))||JSON.parse(localStorage.getItem('roadToF1V54'))||JSON.parse(localStorage.getItem('roadToF1V53'))||JSON.parse(localStorage.getItem('roadToF1V52'))||JSON.parse(localStorage.getItem('roadToF1V51'))||JSON.parse(localStorage.getItem('roadToF1V50'))||JSON.parse(localStorage.getItem('roadToF1V46'))||JSON.parse(localStorage.getItem('roadToF1V45'))||JSON.parse(localStorage.getItem('roadToF1V44'))||JSON.parse(localStorage.getItem('roadToF1V4'))||JSON.parse(localStorage.getItem('roadToF1V33'));if(old){let n={...fresh(old.name,old.nat,old.type),...old,version:10.2};n.superLicence=old.superLicence||Math.min(39,old.series*8);n.market=old.market||[];n.qualHistory=old.qualHistory||[];n.lastQual=old.lastQual||null;n.lastAnalysis=old.lastAnalysis||null;n.lastClassification=old.lastClassification||null;n.setup=old.setup||'Balanced';n.livery=old.livery||'Crimson';n.seasonObjectives=old.seasonObjectives||null;n.objectiveProgress=old.objectiveProgress||{};n.teammateBonusPaid=old.teammateBonusPaid||0;n.academyOffers=old.academyOffers||[];n.career={...fresh().career,...old.career};n.dev={...fresh().dev,...(old.dev||{})};if(old.dev?.aero!=null){let a=old.dev.aero;n.dev.frontWing=Math.max(n.dev.frontWing||0,a*.65);n.dev.rearWing=Math.max(n.dev.rearWing||0,a*.55);n.dev.floor=Math.max(n.dev.floor||0,a*.75);n.dev.sidepods=Math.max(n.dev.sidepods||0,a*.45)}n.worldSeries=old.worldSeries||null;n.sponsorObjectives=old.sponsorObjectives||[];n.race=null;n.weatherPlan=null;
    // Repair stale/broken weekend states from V5.4 and earlier.
    // If there is no active race, always reopen the weekend in practice.
    n.phase='practice';n.practice=3;n.grid=null;n.qualStage=0;
    return n}return null}catch{return null}}
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
 S.field=[];let base=49+S.series*8,teamSlots=[];
 cur().teams.forEach((t,ti)=>{let count=ti===S.teamTier?1:2;for(let j=0;j<count;j++)teamSlots.push(ti)});
 for(let i=0;i<19;i++){let n=FIRST[(i*3+S.season)%FIRST.length]+' '+LAST[(i*5+S.series)%LAST.length];let teamTier=teamSlots[i]??(i%cur().teams.length),teamPerf=cur().teams[teamTier][1];S.field.push({id:'d'+i,name:n,skill:clamp(base+rnd(-14,14),30,98),wet:clamp(base+rnd(-16,16),25,99),cons:clamp(base+rnd(-12,13),30,98),car:clamp(teamPerf+rnd(-2.5,2.5),35,99),points:0,wins:0,teamTier})}
 let mates=S.field.filter(d=>d.teamTier===S.teamTier);S.teammate=mates[0]?.id||S.field[0]?.id;
 let rivals=S.field.filter(d=>d.id!==S.teammate).sort((a,b)=>Math.abs(a.skill-overall())-Math.abs(b.skill-overall()));S.rival=rivals[0]?.id||S.field[1]?.id;
}
function ensure(){
 if(!S.constructorExpansionAllV102){S.constructorExpansionAllV102=true;S.teamTier=clamp(S.teamTier||0,0,cur().teams.length-1);makeField();S.worldSeries=null;}
 if(!S.field||S.field.length!==19)makeField();
 if(!S.spreadV42&&S.field?.length===19){
  let base=49+S.series*8;
  S.field.forEach(d=>{d.teamTier=clamp(d.teamTier??ri(0,cur().teams.length-1),0,cur().teams.length-1);let teamPerf=cur().teams[d.teamTier][1];d.skill=clamp(base+(d.skill-base)*1.45+rnd(-1.5,1.5),30,98);d.wet=clamp(base+(d.wet-base)*1.25,25,99);d.cons=clamp(base+(d.cons-base)*1.3,30,98);d.car=clamp(teamPerf+rnd(-2,2),35,99)});
  S.spreadV42=true
 }
 if(!S.weather||!S.weatherPlan)weather();
 if(S.sprint===undefined)S.sprint=false;
 if(!S.career.fastestLaps)S.career.fastestLaps=0;
 if(!S.market)S.market=[];
 if(!S.academyOffers)S.academyOffers=[]
 ensureTeamFinance();
 ensureManagement();
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


const F1_ACADEMIES=[
 {id:'redbull',name:'Red Bull Junior Team',boss:'Helmut Marko',watch:'Aggressive',minRep:34,pace:55,racecraft:54,bonus:1.16,livery:'Navy Red'},
 {id:'ferrari',name:'Ferrari Driver Academy',boss:"Jérôme d’Ambrosio",watch:'Prestige',minRep:42,pace:58,racecraft:55,bonus:1.12,livery:'Rosso'},
 {id:'mercedes',name:'Mercedes Junior Team',boss:'Toto Wolff',watch:'Precision',minRep:40,pace:56,racecraft:54,bonus:1.13,livery:'Silver Teal'},
 {id:'mclaren',name:'McLaren Driver Development',boss:'Alessandro Alunni Bravi',watch:'Development',minRep:36,pace:54,racecraft:54,bonus:1.12,livery:'Papaya'},
 {id:'williams',name:'Williams Driver Academy',boss:'James Vowles',watch:'Opportunity',minRep:30,pace:52,racecraft:52,bonus:1.10,livery:'Royal Blue'},
 {id:'alpine',name:'Alpine Academy',boss:'Flavio Briatore',watch:'Results',minRep:32,pace:53,racecraft:53,bonus:1.10,livery:'Alpine Blue'},
 {id:'aston',name:'Aston Martin Driver Academy',boss:'Andy Cowell',watch:'Potential',minRep:38,pace:55,racecraft:52,bonus:1.11,livery:'British Racing Green'},
 {id:'audi',name:'Audi Driver Development Programme',boss:'Jonathan Wheatley',watch:'Future',minRep:38,pace:54,racecraft:54,bonus:1.11,livery:'Audi Red'}
];
const TEAM_LIVERIES={
 'Crimson GP':{a:'#d7263d',b:'#16181c'},'Papaya Racing':{a:'#ff8000',b:'#202124'},
 'British Racing Green':{a:'#006f62',b:'#cfd8dc'},'Silver Arrow':{a:'#b9c0c8',b:'#00a19c'},
 'Royal Blue':{a:'#1261a0',b:'#f4f7fb'},'Rosso Corse':{a:'#dc0000',b:'#ffd100'},
 'Navy Red':{a:'#18204c',b:'#e10600'},'Alpine Blue':{a:'#1671d9',b:'#f48fb1'},
 'Audi Red':{a:'#e31b23',b:'#1c1c1c'},'Midnight':{a:'#111827',b:'#9ca3af'},
 'Volt':{a:'#a3e635',b:'#111827'},'Arctic':{a:'#f8fafc',b:'#1e3a5f'}
};

const ACADEMY_VALUES={
 redbull:{pace:1.45,racecraft:1.30,consistency:.55,fitness:.55,wet:.85,feedback:.45,results:1.35,label:'Raw pace + aggressive racecraft',philosophy:'We want drivers who are fast immediately and attack opportunities.'},
 ferrari:{pace:1.15,racecraft:1.00,consistency:1.05,fitness:.65,wet:.65,feedback:.80,results:1.25,label:'Results + complete speed',philosophy:'Winning, composure and a complete driving profile matter.'},
 mercedes:{pace:1.00,racecraft:.80,consistency:1.35,fitness:.75,wet:.70,feedback:1.25,results:.95,label:'Consistency + technical feedback',philosophy:'Precision, repeatability and engineering feedback carry extra weight.'},
 mclaren:{pace:1.05,racecraft:.95,consistency:.90,fitness:.65,wet:.70,feedback:1.35,results:.90,label:'Development + feedback',philosophy:'We value adaptable drivers who help develop the car.'},
 williams:{pace:.95,racecraft:1.15,consistency:.90,fitness:.70,wet:.75,feedback:.70,results:1.05,label:'Racecraft + opportunity conversion',philosophy:'Make the most of difficult cars and turn chances into results.'},
 alpine:{pace:1.20,racecraft:1.05,consistency:.70,fitness:.70,wet:.70,feedback:.65,results:1.20,label:'Pace + results',philosophy:'Performance now matters more than long-term polish.'},
 aston:{pace:.90,racecraft:.80,consistency:1.05,fitness:.75,wet:.75,feedback:1.30,results:.90,label:'Technical potential + consistency',philosophy:'Technical intelligence and dependable performance stand out.'},
 audi:{pace:1.00,racecraft:.90,consistency:1.10,fitness:.80,wet:.80,feedback:1.20,results:.95,label:'Balanced future potential',philosophy:'We are building for the future and value a rounded development profile.'}
};
function academyWeightedScore(a){
 let v=ACADEMY_VALUES[a.id]||ACADEMY_VALUES.audi,x=S.stats;
 let sum=v.pace+v.racecraft+v.consistency+v.fitness+v.wet+v.feedback;
 let skills=(x.pace*v.pace+x.racecraft*v.racecraft+x.consistency*v.consistency+x.fitness*v.fitness+x.wet*v.wet+x.feedback*v.feedback)/sum;
 let results=clamp(45+(S.career.wins||0)*5+(S.career.podiums||0)*2+(S.career.poles||0)*1.5,35,100);
 return clamp(skills*.55+S.rep*.25+results*.20*v.results,0,100)
}
function academyOfferTerms(a){
 let score=academyWeightedScore(a),leverage=clamp((score-58)/30,0,1);
 return {
  score:Math.round(score),
  signing:Math.round(8+S.series*3+leverage*18),
  rep:Math.round(2+leverage*5),
  standing:Math.round(58+leverage*22),
  fp1:score>=82&&S.series>=3,
  reserve:score>=78&&S.series>=2
 }
}
function openAcademyNegotiation(id){
 let a=F1_ACADEMIES.find(x=>x.id===id);if(!a||S.academy)return;
 let t=academyOfferTerms(a),v=ACADEMY_VALUES[id],box=$('academyNegotiationBox');if(!box)return;
 S.academyNegotiation={id,round:1,terms:t};
 box.innerHTML=`<div class="negotiationCard"><h3>${a.name} negotiation</h3><p><strong>${a.boss}</strong>: “${v.philosophy}”</p><p>They value: <strong>${v.label}</strong></p><div class="negTerms"><span>Evaluation <b>${t.score}/100</b></span><span>Signing funding <b>$${t.signing}k</b></span><span>Starting standing <b>${t.standing}%</b></span><span>Reputation <b>+${t.rep}</b></span>${t.reserve?'<span>Reserve pathway <b>Fast-track</b></span>':''}${t.fp1?'<span>FP1 pathway <b>Priority</b></span>':''}</div><div class="negActions"><button data-academy-deal="accept">Accept deal</button><button data-academy-deal="push">Push for better terms</button><button data-academy-deal="walk">Walk away</button></div><small>Pushing can improve funding and standing, but the academy may withdraw the offer.</small></div>`;
}
function academyDealAction(action){
 let n=S.academyNegotiation;if(!n)return;let a=F1_ACADEMIES.find(x=>x.id===n.id),t=n.terms;
 if(action==='walk'){S.academyNegotiation=null;notice(`You ended talks with ${a.name}.`);renderScouting();return}
 if(action==='push'){
   let chance=clamp(.68-(n.round-1)*.18+(t.score-72)*.008,.18,.82);
   if(Math.random()<chance){
     n.round++;t.signing+=ri(3,8);t.standing=clamp(t.standing+ri(2,5),0,90);t.rep+=1;
     notice(`${a.boss} improved the offer.`);openAcademyNegotiation(n.id);
   }else{S.academyNegotiation=null;S.academyDeclined=S.academyDeclined||{};S.academyDeclined[a.id]=S.round;notice(`${a.name} withdrew the offer after negotiations stalled.`);renderScouting()}
   save();return
 }
 if(action==='accept'){
   S.academy=a.id;S.academyStanding=t.standing;S.reserveRole=t.reserve?(ACADEMY_PATHS[a.id]?.junior||null):null;S.poachOffers=[];S.cash+=t.signing;S.rep=clamp(S.rep+t.rep,0,100);
   if(t.fp1)S.fp1Runs=(S.fp1Runs||0)+1;
   hist(`🎓 Negotiated and signed with ${a.name} • $${t.signing}k funding`);
   S.academyNegotiation=null;notice(`${a.name} deal signed. ${ACADEMY_VALUES[a.id].label} drove their evaluation.`);render();save()
 }
}

function academyInterest(a){
 let weighted=academyWeightedScore(a);
 let thresholdPenalty=Math.max(0,a.minRep-S.rep)*.8;
 if(S.series>=2)weighted+=4;if(S.series>=3)weighted+=5;
 return clamp(Math.round(weighted-thresholdPenalty),0,100)
}
function academyStatus(a){
 let i=academyInterest(a);
 if(S.academy===a.id)return'SIGNED';
 if(i>=72)return'Contract possible';
 if(i>=55)return'Watching closely';
 if(i>=38)return'On radar';
 return'Not watching'
}
function renderScouting(){
 let box=$('scoutingBox');if(!box)return;
 box.innerHTML=F1_ACADEMIES.map(a=>{let interest=academyInterest(a),status=academyStatus(a),signed=S.academy===a.id,v=ACADEMY_VALUES[a.id];
 return `<div class="scoutCard ${signed?'signed':''}"><div><strong>${a.name}</strong><small>${a.boss} • ${a.watch}</small><small>Values: ${v.label}</small></div><div class="interest"><span>${status}</span><b>${interest}%</b></div>${!S.academy&&interest>=72?`<button type="button" data-academy-negotiate="${a.id}">Negotiate contract</button>`:''}</div>`}).join('');
 let neg=$('academyNegotiationBox');if(neg&&!S.academyNegotiation)neg.innerHTML='<div class="muted">When an academy is interested enough, its team boss will negotiate terms with you here.</div>';
}
function signAcademy(id){
 let a=F1_ACADEMIES.find(x=>x.id===id);if(!a||S.academy)return;
 if(academyInterest(a)<72)return notice(`${a.name} is not ready to offer a deal yet.`);
 S.academy=a.id;S.academyStanding=70;S.reserveRole=null;S.poachOffers=[];S.cash+=12+S.series*4;S.rep=clamp(S.rep+4,0,100);
 hist(`🎓 Signed to ${a.name} under ${a.boss}`);notice(`${a.name} signed you to its junior programme. Funding and F1-team attention increased.`);render();save()
}
function academyPerformanceUpdate(finish,dnf){
 if(!S.academy)return;let a=F1_ACADEMIES.find(x=>x.id===S.academy);if(!a)return;
 let delta=dnf?-1.5:finish<=3?3:finish<=8?1.2:finish>14?-1:0;
 S.rep=clamp(S.rep+delta,0,100);
 if(!dnf&&finish<=5)S.cash+=2+S.series;
 if(Math.random()<.22)hist(`👀 ${a.boss} reviewed your ${dnf?'retirement':'P'+finish} for ${a.name}`)
}

const ACADEMY_PATHS={
 redbull:{feeder:'Racing Bulls',junior:'Red Bull-linked junior seat',f1:'Red Bull Racing'},
 ferrari:{feeder:'Ferrari-affiliated F2 seat',junior:'Ferrari reserve programme',f1:'Scuderia Ferrari'},
 mercedes:{feeder:'Mercedes-supported F2 seat',junior:'Mercedes reserve programme',f1:'Mercedes F1 Team'},
 mclaren:{feeder:'McLaren-supported junior seat',junior:'McLaren reserve programme',f1:'McLaren F1 Team'},
 williams:{feeder:'Williams-supported F2 seat',junior:'Williams reserve programme',f1:'Williams Racing'},
 alpine:{feeder:'Alpine-supported F2 seat',junior:'Alpine reserve programme',f1:'Alpine F1 Team'},
 aston:{feeder:'Aston Martin-supported junior seat',junior:'Aston Martin reserve programme',f1:'Aston Martin F1 Team'},
 audi:{feeder:'Audi-supported F2 seat',junior:'Audi reserve programme',f1:'Audi F1 Team'}
};
function academyStandingUpdate(finish,dnf){
 if(!S.academy)return;
 if(!Number.isFinite(S.academyStanding))S.academyStanding=70;
 let change=dnf?-5:finish===1?9:finish<=3?6:finish<=6?3:finish<=10?1:finish>=16?-4:-1;
 S.academyStanding=clamp(S.academyStanding+change,0,100);
 let a=F1_ACADEMIES.find(x=>x.id===S.academy),p=ACADEMY_PATHS[S.academy];
 if(S.academyStanding>=84&&S.series>=2&&!S.reserveRole){
   S.reserveRole=p.junior;S.cash+=8;S.rep=clamp(S.rep+3,0,100);
   hist(`🧪 ${a.name}: promoted into ${p.junior}`)
 }
 if(S.academyStanding>=90&&S.series>=3&&Math.random()<.32){
   S.fp1Runs=(S.fp1Runs||0)+1;S.rep=clamp(S.rep+2,0,100);S.cash+=4;
   hist(`🏎️ FP1 opportunity with ${p.f1} at ${cur().tracks[Math.min(S.round,cur().tracks.length-1)]}`)
 }
 if(S.academyStanding<25){
   hist(`❌ Dropped by ${a.name} after performance review`);
   S.academyEvents.unshift(`${a.boss} ended your academy contract.`);
   S.academy=null;S.reserveRole=null;S.academyStanding=70;
 }
}
function maybePoach(){
 if(!S.academy||S.series<2)return;
 let current=S.academy;
 let candidates=F1_ACADEMIES.filter(a=>a.id!==current&&academyInterest(a)>=76);
 if(!candidates.length||Math.random()>.28)return;
 let a=candidates.sort((a,b)=>academyInterest(b)-academyInterest(a))[0];
 if((S.poachOffers||[]).some(x=>x.id===a.id))return;
 S.poachOffers=S.poachOffers||[];S.poachOffers.push({id:a.id,name:a.name,boss:a.boss,interest:academyInterest(a)});
 hist(`📞 ${a.boss} has approached you about leaving your current academy for ${a.name}`)
}
function acceptPoach(id){
 let a=F1_ACADEMIES.find(x=>x.id===id);if(!a)return;
 let old=F1_ACADEMIES.find(x=>x.id===S.academy);
 S.academy=id;S.academyStanding=68;S.reserveRole=null;S.poachOffers=[];
 S.cash+=10+S.series*3;S.rep=clamp(S.rep+2,0,100);
 hist(`🔄 Left ${old?.name||'your academy'} and joined ${a.name}`);
 notice(`${a.boss} has signed you to ${a.name}.`);render();save()
}
function rejectPoach(id){
 let a=F1_ACADEMIES.find(x=>x.id===id);S.poachOffers=(S.poachOffers||[]).filter(x=>x.id!==id);
 if(a)hist(`🤝 Rejected ${a.name}'s approach and stayed loyal`);S.academyStanding=clamp((S.academyStanding||70)+3,0,100);render();save()
}
function renderAcademyCareer(){
 let box=$('academyCareerBox');if(!box)return;
 if(!S.academy){box.innerHTML='<div class="muted">Sign with an F1 junior academy to unlock team pathways, reserve roles, FP1 opportunities and poaching.</div>';return}
 let a=F1_ACADEMIES.find(x=>x.id===S.academy),p=ACADEMY_PATHS[S.academy],offers=S.poachOffers||[];
 box.innerHTML=`<div class="academyPath"><strong>${a.name}</strong><span>Boss: ${a.boss}</span><div class="standingBar"><i style="width:${S.academyStanding||70}%"></i></div><b>Academy standing ${Math.round(S.academyStanding||70)}%</b><p>${p.feeder} → ${p.junior} → ${p.f1}</p><p>Reserve role: <strong>${S.reserveRole||'Not yet'}</strong> • FP1 runs: <strong>${S.fp1Runs||0}</strong></p></div>`+
 offers.map(o=>`<div class="poach"><strong>Rival approach: ${o.name}</strong><span>${o.boss} wants to sign you.</span><button data-poach-accept="${o.id}">Join</button><button data-poach-reject="${o.id}">Stay loyal</button></div>`).join('')
}

function setTeamLivery(name){
 if(!TEAM_LIVERIES[name])return;S.teamLivery=name;renderTeamLivery();save()
}

function miniMapColour(d){
 if(d.player){
   let l=TEAM_LIVERIES[S.teamLivery]||TEAM_LIVERIES['Crimson GP'];
   return {a:l.a,b:l.b,label:'YOU'};
 }
 if(d.id===S.rival)return {a:'#ff2d55',b:'#ffffff',label:'RIVAL'};
 let tier=S.field?.find(x=>x.id===d.id)?.teamTier??0;
 let palette=[['#7c3aed','#c4b5fd'],['#0284c7','#bae6fd'],['#16a34a','#bbf7d0']];
 return {a:palette[tier][0],b:palette[tier][1],label:''}
}

function renderTeamLivery(){
 let holder=$('teamLiveryChoices'),carEl=$('teamLiveryCar');
 if(!holder||!carEl)return;
 if(!S.teamLivery||!TEAM_LIVERIES[S.teamLivery])S.teamLivery='Crimson GP';
 let current=TEAM_LIVERIES[S.teamLivery];
 carEl.style.setProperty('--car-a',current.a);carEl.style.setProperty('--car-b',current.b);
 holder.innerHTML=Object.entries(TEAM_LIVERIES).map(([name,l])=>`<button type="button" class="liveryChoice ${S.teamLivery===name?'selected':''}" data-team-livery="${name}"><span class="swatch" style="--a:${l.a};--b:${l.b}"></span><strong>${name}</strong>${S.teamLivery===name?'<small>Selected</small>':''}</button>`).join('')
}

const LIVERIES={Crimson:{a:'#d7263d',b:'#171717'},Azure:{a:'#1976d2',b:'#e9eef5'},Emerald:{a:'#168a5b',b:'#101820'},Gold:{a:'#d4a017',b:'#202020'},Violet:{a:'#7541c8',b:'#111318'},Papaya:{a:'#ef7d00',b:'#1c1c1c'},Silver:{a:'#b9c0c8',b:'#24272c'},Arctic:{a:'#f1f5f9',b:'#1e3a5f'}};
function renderLivery(){let sel=$('liverySelect');if(!sel)return;sel.value=S.livery||'Crimson';let l=LIVERIES[S.livery]||LIVERIES.Crimson,car=$('liveryCar');if(car){car.style.setProperty('--car-a',l.a);car.style.setProperty('--car-b',l.b)}}
function setLivery(v){if(!LIVERIES[v])return;S.livery=v;renderLivery();save()}


function updateDebugPanel(extra=''){
 let b=$('debugState');if(!b)return;
 let raceState=S.race?`race object: yes, lap ${S.race.lap??'?'}`:'race object: no';
 b.textContent=`phase=${S.phase} | grid=${S.grid??'none'} | ${raceState}${extra?' | '+extra:''}`;
}
function forceRaceRecovery(){
 try{
   if(!S.grid&&S.lastQual?.all){
     let p=S.lastQual.all.findIndex(x=>x.player);
     if(p>=0)S.grid=p+1;
   }
   if(!S.grid){notice('Recovery: no qualifying grid exists. Run qualifying first.');updateDebugPanel('no grid');return}
   S.race=null;S.phase=S.sprint?'sprint':'race';
   save();updateDebugPanel('repaired; starting');
   startRace();
   updateDebugPanel(S.race?'race started':'startRace returned without race');
 }catch(err){
   console.error(err);notice('Race start error: '+err.message);updateDebugPanel('ERROR: '+err.message);
 }
}
window.addEventListener('error',e=>{let msg=e.error?.message||e.message||'unknown error';let b=$('debugError');if(b)b.textContent='JavaScript error: '+msg;});
window.addEventListener('unhandledrejection',e=>{let msg=e.reason?.message||String(e.reason);let b=$('debugError');if(b)b.textContent='Promise error: '+msg;});


const PRESEASON_FOCUS={
 aero:{name:'Aerodynamics',desc:'Front wing, rear wing, floor and sidepod development',dev:'frontWing'},
 power:{name:'Power unit',desc:'Acceleration and straight-line performance',dev:'engine'},
 reliability:{name:'Reliability',desc:'Reduce mechanical failures and improve durability',dev:'reliability'},
 pit:{name:'Pit operations',desc:'Pit-stop execution and race-team procedures',dev:'pit'},
 balanced:{name:'Balanced programme',desc:'Smaller gains across the whole car',dev:null}
};
function initPreseason(){
 if(S.preseason&&S.preseason.season===S.season)return;
 S.preseason={season:S.season,active:true,days:3,completed:0,focus:'balanced',ai:S.field.map(d=>({id:d.id,focus:['aero','power','reliability','balanced'][ri(0,3)],gain:0})),report:[]};
}
function preseasonGain(focus,quality){
 let q=clamp(quality/100,.45,1.05),g={frontWing:0,rearWing:0,floor:0,sidepods:0,suspension:0,brakes:0,engine:0,gearbox:0,cooling:0,reliability:0,pit:0};
 if(focus==='balanced'){g.frontWing=rnd(.10,.25)*q;g.rearWing=rnd(.10,.22)*q;g.floor=rnd(.12,.28)*q;g.sidepods=rnd(.08,.20)*q;g.suspension=rnd(.08,.20)*q;g.engine=rnd(.12,.28)*q;g.reliability=rnd(.10,.22)*q;g.pit=rnd(.06,.15)*q}
 else if(focus==='aero'){g.frontWing=rnd(.25,.55)*q;g.rearWing=rnd(.22,.50)*q;g.floor=rnd(.35,.70)*q;g.sidepods=rnd(.20,.45)*q}else g[PRESEASON_FOCUS[focus].dev]=rnd(.9,1.8)*q;
 return g
}
function runPreseasonDay(){
 initPreseason();let p=S.preseason;if(!p.active||p.completed>=p.days)return;
 let focus=$('preseasonFocus')?.value||p.focus||'balanced';p.focus=focus;
 let quality=clamp(S.stats.feedback*.45+S.stats.consistency*.20+car()*.25+S.morale*.10,35,99),g=preseasonGain(focus,quality);
 Object.keys(g).forEach(k=>S.dev[k]=clamp((S.dev[k]||0)+g[k],0,18));
 p.report.unshift(`Day ${p.completed+1}: ${PRESEASON_FOCUS[focus].name} produced ${Object.values(g).reduce((a,b)=>a+b,0).toFixed(1)} development points.`);
 p.ai.forEach(x=>{let d=S.field.find(z=>z.id===x.id);if(d){let gain=x.focus==='balanced'?rnd(.35,.85):rnd(.7,1.45);d.car=clamp(d.car+gain,35,99);x.gain+=gain}});
 p.completed++;
 if(p.completed>=p.days){p.active=false;S.preseasonHistory.unshift({season:S.season,focus:p.focus,report:[...p.report]});hist(`🧪 Pre-season testing complete • ${PRESEASON_FOCUS[p.focus].name} focus`);notice('Pre-season testing complete. The grid has developed before Round 1.')}
 else notice(`Testing day ${p.completed}/${p.days} complete. You can change focus for the next day.`);
 render();save()
}
function skipPreseason(){
 initPreseason();let p=S.preseason;if(!p.active)return;
 while(p.completed<p.days){let g=preseasonGain(p.focus||'balanced',55);Object.keys(g).forEach(k=>S.dev[k]=clamp((S.dev[k]||0)+g[k]*.72,0,18));p.ai.forEach(x=>{let d=S.field.find(z=>z.id===x.id);if(d)d.car=clamp(d.car+rnd(.35,.95),35,99)});p.completed++}
 p.active=false;hist('🧪 Pre-season testing simulated');notice('Pre-season testing simulated.');render();save()
}
function renderPreseason(){
 let box=$('preseasonBox');if(!box)return;
 if(S.round!==0||S.phase!=='practice'){box.innerHTML='<div class="muted">Pre-season testing is available before the opening round of each season.</div>';return}
 initPreseason();let p=S.preseason,f=PRESEASON_FOCUS[p.focus]||PRESEASON_FOCUS.balanced;
 if(!p.active){box.innerHTML=`<div class="preseasonDone"><strong>Testing complete</strong><span>${f.name} was the final programme.</span>${p.report.slice(0,3).map(x=>`<small>${x}</small>`).join('')}</div>`;return}
 box.innerHTML=`<div class="preseasonHead"><div><strong>Pre-season test • Day ${p.completed+1}/${p.days}</strong><small>Use testing to shape the car before Round 1. Rival teams are developing too.</small></div><span>${3-p.completed} days remaining</span></div><label>Testing focus<select id="preseasonFocus">${Object.entries(PRESEASON_FOCUS).map(([k,v])=>`<option value="${k}" ${p.focus===k?'selected':''}>${v.name}</option>`).join('')}</select></label><p class="muted">${f.desc}. Driver feedback and consistency affect development quality.</p><div class="preseasonActions"><button type="button" id="preseasonRunBtn">Run testing day</button><button type="button" id="preseasonSkipBtn">Simulate remaining test</button></div>${p.report.length?`<div class="testReport">${p.report.slice(0,3).map(x=>`<small>${x}</small>`).join('')}</div>`:''}`;
}

function render(){updateDebugPanel();if(S.phase==='practice'&&!Number.isFinite(S.practice))S.practice=3;if(!S.seasonObjectives)generateSeasonObjectives();ensure();let c=cur(),track=c.tracks[S.round]||'Season complete';$('hudDriver').textContent=S.name;$('hudSeries').textContent=c.name;$('hudSeason').textContent=S.season;$('hudRound').textContent=(S.round+1)+'/'+c.rounds;$('hudPoints').textContent=S.points;$('hudRep').textContent=Math.round(S.rep);$('hudCash').textContent=fmt(S.cash);$('hudSL').textContent=Math.round(S.superLicence)+'/40';$('trackTitle').textContent=track;$('trackMeta').textContent=trackType(track)+' circuit • '+c.laps+' laps'+(S.sprint?' • Sprint weekend':'');$('weatherLabel').textContent=S.weather==='Dry'?'☀️ Dry':S.weather==='Wet'?'🌧️ Wet':'🌦️ Mixed';$('weatherForecast').textContent=S.forecast;$('practiceLeft').textContent=S.practice+' sessions left';if($('carSetup'))$('carSetup').value=S.setup||'Balanced';if($('setupAdvice'))$('setupAdvice').textContent=setupText();renderObjectives();renderPreseason();renderLivery();renderTeamLivery();renderScouting();renderAcademyCareer();renderFuelLoad();renderPhases();renderTraining();renderDriver();renderStandings();renderTeam();renderHistory();renderRace();renderQual();;renderRacePreview();renderRaceReview();renderFactory();renderFinances();renderManagement()}
function renderPhases(){let phases=['Practice',S.series===4?'Q1/Q2/Q3':'Qualifying',S.sprint?'Sprint':'Race','Race'];if(!S.sprint)phases=['Practice',S.series===4?'Q1/Q2/Q3':'Qualifying','Race'];let current=S.phase;let done={practice:['qualifying','sprint','race','finished'].includes(current),qualifying:['sprint','race','finished'].includes(current),sprint:['race','finished'].includes(current),race:current==='finished'};$('phaseStrip').innerHTML=phases.map(p=>{let key=p.startsWith('Q')||p==='Qualifying'?'qualifying':p.toLowerCase();return`<span class="phase ${done[key]?'done':''} ${current===key?'active':''}">${done[key]?'✓ ':''}${p}</span>`}).join('')}
function renderTraining(){let items=[['pace','🏎️ Pace','Raw speed'],['racecraft','⚔️ Racecraft','Overtaking/defence'],['consistency','🎯 Consistency','Fewer mistakes'],['fitness','💪 Fitness','Race endurance'],['wet','🌧️ Wet skill','Rain pace'],['feedback','🧠 Feedback','Setup/development']];$('trainingGrid').innerHTML=items.map(x=>`<button type="button" data-train="${x[0]}" ${S.phase!=='practice'||S.practice<=0?'disabled':''}>${x[1]}<small>${x[2]} • ${fmt(TRAIN[x[0]].cost)}</small></button>`).join('')}
function train(k){
 if(S.phase!=='practice')return notice('Driver development is available during practice.');
 if(S.practice<=0)return notice('Practice is complete. Proceed to qualifying.');
 let item=TRAIN[k];if(!item)return;
 let paid=S.cash>=item.cost,gain=paid?rnd(.25,.70):rnd(.08,.22);
 if(paid)S.cash-=item.cost;
 S.stats[k]=clamp(S.stats[k]+gain,35,99);
 S.practice--;
 hist(`${paid?'Training':'Basic practice'}: ${item.name} +${gain.toFixed(1)}`);
 notice(`${item.name} improved by ${gain.toFixed(1)}.${paid?'':' Free basic session used.'}`);
 if(S.practice<=0)S.phase='qualifying';
 render();save()
}
function baseQualLap(){return [52,94,91,90,88][S.series]||90}
function qualAbility(d,isPlayer){let wet=S.weather==='Wet'?.22:S.weather==='Mixed'?.1:0;if(isPlayer)return S.stats.pace*.43+(S.driverTraits?.includes('qualifier')?1.2:0)+S.stats.consistency*.12+car()*.34+S.stats.wet*wet+S.morale*.02+setupEffect()*2.2+(S.setupConfidence||35)*.012;return d.skill*.52+d.cons*.12+d.car*.31+d.wet*wet}
function createQualLap(d,isPlayer){let ability=qualAbility(d,isPlayer),base=baseQualLap()+(S.weather==='Wet'?8:S.weather==='Mixed'?3:0),lap=base+(82-ability)*.095+rnd(-.42,.42);let s1=lap*(.31+rnd(-.004,.004)),s2=lap*(.36+rnd(-.004,.004)),s3=lap-s1-s2;return{player:isPlayer,id:isPlayer?'player':d.id,name:isPlayer?S.name:d.name,lap,s1,s2,s3,ability}}
function qualSession(){if(S.phase!=='qualifying')return;let all=[createQualLap(null,true),...S.field.map(d=>createQualLap(d,false))].sort((a,b)=>a.lap-b.lap);let best=all[0].lap,prev=null;all.forEach((d,i)=>{d.pos=i+1;d.gap=d.lap-best;d.interval=prev?d.lap-prev.lap:0;prev=d});let bestS1=Math.min(...all.map(x=>x.s1)),bestS2=Math.min(...all.map(x=>x.s2)),bestS3=Math.min(...all.map(x=>x.s3));all.forEach(d=>{d.bestS1=Math.abs(d.s1-bestS1)<.0005;d.bestS2=Math.abs(d.s2-bestS2)<.0005;d.bestS3=Math.abs(d.s3-bestS3)<.0005});S.lastQual={session:S.series===4?'Q'+(S.qualStage+1):'Qualifying',all};S.qualHistory.push({track:cur().tracks[S.round],session:S.lastQual.session,all:all.map(x=>({...x}))});if(S.series===4){S.qualStage++;let p=all.findIndex(x=>x.player)+1;if((S.qualStage===1&&p>15)||(S.qualStage===2&&p>10)||S.qualStage===3){S.grid=p;finishQual(all)}else{notice(`Advanced to Q${S.qualStage+1}.`);renderQualTable(all.slice(0,S.qualStage===1?15:10));renderQual();save();return}}else{S.grid=all.findIndex(x=>x.player)+1;finishQual(all)}}
function finishQual(all){
 if(S.grid===1){S.career.poles++;hist('⏱️ Pole position at '+cur().tracks[S.round])}
 // Qualifying creates a fresh race-ready state. Never let an old/stale race object keep Start Race disabled.
 S.race=null;
 S.phase=S.sprint?'sprint':'race';
 renderQualTable(all);
 notice(`Qualified P${S.grid}. Choose your race strategy, then start the ${S.sprint?'sprint':'race'}.`);
 render();updateDebugPanel('qualifying complete');save();
 // Explicitly restore the button after the full render cycle.
 if($('raceBtn')){$('raceBtn').disabled=false;$('raceBtn').textContent=S.sprint?'Start sprint':'Start race'}
}
function sectorClass(v,best){return best?'sector best':'sector'}
function renderQualTable(all){if(!all)return;$('qualResults').innerHTML='<table><tr><th>Pos</th><th>Driver</th><th>Best lap</th><th>Gap</th><th>Interval</th><th>S1</th><th>S2</th><th>S3</th></tr>'+all.map((d,i)=>`<tr class="${d.player?'you':''}"><td>P${i+1}</td><td>${d.name}</td><td>${lapTimeFmt(d.lap)}</td><td>${i===0?'POLE':'+'+d.gap.toFixed(3)+'s'}</td><td>${i===0?'—':'+'+d.interval.toFixed(3)+'s'}</td><td class="${sectorClass(d.s1,d.bestS1)}">${d.s1.toFixed(3)}</td><td class="${sectorClass(d.s2,d.bestS2)}">${d.s2.toFixed(3)}</td><td class="${sectorClass(d.s3,d.bestS3)}">${d.s3.toFixed(3)}</td></tr>`).join('')+'</table>'}
function renderQual(){$('qualTitle').textContent=S.series===4?`F1 Qualifying ${S.phase==='qualifying'?'- Q'+(S.qualStage+1):''}`:'Qualifying';$('qualBadge').textContent=S.grid?'P'+S.grid:(S.phase==='qualifying'?'Ready':'Not run');$('gridBadge').textContent=S.grid?'Grid P'+S.grid:'No grid';$('qualBtn').disabled=!['practice','qualifying'].includes(S.phase);$('qualBtn').textContent=S.phase==='practice'?'Skip remaining practice → Qualifying':'Run qualifying session';$('raceBtn').disabled=!(S.grid&&(S.phase==='race'||S.phase==='sprint'))||!!(S.race&&S.race.lap>0);$('raceBtn').textContent=S.phase==='sprint'?'Start sprint':'Start race';if(S.lastQual&&S.phase!=='qualifying')renderQualTable(S.lastQual.all);renderStrategyAdvice()}
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

function startRace(){
 if(!S.grid){notice('No qualifying grid found. Run qualifying first.');return}
 if(S.phase!=='race'&&S.phase!=='sprint'){
   // A valid grid means qualifying is complete; repair a stale phase automatically.
   S.phase=S.sprint?'sprint':'race';
 }
 // If a stale zero-lap race object survived an older save, discard it.
 if(S.race&&(!Array.isArray(S.race.racers)||S.race.lap===0))S.race=null;
 let laps=S.phase==='sprint'?Math.max(10,Math.round(cur().laps*.32)):cur().laps;let startWet=weatherAtProgress(0,S.weatherPlan),tyre=$('startTyre').value,bestWet=bestTyreForWetness(startWet);if(bestWet&&TYRES[tyre]?.dry)tyre=bestWet;S.setup=$('carSetup').value||S.setup||'Balanced';let racers=[makePlayerRacer(tyre),...S.field.map((d,i)=>makeAIRacer(d,i,laps,startWet))];let playerFuel=selectedFuelLoad();racers.find(x=>x.player).fuel=playerFuel;racers.sort((a,b)=>a.pos-b.pos);S.race={lap:0,laps,racers,sc:0,red:false,weather:weatherLabelFromWetness(startWet),wetness:startWet,lastWetness:startWet,weatherPlan:{...(S.weatherPlan||WEATHER_PROFILES[0])},feed:[],pending:null,sprint:S.phase==='sprint',baseLap:[55,96,93,92,90][S.series],pitHistory:[],fastest:null,sectorBest:{s1:null,s2:null,s3:null},strategyStart:{grid:S.grid,tyre,risk:$('risk').value,ers:$('ers').value,fuel:$('fuel').value,paceMode:$('paceMode').value,setup:S.setup,fuelLoad:playerFuel}};feed('🏁 '+(S.phase==='sprint'?'Sprint':'Race')+' started from P'+S.grid+' • '+S.setup+' setup.');$('raceBtn').disabled=true;renderRace();save()}
function makePlayerRacer(tyre){return{player:true,id:'player',name:S.name,pos:S.grid,startPos:S.grid,skill:S.stats.pace*.25+S.stats.racecraft*.3+S.stats.consistency*.16+car()*.29,wet:S.stats.wet,cons:S.stats.consistency,car:car(),tyre,wear:0,gap:0,damage:0,pits:0,dnf:false,totalTime:(S.grid-1)*.18,lastLap:null,sectors:null,team:team()[0],lastPit:-99,compoundHistory:[tyre],fuel:100,ers:100,lastMode:'Balanced'}}
function makeAIRacer(d,i,laps,startWet=0){let pos=i+1+(i>=S.grid?1:0),wetTyre=bestTyreForWetness(startWet),tyre;if(wetTyre)tyre=wetTyre;else if(laps<=18)tyre=Math.random()<.55?'Soft':'Medium';else if(laps<=32)tyre=Math.random()<.68?'Medium':'Soft';else tyre=Math.random()<.68?'Medium':'Hard';return{id:d.id,name:d.name,pos,startPos:pos,skill:d.skill*.48+d.cons*.15+d.car*.37,wet:d.wet,cons:d.cons,car:d.car,tyre,wear:0,gap:0,damage:0,pits:0,dnf:false,totalTime:(pos-1)*.18,lastLap:null,sectors:null,team:cur().teams[d.teamTier||0][0],lastPit:-99,compoundHistory:[tyre],fuel:100,ers:rnd(76,100),lastMode:'Balanced'}}
function advance(n=1){
 if(!S.race)return;
 if(S.race.lap>=S.race.laps){finishRace();render();save();return}
 for(let i=0;i<n&&S.race&&S.race.lap<S.race.laps;i++){
   if(S.race.pending)break;
   simLap();
 }
 if(S.race&&S.race.lap>=S.race.laps)finishRace();
 renderRace();render();save()
}

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


function selectedPitTyre(){let el=$('pitTyre');return el?.value||'Medium'}
function requestManualPit(){
 let r=S.race;
 if(!r){notice('Start the race before calling a pit stop.');return}
 let p=r.racers?.find(x=>x.player);
 if(!p||p.dnf){notice('Pit stop unavailable.');return}
 if(r.lap>=r.laps){notice('The race has finished.');return}
 let tyre=selectedPitTyre();
 if(p.pitRequested){
   p.pitRequested=false;p.requestedTyre=null;
   feed('📻 Pit call cancelled — stay out.');
   notice('Pit call cancelled. You will stay out.');
 }else{
   p.pitRequested=true;p.requestedTyre=tyre;
   feed(`📻 BOX BOX — ${tyre}s requested for the end of lap ${r.lap+1}.`);
   notice(`BOX BOX: ${tyre}s queued for the end of the next lap.`);
 }
 renderRace();save()
}
function executeManualPit(r,p){
 if(!p.pitRequested||p.dnf)return 0;
 if(p.lastManualPitLap===r.lap)return 0;
 let tyre=p.requestedTyre||'Medium',loss=pitLossEstimate()*(r.sc?0.58:1);
 loss+=repairPitDamage(r,p);
 p.lastManualPitLap=r.lap;p.tyre=tyre;p.wear=0;p.pits++;p.lastPit=r.lap;p.compoundHistory.push(tyre);
 p.totalTime+=loss;p.pitRequested=false;p.requestedTyre=null;
 r.pitHistory=r.pitHistory||[];
 r.pitHistory.push({lap:r.lap,driver:p.name,tyre,loss,manual:true});
 feed(`🔧 Lap ${r.lap}: ${p.name} BOX • ${tyre}s • ${loss.toFixed(1)}s${r.sc?' under Safety Car':''}.`);
 notice(`Pit stop complete: ${tyre}s fitted.`);
 return loss
}



function expectedRacePosition(d,r){
 let active=r.racers.filter(x=>!x.dnf);
 let ranked=[...active].sort((a,b)=>{
   let ap=(a.skill||70)*.58+(a.player?car():(a.car||70))*.42;
   let bp=(b.skill||70)*.58+(b.player?car():(b.car||70))*.42;
   return bp-ap
 });
 return Math.max(1,ranked.findIndex(x=>x.id===d.id)+1)
}
function ensureConfidence(d,r){
 if(!Number.isFinite(d.confidence))d.confidence=50;
 let expected=expectedRacePosition(d,r),actual=d.pos||expected,delta=expected-actual;
 let target=50+delta*5;
 if(actual<=3)target+=4;
 if(d.lastMode==='Push'||d.lastMode==='Attack')target+=1;
 if(d.dnf)target=15;
 d.confidence=clamp(d.confidence+(target-d.confidence)*.16,15,95);
 d.expectedPos=expected;
 return d.confidence
}
function confidencePaceBonus(d,r){
 let c=ensureConfidence(d,r);
 return clamp((c-50)*.022,-.70,.95)
}
function confidenceLabel(c){
 return c>=80?'Flying':c>=65?'High':c>=50?'Settled':c>=35?'Low':'Struggling'
}

function driverTyreStyle(d){
 let racecraft=d.player?S.stats.racecraft:(d.skill||70),cons=d.player?S.stats.consistency:(d.cons||d.skill||68);
 let base=1.08-(racecraft*.0025+cons*.0018);
 let style=d.player?(S.paceMode||'Balanced'):(d.mode||'Balanced');
 let mod=style==='Attack'?1.28:style==='Push'?1.14:style==='Conserve'?.78:1;
 return clamp(base*mod,.68,1.32)
}
function ensureDamage(d){
 if(!d.damage)d.damage={frontWing:0,sidepod:0,floor:0,suspension:0};
 return d.damage
}
function damagePacePenalty(d){
 let x=ensureDamage(d);
 return x.frontWing*.055+x.sidepod*.045+x.floor*.04+x.suspension*.075;
}
function damageLabel(d){
 let x=ensureDamage(d),parts=[['FW',x.frontWing],['SP',x.sidepod],['FL',x.floor],['SU',x.suspension]].filter(a=>a[1]>0);
 if(!parts.length)return 'OK';
 return parts.map(([n,v])=>`${n} ${Math.round(v)}%`).join(' · ')
}
function inflictDamage(d,part,amount,r){
 let x=ensureDamage(d);x[part]=clamp(x[part]+amount,0,100);d.confidence=clamp((d.confidence||50)-Math.max(2,amount*.18),15,95);
 let names={frontWing:'front wing',sidepod:'sidepod',floor:'floor',suspension:'suspension'};
 if(d.player||Math.random()<.22)feed(`💥 Lap ${r.lap}: ${d.name} has ${names[part]} damage (${Math.round(x[part])}%).`);
 if(x.suspension>=82||x.sidepod>=94){d.dnf=true;d.status='DNF — accident damage';feed(`⛔ ${d.name} retires with accident damage.`)}
}
function raceDamageEvents(r,d){
 if(d.dnf)return;
 let aggression=d.player?(S.paceMode==='Attack'?.010:S.paceMode==='Push'?.005:.0025):.0035;
 let wearRisk=(d.wear||0)>82?.005:0;
 let wetRisk=(r.wetness||0)>45?.0035:0;
 if(Math.random()<aggression+wearRisk+wetRisk){
   let roll=Math.random(),part=roll<.46?'frontWing':roll<.72?'sidepod':roll<.91?'floor':'suspension';
   inflictDamage(d,part,ri(8,part==='suspension'?28:38),r)
 }
}
function repairPitDamage(r,p){
 let x=ensureDamage(p),extra=0,notes=[];
 if(x.frontWing>=8){extra+=5+rnd(1,3);notes.push('front wing');x.frontWing=0}
 if(x.sidepod>0){let fix=Math.min(x.sidepod,ri(5,14));x.sidepod-=fix;if(fix>0){extra+=rnd(1,3);notes.push('sidepod check')}}
 if(notes.length)feed(`🛠️ ${p.name}: ${notes.join(' + ')} during pit stop (+${extra.toFixed(1)}s).`);
 return extra
}


function applyRacePenalty(d,seconds,reason,r){
 d.penalties=(d.penalties||0)+seconds;d.totalTime+=seconds;
 feed(`⚖️ ${d.name}: +${seconds}s penalty — ${reason}.`);
}
function contextualRaceEvents(r){
 let active=r.racers.filter(x=>!x.dnf).sort((a,b)=>a.totalTime-b.totalTime);
 for(let i=1;i<active.length;i++){
   let a=active[i-1],b=active[i],gap=Math.abs((b.totalTime||0)-(a.totalTime||0));
   if(gap>1.15)continue;
   let aggression=x=>x.player?(S.paceMode==='Attack'?1.55:S.paceMode==='Push'?1.25:S.paceMode==='Conserve'?.65:1):clamp((x.skill||70)/72,.75,1.3);
   if(Math.random()<.0048*aggression(a)*aggression(b)){
     let severity=Math.random();
     if(severity<.48){
       let victim=Math.random()<.5?a:b;
       victim.totalTime+=rnd(3,8);victim.wear=clamp(victim.wear+rnd(2,7),0,100);victim.confidence=clamp((victim.confidence||50)-6,15,95);
       feed(`↪️ Lap ${r.lap}: ${victim.name} spins after close racing and loses time.`);
     }else{
       let culprit=Math.random()<.5?a:b,other=culprit===a?b:a;
       inflictDamage(culprit,'frontWing',ri(8,28),r);
       inflictDamage(other,Math.random()<.7?'sidepod':'floor',ri(5,22),r);
       feed(`💥 Lap ${r.lap}: contact between ${culprit.name} and ${other.name}.`);
       if(Math.random()<.35)applyRacePenalty(culprit,5,'causing a collision',r);
       if(severity>.9){r.sc=Math.max(r.sc||0,ri(2,4));feed('🚨 SAFETY CAR deployed for debris and recovery.')}
       else if(severity>.72){r.vsc=Math.max(r.vsc||0,ri(1,2));feed('🟡 VIRTUAL SAFETY CAR — debris on circuit.')}
     }
   }
 }
 // Lock-ups and punctures become more likely with aggressive driving / extreme tyre wear.
 active.forEach(d=>{
   let ag=d.player?(S.paceMode==='Attack'?1.8:S.paceMode==='Push'?1.3:.8):1;
   if(Math.random()<.0025*ag){d.totalTime+=rnd(.8,2.6);d.wear=clamp(d.wear+rnd(3,8),0,100);feed(`🔒 Lap ${r.lap}: ${d.name} locks up and flat-spots the tyres.`)}
   if((d.wear||0)>88&&Math.random()<.012+((d.wear-88)*.003)){
     d.wear=100;d.totalTime+=rnd(5,12);d.puncture=true;feed(`🛞 Lap ${r.lap}: ${d.name} has a puncture!`);
     if(Math.random()<.2)inflictDamage(d,'floor',ri(5,18),r);
   }
 });
}
function aiDamageStrategy(r){
 r.racers.filter(d=>!d.player&&!d.dnf).forEach(d=>{
   let x=ensureDamage(d),pen=damagePacePenalty(d),needs=x.frontWing>=18||d.puncture||pen>=1.25;
   if(needs&&!d.pitRequested){
     d.pitRequested=true;d.requestedTyre=bestTyreForWetness(r.wetness||0);
   }
   if(d.pitRequested){
     let loss=pitLossEstimate()*(r.sc?0.58:r.vsc?.72:1);
     loss+=repairPitDamage(r,d);
     d.totalTime+=loss;d.tyre=d.requestedTyre||'Medium';d.wear=0;d.pits++;d.lastPit=r.lap;d.compoundHistory.push(d.tyre);
     d.pitRequested=false;d.requestedTyre=null;d.puncture=false;
     r.pitHistory.push({lap:r.lap,driver:d.name,tyre:d.tyre,loss,damage:true});
     feed(`🔧 ${d.name} pits for repairs and ${d.tyre}s.`);
   }
 })
}

function simLap(){
 let r=S.race;if(!r)return;let prePlayer=r.racers.find(x=>x.player),prePlayerPos=prePlayer?.pos||S.grid||20;r.lap++;if(r.sc>0)r.sc--;
 let progress=r.lap/r.laps;r.lastWetness=r.wetness;r.wetness=weatherAtProgress(progress,r.weatherPlan);r.weather=weatherLabelFromWetness(r.wetness);
 if(r.lap>1&&r.lap%Math.max(4,Math.round(r.laps/5))===0&&!r.pending){let eng=S.staff?.engineer?.rating||50;if(Math.random()<.35+eng/250)feed(`🎧 Engineer: ${rainChanceNow(r)>55?'Rain risk rising — watch the crossover.':r.wetness>30?'Track is evolving — tyre temperatures are critical.':'Gap and tyre life look stable. Consider the undercut window.'}`)}
 let deltaWet=r.wetness-r.lastWetness;if(Math.abs(deltaWet)>5){feed(deltaWet>0?'🌧️ Rain increasing • track wetness '+Math.round(r.wetness)+'%.':'🌤️ Track drying • wetness '+Math.round(r.wetness)+'%.')}
 let cross=bestTyreForWetness(r.wetness),prevCross=bestTyreForWetness(r.lastWetness);if(cross!==prevCross&&!r.pending){if(cross)radio('Tyre crossover',`${cross}s are now estimated faster. Track wetness ${Math.round(r.wetness)}%.`,[['Box for '+cross,'pit:'+cross],['Stay out','stay']]);else radio('Slick crossover','The track is drying. Slicks are now estimated faster.',[['Box for Mediums','pit:Medium'],['Stay out','stay']])}
 let riskVal={Low:-.35,Medium:0,High:.45}[$('risk').value]||0;
 let paceName=$('paceMode').value,ersMode=$('ers').value,fuelMode=$('fuel').value;
 let paceCfg={Conserve:{bonus:-.45,wear:.70,mistake:.68,fuel:.90,ersUse:-5},Balanced:{bonus:0,wear:1,mistake:1,fuel:1,ersUse:1},Push:{bonus:.48,wear:1.32,mistake:1.22,fuel:1.12,ersUse:7},Attack:{bonus:.78,wear:1.58,mistake:1.45,fuel:1.24,ersUse:12}}[paceName]||{bonus:0,wear:1,mistake:1,fuel:1,ersUse:1};
 let setupBonus=setupEffect(S.setup||'Balanced');
 r.racers.forEach(d=>{
 d._wearBefore=d.wear||0;
 if(d.player&&S.driverTraits?.includes('tyres'))d.wear=Math.max(0,(d.wear||0)-.12);
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
   let driverPerf=d.skill;
   let carPerf=d.player?car():d.car;
   let confBonus=confidencePaceBonus(d,r);let perf=driverPerf*.58+carPerf*.42+t.pace-tyrePenalty+weatherPenalty+wetBonus+confBonus+rnd(-.85,.85)-damagePacePenalty(d)*3.2;
   if(isP)perf+=riskVal+cfg.bonus+resourceBonus+setupBonus-resourcePenalty-fuelMassPenalty;
   else perf+=resourceBonus-resourcePenalty;
   let lapTime=r.baseLap+(82-perf)*.145+rnd(-.22,.22)+(r.wetness*.095);
   if(r.sc)lapTime=r.baseLap+17+rnd(-.15,.15);

   let wrongTyreRisk=wetMistakeRisk(d.tyre,r.wetness),errBase=.003+(65-d.cons)*.00045+(isP&&$('risk').value==='High'?.007:0)+wrongTyreRisk,err=clamp(errBase*(isP?cfg.mistake:1),.001,.08);
   if(Math.random()<err){if(Math.random()<.28){d.dnf=true;d.lastLap=null;feed('💥 '+d.name+' crashed and retired.');if(Math.random()<.45){r.sc=ri(2,4);feed('🚨 Safety Car deployed.')}}else{let lost=rnd(2.5,9);inflictDamage(d,Math.random()<.55?'frontWing':'floor',ri(4,18),r);lapTime+=lost;feed('⚠️ '+d.name+' made a mistake and lost '+lost.toFixed(1)+'s.')}}
   let mech=(100-(isP?rel():Math.min(96,d.car+8)))*.00035;if(Math.random()<mech){d.dnf=true;d.lastLap=null;feed('🔧 '+d.name+' retired with a mechanical failure.')}
   if(!d.dnf){d.lastLap=Math.max(1,lapTime);d.totalTime+=d.lastLap;updateFastest(d)}
 });
 
 r.racers.forEach(d=>{
   if(d.dnf)return;
   ensureDamage(d);
   let tyreStyle=driverTyreStyle(d);
   // Driver style modifies the wear accumulated this lap, making smooth drivers kinder to tyres.
   if(Number.isFinite(d.wear)){let delta=Math.max(0,d.wear-(d._wearBefore??d.wear));d.wear=clamp((d._wearBefore??d.wear)+delta*tyreStyle,0,100)}
   d.totalTime+=damagePacePenalty(d);
   raceDamageEvents(r,d);
   delete d._wearBefore;
 });

 contextualRaceEvents(r);aiDamageStrategy(r);
 let playerForPit=r.racers.find(x=>x.player);if(playerForPit&&!playerForPit.dnf)executeManualPit(r,playerForPit);
 if(r.vsc){r.racers.filter(x=>!x.dnf).forEach(x=>x.totalTime+=rnd(3.2,4.8));r.vsc--;if(r.vsc<=0){r.vsc=0;feed('🟢 VSC ending — GREEN FLAG.')}}
 normalizeTiming(r);aiPitLogic();
 let alive=r.racers.filter(x=>!x.dnf).sort((a,b)=>a.totalTime-b.totalTime);if(r.sc&&alive.length){let lead=alive[0].totalTime;alive.forEach((d,i)=>d.totalTime=lead+i*rnd(.18,.42))}
 let dead=r.racers.filter(x=>x.dnf).sort((a,b)=>(a.pos||99)-(b.pos||99));r.racers=[...alive,...dead];normalizeTiming(r);
 let p=r.racers.find(x=>x.player);if(p&&!p.dnf){let gained=Math.max(0,prePlayerPos-p.pos);p.overtakes=(p.overtakes||0)+gained;}
 if(r.lap>=r.laps){finishRace();return}
 if(p&&p.wear>74&&!r.pending)radio('Tyres fading',`${p.tyre} wear is ${Math.round(p.wear)}%. The tyre cliff is approaching.`,[['Pit','pit:auto'],['Stay out','stay']]);
 if(p&&p.fuel<8&&!r.pending)radio('Fuel critical',`Fuel remaining ${p.fuel.toFixed(1)}%. You need to save fuel or risk severe pace loss.`,[['Switch to Conserve','fuel:Conserve'],['Keep mode','stay']]);
 if(p&&p.ers<10&&!r.pending)radio('ERS depleted',`Battery ${Math.round(p.ers)}%. Harvesting will be required before another sustained attack.`,[['Harvest ERS','ers:Save'],['Keep mode','stay']]);
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
 let r=S.race;if(!r||r.finishing)return;r.finishing=true;normalizeTiming(r);let p=r.racers.find(x=>x.player),finish=p.pos,dnf=p.dnf,pts=dnf?0:(r.sprint?[8,7,6,5,4,3,2,1][finish-1]||0:POINTS[finish-1]||0);
 let leader=r.racers.find(x=>!x.dnf),leaderTime=leader?.totalTime||0;
 S.lastClassification={track:cur().tracks[S.round],season:S.season,sprint:r.sprint,fastest:r.fastest,rows:r.racers.map(d=>({pos:d.pos,name:d.name,player:!!d.player,startPos:d.startPos||d.pos,status:d.dnf?'DNF':'Finished',time:d.totalTime,gap:d.dnf?null:Math.max(0,d.totalTime-leaderTime),lastLap:d.lastLap,fastest:d.id===r.fastest?.id,pits:d.pits||0,strategy:(d.compoundHistory||[d.tyre]).join(' → '),fuel:Number.isFinite(d.fuel)?d.fuel:null,ers:Number.isFinite(d.ers)?d.ers:null,confidence:Math.round(d.confidence||50),expectedPos:d.expectedPos||null,overtakes:d.overtakes||0}))};
 S.points+=pts;S.career.points+=pts;
 if(!r.sprint){S.career.starts++;if(dnf)S.career.dnfs++;if(finish===1){S.career.wins++;if(S.series===4)S.career.f1wins++}if(finish<=3&&!dnf)S.career.podiums++;S.career.best=Math.min(S.career.best,finish)}
 if(r.fastest?.id==='player'&&!dnf){S.career.fastestLaps++;if(!r.sprint&&finish<=10){S.points++;S.career.points++;pts++}}
 S.standings.player=(S.standings.player||0)+pts;
 r.racers.forEach((d,i)=>{if(d.player)return;let q=d.dnf?0:(r.sprint?([8,7,6,5,4,3,2,1][i]||0):(POINTS[i]||0));S.standings[d.id]=(S.standings[d.id]||0)+q});
 let mate=r.racers.find(x=>x.id===S.teammate);if(mate&&!r.sprint){if(!dnf&&finish<mate.pos){S.career.teammateWins++;let tb=2+S.series*2;S.cash+=tb;S.teammateBonusPaid=(S.teammateBonusPaid||0)+tb;feed('💰 Teammate bonus: '+fmt(tb)+' for finishing ahead of '+mate.name+'.')}else S.career.teammateLosses++}
 if(!r.sprint)applyRaceRating(r,p,finish,dnf);academyPerformanceUpdate(finish,dnf);academyStandingUpdate(finish,dnf);if(!r.sprint)maybePoach();S.cash+=3+S.series*6+(finish<=10?11-finish:0);if(!r.sprint){awardSuperLicence(finish);try{updateSponsorObjectives(finish,dnf)}catch(e){console.error('Sponsor objective error',e)}
 try{simulateOtherDivisions()}catch(e){console.error('Other divisions error',e)}}
 if(!r.sprint)updateCareerSystems(finish,dnf);
 S.results.unshift({season:S.season,track:cur().tracks[S.round],kind:r.sprint?'Sprint':'Race',finish:dnf?'DNF':'P'+finish,points:pts});S.lastAnalysis=buildRaceAnalysis(r,p,finish,dnf);hist(`${r.sprint?'Sprint':'Race'} ${dnf?'DNF':'P'+finish} at ${cur().tracks[S.round]}`);feed(`🏁 Finished ${dnf?'DNF':'P'+finish} • ${pts} points.`);
 if(r.sprint){S.race=null;S.phase='race';notice('Sprint complete. Main race ready. Final sprint classification shown below.');render();save();return}
 S.race=null;S.round++;S.grid=null;S.qualStage=0;S.practice=3;S.phase='practice';
 if(S.round>=cur().rounds)endSeason();else{weather();S.sprint=S.series===4&&Math.random()<.25;maybeOffer();maybeAcademyOffer();notice('Race complete. Final classification shown below • next weekend ready.')}
 render();save()
}
function awardSuperLicence(finish){if(S.series===0)return;let gain=Math.max(0,(12-finish))*[0,0.18,.28,.45,.8][S.series];S.superLicence=clamp(S.superLicence+gain,0,40)}
function buildRaceAnalysis(r,p,finish,dnf){let start=r.strategyStart?.grid||S.grid||finish,places=start-finish;let pitText=r.pitHistory.filter(x=>x.driver===S.name).map(x=>`L${x.lap}: ${x.from}→${x.to} (${x.loss.toFixed(1)}s)`).join(', ')||'No stops';let tyreScore=p.wear<85?'Tyre management was controlled.':'Tyres were heavily degraded at the finish.';let delta=places>0?`Gained ${places} positions`:(places<0?`Lost ${Math.abs(places)} positions`:'Finished where you started');let strategy=r.strategyStart?`${r.strategyStart.tyre}, ${r.strategyStart.paceMode||'Balanced'} pace, ${r.strategyStart.risk} risk, ${r.strategyStart.ers} ERS`:'—';return{summary:`${dnf?'DNF':`P${finish}`} from P${start}. ${delta}.`,strategy,pits:pitText,tyres:tyreScore,fastest:r.fastest?`${r.fastest.name} ${lapTimeFmt(r.fastest.time)} on lap ${r.fastest.lap}`:'—'}}



function ensureTeamFinance(){
 if(!S.teamFinance)S.teamFinance={budget:100,sponsorIncome:0,prizeIncome:0,driverSalary:0,operatingCosts:0,maintenance:0,devSpend:0,seasonStartBudget:100,lastSeason:null};
 let f=S.teamFinance;
 ['budget','sponsorIncome','prizeIncome','driverSalary','operatingCosts','maintenance','devSpend','seasonStartBudget'].forEach(k=>{if(!Number.isFinite(f[k]))f[k]=k==='budget'||k==='seasonStartBudget'?100:0});
}
function seriesFinanceScale(){return [8,18,32,58,115][S.series]||18}
function teamSponsorIncome(){
 let scale=seriesFinanceScale(),tier=(S.teamTier||0)+1,rep=(S.rep||15)/100;
 return Math.round(scale*(1.2+tier*.18+rep*.55))
}
function teamOperatingCosts(){
 ensureFactory();let scale=seriesFinanceScale(),levels=Object.values(S.factory).reduce((a,b)=>a+b,0);
 return Math.round(scale*.58+levels*(.32+S.series*.10))
}
function teamDriverSalaryCost(){return Math.round(seriesFinanceScale()*(.16+(S.rep||15)/250))}
function factoryMaintenanceCost(){ensureFactory();let extra=Object.values(S.factory).reduce((a,b)=>a+Math.max(0,b-1),0);return Math.round(extra*(.45+S.series*.16))}
function costCap(){return [45,85,145,260,520][S.series]||85}
function costCapSpend(){ensureTeamFinance();return (S.teamFinance.operatingCosts||0)+(S.teamFinance.maintenance||0)+(S.teamFinance.devSpend||0)+(S.teamFinance.driverSalary||0)}
function teamBudgetSpend(amount,label='Team expenditure'){
 ensureTeamFinance();if(S.teamFinance.budget<amount){notice('Team budget is too low for '+label+'.');return false}
 S.teamFinance.budget-=amount;S.teamFinance.devSpend+=amount;return true
}
function startSeasonFinance(){
 ensureTeamFinance();let f=S.teamFinance;
 let sponsor=teamSponsorIncome();f.sponsorIncome=sponsor;f.operatingCosts=teamOperatingCosts();f.maintenance=factoryMaintenanceCost();f.driverSalary=teamDriverSalaryCost();f.devSpend=0;
 f.budget=Math.max(0,(f.budget||0)+sponsor-f.operatingCosts-f.maintenance-f.driverSalary);
 f.seasonStartBudget=f.budget;
 hist(`💼 Team budget: ${fmt(sponsor)} sponsor income • ${fmt(f.operatingCosts+f.maintenance+f.driverSalary)} fixed costs`);
}
function closeSeasonFinance(constructorAward){
 ensureTeamFinance();let f=S.teamFinance,prize=constructorAward?.prize||0;
 f.prizeIncome=prize;f.budget+=prize;
 f.lastSeason={season:S.season,sponsor:f.sponsorIncome,prize,operating:f.operatingCosts,maintenance:f.maintenance,salary:f.driverSalary,development:f.devSpend,endBudget:f.budget,capSpend:costCapSpend(),cap:costCap()};
}
function renderFinances(){
 let el=$('financeBox');if(!el)return;ensureTeamFinance();
 let f=S.teamFinance,cap=costCap(),spend=costCapSpend(),pct=Math.min(100,spend/cap*100),remaining=Math.max(0,cap-spend);
 el.innerHTML=`<div class="financeHead"><div><span class="eyebrow">TEAM FINANCES</span><h3>Season budget & cost control</h3></div><strong>${fmt(f.budget)} available</strong></div>
 <div class="financeStats"><div><small>Sponsor income</small><b>${fmt(f.sponsorIncome)}</b></div><div><small>Prize income</small><b>${fmt(f.prizeIncome)}</b></div><div><small>Operating costs</small><b>${fmt(f.operatingCosts)}</b></div><div><small>Driver salaries</small><b>${fmt(f.driverSalary)}</b></div><div><small>Facility maintenance</small><b>${fmt(f.maintenance)}</b></div><div><small>Development spend</small><b>${fmt(f.devSpend)}</b></div></div>
 <div class="capRow"><span>Season spending / budget cap</span><strong>${fmt(spend)} / ${fmt(cap)}</strong></div><div class="capBar"><i style="width:${pct}%"></i></div><small class="muted">${fmt(remaining)} remaining under the cap. Factory infrastructure purchases use the separate factory prize fund.</small>
 ${f.lastSeason?`<div class="lastFinance"><b>Last season:</b> Constructors prize ${fmt(f.lastSeason.prize)} • Closing team budget ${fmt(f.lastSeason.endBudget)}</div>`:''}`;
}


const STAFF_ROLES={
 technical:{name:'Technical Director',focus:'All R&D',salary:8},
 aero:{name:'Head of Aerodynamics',focus:'Aero projects',salary:7},
 design:{name:'Chief Designer',focus:'Design/manufacture',salary:6},
 engineer:{name:'Race Engineer',focus:'Setup/strategy',salary:5},
 sporting:{name:'Sporting Director',focus:'Pit crew/team operations',salary:5}
};
const DRIVER_TRAITS=[
 {id:'qualifier',name:'Qualifying Specialist',desc:'+ qualifying pace'},
 {id:'tyres',name:'Tyre Whisperer',desc:'Lower tyre wear'},
 {id:'rain',name:'Rain Master',desc:'+ wet-weather pace'},
 {id:'braker',name:'Late Braker',desc:'+ racecraft'},
 {id:'technical',name:'Technical Driver',desc:'+ setup/R&D feedback'},
 {id:'street',name:'Street Specialist',desc:'+ confidence on street circuits'}
];
function ensureManagement(){
 if(!S.staff)S.staff={technical:{rating:55,salary:8},aero:{rating:52,salary:7},design:{rating:54,salary:6},engineer:{rating:56,salary:5},sporting:{rating:53,salary:5}};
 if(!S.projects)S.projects=[];
 if(!S.inventory)S.inventory={};
 if(!S.componentWear)S.componentWear={engine:5,gearbox:5,ers:5};
 if(!S.driverTraits)S.driverTraits=[DRIVER_TRAITS[(S.season+S.series)%DRIVER_TRAITS.length].id];
 if(!S.form)S.form=[];
 if(!Number.isFinite(S.teammateRelationship))S.teammateRelationship=60;
 if(!Number.isFinite(S.boardConfidence))S.boardConfidence=70;
 if(!S.boardTarget)S.boardTarget={constructors:Math.max(1,8-(S.teamTier||0)*2),podiums:S.series>=3?1:0};
 if(!S.contractStatus)S.contractStatus={role:'Equal status',years:1,salary:6+S.series*4,bonus:2+S.series};
 if(!S.reputationProfile)S.reputationProfile={pace:50,racecraft:50,consistency:50,technical:50,marketability:45,professionalism:55};
 if(!S.practiceProgramme)S.practiceProgramme='Setup work';
 if(!Number.isFinite(S.setupConfidence))S.setupConfidence=35;
 if(!Number.isFinite(S.nextCarAllocation))S.nextCarAllocation=20;
 if(!S.nextCarDev)S.nextCarDev={aero:0,power:0,reliability:0};
 if(!S.regulation)S.regulation={season:S.season+1,type:'Minor aero evolution',impact:'aero',severity:10+ri(0,8),vote:null};
 if(!S.mediaHistory)S.mediaHistory=[];
}
function staffBonus(role){ensureManagement();return ((S.staff[role]?.rating||50)-50)/100}
function hireStaff(role){ensureManagement();let s=S.staff[role],cost=Math.round((s.salary||5)*2.2);if(!teamBudgetSpend(cost,'staff recruitment'))return;s.rating=clamp(s.rating+rnd(4,9),40,95);s.salary=Math.round(STAFF_ROLES[role].salary*(.8+s.rating/100));hist(`👔 ${STAFF_ROLES[role].name} strengthened to ${Math.round(s.rating)}`);render();save()}
function projectDuration(k,risk){let base=risk==='Aggressive'?1:risk==='Conservative'?3:2;return Math.max(1,Math.round(base-factoryEfficiency(k)*.25-staffBonus(k==='floor'||k==='frontWing'||k==='rearWing'?'aero':'technical')))}
function startProject(k,risk='Normal'){ensureManagement();let part=DEV_PARTS[k];if(!part)return;if(S.projects.some(p=>p.part===k&&p.status==='R&D'))return notice(part.name+' already has an active project.');let base=Math.round((8+S.series*6+devVal(k)*2.6)*part.cost),cost=Math.max(2,Math.round(base*factoryCostMultiplier()*(risk==='Aggressive'?1.25:risk==='Conservative'?.9:1)));if(costCapSpend()+cost>costCap())return notice('Project would exceed the cost cap.');if(!teamBudgetSpend(cost,part.name+' R&D'))return;let rounds=projectDuration(k,risk);S.projects.push({id:Date.now()+Math.random(),part:k,name:part.name,risk,status:'R&D',roundsLeft:rounds,cost,gain:1.0*factoryEfficiency(k)*(1-clamp(S.nextCarAllocation,0,80)/180)*(risk==='Aggressive'?1.3:risk==='Conservative'?.85:1)});hist(`🧪 ${part.name} project started • ${risk} • ETA ${rounds} race${rounds===1?'':'s'}`);notice(part.name+' R&D project started.');render();save()}
function advanceProjects(){
 ensureManagement();S.projects.filter(p=>p.status==='R&D').forEach(p=>{p.roundsLeft--;if(p.roundsLeft<=0){let fail=Math.random()<factoryFailureChance()*(p.risk==='Aggressive'?1.65:p.risk==='Conservative'?.55:1);p.status='Designed';p.gain*=fail?.45:1;hist(`${fail?'⚠️':'✅'} ${p.name} design complete${fail?' with compromised gains':''}. Manufacture it for track use.`)}});
}
function manufactureProject(id){ensureManagement();let p=S.projects.find(x=>String(x.id)===String(id));if(!p||p.status!=='Designed')return;let cost=Math.max(1,Math.round(p.cost*.32));if(!teamBudgetSpend(cost,p.name+' manufacture'))return;p.status='Manufactured';S.inventory[p.part]=(S.inventory[p.part]||0)+1;hist(`🏭 ${p.name} manufactured • one unit available`);render();save()}
function fitProject(id){ensureManagement();let p=S.projects.find(x=>String(x.id)===String(id));if(!p||p.status!=='Manufactured'||!(S.inventory[p.part]>0))return;S.inventory[p.part]--;S.dev[p.part]=clamp(devVal(p.part)+p.gain,0,16);p.status='Fitted';hist(`🔧 ${p.name} fitted to your car +${p.gain.toFixed(1)}`);notice(p.name+' fitted.');render();save()}
function programmeEffect(){
 ensureManagement();let e=S.staff.engineer?.rating||50;
 return {['Setup work']:{setup:10+e*.06},['Qualifying simulation']:{pace:.18},['Race simulation']:{cons:.14},['Tyre programme']:{tyre:.08},['Aero testing']:{feedback:.16}}[S.practiceProgramme]||{};
}
function runPracticeProgramme(){
 if(S.phase!=='practice'||S.practice<=0)return notice('Practice programme unavailable.');
 ensureManagement();let e=programmeEffect();if(e.setup)S.setupConfidence=clamp(S.setupConfidence+e.setup,0,100);if(e.pace)S.stats.pace=clamp(S.stats.pace+e.pace,35,99);if(e.cons)S.stats.consistency=clamp(S.stats.consistency+e.cons,35,99);if(e.feedback)S.stats.feedback=clamp(S.stats.feedback+e.feedback,35,99);
 S.practice--;hist(`📊 ${S.practiceProgramme} completed`);if(S.practice<=0)S.phase='qualifying';render();save()
}

function calculateRaceRating(r,p,finish,dnf){
 let expected=p.expectedPos||expectedRacePosition(p,r)||10,start=p.startPos||S.grid||finish,overtakes=Math.max(0,p.overtakes||0),net=start-finish;
 let score=6.0+(expected-finish)*.34+Math.min(1.4,overtakes*.12)+clamp(net,-5,8)*.08;
 let mate=r.racers.find(x=>x.id===S.teammate);if(mate&&!dnf)score+=(finish<mate.pos?.45:-.25);
 if(r.fastest?.id==='player'&&!dnf)score+=.25;
 if(finish<=3&&!dnf)score+=.35;
 if(dnf)score-=2.2;
 let damage=damagePacePenalty(p);if(!dnf&&damage<.08)score+=.15;
 return {rating:Math.round(clamp(score,1,10)*10)/10,expected,start,finish:dnf?null:finish,overtakes,net,beatTeammate:!!(mate&&!dnf&&finish<mate.pos),dnf};
}
function applyRaceRating(r,p,finish,dnf){
 let rr=calculateRaceRating(r,p,finish,dnf);S.lastRaceRating=rr;S.raceRatings=S.raceRatings||[];S.raceRatings.unshift({season:S.season,round:S.round+1,track:cur().tracks[S.round],...rr});S.raceRatings=S.raceRatings.slice(0,40);
 let repDelta=clamp((rr.rating-6.2)*.72,-2.5,3.0);S.rep=clamp(S.rep+repDelta,0,100);
 if(S.reputationProfile){S.reputationProfile.racecraft=clamp(S.reputationProfile.racecraft+Math.max(-.4,(rr.overtakes-2)*.12),0,100);S.reputationProfile.consistency=clamp(S.reputationProfile.consistency+(rr.rating>=7?.35:rr.rating<5?-.35:.05),0,100);S.reputationProfile.marketability=clamp(S.reputationProfile.marketability+(rr.rating>=8?.45:0),0,100)}
 hist(`⭐ Race rating ${rr.rating}/10 • ${rr.overtakes} overtakes • expected P${rr.expected}${repDelta>=0?' • reputation +'+repDelta.toFixed(1):' • reputation '+repDelta.toFixed(1)}`);
 S.lastRaceRating.repDelta=Math.round(repDelta*10)/10;
 return rr;
}
function updateCareerSystems(finish,dnf){
 ensureManagement();S.form.unshift(dnf?20:clamp(105-finish*5,25,100));S.form=S.form.slice(0,5);
 let expected=Math.max(1,11-(S.teamTier||0));S.boardConfidence=clamp(S.boardConfidence+(dnf?-5:(expected-finish)*1.2),0,100);
 let mate=S.lastClassification?.rows?.find(x=>x.name===S.field.find(y=>y.id===S.teammate)?.name);S.teammateRelationship=clamp(S.teammateRelationship+(mate&&finish<mate.pos?1:-1),10,95);
 S.reputationProfile.pace=clamp(S.reputationProfile.pace+(finish<=5?.5:.1),0,100);S.reputationProfile.marketability=clamp(S.reputationProfile.marketability+(finish<=3?1:.1),0,100);S.reputationProfile.professionalism=clamp(S.reputationProfile.professionalism+(dnf?-.6:.25),0,100);
 ['engine','gearbox','ers'].forEach(k=>S.componentWear[k]=clamp(S.componentWear[k]+rnd(4,8),0,100));
 if(dnf&&Math.random()<.45){let crash=Math.round(3+S.series*4+rnd(0,5));ensureTeamFinance();S.teamFinance.budget=Math.max(0,S.teamFinance.budget-crash);hist(`💥 Crash damage bill ${fmt(crash)}`)}
 advanceProjects();developNextCar();
 if(Math.random()<.18)mediaEvent(finish,dnf);
}
function developNextCar(){ensureManagement();let a=clamp(S.nextCarAllocation,0,80)/100,eff=.12*factoryEfficiency('floor')*(1+staffBonus('technical'));S.nextCarDev.aero+=eff*a;S.nextCarDev.power+=eff*a*.8;S.nextCarDev.reliability+=eff*a*.6}
function mediaEvent(finish,dnf){let good=!dnf&&finish<=8,choices=good?['Praise the team','Stay focused','Talk up your own pace']:['Protect the team','Own the mistake','Criticise the car'];S.pendingMedia={question:good?'Strong result. Who deserves the credit?':'A difficult weekend. What went wrong?',choices};}
function answerMedia(i){ensureManagement();if(!S.pendingMedia)return;let c=S.pendingMedia.choices[i]||'';if(c.includes('team')||c.includes('Protect')){S.teammateRelationship=clamp(S.teammateRelationship+4,0,100);S.boardConfidence=clamp(S.boardConfidence+2,0,100)}if(c.includes('Own'))S.reputationProfile.professionalism=clamp(S.reputationProfile.professionalism+3,0,100);if(c.includes('own pace'))S.reputationProfile.marketability=clamp(S.reputationProfile.marketability+3,0,100);if(c.includes('Criticise'))S.boardConfidence=clamp(S.boardConfidence-5,0,100);S.mediaHistory.unshift(c);S.pendingMedia=null;render();save()}
function regulationVote(v){ensureManagement();S.regulation.vote=v;hist(`🗳️ Team voted ${v} on ${S.regulation.type}`);render();save()}
function applyRegulation(){
 ensureManagement();let r=S.regulation;if(r.impact==='aero'){['frontWing','rearWing','floor','sidepods'].forEach(k=>S.dev[k]*=(1-r.severity/100))}else if(r.impact==='power'){['engine','gearbox'].forEach(k=>S.dev[k]*=(1-r.severity/100))}
 S.dev.floor=clamp(S.dev.floor+S.nextCarDev.aero*.45,0,16);S.dev.engine=clamp(S.dev.engine+S.nextCarDev.power*.45,0,16);S.dev.reliability=clamp(S.dev.reliability+S.nextCarDev.reliability*.45,0,16);S.nextCarDev={aero:0,power:0,reliability:0};
 S.regulation={season:S.season+1,type:Math.random()<.5?'Aero regulation change':'Power-unit regulation change',impact:Math.random()<.5?'aero':'power',severity:ri(8,24),vote:null};
}
function renderManagement(){
 let el=$('managementBox');if(!el)return;ensureManagement();let form=S.form.length?Math.round(S.form.reduce((a,b)=>a+b,0)/S.form.length):50;
 el.innerHTML=`<div class="mgGrid">
 <section class="mgCard"><h3>Staff</h3>${Object.entries(STAFF_ROLES).map(([k,v])=>`<div class="mgRow"><span>${v.name}<small>${v.focus}</small></span><b>${Math.round(S.staff[k].rating)}</b><button data-hire="${k}">Recruit</button></div>`).join('')}</section>
 <section class="mgCard"><h3>Driver & team</h3><p>Board confidence <b>${Math.round(S.boardConfidence)}%</b></p><p>Teammate relationship <b>${Math.round(S.teammateRelationship)}%</b></p><p>Form <b>${form}/100</b></p><p>Contract: <b>${S.contractStatus.role}</b> • ${S.contractStatus.years} yr</p><p>Traits: <b>${S.driverTraits.map(x=>DRIVER_TRAITS.find(t=>t.id===x)?.name||x).join(', ')}</b></p></section>
 <section class="mgCard"><h3>R&D projects</h3><div class="projectLaunch"><select id="projectPart">${Object.entries(DEV_PARTS).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('')}</select><select id="projectRisk"><option>Conservative</option><option selected>Normal</option><option>Aggressive</option></select><button data-start-project>Start project</button></div>${S.projects.length?S.projects.slice(-6).reverse().map(p=>`<div class="project"><b>${p.name}</b><span>${p.status}${p.status==='R&D'?' • '+p.roundsLeft+' race(s)':''} • ${p.risk}</span>${p.status==='Designed'?`<button data-manufacture="${p.id}">Manufacture</button>`:''}${p.status==='Manufactured'?`<button data-fit="${p.id}">Fit to car</button>`:''}</div>`).join(''):'<p class="muted">No active projects.</p>'}</section>
 <section class="mgCard"><h3>Next year's car</h3><label>R&D allocation <b>${S.nextCarAllocation}%</b><input id="nextCarAllocation" type="range" min="0" max="80" step="5" value="${S.nextCarAllocation}"></label><p>Aero ${S.nextCarDev.aero.toFixed(1)} • Power ${S.nextCarDev.power.toFixed(1)} • Reliability ${S.nextCarDev.reliability.toFixed(1)}</p><p class="muted">More allocation improves next year's baseline but slows current-car focus.</p></section>
 <section class="mgCard"><h3>Regulations</h3><p><b>${S.regulation.type}</b> • expected ${S.regulation.severity}% reset for ${S.regulation.impact}</p><div><button data-regvote="Support">Support</button><button data-regvote="Oppose">Oppose</button>${S.regulation.vote?` <b>Vote: ${S.regulation.vote}</b>`:''}</div></section>
 <section class="mgCard"><h3>Power-unit wear</h3>${Object.entries(S.componentWear).map(([k,v])=>`<div class="mgRow"><span>${k.toUpperCase()}</span><b>${Math.round(v)}%</b></div>`).join('')}<p class="muted">High wear increases the risk of reliability problems and future grid-penalty decisions.</p></section>
 </div>${S.pendingMedia?`<div class="mediaBox"><h3>🎙️ Media</h3><p>${S.pendingMedia.question}</p>${S.pendingMedia.choices.map((x,i)=>`<button data-media="${i}">${x}</button>`).join(' ')}</div>`:''}`;
}

const FACTORY_DEPTS={design:{name:'Design Office',desc:'Front/rear wing and sidepod design.',base:18},aero:{name:'Wind Tunnel & CFD',desc:'Aero and floor development.',base:22},composites:{name:'Composites',desc:'Wings, floor and bodywork manufacturing.',base:17},powertrain:{name:'Powertrain Lab',desc:'Engine, gearbox and cooling development.',base:24},vehicle:{name:'Vehicle Dynamics',desc:'Suspension, brakes and tyre behaviour.',base:19},reliability:{name:'Reliability Lab',desc:'Reliability gains and fewer R&D setbacks.',base:18},production:{name:'Production',desc:'Makes every upgrade cheaper and more effective.',base:21},raceops:{name:'Race Operations',desc:'Pit crew and race-team development.',base:16}};
function ensureFactory(){if(!S.factory)S.factory={design:1,aero:1,composites:1,powertrain:1,vehicle:1,reliability:1,production:1,raceops:1};Object.keys(FACTORY_DEPTS).forEach(k=>{if(!Number.isFinite(S.factory[k]))S.factory[k]=1});if(!Number.isFinite(S.factoryFunds))S.factoryFunds=0}
function factoryDeptForPart(k){return{frontWing:'design',rearWing:'aero',floor:'aero',sidepods:'design',suspension:'vehicle',brakes:'vehicle',engine:'powertrain',gearbox:'powertrain',cooling:'powertrain',reliability:'reliability',pit:'raceops'}[k]||'production'}
function factoryEfficiency(k){ensureFactory();let lvl=S.factory[factoryDeptForPart(k)]||1,prod=S.factory.production||1,comp=['frontWing','rearWing','floor','sidepods'].includes(k)?S.factory.composites||1:1;return 1+(lvl-1)*.10+(prod-1)*.035+(comp-1)*.025}
function factoryCostMultiplier(){ensureFactory();return Math.max(.66,1-(S.factory.production-1)*.045)}
function factoryFailureChance(){ensureFactory();return Math.max(.015,.11-(S.factory.reliability-1)*.012-(S.factory.production-1)*.006)}
function factoryUpgradeCost(k){ensureFactory();let d=FACTORY_DEPTS[k],lvl=S.factory[k]||1;return Math.round(d.base*Math.pow(1.48,lvl-1))}
function upgradeFactory(k){ensureFactory();let d=FACTORY_DEPTS[k];if(!d)return;let lvl=S.factory[k]||1;if(lvl>=8)return notice(d.name+' is already at maximum level.');let cost=factoryUpgradeCost(k);if(S.factoryFunds<cost)return notice('Not enough factory prize money. Need '+fmt(cost)+'.');S.factoryFunds-=cost;S.factory[k]=lvl+1;hist('🏭 '+d.name+' upgraded to Level '+(lvl+1));notice(d.name+' upgraded.');render();save()}
function constructorPrizeMoney(position){let base=[0,12,20,32,55][S.series]||12;let mult=[0,1.9,1.65,1.45,1.28,1.14,1.02,.92,.83,.75,.68][position]||.62;return Math.round(base*mult)}
function awardConstructorPrizeMoney(){let rows=currentConstructors(),idx=rows.findIndex(x=>x.ti===S.teamTier),pos=idx>=0?idx+1:rows.length,prize=constructorPrizeMoney(pos);ensureFactory();S.factoryFunds+=prize;ensureTeamFinance();S.lastConstructorPrize={season:S.season,series:cur().name,position:pos,prize};hist(`🏆 Constructors P${pos}: ${fmt(prize)} team prize money + ${fmt(prize)} factory allocation`);return {pos,prize}}
function factoryPrizeMoney(position){let scale=[0,14,22,34,52][S.series]||14,perf=position===1?1.8:position<=3?1.45:position<=6?1.18:position<=10?1:.78;return Math.round(scale*perf)}
function awardFactoryPrizeMoney(position){ensureFactory();let prize=factoryPrizeMoney(position);S.factoryFunds+=prize;hist('🏭 '+cur().name+' prize money: '+fmt(prize)+' allocated to the factory');return prize}
function renderFactory(){let el=$('factoryBox');if(!el)return;ensureFactory();let avg=Object.values(S.factory).reduce((a,b)=>a+b,0)/Object.keys(S.factory).length;el.innerHTML=`<div class="factoryHeader"><span class="eyebrow">TEAM FACTORY</span><h3>Infrastructure & R&D</h3><p class="muted">Factory prize fund: <strong>${fmt(S.factoryFunds)}</strong> • Overall level ${avg.toFixed(1)}/8${S.lastConstructorPrize?` • Last constructors: P${S.lastConstructorPrize.position} +${fmt(S.lastConstructorPrize.prize)}`:''}</p></div><div class="factoryGrid">${Object.entries(FACTORY_DEPTS).map(([k,d])=>{let lvl=S.factory[k],cost=factoryUpgradeCost(k);return `<div class="factoryDept"><div class="factoryTop"><strong>${d.name}</strong><span>L${lvl}/8</span></div><p>${d.desc}</p><div class="factoryBar"><i style="width:${lvl/8*100}%"></i></div><button type="button" data-factory-upgrade="${k}" ${lvl>=8?'disabled':''}>${lvl>=8?'MAX':'Upgrade • '+fmt(cost)}</button></div>`}).join('')}</div><div class="factoryEffects"><b>R&D effects</b><span>Upgrade costs: ${Math.round(factoryCostMultiplier()*100)}% of base</span><span>R&D setback risk: ${Math.round(factoryFailureChance()*100)}%</span><span>Rival constructors reinvest prize money into their own factories each season.</span></div>`}

const DEV_PARTS={frontWing:{name:'Front wing',cost:1,desc:'Turn-in and front downforce'},rearWing:{name:'Rear wing',cost:1.05,desc:'Rear stability and aero efficiency'},floor:{name:'Floor / diffuser',cost:1.35,desc:'Major overall downforce gains'},sidepods:{name:'Sidepods',cost:1.15,desc:'Cooling and aero efficiency'},suspension:{name:'Suspension',cost:.95,desc:'Mechanical grip and tyre control'},brakes:{name:'Brakes',cost:.75,desc:'Braking stability'},engine:{name:'Power unit',cost:1.4,desc:'Acceleration and top speed'},gearbox:{name:'Gearbox',cost:1,desc:'Driveability and reliability'},cooling:{name:'Cooling',cost:.85,desc:'Thermal reliability'},reliability:{name:'Reliability',cost:.9,desc:'Reduces mechanical failures'},pit:{name:'Pit crew',cost:.8,desc:'Faster pit stops'}};
function aiTeamPrize(si,pos){let base=[0,12,20,32,55][si]||12,m=[0,1.9,1.65,1.45,1.28,1.14,1.02,.92,.83,.75,.68][pos]||.62;return Math.round(base*m)}
function developAITeams(si,division){
 if(!division?.teams?.length)return;
 let ranked=[...division.teams].sort((a,b)=>b.points-a.points);
 ranked.forEach((t,i)=>{
   if(!Number.isFinite(t.budget))t.budget=100;
   if(!Number.isFinite(t.factory))t.factory=1;
   let prize=aiTeamPrize(si,i+1);t.budget+=prize;
   let facilityCost=Math.round(34*Math.pow(1.42,t.factory-1));
   if(t.budget>=facilityCost&&t.factory<8&&(i<4||Math.random()<.45)){t.budget-=facilityCost;t.factory++;t.perf=clamp(t.perf+rnd(.45,.95),35,99)}
   let spend=Math.min(t.budget,Math.round(12+si*6+t.factory*3));
   if(spend>0){t.budget-=spend;t.perf=clamp(t.perf+spend*.025*(1+(t.factory-1)*.08),35,99)}
 })
}
function ensureWorldSeries(){if(S.worldSeries&&S.worldSeries.season===S.season)return;S.worldSeries={season:S.season,divisions:{}};for(let si=0;si<=4;si++){let cfg=SERIES[si],teams=cfg.teams.map((t,ti)=>({name:t[0],points:0,perf:t[1],budget:100,factory:1})),drivers=[];for(let i=0;i<20;i++){let ti=i%cfg.teams.length,n=FIRST[(i*5+si*3)%FIRST.length]+' '+LAST[(i*7+si*2)%LAST.length];drivers.push({id:`s${si}d${i}`,name:n,team:ti,points:0,skill:clamp(48+si*8+rnd(-12,12),35,98)})}S.worldSeries.divisions[si]={round:0,drivers,teams}}}
function simulateOtherDivisions(){ensureWorldSeries();for(let si=0;si<=4;si++){if(si===S.series)continue;let d=S.worldSeries.divisions[si];if(!d||d.round>=SERIES[si].rounds)continue;let order=[...d.drivers].sort((a,b)=>(b.skill+d.teams[b.team].perf*.45+rnd(-9,9))-(a.skill+d.teams[a.team].perf*.45+rnd(-9,9)));order.slice(0,10).forEach((x,i)=>{x.points+=POINTS[i]||0;d.teams[x.team].points+=POINTS[i]||0});d.round++}}
function currentConstructors(){let rows=cur().teams.map((t,ti)=>({name:t[0],points:0,ti}));let pti=clamp(S.teamTier||0,0,rows.length-1);rows[pti].points+=S.points||0;S.field.forEach(d=>{let ti=clamp(d.teamTier??0,0,rows.length-1);rows[ti].points+=(S.standings[d.id]||0)});return rows.sort((a,b)=>b.points-a.points)}
function renderWorldStandings(){let box=$('worldStandings');if(!box)return;ensureWorldSeries();box.innerHTML=[0,1,2,3,4].map(si=>{if(si===S.series){let dr=standingRows().slice(0,10),cr=currentConstructors();return `<div class="divisionCard"><h3>${SERIES[si].name}<span>YOUR SERIES</span></h3><h4>Drivers</h4>${dr.map((d,i)=>`<div class="miniStanding ${d.player?'you':''}"><b>${i+1}</b><span>${d.name}</span><strong>${d.points}</strong></div>`).join('')}<h4>Constructors</h4>${cr.map((x,i)=>`<div class="miniStanding ${x.ti===S.teamTier?'you':''}"><b>${i+1}</b><span>${x.name}</span><strong>${Math.round(x.points)}</strong></div>`).join('')}</div>`}let d=S.worldSeries.divisions[si],drivers=[...d.drivers].sort((a,b)=>b.points-a.points).slice(0,10),teams=[...d.teams].sort((a,b)=>b.points-a.points);return `<div class="divisionCard"><h3>${SERIES[si].name}</h3><small>Round ${d.round}/${SERIES[si].rounds}</small><h4>Drivers</h4>${drivers.map((x,i)=>`<div class="miniStanding"><b>${i+1}</b><span>${x.name}</span><strong>${x.points}</strong></div>`).join('')}<h4>Constructors</h4>${teams.map((x,i)=>`<div class="miniStanding"><b>${i+1}</b><span>${x.name}</span><strong>${Math.round(x.points)}</strong></div>`).join('')}</div>`}).join('');let cb=$('constructorsTable');if(cb)cb.innerHTML='<table><tr><th>Pos</th><th>Constructor</th><th>Pts</th></tr>'+currentConstructors().map((x,i)=>`<tr><td>${i+1}</td><td>${x.name}</td><td>${Math.round(x.points)}</td></tr>`).join('')+'</table>'}
const SPONSOR_TYPES=[{name:'Apex Energy',objective:'points',label:'Score championship points',base:18},{name:'Velocity Tech',objective:'mate',label:'Beat your teammate',base:22},{name:'Podium Capital',objective:'top5',label:'Finish in the top 5',base:28},{name:'Pole Position Watches',objective:'qual',label:'Qualify in the top 5',base:24},{name:'CleanRace Systems',objective:'clean',label:'Finish without retiring',base:20}];
function makeSponsorObjectives(){if(!S.sponsor){S.sponsorObjectives=[];return}S.sponsorObjectives=[...SPONSOR_TYPES].sort(()=>Math.random()-.5).slice(0,2).map((o,i)=>({...o,id:o.objective+i,reward:o.base+S.series*7,done:false}))}
function updateSponsorObjectives(finish,dnf){if(!S.sponsor||!S.sponsorObjectives?.length)return;S.sponsorObjectives.forEach(o=>{let met=o.objective==='points'?finish<=10:o.objective==='mate'?(S.field.find(x=>x.id===S.teammate)?.points||0)<S.points:o.objective==='top5'?finish<=5:o.objective==='qual'?(S.grid||99)<=5:o.objective==='clean'?!dnf:false;if(met&&!o.done){o.done=true;S.cash+=o.reward;feed(`💼 Sponsor objective complete: ${o.label} • ${fmt(o.reward)}`);hist(`💰 Sponsor bonus ${fmt(o.reward)} — ${o.label}`)}})}
function renderSponsorObjectives(){let el=$('sponsorObjectives');if(!el)return;if(!S.sponsor){el.innerHTML='<div class="muted">Sign a sponsor to unlock performance objectives and prize money.</div>';return}if(!S.sponsorObjectives?.length)makeSponsorObjectives();el.innerHTML=S.sponsorObjectives.map(o=>`<div class="objective ${o.done?'done':''}"><span>${o.done?'✅':'◻️'} ${o.label}</span><strong>${fmt(o.reward)}</strong></div>`).join('')}

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

function endSeason(){
 if(S.academy){
   let a=F1_ACADEMIES.find(x=>x.id===S.academy),p=ACADEMY_PATHS[S.academy];
   if((S.academyStanding||0)>=75){S.cash+=8+S.series*2;S.rep=clamp(S.rep+3,0,100);hist(`🎓 ${a.name} backing strengthened your pathway via ${p.feeder}`)}
 }
if(!S.seasonObjectives)generateSeasonObjectives();updateObjectives();let objectiveBonus=0;S.seasonObjectives.forEach(o=>{if(objectiveMet(o))objectiveBonus+=o.reward});if(objectiveBonus){S.cash+=objectiveBonus;notice('Season objectives bonus: '+fmt(objectiveBonus)+'.')}S.seasonObjectives=null;S.objectiveProgress={};let rows=standingRows(),pos=rows.findIndex(x=>x.player)+1;let constructorAward=awardConstructorPrizeMoney();closeSeasonFinance(constructorAward);
 if(S.worldSeries?.divisions){Object.entries(S.worldSeries.divisions).forEach(([si,d])=>{let n=Number(si);developAITeams(n,d);d.teams.forEach((t,i)=>{if(SERIES[n]?.teams[i])SERIES[n].teams[i][1]=clamp(t.perf,35,99)})})}if(pos===1){S.career.titles++;hist('🏆 '+cur().name+' champion');S.superLicence=clamp(S.superLicence+[0,12,18,30,0][S.series],0,40)}if(S.series<4&&pos<=cur().promotePos&&S.rep>=cur().promoteRep){if(S.series===3&&S.superLicence<40){hist('⚠️ F1 promotion blocked: Super Licence incomplete')}else{S.series++;S.teamTier=0;hist('⬆️ Promoted to '+cur().name)}}else if(pos<=8&&S.teamTier<cur().teams.length-1){S.teamTier=Math.min(cur().teams.length-1,S.teamTier+Math.max(1,pos<=3?2:1));hist('📄 Signed by '+team()[0])}awardFactoryPrizeMoney(pos);driverMarket();S.season++;S.preseason=null;S.worldSeries=null;S.round=0;S.points=0;S.standings={};applyRegulation();Object.keys(S.dev).forEach(k=>S.dev[k]=Math.max(0,(S.dev[k]||0)-(k==='pit'?.4:.7)));makeField();weather();S.sprint=S.series===4&&Math.random()<.25;S.practice=3;S.phase='practice';S.grid=null;startSeasonFinance();notice('New season begins.');save()}
function driverMarket(){let moves=[];let sample=[...S.field].sort(()=>Math.random()-.5).slice(0,ri(3,6));sample.forEach(d=>{let old=d.teamTier||0,newTier=clamp(old+ri(-2,2),0,cur().teams.length-1);if(newTier!==old){moves.push(`${d.name}: ${cur().teams[old][0]} → ${cur().teams[newTier][0]}`);d.teamTier=newTier}});S.market=moves.slice(0,8);if(moves.length)hist('🔄 Driver market reshuffle: '+moves.length+' moves')}
function lapTimeFmt(sec){if(!Number.isFinite(sec))return'—';let m=Math.floor(sec/60),ss=sec-m*60;return m+':'+ss.toFixed(3).padStart(6,'0')}function raceClockFmt(sec){if(!Number.isFinite(sec))return'—';let h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),ss=Math.floor(sec%60);return(h?h+':':'')+String(m).padStart(h?2:1,'0')+':'+String(ss).padStart(2,'0')}
function normalizeTiming(r){if(!r||!Array.isArray(r.racers))return;let alive=r.racers.filter(d=>!d.dnf);alive.forEach((d,i)=>{if(!Number.isFinite(d.totalTime))d.totalTime=(d.pos||i+1-1)*.18});alive.sort((a,b)=>a.totalTime-b.totalTime);let dead=r.racers.filter(d=>d.dnf);r.racers=[...alive,...dead];let leader=alive[0],prev=null;r.racers.forEach((d,i)=>{d.pos=i+1;if(d.dnf){d.gap=null;d.interval=null;return}d.gap=leader?Math.max(0,d.totalTime-leader.totalTime):0;d.interval=prev?Math.max(0,d.totalTime-prev.totalTime):0;prev=d});r.leaderTime=leader?leader.totalTime:0}
function gapFmt(d,r){if(d.dnf)return'OUT';if(d.pos===1)return'LEADER';let gap=Number.isFinite(d.gap)?d.gap:0,base=r.baseLap||90;if(gap>=base*.92){let laps=Math.max(1,Math.floor(gap/base));return'+'+laps+' Lap'+(laps>1?'s':'')}return'+'+gap.toFixed(3)+'s'}
function intervalFmt(d,r){if(d.dnf||d.pos===1)return'—';let gap=Number.isFinite(d.interval)?d.interval:0,base=r.baseLap||90;if(gap>=base*.92)return'+1 Lap';return'+'+gap.toFixed(3)+'s'}
function pitTable(){let r=S.race;normalizeTiming(r);return'<table><tr><th>Pos</th><th>Driver</th><th>Gap</th><th>Interval</th><th>Recent lap</th><th>Tyre</th><th>Wear</th><th>Status</th></tr>'+r.racers.slice(0,20).map(d=>`<tr class="${d.player?'you timing-you':''}"><td>P${d.pos}</td><td>${d.name}</td><td><strong>${gapFmt(d,r)}</strong></td><td>${intervalFmt(d,r)}</td><td class="${r.fastest?.id===d.id?'fastest':''}">${lapTimeFmt(d.lastLap)}</td><td>${d.tyre}</td><td>${Math.round(d.wear)}%</td><td>${d.dnf?'OUT':damagePacePenalty(d)>.05?'Damage':'Running'}</td></tr>`).join('')+'</table>'}

function renderClassification(){
 let c=S.lastClassification,box=$('classification');if(!box)return;
 if(!c){box.innerHTML='<div class="muted">Complete a race to see the final classification.</div>';return}
 let lead=c.rows.find(x=>x.status!=='DNF');
 box.innerHTML=`<p><strong>${c.track}</strong> • ${c.sprint?'Sprint':'Race'} final classification</p><div class="tablebox"><table><tr><th>Pos</th><th>Driver</th><th>Time / Gap</th><th>Change</th><th>Strategy</th><th>Stops</th><th>Fastest</th><th>Status</th></tr>${c.rows.map(d=>{let change=(d.startPos||d.pos)-d.pos,gap=d.status==='DNF'?'—':d.pos===1?raceClockFmt(d.time):'+'+(d.gap||0).toFixed(3)+'s';return`<tr class="${d.player?'you':''}"><td>P${d.pos}</td><td>${d.name}</td><td>${gap}</td><td>${change>0?'+'+change:change}</td><td>${d.strategy}</td><td>${d.pits}</td><td>${d.fastest?'⚡ '+lapTimeFmt(d.lastLap):'—'}</td><td>${d.status}</td></tr>`}).join('')}</table></div>`
}


function circuitPath(name){let seed=[...name].reduce((a,c)=>a+c.charCodeAt(0),0),pts=[],n=38;for(let i=0;i<n;i++){let a=i/n*Math.PI*2,r=1+.18*Math.sin(a*3+(seed%7))+.10*Math.sin(a*5+(seed%11));pts.push([50+39*r*Math.cos(a),50+31*r*Math.sin(a)])}return pts}
function pathPoint(pts,t){let n=pts.length,p=t*n,i=Math.floor(p)%n,f=p-Math.floor(p),a=pts[i],b=pts[(i+1)%n];return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]}
function renderCircuitTracker(){
 let el=$('circuitTracker');if(!el||!S.race)return;
 let r=S.race,pts=circuitPath(cur().tracks[S.round]);
 let path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')+' Z';
 let markers=r.racers.filter(x=>!x.dnf).map(d=>{
   let lapFrac=clamp(1-(d.gap||0)/Math.max(18,r.baseLap),0,1),p=pathPoint(pts,lapFrac);
   let c=miniMapColour(d),isRival=d.id===S.rival;
   let radius=d.player?3.2:isRival?2.9:1.55;
   let stroke=d.player?'white':isRival?'#ff2d55':'none';
   let sw=d.player||isRival?.9:0;
   let label=d.player?'YOU':isRival?'R':d.pos;
   return `<g class="${d.player?'map-player':isRival?'map-rival':''}">
     <circle cx="${p[0]}" cy="${p[1]}" r="${radius}" fill="${c.a}" stroke="${stroke}" stroke-width="${sw}"/>
     <circle cx="${p[0]}" cy="${p[1]}" r="${Math.max(1,radius*.48)}" fill="${c.b}" opacity=".95"/>
     <text x="${p[0]+3.2}" y="${p[1]-2}" font-size="${d.player||isRival?3.2:2.2}" font-weight="${d.player||isRival?'700':'400'}">${label}</text>
   </g>`
 }).join('');
 el.innerHTML=`<div class="trackerHead"><strong>${cur().tracks[S.round]}</strong><span>Lap ${r.lap}/${r.laps}</span></div>
 <svg viewBox="0 0 100 100"><path d="${path}" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="4.5"/><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.2"/>${markers}</svg>
 <small>Your marker uses your selected team livery • <strong>R</strong> marks your rival</small>`
}

function rainChanceNow(r=S.race){if(!r)return clamp(Math.round((S.weatherPlan?.startWetness||0)*.72+(S.weather==='Wet'?28:S.weather==='Mixed'?14:4)),2,96);let wet=r.wetness||0,intensity=r.rainIntensity||0,base=wet*.42+intensity*.48,plan=S.weatherPlan;if(plan&&Number.isFinite(plan.rainLap)){let away=plan.rainLap-r.lap;if(away<=0)base=Math.max(base,82);else if(away<=2)base=Math.max(base,74-away*5);else if(away<=5)base=Math.max(base,58-(away-2)*6);else if(away<=9)base=Math.max(base,30-(away-5)*4)}if(intensity>8)base+=12;return clamp(Math.round(base),2,98)}
function rainChanceTrend(r=S.race){if(!r)return 'Pre-race forecast';let now=rainChanceNow(r),next=now,plan=S.weatherPlan;if(plan&&Number.isFinite(plan.rainLap)&&plan.rainLap>r.lap)next=clamp(now+(plan.rainLap-r.lap<=5?12:5),2,98);else if((r.rainIntensity||0)>5)next=clamp(now+4,2,98);else if((r.wetness||0)>35)next=clamp(now-3,2,98);return next>now+2?'↑ increasing':next<now-2?'↓ easing':'→ steady'}
function racePreviewData(){
 let track=cur().tracks[S.round]||'Next round',tc=trackCharacteristics(track),wet=S.weatherPlan?.startWetness??0;let rainChance=rainChanceNow();
 let setup=setupText(),pit=pitLossEstimate(),tyres=wet>55?'Intermediate / Wet':wet>20?'Medium / Intermediate':'Soft / Medium';
 let strengths=[];
 if(tc?.downforce>1.05)strengths.push('High-downforce circuit');
 if(tc?.power>1.05)strengths.push('Power-sensitive circuit');
 if(tc?.tyre>1.05)strengths.push('High tyre stress');
 if(!strengths.length)strengths.push('Balanced circuit characteristics');
 return {track,tc,wet,rainChance,setup,pit,tyres,strengths}
}
function renderRacePreview(){
 let targets=[$('racePreview'),$('racePreviewWeekend')].filter(Boolean);if(!targets.length)return;let el=targets[0];
 let d=racePreviewData(),forecast=weatherLabelFromWetness(d.wet),obj=(S.sponsorObjectives||[]).filter(x=>!x.done).map(x=>x.label).slice(0,2);
 let mate=S.field.find(x=>x.id===S.teammate);
 el.innerHTML=`<div class="previewHero"><div><span class="eyebrow">NEXT EVENT</span><h3>${d.track}</h3><p>${d.strengths.join(' • ')}</p></div><div class="previewStat"><b>${forecast}</b><small>forecast</small></div></div>
 <div class="previewGrid"><div><small>Recommended setup</small><strong>${d.setup}</strong></div><div><small>Likely tyre focus</small><strong>${d.tyres}</strong></div><div><small>Estimated pit loss</small><strong>${d.pit.toFixed(1)}s</strong></div><div><small>Chance of rain</small><strong>${d.rainChance}%</strong></div><div><small>Teammate</small><strong>${mate?.name||'—'}</strong></div></div>
 ${obj.length?`<div class="previewObjectives"><b>Sponsor targets:</b> ${obj.join(' • ')}</div>`:''}<div class="confidenceExplainer"><b>Driver confidence:</b> Every driver gains confidence by outperforming the expected position of their car/driver package. High confidence gives a modest pace boost; underperformance, spins and damage reduce it.</div>`;
;targets.slice(1).forEach(x=>x.innerHTML=el.innerHTML)}
function renderRaceReview(){
 let targets=[$('raceReview'),$('raceReviewWeekend')].filter(Boolean);if(!targets.length)return;let el=targets[0];
 let a=S.lastAnalysis,c=S.lastClassification;
 if(!a||!c){el.innerHTML='<div class="muted">Complete a race to unlock the post-race review.</div>';targets.slice(1).forEach(x=>x.innerHTML=el.innerHTML);return}
 let me=c.rows?.find(x=>x.player),gain=me?(me.startPos-me.pos):0;
 let incidents=(c.rows||[]).filter(x=>x.status==='DNF').length;let liveConf=S.race?.racers?.find(x=>x.player)?.confidence||50;
 el.innerHTML=`<div class="reviewHero"><div><span class="eyebrow">POST-RACE REVIEW</span><h3>${c.track}</h3><p>${a.summary}</p></div><div class="previewStat"><b>${me?.status||'—'}</b><small>classification</small></div></div>
 <div class="previewGrid"><div><small>Grid → Finish</small><strong>P${me?.startPos||'—'} → ${me?.status==='DNF'?'DNF':'P'+(me?.pos||'—')}</strong></div><div><small>Positions</small><strong>${gain>0?'+'+gain:gain}</strong></div><div><small>Pit stops</small><strong>${me?.pits??0}</strong></div><div><small>Fastest lap</small><strong>${c.fastest?c.fastest.name:'—'}</strong></div><div><small>Confidence</small><strong>${me?.confidence??50}% • ${confidenceLabel(me?.confidence??50)}</strong></div><div><small>Expected vs finish</small><strong>P${me?.expectedPos||'—'} → ${me?.status==='DNF'?'DNF':'P'+(me?.pos||'—')}</strong></div></div>
 ${S.lastRaceRating?`<div class="raceRating"><strong>${S.lastRaceRating.rating}/10</strong><span>Driver rating • ${S.lastRaceRating.overtakes} overtakes • expected P${S.lastRaceRating.expected} • rep ${S.lastRaceRating.repDelta>=0?'+':''}${S.lastRaceRating.repDelta||0}</span></div>`:''}<div class="reviewText"><p><b>Strategy:</b> ${a.strategy}</p><p><b>Pit review:</b> ${a.pits}</p><p><b>Tyres:</b> ${a.tyres}</p><p><b>Race incidents:</b> ${incidents} retirement${incidents===1?'':'s'} in the field.</p></div>`;
;targets.slice(1).forEach(x=>x.innerHTML=el.innerHTML)}

function renderRace(){
 let r=S.race;let rb=$('rainChanceBox');if(rb){let chance=rainChanceNow(r);rb.innerHTML=`<b>🌧️ Chance of rain: ${chance}%</b><span>${rainChanceTrend(r)}</span>${r?`<small>Track wetness ${Math.round(r.wetness||0)}% • Rain intensity ${Math.round(r.rainIntensity||0)}%</small>`:''}`;}
 let dmg=$('damageStatus');
 if(r?.racers){let pp=r.racers.find(x=>x.player);if(pp?.puncture&&dmg)dmg.classList.add('critical');else if(dmg)dmg.classList.remove('critical')}
 if(dmg){let dp=r?.racers?.find(x=>x.player);dmg.innerHTML=dp?`<strong>Car damage</strong><span>${damageLabel(dp)}</span><small>Pace loss: +${damagePacePenalty(dp).toFixed(2)}s/lap • Confidence ${Math.round(dp.confidence||50)}% (${confidenceLabel(dp.confidence||50)}) • Expected P${dp.expectedPos||expectedRacePosition(dp,r)}</small>`:'<strong>Car damage</strong><span>—</span>'}
renderClassification();if(r)renderCircuitTracker();
 let pitBtn=$('pitBtn'),pitTyre=$('pitTyre'),pitStatus=$('pitStatus');
 if(pitBtn){
   let pp=r?.racers?.find(x=>x.player),active=!!(r&&pp&&!pp.dnf&&r.lap<r.laps);
   pitBtn.disabled=!active;
   pitBtn.textContent=pp?.pitRequested?'Cancel pit call':'BOX this lap';
   if(pitTyre)pitTyre.disabled=!active||!!pp?.pitRequested;
   if(pitStatus)pitStatus.textContent=pp?.pitRequested?`Queued: ${pp.requestedTyre||selectedPitTyre()} • pit at end of next lap`:(active?'No pit stop queued':'Pit stop unavailable');
 }
 if(!r){$('raceStatus').textContent='Race not started';$('lapBadge').textContent='Lap —';$('timing').innerHTML='Start the race to see live timing.';$('lapBtn').disabled=$('fiveBtn').disabled=$('autoBtn').disabled=true;$('radioBox').classList.add('hidden');$('raceIntel').innerHTML='No active race. The latest final classification is shown below.';return}
 normalizeTiming(r);$('raceStatus').textContent=(r.sc?'Safety Car • ':'')+r.weather+' • Track '+Math.round(r.wetness||0)+'% wet • Leader '+raceClockFmt(r.leaderTime);$('lapBadge').textContent=`Lap ${r.lap}/${r.laps}`;$('timing').innerHTML=pitTable();$('lapBtn').disabled=$('fiveBtn').disabled=$('autoBtn').disabled=!!r.pending;
 if(r.pending){$('radioBox').classList.remove('hidden');$('radioBox').innerHTML=`<strong>📻 ${r.pending.title}</strong><div>${r.pending.text}</div><div class="choices">${r.pending.choices.map(c=>`<button data-radio="${c[1]}">${c[0]}</button>`).join('')}</div>`;document.querySelectorAll('[data-radio]').forEach(b=>b.onclick=()=>chooseRadio(b.dataset.radio))}else $('radioBox').classList.add('hidden');
 let p=r.racers.find(x=>x.player),life=TYRES[p.tyre]?.life||28,mode=$('paceMode').value,modeMult={Conserve:.70,Balanced:1,Push:1.32,Attack:1.58}[mode]||1,est=Math.max(1,Math.round((100-p.wear)/((100/life)*modeMult))),cross=bestTyreForWetness(r.wetness),nextRain=r.weatherPlan?.rainStart===null?null:Math.round(r.weatherPlan.rainStart*r.laps),pitStart=Math.min(r.laps-1,r.lap+Math.max(1,est-3)),pitEnd=Math.min(r.laps-1,r.lap+Math.max(2,est));
 let recommendation=cross&&p.tyre!==cross?`Box for ${cross} now`:(!cross&&!TYRES[p.tyre]?.dry?'Slick crossover approaching / box soon':(nextRain&&nextRain>r.lap&&nextRain-r.lap<6?'Consider extending to the rain window':`Dry pit window L${pitStart}–L${pitEnd}`));
 let lapsLeft=Math.max(0,r.laps-r.lap),baseBurn=100/r.laps,fuelModeNow=$('fuel').value,
 fuelMult=fuelModeNow==='Push'?1.09:fuelModeNow==='Conserve'?.92:1,
 projectedBurn=baseBurn*fuelMult,fuelNeed=lapsLeft*projectedBurn,fuelMargin=p.fuel-fuelNeed,
 makeFinish=fuelMargin>-2,projectedFuelLaps=projectedBurn>0?p.fuel/projectedBurn:99;
 $('raceIntel').innerHTML=`<div class="resourceGrid"><div><strong>Fuel remaining</strong><span>${p.fuel.toFixed(1)}%</span><div class="resourceMeter"><i style="width:${clamp(p.fuel,0,100)}%"></i></div><small>${makeFinish?'Projected to finish':'SAVE FUEL'} • ~${projectedFuelLaps.toFixed(1)} laps of fuel • finish margin ${fuelMargin>=0?'+':''}${fuelMargin.toFixed(1)}%</small></div><div><strong>ERS</strong><span>${Math.round(p.ers)}%</span><div class="resourceMeter"><i style="width:${clamp(p.ers,0,100)}%"></i></div><small>${p.ers<12?'Harvest required':p.ers>60?'Attack available':'Manage deployment'}</small></div></div><strong>Driving mode:</strong> ${mode} • ${$('fuel').value} fuel • ${$('ers').value} ERS<br><strong>Setup:</strong> ${S.setup||'Balanced'} • ${setupText()}<br><strong>Track wetness:</strong> ${Math.round(r.wetness||0)}% • ${r.weatherPlan?.forecast||S.forecast}<br><strong>Performance model:</strong> driver + car pace with realistic field spread<br><strong>Fastest:</strong> ${r.fastest?`${r.fastest.name} ${lapTimeFmt(r.fastest.time)} (L${r.fastest.lap})`:'—'}<br><strong>Your tyre estimate:</strong> ~${est} laps remaining<br><strong>Strategy call:</strong> ${recommendation}<br><strong>Pit loss now:</strong> ~${(r.sc?pitLossEstimate()*.58:pitLossEstimate()).toFixed(1)}s${r.sc?' (Safety Car)':''}<br><strong>Pit history:</strong> ${r.pitHistory.length?r.pitHistory.slice(-5).map(x=>`${x.driver} L${x.lap} ${x.from}→${x.to}`).join(' • '):'No stops yet'}`
}
function feed(t){let box=$('feed'),d=document.createElement('div');d.className='feeditem';d.textContent=t;box.prepend(d);while(box.children.length>30)box.removeChild(box.lastChild)}
function standingRows(){let rows=[{player:true,name:S.name,points:S.standings.player||S.points},...S.field.map(d=>({id:d.id,name:d.name,points:S.standings[d.id]||0}))];return rows.sort((a,b)=>b.points-a.points)}
function renderStandings(){let rows=standingRows();$('standingsTable').innerHTML='<table><tr><th>Pos</th><th>Driver</th><th>Points</th></tr>'+rows.map((d,i)=>`<tr class="${d.player?'you':''}"><td>${i+1}</td><td>${d.name}</td><td>${d.points}</td></tr>`).join('')+'</table>';$('seasonResults').innerHTML='<table><tr><th>Round</th><th>Session</th><th>Result</th><th>Pts</th></tr>'+S.results.filter(x=>x.season===S.season).map(x=>`<tr><td>${x.track}</td><td>${x.kind}</td><td>${x.finish}</td><td>${x.points}</td></tr>`).join('')+'</table>';renderWorldStandings()}
function renderDriver(){let labels={pace:'Pace',racecraft:'Racecraft',consistency:'Consistency',fitness:'Fitness',wet:'Wet skill',feedback:'Feedback'};$('driverStats').innerHTML=`<p><strong>Overall ${overall()}</strong> • Morale ${Math.round(S.morale)}% • Reputation ${Math.round(S.rep)}</p>${S.lastRaceRating?`<div class="driverRating"><b>Last race ${S.lastRaceRating.rating}/10</b><span>${S.lastRaceRating.overtakes} overtakes • expected P${S.lastRaceRating.expected}</span></div>`:''}`+Object.entries(S.stats).map(([k,v])=>`<div class="statrow"><div class="statline"><span>${labels[k]}</span><strong>${Math.round(v)}</strong></div><div class="bar"><span style="width:${v}%"></span></div></div>`).join('');$('superLicenceBox').innerHTML=`<p><strong>${Math.round(S.superLicence)}/40 points</strong>${S.superLicence>=40?' • Eligible for F1':' • 40 required for F1'}</p><div class="slbar"><span style="width:${S.superLicence/40*100}%"></span></div>`;$('ladder').innerHTML=SERIES.map((x,i)=>`<div class="ladderRow ${i===S.series?'current':''}">${i<S.series?'✓':i===S.series?'🏁':'○'} ${x.name}</div>`).join('');$('academyBox').innerHTML=S.academy?`<div class="contract">🎓 ${S.academy}<br><span class="muted">Reputation bonus and better contract access.</span></div>`:'<div class="muted">No academy contract yet.</div>';let rv=S.field.find(x=>x.id===S.rival),tm=S.field.find(x=>x.id===S.teammate);$('rivalBox').innerHTML=rv?`<div class="contract">⚔️ ${rv.name}<br><span class="muted">Your benchmark this season.</span></div>`:'—';$('teammateBox').innerHTML=tm?`<div class="comparison"><span>${S.name}</span><strong>${S.career.teammateWins}-${S.career.teammateLosses}</strong><span>${tm.name}</span></div><p class="muted">Season benchmark skill: ${Math.round(tm.skill)}</p>`:'—'}
function upgrade(k){startProject(k,'Normal')}
function acceptOffer(i,negotiated=false){let o=S.offers[i];if(!o)return;if(o.series>S.series){if(o.series===4&&S.superLicence<40)return notice('You need 40 Super Licence points for F1.');S.series=o.series;S.round=0;S.points=0;S.standings={};makeField();weather()}S.teamTier=o.tier;S.cash+=o.salary||0;S.offers=[];hist('📄 Contract signed: '+o.team+(negotiated?' after negotiation':''));notice('Signed with '+o.team);render();save()}
function maybeAcademyOffer(){if(S.academy||S.series<1||Math.random()>.35)return;S.academyOffers=[['Velocity Academy',3],['Titan Junior Programme',4],['Apex Driver Academy',2]].sort(()=>Math.random()-.5).slice(0,1).map(x=>({name:x[0],bonus:x[1]}))}
function acceptAcademy(i){let a=S.academyOffers[i];if(!a)return;S.academy=a.name;S.rep=clamp(S.rep+a.bonus,0,100);S.academyOffers=[];hist('🎓 Joined '+S.academy);render();save()}
function sponsor(){if(S.sponsor)return;S.sponsor={name:['Velocity Energy','Apex Data','Titan Performance'][ri(0,2)],rounds:6,bonus:4+S.series*3};hist('💼 Sponsor signed: '+S.sponsor.name);makeSponsorObjectives();render();save()}
function renderTeam(){$('teamName').textContent=team()[0];$('teamInfo').innerHTML=`<p>Car performance <strong>${Math.round(car())}</strong>/100 • Reliability <strong>${Math.round(rel())}</strong>/100</p><div class="partSummary">${Object.entries(DEV_PARTS).map(([k,v])=>`<span>${v.name} <b>${devVal(k).toFixed(1)}</b></span>`).join('')}</div>`;document.querySelectorAll('[data-up]').forEach(b=>{let k=b.dataset.up,p=DEV_PARTS[k];if(p){let cost=Math.round((10+S.series*7+devVal(k)*3.5)*p.cost);b.innerHTML=`<strong>${p.name}</strong><small>${p.desc}</small><span>${fmt(cost)}</span>`}b.onclick=()=>upgrade(k)});$('contracts').innerHTML=S.offers.length?S.offers.map((o,i)=>`<div class="contract"><strong>${o.team}</strong><br><span class="muted">${SERIES[o.series].name} • signing bonus ${fmt(o.salary)}</span><div class="negotiation"><button data-neg="safe:${i}">Accept safely</button><button data-neg="balanced:${i}">Negotiate</button><button data-neg="aggressive:${i}">Push hard</button></div></div>`).join(''):'<div class="muted">No active offers.</div>';document.querySelectorAll('[data-neg]').forEach(b=>b.onclick=()=>{let [style,i]=b.dataset.neg.split(':');if(style==='safe')acceptOffer(+i);else negotiateOffer(+i,style)});$('academyOffers').innerHTML=S.academy?`<div class="contract">Currently signed to ${S.academy}</div>`:(S.academyOffers.length?S.academyOffers.map((a,i)=>`<div class="contract"><strong>${a.name}</strong><br><span class="muted">Reputation bonus +${a.bonus}</span><br><button data-academy="${i}">Join academy</button></div>`).join(''):'<div class="muted">No academy offer currently.</div>');document.querySelectorAll('[data-academy]').forEach(b=>b.onclick=()=>acceptAcademy(+b.dataset.academy));$('sponsorBox').innerHTML=S.sponsor?`<div class="sponsor">💼 ${S.sponsor.name} • ${S.sponsor.rounds} rounds remaining</div>`:'<button id="sponsorBtn">Find sponsor</button>';if($('sponsorBtn'))$('sponsorBtn').onclick=sponsor;renderSponsorObjectives();$('marketBox').innerHTML=S.market.length?S.market.map(m=>`<div class="marketMove">🔄 ${m}</div>`).join(''):'<div class="muted">Driver market updates appear between seasons.</div>'}
function renderHistory(){let c=S.career;$('careerStats').innerHTML=`<table><tr><th>Starts</th><td>${c.starts}</td></tr><tr><th>Wins</th><td>${c.wins}</td></tr><tr><th>Podiums</th><td>${c.podiums}</td></tr><tr><th>Poles</th><td>${c.poles}</td></tr><tr><th>Fastest laps</th><td>${c.fastestLaps}</td></tr><tr><th>Titles</th><td>${c.titles}</td></tr><tr><th>F1 wins</th><td>${c.f1wins}</td></tr><tr><th>Career points</th><td>${c.points}</td></tr><tr><th>DNFs</th><td>${c.dnfs}</td></tr></table>`;$('historyList').innerHTML=S.history.length?S.history.map(h=>`<div><strong>S${h.season} • ${h.series}</strong><br>${h.t}</div>`).join(''):'<div class="muted">No history yet.</div>';$('raceAnalysis').innerHTML=S.lastAnalysis?`<strong>${S.lastAnalysis.summary}</strong><br><span class="muted">Start strategy:</span> ${S.lastAnalysis.strategy}<br><span class="muted">Pit stops:</span> ${S.lastAnalysis.pits}<br><span class="muted">Tyres:</span> ${S.lastAnalysis.tyres}<br><span class="muted">Fastest lap:</span> ${S.lastAnalysis.fastest}`:'Complete a race to see strategy analysis.'}
function bind(){
 if($('trainingGrid'))$('trainingGrid').addEventListener('click',e=>{let b=e.target.closest('[data-train]');if(b&&!b.disabled)train(b.dataset.train)});
 if($('qualBtn'))$('qualBtn').onclick=qualifyingAction;
 if($('forceRaceBtn'))$('forceRaceBtn').onclick=forceRaceRecovery;
 if($('pitTyre'))$('pitTyre').onchange=()=>{let p=S.race?.racers?.find(x=>x.player);if(p?.pitRequested)p.requestedTyre=selectedPitTyre();renderRace();save()};
 if($('resetWeekendBtn'))$('resetWeekendBtn').onclick=()=>{S.race=null;S.grid=null;S.qualStage=0;S.practice=3;S.phase='practice';notice('Weekend reset. Practice and qualifying are available again.');render();save();};
if($('fuelLoad'))$('fuelLoad').oninput=renderFuelLoad;if($('liverySelect'))$('liverySelect').onchange=e=>setLivery(e.target.value);document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab-panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});$('qualBtn').onclick=qualifyingAction;$('raceBtn').onclick=startRace;$('lapBtn').onclick=()=>advance(1);$('fiveBtn').onclick=()=>advance(5);$('autoBtn').onclick=()=>{for(let i=0;i<10&&S.race&&!S.race.pending;i++)simLap();renderRace();render();save()};$('saveBtn').onclick=()=>save(true);$('newBtn').onclick=()=>{if(confirm('Start a new career and replace your save?'))$('newDialog').showModal()};['startTyre','risk','ers','fuel','paceMode','carSetup'].forEach(id=>$(id).onchange=()=>{S.setup=$('carSetup').value||S.setup;renderStrategyAdvice();$('setupAdvice').textContent=setupText();if(S.race){feed('📻 Controls updated • pace '+$('paceMode').value+' • fuel '+$('fuel').value+' • ERS '+$('ers').value+'.');renderRace();save()}});$('newForm').onsubmit=e=>{e.preventDefault();S=fresh($('driverName').value.trim()||'Alex Combes',$('nationality').value,$('archetype').value);makeField();weather();hist('🏁 Career started in Karting');$('newDialog').close();notice('Career started. Begin practice.');render();save()}}

 document.addEventListener('click',e=>{
 let sp=e.target.closest('[data-start-project]');if(sp){e.preventDefault();startProject($('projectPart').value,$('projectRisk').value);return}
 let mf=e.target.closest('[data-manufacture]');if(mf){e.preventDefault();manufactureProject(mf.dataset.manufacture);return}
 let fp=e.target.closest('[data-fit]');if(fp){e.preventDefault();fitProject(fp.dataset.fit);return}
 let hs=e.target.closest('[data-hire]');if(hs){e.preventDefault();hireStaff(hs.dataset.hire);return}
 let rv=e.target.closest('[data-regvote]');if(rv){e.preventDefault();regulationVote(rv.dataset.regvote);return}
 let md=e.target.closest('[data-media]');if(md){e.preventDefault();answerMedia(+md.dataset.media);return}
 let pp=e.target.closest('#runProgrammeBtn');if(pp){e.preventDefault();runPracticeProgramme();return}

 let fu=e.target.closest('[data-factory-upgrade]');if(fu){e.preventDefault();upgradeFactory(fu.dataset.factoryUpgrade);return}
 let rh=e.target.closest('[data-open-racehub]');if(rh){e.preventDefault();let tab=document.querySelector('[data-tab="raceHub"]');if(tab)tab.click();return}
  let pb=e.target.closest('#pitBtn');if(pb){e.preventDefault();requestManualPit();return}

  let pr=e.target.closest('#preseasonRunBtn');if(pr){e.preventDefault();runPreseasonDay();return}
  let ps=e.target.closest('#preseasonSkipBtn');if(ps){e.preventDefault();skipPreseason();return}
  let fr=e.target.closest('#forceRaceBtn');if(fr){e.preventDefault();forceRaceRecovery();return}
  let an=e.target.closest('[data-academy-negotiate]');if(an){e.preventDefault();openAcademyNegotiation(an.dataset.academyNegotiate);return}
  let ad=e.target.closest('[data-academy-deal]');if(ad){e.preventDefault();academyDealAction(ad.dataset.academyDeal);return}

  let b=e.target.closest('[data-academy-sign]');if(b)signAcademy(b.dataset.academySign);
  let a=e.target.closest('[data-poach-accept]');if(a)acceptPoach(a.dataset.poachAccept);
  let r=e.target.closest('[data-poach-reject]');if(r)rejectPoach(r.dataset.poachReject);
  let l=e.target.closest('[data-team-livery]');if(l)setTeamLivery(l.dataset.teamLivery);
 });
document.addEventListener('change',e=>{if(e.target?.id==='nextCarAllocation'){S.nextCarAllocation=+e.target.value;renderManagement();save()}if(e.target?.id==='practiceProgramme'){S.practiceProgramme=e.target.value;save()}if(e.target?.id==='preseasonFocus'&&S.preseason){S.preseason.focus=e.target.value;renderPreseason();save()}});
ensure();
if(!['practice','qualifying','sprint','race','finished'].includes(S.phase)){S.phase='practice';S.practice=3;S.grid=null;S.race=null}
if(S.phase==='race'&&!S.grid&&!S.race){S.phase='practice';S.practice=3}
if(S.grid&&(S.phase==='race'||S.phase==='sprint')&&S.race&&(!Array.isArray(S.race.racers)||S.race.lap===0))S.race=null
bind();if(!localStorage.getItem('roadToF1V102')&&!localStorage.getItem('roadToF1V64')&&!localStorage.getItem('roadToF1V53')&&!localStorage.getItem('roadToF1V52')&&!localStorage.getItem('roadToF1V51')&&!localStorage.getItem('roadToF1V50')&&!localStorage.getItem('roadToF1V46')&&!localStorage.getItem('roadToF1V44')&&!localStorage.getItem('roadToF1V4')&&!localStorage.getItem('roadToF1V33'))$('newDialog').showModal();render();
