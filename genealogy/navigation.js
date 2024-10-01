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
function PL(){
CE(parent);
if(parent.staticMode){
SS("printbutton",false);
}
};
function NSS(s){
SH("sidelinktext",s?"Hide":"Show");
};
function NKS(s){
SH("keylinktext",s?"Hide":"Show");
};
function NSD(d){
SO("showdetail",d);
};
function NSC(c){
SO("showcousins",c);
};
function NSH(c){
SO("showchildren",c);
};
function NSA(c){
SO("showparents",c);
};
function NGC(){
return parseInt(GO("showcousins"));
};
function NGH(){
return parseInt(GO("showchildren"));
};
function NGA(){
return parseInt(GO("showparents"));
};
function NCD(){
var d=GO("showdetail");
parent.ECD((d.charAt(0)=="_")?null:d,(d=="_pq")?true:((d=="_pl")?false:null),(d=="_m1")?true:((d=="_m0")?false:null),(d=="_r1")?true:((d=="_r0")?false:null));
};
function NSP(i){
ST("backtotext",(i==parent.GV("personid"))?"me":(parent.Efa[i]?parent.Efa[i].h:"start"));
};
function NCP(i){
ST("jumplink",i>1?("Find ("+i+" people)"):"Find person");
};
function NJM(){
var jn=[];
for(var j in parent.Efa){
var p=parent.Efa[j];
var l=p.l||p.q;
var bs=parent.FPD(p.b||"").y;
var ds=parent.FPD(p.d||"").y;
var ey=(bs||ds)?(" ("+(bs||"")+"-"+(ds||"")+")"):"";
jn[jn.length]={i:j,l:l?l.toLowerCase():"zzz",p:p.p?p.p.toLowerCase():"zzz",n:p.n+ey};
}
jn.sort(NSN);
var v=GE("personjump");
v.options.length=0;
for(j=0;j<jn.length;j++){
v.options[v.options.length]=new Option(jn[j].n,jn[j].i);
}
SO("personjump",parent.GV("viewpersonid"));
SS("jumplink",false);
SS("personjump",true);
};
function NRT(){
SS("personjump",false);
SS("jumplink",true);
};
function NSN(a,b){
if(a.l<b.l){
return -1;
}else{
if(b.l<a.l){
return 1;
}
}
if(a.p<b.p){
return -1;
}else{
if(b.p<a.p){
return 1;
}
}
return 0;
};
function SJS(i){
parent.ESP(i,true);
};

