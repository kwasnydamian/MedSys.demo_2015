/**
 * Created by Soflab on 2015-03-27.
 */
Template.layout.rendered=function(){
    var my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src','http://simplewebrtc.com/latest.js');
    document.head.appendChild(my_awesome_script);
};