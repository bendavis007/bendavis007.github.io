/*
	This Family Echo file is Copyright (c) Familiality Ltd.

	This file may be distributed only in whole and unmodified, as part of a
	family downloaded from Family Echo. You may make this file available on the
	World Wide Web without modification, only if used to display a family
	downloaded from Family Echo. You may make copies of this file for personal
	archiving purposes, only as part of a family downloaded from Family Echo.

	This file may not be distributed or copied for any other purpose. You are
	not permitted to modify, merge, publish, sublicense, rent, sell, lease,
	loan, decompile, reverse engineer or create derivative works from this file.

	This copyright and license notice must be kept in all copies of this file.
*/
var Btc={pd:4};
function BCG(f,ci,h){
var ds=[];
var tw=0;
for(var j=0;j<ci.length;j++){
var i=ci[j];
var d=BDD(f,i,h);
ds[ds.length]=d;
tw+=d.w;
}
var fl=ds[0].l;
var lr=ds[ds.length-1].r;
return {ds:ds,tw:tw,fl:fl,lr:lr,aw:(tw+fl-lr)};
};
function BCD(d,ds,aw,cx,cy,vx,vy){
var al=cx-aw/2;
var ar=cx+aw/2;
if((vx<al)||(vx>ar)){
TAL(d,vx,vy,vx,cy-0.75,false);
TAL(d,vx,cy-0.75,cx,cy-0.75,false);
TAL(d,cx,cy-0.75,cx,cy-0.5,false);
}else{
TAL(d,vx,vy,vx,cy-0.5,false);
}
TAL(d,al,cy-0.5,ar,cy-0.5,false);
var x=cx-aw/2+ds[0].l;
for(var j=0;j<ds.length;j++){
var cd=ds[j];
TAL(cd,0,0,0,-0.5,false);
TAD(d,cd,x-cd.l,cy);
x+=cd.w;
}
};
function BAE(d,f,i,si,x,y,dp,sr,da){
TAE(d,i,f[i],x,y);
if(dp&&(f[i].m||f[i].f)){
TAL(d,x,y,x,y-0.4,null);
}
if((sr!==null)&&(f[i].cp>((si&&f[i].pc[si])?1:0))){
TAL(d,x,y,x+(sr?0.45:-0.45),y,null);
}
if(da){
var ac=FLA(f,i);
if(ac.length){
TAL(d,x,y,x,y+0.35,null);
}
}
};
function BDA(d,f,i,si,h,dr,fx,cy){
var p=f[i];
var yt=0;
for(var pi in p.pc){
if(pi!=si){
yt++;
}
}
var ot=Math.min(0.1*(yt-1),0.15);
var ly=cy+ot/2;
var yo=(yt>1)?(ot/(yt-1)):0;
var yi=0;
for(var pi in p.pc){
if(pi!=si){
BDH(d,f,i,pi,FLP(f,i,pi),h,dr,fx,cy,ly);
ly-=yo;
}
}
};
function BDH(d,f,i,pi,ci,h,dr,fx,cy,ly){
if(ci.length){
var ds=BCG(f,ci,h);
var cx=dr?(d.r-ds.fl+ds.aw/2):(d.l-ds.lr-ds.aw/2);
var px=cx+(dr?0.5:-0.5);
BCD(d,ds.ds,ds.aw,cx,cy+1,(pi&&f[pi])?cx:fx,ly);
}else{
var cx=dr?d.r:(d.l-1);
var px=cx;
}
if(pi&&f[pi]){
BAE(d,f,pi,i,px,cy,true,dr,true);
TAL(d,fx,ly,(pi&&f[pi])?px:cx,ly,FMS(f,i,pi));
}
};
function BSS(d,f,p,si,h,cy){
var li=[],ri=[];
for(var j=0;j<si.length;j++){
if(FCC(p,f[si[j]])<0){
ri[ri.length]=si[j];
}else{
li[li.length]=si[j];
}
}
al=BDS(d,f,li,h,false,cy);
ar=BDS(d,f,ri,h,true,cy);
return {al:al,ar:ar,ll:li.length,rl:ri.length};
};
function BDS(d,f,si,h,dr,cy){
var al=0;
for(var j=0;j<si.length;j++){
var sd=BDD(f,si[dr?j:(si.length-j-1)],h);
var x=dr?(d.r-sd.l):(d.l-sd.r);
TAD(d,sd,x,cy);
TAL(d,x,cy,x,cy-0.5);
al=x;
}
return al;
};
function BPS(d,f,pi,oi,ph,h,dr,fx){
var p=f[pi];
if(p.m||p.f){
var px=fx;
if(ph<=1){
TAL(d,fx,-1,fx,-1.4,null);
}else{
if(h>0){
var bs=FLS(f,pi);
if(bs.length){
if(oi&&f[oi]&&(f[oi].f||f[oi].m)){
var al=BDS(d,f,bs,h-1,dr,-1);
var ar=fx;
}else{
var aa=BSS(d,f,p,bs,h-1,-1);
var al=aa.ll?aa.al:fx;
var ar=aa.rl?aa.ar:fx;
var px=(al+ar)/2;
if(Math.abs(px-fx)>Btc.pd){
px=fx+0.5*(aa.rl-aa.ll);
}
if(p.m&&p.f){
px+=(dr?-0.5:0.5);
}
}
TAL(d,al,-1.5,ar,-1.5);
}
}
TAL(d,fx,-1,fx,-1.5);
TAD(d,BAD(f,pi,ph-1,dr,h>0),px,-1);
}
}
};
function BAD(f,i,h,dr,dc){
var d=TND();
var p=f[i];
if(h>0){
var ox=0;
if(p.m||p.f){
if(p.m&&p.f){
var i1=dr?p.m:p.f;
var i2=dr?p.f:p.m;
TAD(d,BAD(f,i1,h-1,dr,false),0,-1);
BAE(d,f,i1,i2,0,-1,false,!dr,true);
ox=dr?d.r:(d.l-1);
TAD(d,BAD(f,i2,h-1,dr,false),ox,-1);
BAE(d,f,i2,i1,ox,-1,false,dr,true);
TAL(d,0,-1,ox,-1,FMS(f,i1,i2));
}else{
var pi=p.m||p.f;
TAD(d,BAD(f,pi,h-1,dr,false),0,-1);
BAE(d,f,pi,null,0,-1,false,f[pi].g!="m",false);
}
TAL(d,ox/2,-0.5,ox/2,-1,false);
TAL(d,ox/2,-0.5,0,-0.5,false);
if(!dc){
TAL(d,0,-0.5,0,0,false);
var bs=FLS(f,i);
if(bs.length){
TAL(d,ox/2,-0.5,ox/2+(dr?0.1:-0.1),-0.5,null);
}
}
}
}else{
if(p.m||p.f){
TAL(d,0,-0.4,0,0,null);
}
}
return d;
};
function BDD(f,i,h){
var p=f[i];
var d=TND();
var sr=FSM(f,i,p.es);
var sx=sr?1:-1;
if(h>0){
TAE(d,i,p,0,0);
var ac=FLA(f,i);
if(ac.length){
var ds=BCG(f,ac,h-1);
BCD(d,ds.ds,ds.aw,0,1,0,0);
}
if(p.es){
var tc=FLP(f,i,p.es);
if(tc.length){
var ds=BCG(f,tc,h-1);
if(ac.length){
sx=sr?(d.r+(ds.tw-ds.fl-ds.lr)/2+0.5):(d.l-(ds.tw+ds.lr+ds.fl)/2-0.5);
}
var cx=sr?(sx-0.5):(sx+0.5);
BCD(d,ds.ds,ds.aw,cx,1,cx,0);
}
TAL(d,0,0,sx,0,FMS(f,i,p.es));
BAE(d,f,p.es,i,sx,0,true,null,false);
var _1=FLA(f,p.es);
if(_1.length){
var ds=BCG(f,_1,h-1);
BCD(d,ds.ds,ds.aw,sr?(d.r+(ds.tw-ds.fl-ds.lr)/2):(d.l-(ds.tw+ds.lr+ds.fl)/2),1,sx,0);
}
BDA(d,f,p.es,i,h-1,sr,sx,0);
}
BDA(d,f,i,p.es,h-1,!sr,0,0);
}else{
BAE(d,f,i,null,0,0,false,sr,true);
}
return d;
};
function BGH(f,i){
var p=f[i];
var hc=p.es;
var ac=FLA(f,i);
if(hc&&(!p.m)&&(!p.f)&&p.pc[hc]&&(p.cp==1)&&(ac.length==0)){
return hc;
}
return null;
};
function BFT(f,i,m,ch,ph,co){
var p=f[i];
var hc=BGH(f,i);
if(hc&&!BGH(f,hc)){
var d=TND();
var od=BFT(f,hc,m,ch,ph,co);
TAD(d,od,-od.e[i].x,-od.e[i].y);
d.e[hc].k=false;
}else{
var d=BDD(f,i,ch);
if(ph>0){
var al=0,ar=0,px=0;
var bs=FLS(f,i);
if(bs.length){
var aa=BSS(d,f,p,bs,co,0);
al=aa.al;
ar=aa.ar;
px=(al+ar)/2;
if(Math.abs(px)>Btc.pd){
px=0.5*(aa.rl-aa.ll);
}
TAL(d,al,-0.5,ar,-0.5,false);
}
if(p.m||p.f){
TAL(d,0,0,0,-0.5,false);
TAL(d,px,-0.5,px,-1,false);
if(p.m&&p.f){
var mx=px-0.5,fx=px+0.5;
TAL(d,mx,-1,fx,-1,FMS(f,p.m,p.f));
}else{
var mx=px,fx=px;
}
if(p.m){
var pm=f[p.m];
TAE(d,p.m,pm,mx,-1);
}
if(p.f){
var pf=f[p.f];
TAE(d,p.f,pf,fx,-1);
}
if(p.m){
var ac=FLA(f,p.m);
if(ac.length&&p.f){
BDH(d,f,p.m,null,ac,co,false,mx,-1,-1);
}
BDA(d,f,p.m,p.f,co,false,mx,-1);
}
if(p.f){
var ac=FLA(f,p.f);
if(ac.length&&p.m){
BDH(d,f,p.f,null,ac,co,true,fx,-1,-1);
}
BDA(d,f,p.f,p.m,co,true,fx,-1);
}
if(p.m){
BPS(d,f,p.m,p.f,ph,co,false,mx);
}
if(p.f){
BPS(d,f,p.f,p.m,ph,co,true,fx);
}
}
}else{
if(p.f||p.m){
TAL(d,0,0,0,-0.4,null);
}
}
}
d.e[i].k=true;
if(m&&d.e[m]){
d.e[m].m=true;
}
return d;
};

