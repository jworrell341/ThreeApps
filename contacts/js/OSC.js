//==================================================
/*
    A Suite of three wrappers for common DOM utilities.
    1.  A wrapper for document.getElementById(obj)
        Clever: you can use the object reference or its id string!
    2.  Wrapper for style property; again obj or id can be used.
    3.  C(className) returns a collection (array) of all elements in the DOM with class name className.
        Objects with multiple classes have only the first assigned class checked.
*/
function O(obj){
    if (typeof obj == 'object') return obj;
    else return document.getElementById(obj);
}

function S(obj){
    return O(obj).style;
}

function C(className){
    var elements = document.getElementsByTagName('*');
    var objects = [];
    for (var i = 0 ; i < elements.length ; ++i){
        if (elements[i].className == className){
            objects.push(elements[i]);
        }
    }
    return objects;
}
//=================================================================