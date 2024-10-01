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
var Efa={};
var Efo;
var Ewr;
var Ewp=null;
var Ead;
var Eve;
var Ezf,Esd=null,Ebn=false,Emn=false,Esp=false;
var Eeq=[];
var Esc=false;
var Ess="",Eis="";
var Eec=null;
var Epc=null;
var staticModeAfterRead;
var lastHash,currentHash;
var Elb=null;
var Ebi;
var Esb;
var Elh=null;
function PL(){
if(!staticMode){
CE();
}
if(hideSidebar){
ESI(false);
}
if(staticMode||((typeof (Ajax)!="undefined")&&Ajax.getTransport())){
window.onbeforeunload=EPU;
var c=GC("zoomfactor");
var zf=parseFloat((c===null)?defaultZoom:c);
Ezf=((zf>=0.25)&&(zf<=2))?zf:1.25;
var c=GC("showbirthname");
Ebn=parseInt((c===null)?defaultBirthName:c)?true:false;
var c=GC("showmiddlename");
Emn=parseInt((c===null)?defaultMiddleName:c)?true:false;
var c=GC("showphoto");
Esp=parseInt((c===null)?defaultShowPhoto:c)?true:false;
var c=GC("showdetail");
Esd=(c===null)?defaultDetail:c;
self.navframe.NSD(Esd);
var c=GC("showcousins");
self.navframe.NSC((c===null)?defaultCousins:c);
var c=GC("showchildren");
self.navframe.NSH((c===null)?defaultChildren:c);
var c=GC("showparents");
self.navframe.NSA((c===null)?defaultParents:c);
Ebi=(document.all&&(navigator.userAgent.toLowerCase().indexOf("msie")>=0));
Esb=(navigator.userAgent.toLowerCase().indexOf("safari")>=0);
if(staticMode){
Ewr=false;
Efo=GV("founderid");
var h=new String(window.location.hash);
if(h.length&&(h.charAt(0)=="#")){
h=h.substring(1);
}
var a=h.split(":");
var m=a[0];
var i=a[1];
if(i){
SV("viewpersonid",i);
}
if(m){
SV("viewmode",m);
}
ERP(false);
}else{
Ewr=true;
Ead=true;
Efo=GV("personid");
var fi=GV("familyid");
var ic=GV("importcacheid");
if(fi||ic){
AG("family_read",{f:fi,i:ic,p:GV("personid"),c:GV("checksum"),s:GV("sessionid")},EFR,fi&&(ic||GV("newscript").length));
}else{
ERP(false);
}
}
}else{
SS("treeframe",false);
SS("noajax",true);
}
};
function ESB(l){
if(!Esb){
if(Ebi){
Elh=l;
setTimeout("GE('backframe').src='back.htm?"+l+"';",100);
}else{
window.location.hash=l;
}
}
};
function EBI(l){
var h=new String(l.search);
var p=h.lastIndexOf("?");
if(p>=0){
h=h.substring(p+1);
}
if(Elh&&(Elh!=h)){
return;
}
Elh=null;
window.location.hash=h;
};
function EBT(){
if(!Esb){
var h=new String(window.location.hash);
if(h.length&&(h.charAt(0)=="#")){
h=h.substring(1);
}
if(Elh&&(Elh!=h)){
return;
}
var a=h.split(":");
var m=a[0];
var i=a[1];
lastHash=currentHash;
currentHash=m;
if((i&&(i!=GV("viewpersonid")))||(m&&(m!=GV("viewmode")))){
if((Eec!==null)&&(i==Epc)&&(m==="view")){
EFE(false);
}else{
if(i&&Efa[i]){
SV("viewpersonid",i);
}
if(m){
SV("viewmode",m);
}
EUS(false,null,null,true,true);
}
}
}
};
function EPU(e){
if((!Esc)&&(!staticMode)){
if(GV("newscript").length||GV("importcacheid")){
e=e||window.event;
var m="If you leave this page before saving, your changes to this family will be lost.";
e.returnValue=m;
return m;
}
}
};
function ESC(){
Esc=true;
};
function EFR(_1,_2,_3){
if(_3.ok){
Efa={};
if(_3.f){
if(_3.ar){
ERS(_3.t);
Ess=_3.t;
Eve=_3.v;
Ewr=_3.aw;
Ewp=_3.pw?GV("personid"):null;
Ead=_3.aa;
Efo=_3.fp;
}else{
RE("You do not have permission to view this family");
}
}
if(_3.m){
ERS(_3.m);
Eis=_3.m;
if(_3.ro){
staticMode=true;
staticModeAfterRead=true;
Ewr=false;
Ewp=false;
SS("do_signin",false);
SH("lfooterlinks","Family displayed via the <A HREF=\"http://www.familyecho.com/\" TARGET=\"_blank\">Family Echo</A> API.");
}
if(_3.lo){
SH("lfamilyname",_3.lo);
}
}
}else{
RE("This family could not currently be located. This may be due to occasional system maintenance, so please try again in a few hours.");
}
ERP(_2);
};
function ERP(_4){
ERS(GV("newscript"));
if(Esd===null){
Esd="";
for(var j in Efa){
if(Efa[j].r){
Esp=true;
}
}
self.navframe.NSD(Esd);
}
EUS(true,null,GV("viewmode"),true,false);
if(_4){
ESS();
}else{
EUL(false);
}
setInterval(EBT,250);
};
function EUS(r,i,m,d,s,_5){
var pi=Evp=GV("viewpersonid");
var pm=viewMode=GV("viewmode");
if(r){
var ap=GV("personid");
if(Efo&&!Efa[Efo]){
Efa[Efo]={};
}
FRF(Efa,ap,Efo);
if(ap&&Efa[ap]){
self.navframe.NSP(ap);
SV("name",Efa[ap].n);
SV("email",Efa[ap].e);
}else{
self.navframe.NSP(Efo);
}
var fc=0;
for(var j in Efa){
fc++;
}
self.navframe.NCP(fc);
if((staticMode||GV("familyid"))&&Efo&&Efa[Efo]){
if(!staticMode){
var _6=GE("lfamilyinfo"),_7="Founded by "+Efa[Efo].n,_8="<a href=\"\" onclick=\"ESM('history'); return false\">View history...</a>";
_6.innerHTML=EH(_7)+" - "+_8;
}else{
ST("lfamilyinfo",(Efo&&Efa[Efo])?("Founded by "+Efa[Efo].n):"");
}
}else{
ST("lfamilyinfo","");
}
}
if(i){
Evp=i;
}
if(m){
viewMode=m;
}
if((!Evp)||(!Efa[Evp])){
if(Efo&&Efa[Efo]){
Evp=Efo;
}else{
for(Evp in Efa){
break;
}
}
}
SV("viewpersonid",Evp);
SV("viewmode",viewMode);
if(viewMode=="history"){
ESI(true);
if((!Esb&&lastHash!=viewMode)||(Esb&&m)){
GE("extraframe").src="history.php?f="+escape(GV("familyid"))+"&p="+escape(GV("personid"))+"&c="+escape(GV("checksum"))+"&s="+escape(GV("sessionid"));
}
SI("extradiv",true);
}else{
if(viewMode=="share"){
ESI(true);
GE("extraframe").src="share.php?f="+escape(GV("familyid"))+"&p="+escape(GV("personid"))+"&c="+escape(GV("checksum"))+"&i="+escape(Evp)+"&s="+escape(GV("sessionid"))+"&z="+((Efa[Evp].z!="1")?0:1)+(_5!==undefined?"&return="+_5:"");
SI("extradiv",true);
}else{
if(viewMode=="download"){
ESI(true);
GE("extraframe").src="download.php?f="+escape(GV("familyid"))+"&p="+escape(GV("personid"))+"&c="+escape(GV("checksum"))+"&s="+escape(GV("sessionid"));
SI("extradiv",true);
}else{
if(viewMode=="print"){
ESI(true);
if(m){
GE("extraframe").src="print.php?f="+escape(GV("familyid"))+"&p="+escape(GV("personid"))+"&c="+escape(GV("checksum"))+"&s="+escape(GV("sessionid"));
}
SI("extradiv",true);
}else{
if(viewMode=="import"){
ESI(true);
GE("extraframe").src="import.php?p="+escape(GV("personid"));
SI("extradiv",true);
}else{
if(viewMode=="importfinish"){
}else{
if(GI("extradiv")){
GE("extraframe").src="";
SI("extradiv",false);
}
}
}
}
}
}
}
if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)&&navigator.userAgent.match(/AppleWebKit/)){
SS("extradiv",GI("extradiv"));
}
self.sideframe.SSE(Evp,viewMode);
var uf=(viewMode=="website")?"w":((viewMode=="blog")?"B":((viewMode=="photos")?"P":null));
if(uf){
GE("externalurl").src=Efa[Evp][uf];
SS("externaldiv",true);
self.sideframe.SSU(true);
}else{
if(GS("externaldiv")){
SS("externaldiv",false);
GE("externalurl").src="";
self.sideframe.SSU(false);
}
}
if(i||m){
ESB(viewMode+":"+Evp);
}
if(d||(Evp!=pi)){
self.treeframe.TRT(Efa,Evp,GV("personid"),Esd,Ebn,Emn,Esp,self.navframe.NGH(),self.navframe.NGA(),self.navframe.NGC(),pi,Ezf,s);
self.navframe.NRT();
}
if(r||(Evp!=pi)){
if(parent&&parent.postMessage){
parent.postMessage("focus="+Evp,"*");
}
}
};
function EUF(){
EUS(true,null,null,true,false);
};
function ERF(){
EUS(false,null,null,true,true);
};
function ESP(i,s){
EHW();
for(var j=0;j<(Eeq.length-1);j++){
if(Eeq[j]==i){
Eeq.splice(j,1);
EUS(false,i,"edit",false,s);
return;
}
}
var vm=GV("viewmode");
Eeq=[];
EUS(false,i,((vm=="share")||(vm=="print")||(vm=="history"))?null:"view",false,s);
};
function ESM(m,_9){
EUS(false,null,m,false,false,_9);
};
function ECS(){
Eec=GV("newscript").length;
Epc=GV("viewpersonid");
};
function ESE(r,i,b){
Eeq=[];
for(var j=1;j<i.length;j++){
Eeq[Eeq.length]=i[j];
}
Eeq[Eeq.length]=b;
EHW();
EUS(r,i[0],"edit",r,true);
};
function EFE(a){
if(a){
if(Eeq.length<=1){
ESS();
EHW();
EUS(false,Eeq.length?Eeq[0]:null,"view",false,true);
Eec=null;
}else{
EUS(false,Eeq.shift(),"edit",false,true);
}
}else{
if(Eec!==null){
ESM("view");
Efa={};
ERS(Ess);
ERS(Eis);
var ks=GV("newscript");
ks=ks.substring(0,Eec);
SV("newscript",ks);
ERS(ks);
Eec=null;
EUS(true,Epc,"view",true,true);
}else{
EUS(true,null,"view",true,true);
}
EUL(false);
}
};
function EFV(i,p,v){
if(i){
Efa[i]=Efa[i]||{};
if((p=="x")||(p=="s")){
if(Efa[i].s&&Efa[Efa[i].s]){
Efa[Efa[i].s].s=null;
}
}
if(p=="x"){
delete Efa[i];
}else{
if((p=="s")&&v){
Efa[v]=Efa[v]||{};
if(Efa[v].s&&Efa[Efa[v].s]){
Efa[Efa[v].s].s=null;
}
Efa[v].s=i;
}
Efa[i][p]=v?v:null;
}
}
};
function EPV(i1,i2,p,v){
if(i1&&i2){
Efa[i1]=Efa[i1]||{};
Efa[i2]=Efa[i2]||{};
var fn=p+"p";
Efa[i1][fn]=Efa[i1][fn]||{};
Efa[i2][fn]=Efa[i2][fn]||{};
Efa[i1][fn][i2]=v.length?v:null;
Efa[i2][fn][i1]=v.length?v:null;
}
};
function ERS(s){
var c=ECL(s);
for(var j=0;j<c.length;j++){
var e=c[j];
var i=e.t.substring(1,e.t.length);
var v=e.v.replace(/\\t/g,"\t").replace(/\\n/g,"\n").replace(/\\\\/g,"\\");
if(e.t.charAt(0)=="i"){
EFV(i,e.p,v);
}else{
if(e.t.charAt(0)=="p"){
var ii=i.split(" ");
EPV(ii[0],ii[1],e.p,v);
}
}
}
};
function ECL(s){
var l=NE(s).split("\n");
var c=[];
for(var j=0;j<l.length;j++){
var e=l[j].split("\t");
for(var k=1;k<e.length;k++){
c[c.length]={t:e[0],p:e[k].charAt(0),v:e[k].substring(1,e[k].length)};
}
}
return c;
};
function EOS(s){
var c=ECL(s);
var os="";
var pi=null;
var pc=[];
for(var j=0;j<c.length;j++){
var e=c[j];
if(e.t!=pi){
if(pi){
os+=pi+"\t"+pc.join("\t")+"\n";
}
pi=e.t;
pc=[];
}
var pl=pc.length;
pc[((pl>0)&&(pc[pl-1].charAt(0)==e.p))?(pl-1):pl]=e.p+e.v;
}
if(pi){
os+=pi+"\t"+pc.join("\t")+"\n";
}
return os;
};
function EFC(i,c){
for(var p in c){
var v=c[p]?NE(new String(c[p])):"";
EFV(i,p,v);
GE("newscript").value+="\ni"+i+"\t"+p.charAt(0)+v.replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/\t/g,"\\t");
}
EUL(false);
};
function EPC(i1,i2,c){
for(var p in c){
var v=c[p]?NE(new String(c[p])):"";
EPV(i1,i2,p,v);
GE("newscript").value+="\np"+i1+" "+i2+"\t"+p.charAt(0)+v.replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/\t/g,"\\t");
}
EUL(false);
};
function EFI(){
var c="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
for(var j=0;j<1000;j++){
var i="";
for(k=0;k<5;k++){
i+=c.charAt(Math.floor(Math.random()*(k?36:26)));
}
if(!Efa[i]){
break;
}
}
return i;
};
var Edf=false;
function ESS(){
if(!staticMode){
var fi=GV("familyid");
var ic=GV("importcacheid");
if(fi&&!Edf){
var _a=GV("newscript").length;
if(_a||ic){
Edf=true;
AP("family_append",{f:fi,i:ic,p:GV("personid"),c:GV("checksum"),v:Eve},EOS(GV("newscript")),ESR,_a);
EUL(false);
}else{
Edf=true;
EUL(false);
Edf=false;
setTimeout("EUL(true);",500);
}
}
}
};
function ESR(_b,_c,_d){
Edf=false;
if(_d.ok){
Eve=_d.v;
Ess+="\n"+Eis;
Eis="";
SV("importcacheid","");
var ns=GV("newscript");
Ess+=ns.substring(0,_c);
SV("newscript",ns.substring(_c,ns.length));
if(_d.t){
Efa={};
ERS(_d.t);
Ess=_d.t;
ERS(GV("newscript"));
EUS(true,null,null,true,false);
}
}else{
RE("The family could not be saved - please try again");
}
EUL(true);
};
function EUL(js){
if(!staticMode){
var _e=GV("newscript").length;
var ic=GV("importcacheid");
if(Edf){
p="lsaving";
}else{
if(_e||ic){
p="lsave";
}else{
if(!Ewr){
p=Ewp?"lwriteone":"lreadonly";
}else{
p=js?"lsaved":"linitial";
}
}
}
var es=["linitial","lreadonly","lwriteone","lsave","lsaving","lsaved"];
for(j=0;j<es.length;j++){
SS(es[j],p==es[j]);
}
var fi=GV("familyid");
var si=GV("sessionid");
SS("savefamily",(Ewr||_e||ic)&&fi);
SS("sharefamily",Ewr&&si&&fi);
self.sideframe.SSF();
}
};
function EAS(){
AP("userfamily_add",{s:GV("sessionid"),f:GV("familyid"),p:GV("personid"),c:GV("checksum")},"",EAR,null);
};
function EAR(_f,_10,_11){
if(_11.ok){
ST("lfamilyname",_11.n);
SS("addfamily",false);
}else{
RE(_11.er||"The family could not be added");
}
};
function EBS(){
var ap=GV("personid");
ESP((ap&&Efa[ap])?ap:Efo,true);
};
function ECZ(zi){
if(zi&&(Ezf<2)){
Ezf+=0.25;
}else{
if((!zi)&&(Ezf>0.5)){
Ezf-=0.25;
}
}
SC("zoomfactor",Ezf);
ERF();
};
function ECD(d,bn,mn,sp){
if(d!==null){
SC("showdetail",d);
Esd=d;
}
if(bn!==null){
SC("showbirthname",bn?1:0);
Ebn=bn;
}
if(mn!==null){
SC("showmiddlename",mn?1:0);
Emn=mn;
}
if(sp!==null){
SC("showphoto",sp?1:0);
Esp=sp;
}
self.navframe.NSD(Esd);
ERF();
};
function ECO(){
SC("showcousins",self.navframe.NGC());
ERF();
};
function ECH(){
SC("showchildren",self.navframe.NGH());
ERF();
};
function ECP(){
SC("showparents",self.navframe.NGH());
ERF();
};
function ETK(){
var ns=!GS("keydiv");
if(ns){
KDK(GE("keycontent"));
}
SS("keydiv",ns);
self.navframe.NKS(ns);
};
function ETI(){
ESI(!GI("leftdiv"));
ERF();
};
function ESI(s){
var c=s?"marginon":"marginoff";
GE("treemargin").className=c;
GE("externalmargin").className=c;
GE("navmargin").className=c;
GE("welcomemargin").className=c;
GE("keymargin").className=c;
SI("leftdiv",s);
self.navframe.NSS(s);
};
function EFB(i){
var sf=FCS(Efa,i);
SV("do_startbranch",sf.join("\t"));
document.topform.submit();
};
function EIU(r){
if(staticMode){
return "image-"+r+".jpg";
}else{
return BR("ap/","image_read",{f:GV("familyid"),p:GV("personid"),c:GV("checksum"),r:r});
}
};
function EHW(){
SS("welcomediv",false);
};
function KDK(o){
var d=TND();
TAE(d,"m",{g:"m",h:"Blue is male"},0,0,false);
TAE(d,"f",{g:"f",h:"Pink is female"},1,0,false);
TAE(d,"w",{h:"Thick\nlines..."},0,1,false);
TAE(d,"h",{h:"...show partners"},1,1,false);
TAL(d,0,1,1,1,true);
TAE(d,"b",{g:"f",h:"Mother"},2.5,0,false);
TAE(d,"g",{g:"m",h:"Father"},3.5,0,false);
TAL(d,2.5,0,3.5,0,false);
TAE(d,"d",{g:"f",h:"Daughter"},2.5,1,false);
TAE(d,"s",{g:"m",h:"Son"},3.5,1,false);
TAL(d,3,0,3,0.5,false);
TAL(d,2.5,0.5,3.5,0.5,false);
TAL(d,2.5,0.5,2.5,1,false);
TAL(d,3.5,0.5,3.5,1,false);
TAE(d,"z",{h:"Deceased are faded",z:1},5,0,false);
TAE(d,"o",{h:"Dotted lines lead to more"},5,1,false);
TAL(d,5,1,5,0.6,null);
TAL(d,5,1,4.55,1,null);
TRD(d,"",false,false,false,o,null,false,false,1,null);
};
function ESL(){
return {s:Ess.length,i:Eis.length,n:GV("newscript").length};
};
function ECI(c,s){
EHW();
SV("importcacheid",c);
SV("newscript","");
Efa={};
Eis=s;
ERS(s);
EUS(true,null,"view",true,false);
EUL(false);
};
function ESA(){
SV("importcacheid","");
SV("newscript","");
Efa={};
Eis="";
EUS(true,null,"edit",true,false);
EUL(false);
SS("welcomediv",true);
};

