const S=require('./engine.js'), a=require('assert'); let n=0;
function t(v,w){a.deepStrictEqual(v,w);n++;}
t(S.stages().length,6);t(S.boilPointC(0),100);t(S.boilPointC(274.32),99);t(S.boilPointC(1609),94.13);t(S.boilPointC(7000),null);t(S.adjustTempC(115.6,0),115.6);t(S.adjustTempC(115.6,1609),109.7);t(S.stageAt(114,0).id,'soft-ball');t(S.stageAt(109,1609).id,'soft-ball');t(S.stageAt(150,0).id,'hard-crack');t(S.stageAt(144,2000).id,'hard-crack');t(S.stageAt(90,0),null);t(S.stageAt(150,7000),null);
console.log(n+' passed');
