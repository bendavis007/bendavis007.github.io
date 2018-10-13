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
var Fmn=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var Fgn={"":"","f":"Female","m":"Male","o":"Other"};
function FAA(a,v){
a[a.length]=v;
};
function FRF(f,ap,fp){
for(var i in f){
var p=f[i];
p.c=[];
p.pc={};
p.fg=false;
if(p.m&&!f[p.m]){
p.m=null;
}
if(p.f&&!f[p.f]){
p.f=null;
}
if(p.s&&!f[p.s]){
p.s=null;
}
if(p.s){
p.pc[p.s]=true;
}
if(p.ep){
for(var j in p.ep){
if(p.ep[j]&&f[j]){
p.pc[j]=true;
}
}
}
}
var ai=0;
for(var i in f){
var p=f[i];
var mi=p.m;
var fi=p.f;
p.i=i;
p.h=null;
p.n=null;
p.hp=false;
ai++;
p.ai=ai;
if(p.p){
var _1=p.p.split(" ");
for(j=0;j<_1.length;j++){
if(_1[j].length){
p.h=_1[j];
var sn=p.l||p.q;
p.n=p.h+(sn?(" "+sn):"");
p.hp=true;
break;
}
}
}
if(mi&&fi){
f[mi].pc[fi]=true;
f[fi].pc[mi]=true;
}
if(mi){
FAA(f[mi].c,i);
}
if(fi){
FAA(f[fi].c,i);
}
}
for(var i in f){
var p=f[i];
var mi=p.m;
var fi=p.f;
if(!p.h){
if(i==ap){
p.h="Me";
}else{
if(i==fp){
p.h="Founder";
}else{
var r=p["^"];
if(r&&f[r]&&f[r].h){
if((r==mi)||(r==fi)){
p.h=FPT(f[r],((p.g=="f")?"Daughter":((p.g=="m")?"Son":"Child")));
}else{
if(f[r].m==i){
p.h=FPT(f[r],"Mother");
}else{
if(f[r].f==i){
p.h=FPT(f[r],"Father");
}else{
if((mi&&(f[r].m==mi))||(fi&&(f[r].f==fi))){
p.h=FPT(f[r],(((f[r].m==mi)&&(f[r].f==fi))?"":"Half ")+((p.g=="f")?"Sister":((p.g=="m")?"Brother":"Sibling")));
}else{
if(r==p.s){
p.h=FPT(f[r],"Partner");
}else{
if(f[r].pc[i]){
p.h=FPT(f[r],"Ex-partner");
}
}
}
}
}
}
}
}
}
if(!p.h){
p.h="Anon "+p.ai;
}
p.n=p.h;
}
p.cp=0;
for(var pi in p.pc){
p.cp++;
}
p.es=p.s||((p.cp==1)?pi:null);
}
if(fp){
FSR(f,fp,"fg",true,true,true,true,true,false);
}
};
function FSR(f,i,l,u,uu,d,dd,a,aa){
if(i&&f[i]&&!f[i][l]){
var p=f[i];
p[l]=true;
if(u){
FSR(f,p.m,l,uu,uu,dd,dd,aa,aa);
FSR(f,p.f,l,uu,uu,dd,dd,aa,aa);
}
if(d){
for(var j=0;j<p.c.length;j++){
FSR(f,p.c[j],l,false,false,dd,dd,aa,aa);
}
}
if(a){
FSR(f,p.es,l,uu,uu,dd,dd,aa,aa);
for(var pi in p.pc){
FSR(f,pi,l,uu,uu,dd,dd,aa,aa);
}
}
}
};
function FDF(f,i,si,sf,st){
for(var j in f){
f[j].cf=false;
}
FCF(f,i,"cf",null,si,sf,st);
var df=[];
for(var j in f){
if(!f[j].cf){
df[df.length]=j;
}
}
return df;
};
function FCF(f,i,l,fi,si,sf,st){
if(i&&f[i]&&!f[i][l]&&(i!=si)&&((i!=st)||(fi!=sf))){
var p=f[i];
p[l]=true;
FCF(f,p.m,l,i,si,sf,st);
FCF(f,p.f,l,i,si,sf,st);
for(var j=0;j<p.c.length;j++){
FCF(f,p.c[j],l,i,si,sf,st);
}
for(var pi in p.pc){
FCF(f,pi,l,i,si,sf,st);
}
}
};
function FCS(f,i){
for(var j in f){
f[j].sf=false;
}
FSR(f,i,"sf",true,true,true,true,false,true);
FSR(f,f[i].es,"sf",false,false,true,true,false,true);
for(var pi in f[i].pc){
FSR(f,pi,"sf",false,false,true,true,false,true);
}
var sf=[];
for(var j in f){
if(f[j].sf){
sf[sf.length]=j;
}
}
return sf;
};
function FMS(f,mi,fi){
return f[mi]&&f[fi]&&(f[mi].s==fi)&&(f[fi].s==mi);
};
function FGM(g){
return (g=="f")?-1:((g=="m")?1:0);
};
function FCM(p1,p2){
return (p1?FGM(p1.g):0)-(p2?FGM(p2.g):0);
};
function FSM(f,i,si){
var cm=FCM(i?f[i]:null,si?f[si]:null);
return cm?(cm<0):(si?(i<si):false);
};
function FIG(g){
return (g=="m")?"f":((g=="f")?"m":null);
};
function FPR(f,i){
var p=f[i];
for(var j in f){
f[j].rf=false;
}
FSR(f,i,"rf",false,false,true,true,false,false);
f[i].rf=false;
FSR(f,i,"rf",false,false,false,false,true,false);
FSR(f,p.m,"rf",true,true,false,false,false,false);
FSR(f,p.f,"rf",true,true,false,false,false,false);
var ra=[];
for(var j in f){
if(!f[j].rf){
FAA(ra,j);
}
}
return ra;
};
function FAR(f,i,si){
for(var j in f){
f[j].pf=false;
}
for(var pi in f[i].pc){
FSR(f,pi,"pf",true,false,false,false,false,false);
}
FSR(f,i,"pf",false,false,true,true,false,false);
if(si){
FPR(f,si);
}
var pa=[];
for(var j in f){
if((!f[j].pf)&&((!si)||f[si].pc[j]||(!f[j].rf))){
FAA(pa,j);
}
}
return pa;
};
function FPD(d){
try{
return {d:parseInt(d.substring(6,8),10),m:parseInt(d.substring(4,6),10),y:parseInt(d.substring(0,4),10)};
}
catch(e){
return "";
}
};
function FDT(d){
var p=FPD(d?d.toString():"");
return (p.m?((p.d?(p.d+" "):"")+Fmn[p.m]+" "):"")+(p.y?p.y:"");
};
function FDE(v,m,l){
v=parseInt(v);
v="0000"+((isNaN(v)||(v<0))?0:((v>m)?m:v));
return v.substring(v.length-l,v.length);
};
function FDS(d,m,y){
return FDE(y,9999,4)+FDE(m,12,2)+FDE(d,31,2);
};
function FPT(p,r){
return r+" of "+p.h;
};
function FCC(p1,p2){
var b1=(p1.b&&parseInt(p1.b.substring(0,4),10))?parseInt(p1.b,10):99999999;
var b2=(p2.b&&parseInt(p2.b.substring(0,4),10))?parseInt(p2.b,10):99999999;
if(b1<b2){
return -1;
}else{
if(b2<b1){
return 1;
}
}
if(p1.ai<p2.ai){
return -1;
}else{
if(p1.ai>p2.ai){
return 1;
}
}
return 0;
};
function FSC(f,ci){
var cp=[];
for(var j=0;j<ci.length;j++){
cp[cp.length]=f[ci[j]];
}
cp.sort(FCC);
ci.length=0;
for(var j=0;j<cp.length;j++){
ci[ci.length]=cp[j].i;
}
};
function FLA(f,i){
var ac=[];
var c=f[i].c;
for(var j=0;j<c.length;j++){
var cp=f[c[j]];
if(!(cp.m&&f[cp.m]&&cp.f&&f[cp.f])){
FAA(ac,c[j]);
}
}
FSC(f,ac);
return ac;
};
function FLP(f,i,pi){
var tc=[];
var c=f[i].c;
for(var j=0;j<c.length;j++){
var cp=f[c[j]];
if(((cp.m==i)&&(cp.f==pi))||((cp.f==i)&&(cp.m==pi))){
FAA(tc,c[j]);
}
}
FSC(f,tc);
return tc;
};
function FLS(f,i){
var bs=[];
var mi=f[i].m;
var fi=f[i].f;
var cs={};
if(mi&&f[mi]){
var c=f[mi].c;
for(var j=0;j<c.length;j++){
cs[c[j]]=true;
}
}
if(fi&&f[fi]){
var c=f[fi].c;
for(var j=0;j<c.length;j++){
cs[c[j]]=true;
}
}
for(var j in cs){
if(j!=i){
if(((f[j].m==mi)&&(f[j].f==fi))||((f[j].m==fi)&&(f[j].f==mi))){
FAA(bs,j);
}
}
}
FSC(f,bs);
return bs;
};

