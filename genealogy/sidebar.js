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
var Sen=[{p:"personalname",l:"familyname",q:"familybirth"},{e:"email",w:"website",B:"blog",P:"photosite",t:"hometel",k:"worktel",u:"mobile",S:"skype",a:"address",C:"othercontact"},{v:"birthplace",y:"deathplace",U:"burialplace",j:"profession",E:"employer",I:"interests",A:"activities",o:"bionotes"}];
var Sv1={e:"Email",w:"Website",B:"Blog",P:"Photo site",t:"Home tel",k:"Work tel",u:"Mobile",S:"Skype",a:"Address",C:"Other"};
var Sv2={v:"Birth place",y:"Death place",U:"Burial place",F:"Burial date",j:"Profession",E:"Company",I:"Interests",A:"Activities",o:"Bio notes"};
var Spt={m:"Married",e:"Engaged",r:"Relationship",s:"Separated",d:"Divorced",a:"Annulled"};
var Sur={w:"website",B:"blog",P:"photos"};
var excludeCapitals=",de,del,la,von,van,den,der,of,the,and,y,da,dos,das,";
var Spe;
var Spa=0;
var Sed=false;
var Srl;
function PL(){
CE(parent);
};
function SCR(i){
parent.ESP(i,false);
};
function SPW(i){
return parent.Ewr||(i&&(parent.Ewp==i));
};
function SSE(i,e){
var pi=Spe;
Spe=i;
var p=parent.Efa[i];
var md=(Spe==parent.GV("personid"));
if((!p)||(!p.n)){
var js="";
for(var j in parent.Efa){
js+=j+" ";
}
var ks="";
for(var k in p){
ks+=k+" ";
}
parent.SE("NoPerson: "+i+"|"+js+"|"+ks+"|"+parent.Ess.length+"|"+parent.TR());
}
var v=GE("nametitle");
v.innerHTML=EH(p.n);
v.className=(p.p||p.l)?"sname":"sdefname";
SV("shareperson","Invite "+p.h+" to share family");
SS("hideurl",false);
GE("switchpanel3").style.display=p.cp?"block":"none";
var uf=p.w?"w":(p.B?"B":(p.P?"P":null));
SS("showurl",uf?true:false);
if(uf){
SV("urlmode",Sur[uf]);
GE("urllink").href=p[uf];
SV("showurl","Show "+(false?"my":(p.h+"'s"))+" "+Sv1[uf].toLowerCase());
}
SSA((((Spa==3)&&!p.cp)||((pi!=i)&&((e=="edit")||Sed)))?0:Spa,(e=="edit")?((Sed&&(pi==i))?null:true):false);
SIU(false);
};
function SSA(_1,_2){
if(Sed&&((_1!=Spa)||(_2===false))){
try{
GE("switchlink"+_1).focus();
}
catch(e){
}
}
Spa=_1;
if(_2!==null){
Sed=_2;
}
var f=parent.Efa;
var p=f[Spe];
var md=(Spe==parent.GV("personid"));
var pw=SPW(Spe);
if(!pw){
Sed=false;
}
for(var j=0;j<=3;j++){
GE("switchpanel"+j).className=((_1==j)?"sswitched":"sswitch");
GE("switchlink"+j).className=((_1==j)?"sswitchedlink":"");
}
SR("personalview",(Spa==0)&&!Sed);
SR("personaledit",(Spa==0)&&Sed);
SR("personaleditdeath",(Spa==0)&&(p.z==1)&&Sed);
SR("partnersviewedit",(Spa==3));
SR("contactview",(Spa==1)&&!Sed);
SR("contactedit",(Spa==1)&&Sed);
SR("bioview",(Spa==2)&&!Sed);
SR("bioedit1",(Spa==2)&&Sed);
SR("bioeditdeath",(Spa==2)&&(p.z==1)&&Sed);
SR("bioedit2",(Spa==2)&&Sed);
SR("viewfooter",pw&&(!Sed));
SR("editfooter",Sed);
SR("readonlyfooter",(!parent.staticMode)&&(!parent.Ewr)&&(!parent.Ewp));
SR("writemefooter",(!parent.Ewr)&&pw);
SR("writenotfooter",parent.Ewp&&!pw);
SV("editbutton",(Spa==3)?"Edit partnership details":("Edit "+(md?"my":(p.h+"'s"))+" details"));
SS("nonrelations",true);
SS("shareperson",(!parent.staticMode)&&parent.GV("sessionid")&&(p.z!="1")&&!md);
SS("nonediting",!Sed);
SR("relactions",parent.Ewr&&!Sed);
if(Sed){
var df=(_2===true);
for(var j in Sen[Spa]){
SV(Sen[Spa][j],p[j]);
if(df&&(j!="y")&&!GV(Sen[Spa][j])){
FS(Sen[Spa][j]);
df=false;
}
}
}else{
if(parent.Ewr){
SRP(false);
}
}
if(_1==1){
SP1();
}else{
if(_1==2){
SP2();
}else{
if(_1==3){
SP3();
}else{
SP0();
}
}
}
SSF();
};
function SSF(){
var om=!parent.staticMode;
var sl=parent.ESL();
SR("importfooter",om&&(!sl.n)&&(!sl.s)&&(!sl.i));
SR("downloadfooter",om&&parent.GV("sessionid")&&parent.GV("familyid")&&sl.s&&(!sl.n)&&!sl.i);
SR("clearfooter",om&&(sl.n||sl.i)&&!sl.s);
};
function SWA(p){
SSA(p,Sed);
};
function SED(){
parent.ECS();
parent.ESE(false,[Spe],Spe);
};
function SAS(){
parent.EFE(true);
};
function SCS(){
parent.EFE(false);
};
function SRR(e){
var v=GE(e);
while(v.firstChild){
v.removeChild(v.firstChild);
}
};
function SJR(e,v,h,s){
var r=document.createElement("TR");
var a=document.createElement("TD");
a.className="sboth";
a.innerHTML=h?v:EL(v);
a.colSpan=s;
r.appendChild(a);
GE(e).appendChild(r);
};
function SSR(e,t,v,h,a){
var r=document.createElement("TR");
r.vAlign=a||"top";
var a=document.createElement("TD");
a.className="sleft";
if(t){
a.innerHTML=EH(t+":");
}
var b=document.createElement("TD");
b.className="sright";
b.innerHTML=h?v:EL(v);
r.appendChild(a);
r.appendChild(b);
GE(e).appendChild(r);
return r;
};
function SUR(e,t,i,v,s){
SJR(e,"<INPUT TYPE=\"submit\" VALUE=\""+EH(t)+"\" ID=\""+EH(i+v)+"\" CLASS=\"sbutton\" onClick=\"SCB('"+EH(i)+"','"+EH(v)+"'); return false;\">",true,s);
};
function SPP(i,ra,s){
var f=parent.Efa;
var rn=[];
for(j=0;j<ra.length;j++){
var pi=f[ra[j]];
var l=pi.l||pi.q;
var y=(FPD(pi.b||"").y||"")+"-"+(FPD(pi.d||"").y||"");
rn[rn.length]={i:ra[j],l:l?l.toLowerCase():"zzz",p:pi.p?pi.p.toLowerCase():"zzz",n:pi.n+((y.length>1)?(" ("+y+")"):"")};
}
rn.sort(NSN);
var v=GE(i);
v.options.length=0;
v.options[v.options.length]=new Option("","");
for(j=0;j<rn.length;j++){
var l=v.options.length;
v.options[l]=new Option(rn[j].n,rn[j].i);
if(rn[j].i==s){
v.selectedIndex=l;
}
}
};
function SLR(e,s){
SJR(e,"<IMG SRC=\"blankpixel.gif\" WIDTH=\"1\" HEIGHT=\"4\">",true,s);
};
function SRW(t,i){
if(i){
SSR("personalview",t,"<A HREF=\"#\" onClick=\"javascript:SCR('"+i+"'); return false;\">"+EH(parent.Efa[i].n)+"</A>",true);
}
};
function SRB(t,i,v){
SUR("relactions",t,i,v,1);
};
function SPR(e){
SRR("relactions");
if(e){
SS("nonrelations",false);
}
};
function SRP(e){
SPR(e);
var f=parent.Efa;
var p=f[Spe];
if(e){
var fd=false;
var ns=false;
SRB("Change parents","changeparent","");
if(p.cp){
SRB(((p.cp>1)||!p.s)?"Change partners":"Change partner","changespouse","");
}
if(Spe==parent.Efo){
fd=true;
}else{
var cf=FDF(f,parent.Efo,null,null,null);
var df=FDF(f,parent.Efo,Spe,null,null);
if((df.length-cf.length)<=1){
SRB("Delete "+p.n,"delete",Spe);
}else{
ns=true;
}
}
SRB("Cancel","cancel","");
if(ns){
SJR("relactions","<BR>This person cannot be deleted because this would split the tree into separate pieces.",true,1);
}
if(fd){
SJR("relactions","<BR>This person started the tree and cannot be deleted.",true,1);
}
}else{
var md=(parent.GV("personid")==Spe);
var ap=p.fg||parent.Ead||(parent.GV("personid")==parent.Efo);
SJR("relactions",md?"Click to add your relatives:":("Click to add relatives of "+p.h+":"),false,1);
if(ap){
if(p.f&&p.m){
}else{
if(p.f){
SRB("Add mother","choosemother","");
}else{
if(p.m){
SRB("Add father","choosefather","");
}else{
SRB("Add parents","addparents","");
}
}
}
}
if(p.s||p.cp){
SRB("Add partner/ex","choosespouse","");
}else{
SRB("Add partner/ex","choosespouse","");
}
var sc=p.g||(p.s&&f[p.s].g);
if(ap){
SRB("Add brother/sister","addsibling","");
}
if(sc){
SRB("Add child","addchild","");
}
var cf=0;
for(var j in f){
cf++;
if(cf>1){
SRB("Change or delete","morelactions","");
break;
}
}
if(!sc){
SJR("relactions","<BR>To add children, set this person's gender first.",true,1);
}
if(!ap){
var si=parent.GV("sessionid");
if(md){
SJR("relactions","<BR>To add your parents, brothers or sisters, "+"please "+(si?"":"sign in then ")+"create a new family branch.",true,1);
if(si){
SRB("Create new family for me","startbranch","");
}
}else{
SJR("relactions","<BR>To add "+p.h+"'s parents, brothers or sisters, "+"a new family branch can be created"+(si?"":" after signing in")+".",true,1);
if(si){
SRB("Create new family for "+p.h,"startbranch","");
}
}
}
var ad=parent.GE("advertisement");
if(ad){
SLR("relactions",1);
SLR("relactions",1);
SJR("relactions",ad.innerHTML,true,1);
}
}
};
function SP0(){
var f=parent.Efa;
var p=f[Spe];
if(Sed){
GE("gender_f").checked=(p.g=="f");
GE("gender_m").checked=(p.g=="m");
GE("gender_o").checked=(p.g=="o");
GE("alive").checked=(p.z!="1");
SSD("birthdom","birthmonth","birthyear",p.b);
SSD("deathdom","deathmonth","deathyear",p.d);
}else{
SRR("personalview");
SSR("personalview","Full name",(p.p||"")+" "+(p.l||p.q||""),false);
if(p.q&&p.l&&(p.q!=p.l)){
SSR("personalview","Surname at birth",p.q,false);
}
SSR("personalview","Gender",(p.g&&Fgn[p.g])?Fgn[p.g]:Fgn[""],false);
SSR("personalview","Birth date",FDT(p.b),false);
if(p.z==1){
SSR("personalview","Death date",FDT(p.d),false);
}
}
};
function SP1(){
var f=parent.Efa;
var p=f[Spe];
if(!Sed){
SRR("contactview");
for(var j in Sv1){
if(p[j]||((!parent.staticMode)&&((j=="e")||(j=="w")||(j=="t")||(j=="a")))){
if(j=="e"){
SSR("contactview",Sv1[j],p[j]?("<A HREF=\"mailto:"+EH(p[j])+"\">"+EH(p[j])+"</A>"):"",true);
}else{
if(j=="S"){
SSR("contactview",Sv1[j],p[j]?("<A HREF=\"callto:"+EH(p[j])+"\">"+EH(p[j])+"</A>"):"",true);
}else{
if((j=="w")||(j=="B")||(j=="P")){
SSR("contactview",Sv1[j],p[j]?("<A HREF=\""+EH(p[j])+"\" TARGET=\"_new\" onClick=\"return UL(this);\">"+EH(p[j])+"</A>"):"",true);
}else{
SSR("contactview",Sv1[j],p[j],false);
}
}
}
}
}
if(parent.staticMode&&!parent.staticModeAfterRead){
SJR("contactview","&nbsp;<BR>To protect your privacy, phone numbers, addresses and emails have been removed.",true,2);
}
}
};
function SP2(){
var f=parent.Efa;
var p=f[Spe];
if(Sed){
SSD("burialdom","burialmonth","burialyear",p.F);
}else{
SRR("bioview");
for(var j in Sv2){
if(p[j]||(j=="v")||(j=="y")||(j=="j")){
if(((j!="y")&&(j!="U")&&(j!="F"))||(p.z==1)){
SSR("bioview",Sv2[j],(j=="F")?FDT(p[j]):p[j],false);
}
}
}
}
};
function S3R(f,p,pi,rc){
if(rc&&GE("partnersviewedit").firstChild){
SLR("partnersviewedit",2);
}
var cp=(p.s==pi)||(p.z==1);
var pl=(p.z!=1)&&(f[pi].z==1);
var _3=new String(p.gp?p.gp[pi]:"");
if(rc){
var cm=FCM(p,f[pi]);
if(((_3=="m")&&(cp||pl))||(_3=="s")){
if(pl){
var s=cm?((cm>0)?"Late wife":"Late husband"):"Late spouse";
}else{
var s=cm?((cm>0)?"Wife":"Husband"):"Spouse";
}
if(_3=="s"){
s+=" (separated)";
}
}else{
if((_3=="m")||(_3=="d")||(_3=="a")){
var s=cm?((cm>0)?"Ex-wife":"Ex-husband"):"Ex-spouse";
}else{
if((_3=="e")&&(cp||pl)){
if(pl){
var s=(cm>0)?"Late fiancée":"Late fiancé";
}else{
var s=(cm>0)?"Fiancée":"Fiancé";
}
}else{
if(_3=="e"){
var s=(cm>0)?"Ex-fiancée":"Ex-fiancé";
}else{
var s=pl?"Late partner":(cp?"Partner":"Ex-partner");
}
}
}
}
SSR("partnersviewedit",s,f[pi].n,false);
}
if(_3=="m"){
var t={m:"Wedding date",w:"Location",z:((cp||pl)?"":"End date")};
}else{
if(_3=="e"){
var t={r:"Engagement date",z:((cp||pl)?"":"End date")};
}else{
if(_3=="r"){
var t={b:"Start date",z:((cp||pl)?"":"End date")};
}else{
if(_3=="s"){
var t={m:"Wedding date",w:"Location",s:"Separation date"};
}else{
if(_3=="d"){
var t={m:"Wedding date",w:"Location",d:"Divorce date"};
}else{
if(_3=="a"){
var t={m:"Wedding date",w:"Location",a:"Annulment date"};
}else{
var t={};
}
}
}
}
}
}
if(Sed){
var e="partner"+pi+"g";
if(rc){
SSR("partnersviewedit","Type","<SELECT ID=\""+EH(e)+"\" CLASS=\"sselect\" onChange=\"SCP('g', '"+EH(pi)+"')\"></SELECT>",true,"middle");
var v=GE(e);
v.options.length=0;
v.options[v.options.length]=new Option("","");
for(var j in Spt){
v.options[v.options.length]=new Option(Spt[j],j);
}
}
SO(e,_3);
for(var ti in t){
if(t[ti]){
var _4=p[ti+"p"]?p[ti+"p"][pi]:"";
if(ti=="w"){
var e="partner"+pi+ti;
if(rc){
SSR("partnersviewedit",t[ti],"<INPUT ID=\""+EH(e)+"\" CLASS=\"sfield\" onChange=\"SCP('"+ti+"', '"+EH(pi)+"');\">",true,"middle");
}
SV(e,_4);
}else{
S3D(pi,t[ti],ti,_4,rc);
}
}
}
}else{
if(rc){
for(var ti in t){
if(t[ti]){
var _4=p[ti+"p"]?p[ti+"p"][pi]:"";
SSR("partnersviewedit",t[ti],(ti=="w")?_4:FDT(_4),false);
}
}
}
}
};
function S3D(pi,t,ti,d,rc){
if(rc){
var s=EH(pi+ti);
var o=" onChange=\"SCP('"+EH(ti)+"', '"+EH(pi)+"');\"";
SSR("partnersviewedit",t,"<SELECT ID=\"partner"+s+"month\" CLASS=\"sselect\""+o+"></SELECT>&nbsp; <SELECT ID=\"partner"+s+"dom\" CLASS=\"sselect\""+o+"></SELECT>&nbsp; <INPUT ID=\"partner"+s+"year\" CLASS=\"syear\""+o+" MAXLENGTH=4>",true,"middle");
}
SSD("partner"+pi+ti+"dom","partner"+pi+ti+"month","partner"+pi+ti+"year",d);
};
function SP3(){
var f=parent.Efa;
var p=f[Spe];
var rr={};
if(p.s){
rr[p.s]=true;
}
for(var pi in p.pc){
if(pi!=p.s){
rr[pi]=true;
}
}
if(Sed){
var rl=Spe;
for(var pi in rr){
rl+=" "+(p.gp?p.gp[pi]:"")+pi+(p.ep?p.ep[pi]:"");
}
var rc=(rl!=Srl);
Srl=rl;
}else{
Srl=null;
var rc=true;
}
if(rc){
SRR("partnersviewedit");
}
for(var pi in rr){
S3R(f,p,pi,rc);
}
};
function SSG(v){
parent.EFC(Spe,{g:v});
parent.EUF();
};
function SCV(i){
if(i=="birth"){
parent.EFC(Spe,{b:FDS(GO("birthdom"),GO("birthmonth"),GV("birthyear"))});
}else{
if(i=="death"){
parent.EFC(Spe,{d:FDS(GO("deathdom"),GO("deathmonth"),GV("deathyear"))});
}else{
if(i=="burial"){
parent.EFC(Spe,{F:FDS(GO("burialdom"),GO("burialmonth"),GV("burialyear"))});
}else{
if(i=="alive"){
parent.EFC(Spe,{z:(GE(i).checked?"0":"1")});
}else{
for(k=0;k<Sen.length;k++){
for(var j in Sen[k]){
if(i==Sen[k][j]){
var c={};
var v=new String(GV(i));
v=v.replace(/^\s+|\s+$/g,"");
if((j=="p")||(j=="l")||(j=="q")){
var s=v.split(" ");
for(w=0;w<s.length;w++){
if((s[w].length)&&(excludeCapitals.indexOf(s[w])<0)&&(s[w].indexOf("'")<0)){
s[w]=s[w].charAt(0).toUpperCase()+s[w].substring(1);
}
}
v=s.join(" ");
}
if((j=="w")||(j=="B")||(j=="P")){
if(v.length&&(v.indexOf("://")<0)){
v="http://"+v;
}
}
c[j]=v;
parent.EFC(Spe,c);
}
}
}
}
}
}
}
parent.EUF();
};
function SCP(ti,pi){
var e="partner"+pi+ti;
var c={};
if(ti=="g"){
c[ti]=GO(e);
}else{
if(ti=="w"){
c[ti]=GV(e);
}else{
c[ti]=FDS(GO(e+"dom"),GO(e+"month"),GV(e+"year"));
}
}
parent.EPC(Spe,pi,c);
parent.EUF();
};
function SCM(){
var f=parent.Efa;
var tm=GO("treemother");
var tf=GO("treefather");
SPP("treefather",FAR(f,Spe,tm),tm?f[tm].es:tf);
if(!GO("treefather")){
SO("treefather",f[Spe].f);
}
};
function SFV(i){
if(!GV(i)){
if(i=="familybirth"){
var sn=GV("familyname");
if(sn){
parent.EFC(Spe,{q:sn});
SV(i,sn);
if(GV(i)){
GE(i).blur();
setTimeout("FS('"+i+"')",0);
}
}
}
}
};
function SAP(f,ti,oi,_5,_6,_7,_8){
if(oi){
var op=f[oi];
}
if(oi&&(op.es||op.cp)){
if((op.es)&&(op.es!=ti)){
SRB(_5+f[op.es].n,_6,op.es);
}
for(var pi in op.pc){
if((pi!=op.es)&&(pi!=ti)){
SRB(_5+f[pi].n,_6,pi);
}
}
if(_8){
SRB(_7,_8,"");
}
}else{
if(_8){
SCB(_8,"");
}
}
};
function SPX(f,i1,i2,ap){
if(i1&&i2&&f[i1]&&f[i2]&&(ap||!FMS(f,i1,i2))){
if(!(f[i1].ep&&f[i1].ep[i2]&&f[i2].ep&&f[i2].ep[i1])){
parent.EPC(i1,i2,{e:1});
}
}
};
function SCB(i,v){
var f=parent.Efa;
var p=f[Spe];
if((i=="addparents")||(i=="addparentsstop")){
if(i=="addparents"){
parent.ECS();
}
var pd=(p.z==1)&&(p.c.length>0);
for(var j=0;j<p.c.length;j++){
if(f[p.c[j]].z!=1){
pd=false;
}
}
var fi=parent.EFI();
var fo={"^":Spe,g:"m",l:p.q};
if(pd){
fo.z=1;
}
parent.EFC(fi,fo);
var mi=parent.EFI();
var mo={"^":Spe,g:"f",s:fi,l:p.q};
if(pd){
mo.z=1;
}
parent.EFC(mi,mo);
parent.EFC(Spe,{m:mi,f:fi});
if(i=="addparents"){
parent.ESE(true,[mi,fi],Spe);
}
}else{
if(i=="choosemother"){
SPR(true);
SAP(f,p.m,p.f,"Set mother to ","setmother","Add new mother","addmother");
SRB("Cancel","cancel","");
}else{
if(i=="choosefather"){
SPR(true);
SAP(f,p.f,p.m,"Set father to ","setfather","Add new father","addfather");
SRB("Cancel","cancel","");
}else{
if(i=="changeparent"){
SPR(true);
if((!p.f)&&(!p.m)){
SRB("Add new parents","addparents","");
}
if(!p.f){
SRB("Add new father","addfather","");
}else{
SAP(f,p.m,p.f,"Set mother to ","setmother",null,null);
}
if(!p.m){
SRB("Add new mother","addmother","");
}else{
SAP(f,p.f,p.m,"Set father to ","setfather",null,null);
}
var ra=FAR(f,Spe,null);
if(ra.length){
SRB("Choose new parents from tree","treeparents","");
}
SRB("Cancel","cancel","");
}else{
if((i=="choosespouse")||(i=="changespouse")){
SPR(true);
if((i=="changespouse")||!p.s){
for(var pi in p.pc){
if(pi!=p.s){
SRB("Set partner to "+f[pi].n,"setspouse",pi);
}
}
}
if(i=="choosespouse"){
SRB("Add new partner","addspouse","");
SRB("Add new ex-partner","addexspouse","");
var ra=FPR(f,Spe);
if(ra.length){
SRB("Partner with person already on tree","treespouse","");
}
}
if(i=="changespouse"){
if(p.s){
SRB("Set no current partner","setspouse","");
}
var cf=FDF(f,Spe,null,null,null);
for(var pi in p.pc){
if((pi!=p.s)&&!FLP(f,Spe,pi).length){
var df=FDF(f,Spe,null,Spe,pi);
if(df.length<=cf.length){
SRB("Remove ex-partner "+f[pi].n,"notexspouse",pi);
}
}
}
}
SRB("Cancel","cancel","");
}else{
if(i=="addchild"){
SPR(true);
if(p.es){
SRB("Add child with "+f[p.es].n,"addchildwith",p.es);
}
for(var pi in p.pc){
if(pi!=p.es){
SRB("Add child with "+f[pi].n,"addchildwith",pi);
}
}
SRB((p.g=="m")?"Add child with new mother":"Add child with new father","addchildwithnew","");
SRB((p.g=="m")?"Add child without mother":"Add child without father","addchildwithout","");
SRB("Cancel","cancel","");
}else{
if(i=="addchildwith"){
parent.ECS();
var ci=parent.EFI();
var mi=FSM(f,Spe,v)?Spe:v;
var fi=FSM(f,Spe,v)?v:Spe;
var c={"^":Spe,m:mi,f:fi};
if(FMS(f,mi,fi)){
c.l=p.l;
c.q=p.l;
}
parent.EFC(ci,c);
parent.ESE(true,[ci],ci);
}else{
if(i=="addchildwithnew"){
parent.ECS();
var ci=parent.EFI();
var c={"^":Spe};
if(p.g=="m"){
c.f=Spe;
}else{
c.m=Spe;
}
parent.EFC(ci,c);
var pi=parent.EFI();
parent.EFC(pi,{"^":ci,g:(p.g=="m")?"f":"m"});
parent.EFC(ci,(p.g=="m")?{m:pi}:{f:pi});
parent.ESE(true,[ci,pi],ci);
}else{
if(i=="addchildwithout"){
parent.ECS();
var ci=parent.EFI();
parent.EFC(ci,(p.g=="m")?{"^":Spe,f:Spe,l:p.l,q:p.l}:{"^":Spe,m:Spe,l:p.l,q:p.l});
parent.ESE(true,[ci],ci);
}else{
if(i=="addsibling"){
parent.ECS();
var ap=!(p.m||p.f);
if(ap){
SCB("addparentsstop","");
}
var si=parent.EFI();
parent.EFC(si,{"^":Spe,m:p.m,f:p.f,l:p.q,q:p.q});
parent.ESE(true,ap?[si,p.m,p.f]:[si],si);
}else{
if(i=="addmother"){
parent.ECS();
SPX(f,p.f,p.m,false);
var mi=parent.EFI();
parent.EFC(Spe,{m:mi});
parent.EFC(mi,{"^":Spe,g:"f"});
parent.ESE(true,[mi],Spe);
}else{
if(i=="addfather"){
parent.ECS();
SPX(f,p.f,p.m,false);
var fi=parent.EFI();
parent.EFC(Spe,{f:fi});
parent.EFC(fi,{"^":Spe,g:"m"});
parent.ESE(true,[fi],Spe);
}else{
if(i=="addspouse"){
parent.ECS();
SPX(f,Spe,p.s,true);
var si=parent.EFI();
parent.EFC(si,{"^":Spe,g:FIG(p.g),s:Spe,l:p.l});
parent.ESE(true,[si],Spe);
}else{
if(i=="addexspouse"){
parent.ECS();
var si=parent.EFI();
parent.EFC(si,{"^":Spe,g:FIG(p.g)});
parent.EPC(Spe,si,{e:1});
parent.ESE(true,[si],Spe);
}else{
if(i=="notexspouse"){
parent.EPC(Spe,v,{e:""});
parent.ESS();
parent.EUF();
}else{
if(i=="treespouse"){
SPR(true);
SJR("relactions","Choose the person to partner with:",false,1);
SJR("relactions","<SELECT ID=\"treepartner\" CLASS=\"sselect\"></SELECT>",true,1);
SLR("relactions",1);
SRB("Add as current partner","treeaddspouse","");
SRB("Add as ex-partner","treeaddexspouse","");
SRB("Cancel","cancel","");
SPP("treepartner",FPR(f,Spe),null);
}else{
if(i=="treeaddspouse"){
SCB("setspouse",GO("treepartner"));
}else{
if(i=="treeaddexspouse"){
parent.ECS();
parent.EPC(Spe,GO("treepartner"),{e:1});
parent.ESS();
parent.EUF();
}else{
if(i=="setmother"){
SPX(f,p.f,p.m,false);
parent.EFC(Spe,{m:v});
parent.ESS();
parent.EUF();
}else{
if(i=="setfather"){
SPX(f,p.f,p.m,false);
parent.EFC(Spe,{f:v});
parent.ESS();
parent.EUF();
}else{
if(i=="setspouse"){
SPX(f,Spe,p.s,true);
if(v){
SPX(f,v,f[v].s,true);
}
parent.EFC(Spe,{s:v});
parent.ESS();
parent.EUF();
}else{
if(i=="treeparents"){
SPR(true);
SJR("relactions","Choose the new mother:",false,1);
SJR("relactions","<SELECT ID=\"treemother\" CLASS=\"sselect\" onChange=\"SCM()\"></SELECT>",true,1);
SLR("relactions",1);
SJR("relactions","Choose the new father:",false,1);
SJR("relactions","<SELECT ID=\"treefather\" CLASS=\"sselect\"></SELECT>",true,1);
SLR("relactions",1);
SRB("Set new parents","treesetparents","");
SRB("Cancel","cancel","");
SPP("treemother",FAR(f,Spe,null),p.m);
SPP("treefather",FAR(f,Spe,p.m),p.f);
}else{
if(i=="treesetparents"){
var nm=GO("treemother");
var nf=GO("treefather");
var om=p.m;
var of=p.f;
var cf=FDF(f,Spe,null,null,null);
SPX(f,p.f,p.m,false);
parent.EFC(Spe,{m:nm,f:nf});
parent.EUS(true,null,null,false,false);
var df=FDF(f,Spe,null,null,null);
if(df.length>cf.length){
RE("This choice of parents is not allowed because it would split the tree into separate pieces.");
parent.EFC(Spe,{m:om,f:of});
}
parent.ESS();
parent.EUF();
}else{
if(i=="delete"){
var p=parent.Efa[v];
if(confirm("Are you sure you want to permanently delete "+p.n+"?")){
var ni=p["^"];
if((!ni)||(!f[ni])){
ni=p["^"]||p.es||p.f||p.m||p.c[0];
}
parent.ECS();
SPX(f,p.f,p.m,false);
parent.ESP(ni,true);
parent.EFC(v,{x:""});
parent.EUF();
}
}else{
if(i=="cancel"){
SSA(Spa,false);
}else{
if(i=="morelactions"){
SRP(true);
}else{
if(i=="startbranch"){
var md=(parent.GV("personid")==Spe);
if(confirm("This will create a new family for "+(md?"your":(p.h+"'s"))+" relatives. Are you sure you want to proceed?")){
GE("startbranch").value="Please wait a few moments...";
parent.EFB(Spe);
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
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
function SSD(ed,em,ey,d){
var p=FPD(d?d.toString():"");
var v=GE(ed);
v.options.length=0;
v.options[v.options.length]=new Option("",0);
for(var j=1;j<=31;j++){
v.options[v.options.length]=new Option(j,j);
}
var v=GE(em);
v.options.length=0;
v.options[v.options.length]=new Option("",0);
for(var j=1;j<=12;j++){
v.options[v.options.length]=new Option(Fmn[j],j);
}
SO(ed,p.d);
SO(em,p.m);
SV(ey,p.y);
};
function SSU(s){
SS("showurl",!s);
SS("hideurl",s);
};
function SIU(u){
var p=parent.Efa[Spe];
var r=p?p.r:null;
var pw=(!Sed)&&SPW(Spe)&&parent.GV("familyid");
u=u&&pw;
if(u){
var v=GE("uploadiframe");
v.src="imageupload.php?f="+escape(parent.GV("familyid"))+"&p="+escape(parent.GV("personid"))+"&c="+escape(parent.GV("checksum"))+"&i="+escape(Spe)+(r?"&r="+escape(r):"");
}else{
if(r){
var e=r.split(" ");
var v=GE("personimage");
var s=parent.EIU(e[0]);
if(v.src!=s){
if(e[1]&&e[2]){
v.style.width=e[1]+"px";
v.style.height=e[2]+"px";
}else{
v.style.width="";
v.style.height="";
v.src="blankpixel.gif";
}
v.src=s;
}
v.title=pw?"Click to change photo":"";
}
}
SV("uploadbutton",(Spe==parent.GV("personid"))?"Add my photo":("Add photo for "+p.h));
SS("uploadbutton",pw&&(!r)&&(!u));
SS("uploadiframe",u);
SS("personimage",r&&(!u));
};
function SIC(){
if(SPW(Spe)&&!Sed){
SIU(true);
}
};
function SIF(f,i,r,w,h){
parent.EFC(i,{r:(r?(r+" "+w+" "+h):r)});
parent.ESS();
parent.EUF();
SIU(false);
};
function SIA(){
SIU(false);
};
function SCC(){
if(confirm("Are you sure you want to clear this entire family and start again? "+"None of your work will be saved!")){
parent.ESA();
}
};

