(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=t(2),l=function(e){var n=e.personlist,t=e.namefilter,a=e.deletePerson;return r.a.createElement("div",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("p",{key:e.name},e.name+" "+e.number+" ",r.a.createElement("button",{onClick:function(){window.confirm("Want to delete ".concat(e.name))&&a(e.id)}},"delete"))})))},i=function(e){var n=e.nameFilter,t=e.filterNames;return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,o=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=t(3),f=t.n(d),s="https://safe-lake-35420.herokuapp.com/api/persons/",b=function(){return f.a.get(s).then((function(e){return e.data}))},h=function(e){return f.a.post(s,e).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return f.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},E={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},v={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},w=function(e){var n=e.message,t=e.errorFlag;return n?r.a.createElement("div",{style:!1===t?E:v},n):null},N=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),d=Object(c.a)(u,2),f=d[0],s=d[1],E=Object(a.useState)(""),v=Object(c.a)(E,2),N=v[0],j=v[1],O=Object(a.useState)(""),k=Object(c.a)(O,2),S=k[0],y=k[1],C=Object(a.useState)(null),F=Object(c.a)(C,2),B=F[0],P=F[1],T=Object(a.useState)(null),z=Object(c.a)(T,2),A=z[0],J=z[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:B,errorFlag:A}),r.a.createElement(i,{nameFilter:S,filterNames:function(e){return y(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{addName:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(f)){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with new one?"))){var n=t.filter((function(e){return e.name===f})),a={name:n[0].name,number:N};n[0].number=N,p(n[0].id,a).then((function(e){o(t.map((function(t){return t.id!==n.id?t:e}))),P("Updated ".concat(f," number with: ").concat(N)),setTimeout((function(){P(null)}),5e3)})).catch((function(e){J(!0),P("Note! ".concat(f," has been already removed from server.")),o(t.filter((function(e){return e.name!==f}))),setTimeout((function(){P(null)}),5e3)})),s(""),j(""),J(!1)}}else h({name:f,number:N}).then((function(e){o(t.concat(e)),P("Added ".concat(f," with number ").concat(N)),console.log("add new name, set error flag false"),J(!1),setTimeout((function(){P(null)}),5e3),s(""),j("")}))},newName:f,handleNameChange:function(e){return s(e.target.value)},newNumber:N,handleNumberChange:function(e){return j(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(l,{personlist:t,namefilter:S,deletePerson:function(e){g(e).then((function(n){o(t.filter((function(n){return n.id!==e})))}))}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.6cf57428.chunk.js.map