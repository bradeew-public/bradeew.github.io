/**
 * Created by Bhavin on 11/10/2014.
 */
angular.module('bettehrApp').factory('parseXMLFactory', function($http) {
    var xmlToJson = {

        // converts xml documents and xml text to json object
        xml2json: function(xml, extended) {

            if(!xml) return {}; // quick fail

            //### PARSER LIBRARY
            // Core function
            function parseXML(node, simple){
                if(!node) return null;
                var txt = '', obj = null, att = null;
                var nt = node.nodeType, nn = jsVar(node.localName || node.nodeName);
                var nv = node.text || node.nodeValue || '';
                /*DBG*/ //if(window.console) console.log(['x2j',nn,nt,nv.length+' bytes']);
                if(node.childNodes){
                    if(node.childNodes.length>0){
                        /*DBG*/ //if(window.console) console.log(['x2j',nn,'CHILDREN',node.childNodes]);
                        $.each(node.childNodes, function(n,cn){
                            var cnt = cn.nodeType, cnn = jsVar(cn.localName || cn.nodeName);
                            var cnv = cn.text || cn.nodeValue || '';
                            /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>a',cnn,cnt,cnv]);
                            if(cnt == 8){
                                /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>b',cnn,'COMMENT (ignore)']);
                                return; // ignore comment node
                            }
                            else if(cnt == 3 || cnt == 4 || !cnn){
                                // ignore white-space in between tags
                                if(cnv.match(/^\s+$/)){
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>c',cnn,'WHITE-SPACE (ignore)']);
                                    return;
                                };
                                /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>d',cnn,'TEXT']);
                                txt += cnv.replace(/^\s+/,'').replace(/\s+$/,'');
                                // make sure we ditch trailing spaces from markup
                            }
                            else{
                                /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>e',cnn,'OBJECT']);
                                obj = obj || {};
                                if(obj[cnn]){
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>f',cnn,'ARRAY']);

                                    // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                                    if(!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
                                    obj[cnn] = myArr(obj[cnn]);

                                    obj[cnn][ obj[cnn].length ] = parseXML(cn, true/* simple */);
                                    obj[cnn].length = obj[cnn].length;
                                }
                                else{
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>g',cnn,'dig deeper...']);
                                    obj[cnn] = parseXML(cn);
                                };
                            };
                        });
                    };//node.childNodes.length>0
                };//node.childNodes
                if(node.attributes){
                    if(node.attributes.length>0){
                        /*DBG*/ //if(window.console) console.log(['x2j',nn,'ATTRIBUTES',node.attributes])
                        att = {}; obj = obj || {};
                        $.each(node.attributes, function(a,at){
                            var atn = jsVar(at.name), atv = at.value;
                            att[atn] = atv;
                            if(obj[atn]){
                                /*DBG*/ //if(window.console) console.log(['x2j',nn,'attr>',atn,'ARRAY']);

                                // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                                //if(!obj[atn].length) obj[atn] = myArr(obj[atn]);//[ obj[ atn ] ];
                                obj[cnn] = myArr(obj[cnn]);

                                obj[atn][ obj[atn].length ] = atv;
                                obj[atn].length = obj[atn].length;
                            }
                            else{
                                /*DBG*/ //if(window.console) console.log(['x2j',nn,'attr>',atn,'TEXT']);
                                obj[atn] = atv;
                            };
                        });
                        //obj['attributes'] = att;
                    };//node.attributes.length>0
                };//node.attributes
                if(obj){
                    obj = $.extend( (txt!='' ? new String(txt) : {}),/* {text:txt},*/ obj || {}/*, att || {}*/);
                    //txt = (obj.text) ? (typeof(obj.text)=='object' ? obj.text : [obj.text || '']).concat([txt]) : txt;
                    txt = (obj.text) ? ([obj.text || '']).concat([txt]) : txt;
                    if(txt) obj.text = txt;
                    txt = '';
                };
                var out = obj || txt;
                //console.log([extended, simple, out]);
                if(extended){
                    if(txt) out = {};//new String(out);
                    txt = out.text || txt || '';
                    if(txt) out.text = txt;
                    if(!simple) out = myArr(out);
                };
                return out;
            };// parseXML
            // Core Function End
            // Utility functions
            var jsVar = function(s){ return String(s || '').replace(/-/g,"_"); };

            // NEW isNum function: 01/09/2010
            // Thanks to Emile Grau, GigaTecnologies S.L., www.gigatransfer.com, www.mygigamail.com
            function isNum(s){
                // based on utility function isNum from xml2json plugin (http://www.fyneworks.com/ - diego@fyneworks.com)
                // few bugs corrected from original function :
                // - syntax error : regexp.test(string) instead of string.test(reg)
                // - regexp modified to accept  comma as decimal mark (latin syntax : 25,24 )
                // - regexp modified to reject if no number before decimal mark  : ".7" is not accepted
                // - string is "trimmed", allowing to accept space at the beginning and end of string
                var regexp=/^((-)?([0-9]+)(([\.\,]{0,1})([0-9]+))?$)/
                return (typeof s == "number") || regexp.test(String((s && typeof s == "string") ? jQuery.trim(s) : ''));
            };
            // OLD isNum function: (for reference only)
            //var isNum = function(s){ return (typeof s == "number") || String((s && typeof s == "string") ? s : '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/); };

            var myArr = function(o){

                // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                //if(!o.length) o = [ o ]; o.length=o.length;
                if(!$.isArray(o)) o = [ o ]; o.length=o.length;

                // here is where you can attach additional functionality, such as searching and sorting...
                return o;
            };
            // Utility functions End
            //### PARSER LIBRARY END

            // Convert plain text to xml
            if(typeof xml=='string') xml = $.text2xml(xml);

            // Quick fail if not xml (or if this is a node)
            if(!xml.nodeType) return;
            if(xml.nodeType == 3 || xml.nodeType == 4) return xml.nodeValue;

            // Find xml root node
            var root = (xml.nodeType == 9) ? xml.documentElement : xml;

            // Convert xml to json
            var out = parseXML(root, true /* simple */);
            console.log(out);
            // Clean-up memory

            xml = null; root = null;

            // Send output
            return out;
        },

        // Convert text to XML DOM
        text2xml: function(str) {
            // NOTE: I'd like to use jQuery for this, but jQuery makes all tags uppercase
            //return $(xml)[0];

            /* prior to jquery 1.9 */
            /*
             var out;
             try{
             var xml = ((!$.support.opacity && !$.support.style))?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser();
             xml.async = false;
             }catch(e){ throw new Error("XML Parser could not be instantiated") };
             try{
             if((!$.support.opacity && !$.support.style)) out = (xml.loadXML(str))?xml:false;
             else out = xml.parseFromString(str, "text/xml");
             }catch(e){ throw new Error("Error parsing XML string") };
             return out;
             */

            /* jquery 1.9+ */
            return $.parseXML(str);
        }
    };
    var br = '<br />';
    var parser = {
        //get Demographic info using jquery DOM
        getDemographicInfo : function (document) {
            var patient = $(document).find("patient");
            var first = patient.find('given').text();
            var last = patient.find('family').text();
            var gender = patient.find('administrativeGenderCode').attr('code');
            var birthTime = patient.find('birthTime').attr('value');
            var race = patient.find('raceCode').attr('displayName');
            var ethnic = patient.find('ethnicGroupCode').attr('displayName');

            $("#anotherElement").append("First: " + first + br);
            $("#anotherElement").append("Last: " + last + br);
            $("#anotherElement").append("Gender: " + gender + br);
            $("#anotherElement").append("Birth Date: " + birthTime + br);
            $("#anotherElement").append("Race: " + race + br);
            $("#anotherElement").append("Ethnic: " + ethnic + br);

        },

        //use json to get array of json objects
        getData : function (data, index) {
            console.log(data);
            var components = data.component.structuredBody.component;
            var com = components[index].section.text[0].table;
            labels = getTableHeader(com.thead);
            values = getValues(com.tbody, labels);

            return values;
        },


        // this is just a placeholder to print all values
        appendValues: function(values, name) {
            $("#anotherElement").append(br + 'Section ' + name + br);

            for (var x in values) {
                $("#anotherElement").append(br + name + ' ' + x + br);
                for (var y in values[x]) {
                    $("#anotherElement").append(y + ": " + values[x][y] + br);
                }
            }

        },

        getTableHeader:  function (head) {
            var labels = [];
            var values = head.tr.th;

            for (var v in values) {
                labels[labels.length] = values[v];
            }
            return labels;
        },

        getValues: function (body, labels) {
            var values = [];
            var encounters = body.tr;
            for (var v in encounters) {
                var encounter = encounters[v].td;
                var newEncounter = {};
                for (var u in encounter) {
                    if (typeof encounter[u] != "string") {
                        if ('text' in encounter[u]) {
                            newEncounter[labels[u]] = encounter[u];
                        } else {
                            newEncounter[labels[u]] = encounter[u].content;
                        }
                    } else {
                        newEncounter[labels[u]] = encounter[u];
                    }
                }
                values[values.length] = newEncounter;
            }
            return values;
        }
    };

    // run the encapsulated xml2json parser, generate the data using the encapsulated parser

    //var xmlFile = $http.get('CCD/modified_marla_CCD.xml');
    //var xmlJson = xmlToJson.xml2json(xmlFile);

    var xmlJson = $http.get('CCD/modified_marla_CCD.xml').success(xmlToJson.xml2json); // doesn't work right?
    //var xmlJson = $http.get('CCD/modified_marla_CCD.xml').success(xml2json);

    console.log("Should have parsed?");
    console.log(xmlJson);
    var parsedData = {};
    parsedData.raw = {};
    parsedData.raw.allergies = parser.getData(xmlJson, 0);
    parsedData.raw.encounters = parser.getData(xmlJson, 1);
    parsedData.raw.vaccinations = parser.getData(xmlJson, 2);
    parsedData.raw.medications = parser.getData(xmlJson, 3);
    // parsedData.raw.problems = parser.getEncounters(xmlJson, 4)
    parsedData.raw.testResults = parser.getData(xmlJson, 5);
    // parsedData.raw.social = parser.getData(xmlJson, 6);
    parsedData.raw.vitals = parser.getData(xmlJson, 7);

    return parsedData;
});